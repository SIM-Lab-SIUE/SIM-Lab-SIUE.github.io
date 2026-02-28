// ── Core domain types ──────────────────────────────────────────────────

export interface Annotation {
  id: string
  videoId: string
  timestamp: number
  observationText: string
  openCodes: string[]
  axialCategory: string
  analyticalMemo: string
}

export interface CodebookRow {
  id: string
  source: 'inductive' | 'deductive'
  variableName: string
  variableLabel: string
  definitionText: string
  inclusionRules: string
  exclusionRules: string
  valuesScale: string
  anchorExample: string
}

export interface ParsedMDFile {
  filename: string
  axialCategory?: string
  identifiedCategories?: string[]
  overarchingThemes?: string[]
  parseError?: string
}

// ── YouTube IFrame API types ───────────────────────────────────────────

export type YTPlayerState = -1 | 0 | 1 | 2 | 3 | 5

export interface YTPlayerEvent {
  target: YTPlayer
  data: YTPlayerState
}

export interface YTPlayer {
  loadVideoById(videoId: string): void
  pauseVideo(): void
  playVideo(): void
  getCurrentTime(): number
  getPlayerState(): YTPlayerState
  destroy(): void
}
