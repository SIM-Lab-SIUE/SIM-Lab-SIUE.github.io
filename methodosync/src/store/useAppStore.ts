import { create } from 'zustand'
import type { Annotation, CodebookRow, ParsedMDFile, YTPlayerState } from '../types/annotation'
import { buildAnnotationMarkdown } from '../lib/markdownBuilder'
import { sanitizeVariableName } from '../lib/sanitize'

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

interface DraftAnnotation {
  observationText: string
  openCodes: string[]
  axialCategory: string
  analyticalMemo: string
}

const defaultDraft: DraftAnnotation = {
  observationText: '',
  openCodes: [],
  axialCategory: '',
  analyticalMemo: '',
}

interface AppState {
  // ── Navigation ──────────────────────────────────────────────────────
  activePhase: 'phase1' | 'bridge' | 'phase2'
  setActivePhase: (phase: 'phase1' | 'bridge' | 'phase2') => void

  // ── Phase 1: Video ───────────────────────────────────────────────────
  videoUrl: string
  videoId: string | null
  playerState: YTPlayerState
  capturedTimestamp: number
  setVideoUrl: (url: string) => void
  setVideoId: (id: string | null) => void
  setPlayerState: (state: YTPlayerState) => void
  captureTimestamp: (t: number) => void

  // ── Phase 1: Annotation form draft ──────────────────────────────────
  draft: DraftAnnotation
  updateDraft: (patch: Partial<DraftAnnotation>) => void
  clearDraft: () => void

  // ── Phase 1: Saved annotations ──────────────────────────────────────
  savedAnnotations: Annotation[]
  lastSavedMarkdown: string | null
  saveAnnotation: () => void

  // ── Axial category registry ──────────────────────────────────────────
  axialCategories: string[]
  addAxialCategory: (category: string) => void

  // ── Phase 2: Parsed files ────────────────────────────────────────────
  parsedFiles: ParsedMDFile[]
  addParsedFiles: (files: ParsedMDFile[]) => void
  clearParsedFiles: () => void
  initCodebookFromParsed: () => void

  // ── Phase 2: Codebook rows ──────────────────────────────────────────
  codebookRows: CodebookRow[]
  updateCodebookRow: (id: string, patch: Partial<CodebookRow>) => void
  addCodebookRow: () => void
  deleteCodebookRow: (id: string) => void
  isExporting: boolean
  setIsExporting: (v: boolean) => void

  // ── Accessibility announcements ──────────────────────────────────────
  announcement: string
  announce: (message: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // ── Navigation ──────────────────────────────────────────────────────
  activePhase: 'phase1',
  setActivePhase: (phase) => set({ activePhase: phase }),

  // ── Phase 1: Video ───────────────────────────────────────────────────
  videoUrl: '',
  videoId: null,
  playerState: -1,
  capturedTimestamp: 0,
  setVideoUrl: (url) => set({ videoUrl: url }),
  setVideoId: (id) => set({ videoId: id }),
  setPlayerState: (state) => set({ playerState: state }),
  captureTimestamp: (t) => set({ capturedTimestamp: t }),

  // ── Phase 1: Annotation form ─────────────────────────────────────────
  draft: { ...defaultDraft },
  updateDraft: (patch) =>
    set((state) => ({ draft: { ...state.draft, ...patch } })),
  clearDraft: () => set({ draft: { ...defaultDraft }, capturedTimestamp: 0 }),

  // ── Phase 1: Save annotation ─────────────────────────────────────────
  savedAnnotations: [],
  lastSavedMarkdown: null,
  saveAnnotation: () => {
    const { videoId, capturedTimestamp, draft } = get()
    if (!videoId) return

    const annotation: Annotation = {
      id: generateId(),
      videoId,
      timestamp: capturedTimestamp,
      ...draft,
    }

    const markdown = buildAnnotationMarkdown(annotation)

    set((state) => ({
      savedAnnotations: [...state.savedAnnotations, annotation],
      lastSavedMarkdown: markdown,
    }))

    // Register axial category if new
    const { axialCategory } = draft
    if (axialCategory) {
      get().addAxialCategory(axialCategory)
    }

    get().announce('Annotation saved.')
  },

  // ── Axial category registry ──────────────────────────────────────────
  axialCategories: [],
  addAxialCategory: (category) => {
    const trimmed = category.trim()
    if (!trimmed) return
    set((state) => {
      if (state.axialCategories.includes(trimmed)) return state
      return { axialCategories: [...state.axialCategories, trimmed] }
    })
  },

  // ── Phase 2: Parsed files ─────────────────────────────────────────────
  parsedFiles: [],
  addParsedFiles: (files) =>
    set((state) => ({ parsedFiles: [...state.parsedFiles, ...files] })),
  clearParsedFiles: () => set({ parsedFiles: [], codebookRows: [] }),

  initCodebookFromParsed: () => {
    const { parsedFiles } = get()
    const seen = new Set<string>()
    const rows: CodebookRow[] = []

    parsedFiles.forEach((file) => {
      // Collect all category strings from this file
      const categories: string[] = []
      if (file.axialCategory) categories.push(file.axialCategory)
      if (file.identifiedCategories) categories.push(...file.identifiedCategories)
      if (file.overarchingThemes) categories.push(...file.overarchingThemes)

      categories.forEach((cat) => {
        const clean = cat.trim()
        if (!clean || seen.has(clean.toLowerCase())) return
        seen.add(clean.toLowerCase())

        rows.push({
          id: generateId(),
          source: 'inductive',
          variableName: sanitizeVariableName(clean),
          variableLabel: clean,
          definitionText: '',
          inclusionRules: '',
          exclusionRules: '',
          valuesScale: '0 = Absent, 1 = Present, -99 = Missing/Uncodable',
          anchorExample: '',
        })
      })
    })

    set({ codebookRows: rows })
    get().announce(
      `${rows.length} variable${rows.length !== 1 ? 's' : ''} generated from parsed files.`
    )
  },

  // ── Phase 2: Codebook rows ────────────────────────────────────────────
  codebookRows: [],
  updateCodebookRow: (id, patch) =>
    set((state) => ({
      codebookRows: state.codebookRows.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    })),
  addCodebookRow: () =>
    set((state) => ({
      codebookRows: [
        ...state.codebookRows,
        {
          id: generateId(),
          source: 'deductive',
          variableName: '',
          variableLabel: '',
          definitionText: '',
          inclusionRules: '',
          exclusionRules: '',
          valuesScale: '0 = Absent, 1 = Present, -99 = Missing/Uncodable',
          anchorExample: '',
        },
      ],
    })),
  deleteCodebookRow: (id) =>
    set((state) => ({
      codebookRows: state.codebookRows.filter((row) => row.id !== id),
    })),
  isExporting: false,
  setIsExporting: (v) => set({ isExporting: v }),

  // ── Accessibility announcements ───────────────────────────────────────
  announcement: '',
  announce: (message) => {
    set({ announcement: message })
    setTimeout(() => set({ announcement: '' }), 2500)
  },
}))
