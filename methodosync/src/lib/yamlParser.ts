import yaml from 'js-yaml'
import type { ParsedMDFile } from '../types/annotation'

/**
 * Extracts YAML frontmatter from a Markdown string and parses it.
 * Handles both \r\n and \n line endings.
 * Returns a ParsedMDFile; on any failure, sets parseError.
 */
export function parseMDContent(filename: string, content: string): ParsedMDFile {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!match) {
    return {
      filename,
      parseError:
        'No YAML frontmatter found. Ensure the file begins with --- on the first line.',
    }
  }

  const rawYaml = match[1]

  try {
    const parsed = yaml.load(rawYaml)

    if (!parsed || typeof parsed !== 'object') {
      return {
        filename,
        parseError: 'Frontmatter did not parse to a valid object.',
      }
    }

    const data = parsed as Record<string, unknown>

    // Support single axial_category string (Phase 1 output)
    const axialCategory =
      typeof data['axial_category'] === 'string'
        ? data['axial_category'].replace(/^\[\[|\]\]$/g, '').trim()
        : undefined

    // Support array of identified_categories (Bridge template / Phase 2 input)
    const identifiedCategories = Array.isArray(data['identified_categories'])
      ? (data['identified_categories'] as unknown[])
          .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
      : undefined

    const overarchingThemes = Array.isArray(data['overarching_themes'])
      ? (data['overarching_themes'] as unknown[])
          .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
      : undefined

    return { filename, axialCategory, identifiedCategories, overarchingThemes }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown YAML parse error.'
    return { filename, parseError: `YAML parse error: ${message}` }
  }
}

/**
 * Reads a File object and calls parseMDContent.
 */
export function parseFileObject(file: File): Promise<ParsedMDFile> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = (e.target?.result as string) ?? ''
      resolve(parseMDContent(file.name, content))
    }
    reader.onerror = () => {
      resolve({ filename: file.name, parseError: 'File could not be read.' })
    }
    reader.readAsText(file, 'utf-8')
  })
}
