import type { Annotation } from '../types/annotation'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function cleanCategory(raw: string): string {
  return raw.replace(/^\[\[|\]\]$/g, '').trim()
}

/**
 * Compiles ALL annotations for a single video session into one Markdown file.
 *
 * Structure:
 *  - Single YAML frontmatter with video metadata + aggregate tag lists
 *  - Each annotation as a ## heading section (timestamp as subtitle)
 *  - Separated by --- dividers
 *
 * This is intentionally a single file so the student only ever downloads
 * one .md file per video coding session, ready for their Obsidian vault.
 */
export function buildSessionMarkdown(videoId: string, annotations: Annotation[]): string {
  if (annotations.length === 0) return ''

  // Aggregate all open codes (deduplicated, preserving first-seen order)
  const allCodes: string[] = []
  const seenCodes = new Set<string>()
  annotations.forEach((a) => {
    a.openCodes.forEach((c) => {
      if (!seenCodes.has(c)) { seenCodes.add(c); allCodes.push(c) }
    })
  })

  // Aggregate all axial categories (deduplicated)
  const allCategories: string[] = []
  const seenCats = new Set<string>()
  annotations.forEach((a) => {
    const cat = cleanCategory(a.axialCategory)
    if (cat && !seenCats.has(cat)) { seenCats.add(cat); allCategories.push(cat) }
  })

  const codedDate = new Date().toISOString().slice(0, 10)

  // YAML frontmatter — one block for the whole file
  const codesYaml = allCodes.length > 0
    ? allCodes.map((c) => `  - ${c}`).join('\n')
    : '  []'

  const catsYaml = allCategories.length > 0
    ? allCategories.map((c) => `  - "[[${c}]]"`).join('\n')
    : '  []'

  const frontmatter = `---
video_id: ${videoId}
coded_date: ${codedDate}
total_annotations: ${annotations.length}
open_codes:
${codesYaml}
axial_categories:
${catsYaml}
---`

  // Body — one section per annotation
  const sections = annotations.map((a, i) => {
    const blockquote = a.observationText
      ? '> ' + a.observationText.replace(/\n/g, '\n> ')
      : '> *No observation recorded.*'

    const codesPills = a.openCodes.length > 0
      ? a.openCodes.map((c) => `\`${c}\``).join('  ')
      : '*none*'

    const cat = cleanCategory(a.axialCategory)
    const catLine = cat ? `**Axial Category:** [[${cat}]]` : ''

    const memo = a.analyticalMemo ? `\n\n${a.analyticalMemo}` : ''

    return [
      `## Annotation ${i + 1} — ${formatTime(a.timestamp)}`,
      '',
      blockquote,
      '',
      `**Open Codes:** ${codesPills}`,
      catLine,
      memo,
    ].filter((line) => line !== undefined).join('\n').trimEnd()
  })

  return `${frontmatter}\n\n${sections.join('\n\n---\n\n')}`
}
