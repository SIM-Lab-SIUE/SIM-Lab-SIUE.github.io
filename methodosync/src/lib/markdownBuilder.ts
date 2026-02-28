import type { Annotation } from '../types/annotation'

/**
 * Compiles an Annotation into a YAML-frontmatter Markdown string
 * formatted for Obsidian ingestion.
 */
export function buildAnnotationMarkdown(annotation: Annotation): string {
  const { videoId, timestamp, openCodes, axialCategory, observationText, analyticalMemo } = annotation

  // YAML sequence format for open_codes
  const openCodesYaml =
    openCodes.length > 0
      ? openCodes.map((code) => `  - ${code}`).join('\n')
      : '  []'

  // Strip existing wiki-link brackets to avoid double-wrapping
  const cleanCategory = axialCategory.replace(/^\[\[|\]\]$/g, '')
  const axialYaml = cleanCategory ? `"[[${cleanCategory}]]"` : '""'

  const frontmatter = `---
video_id: ${videoId}
timestamp: ${timestamp.toFixed(1)}
open_codes:
${openCodesYaml}
axial_category: ${axialYaml}
---`

  // Format observation as Markdown blockquote
  const blockquote = observationText
    ? '> ' + observationText.replace(/\n/g, '\n> ')
    : '> *No observation recorded.*'

  const body = analyticalMemo
    ? `${blockquote}\n\n${analyticalMemo}`
    : blockquote

  return `${frontmatter}\n\n${body}`
}
