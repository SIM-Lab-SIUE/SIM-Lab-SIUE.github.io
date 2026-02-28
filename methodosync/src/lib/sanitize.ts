/**
 * Converts a human-readable category name to a valid statistical variable name:
 * lowercase, spaces/hyphens → underscores, strip non-alphanumeric,
 * prefix underscore if starts with digit.
 */
export function sanitizeVariableName(name: string): string {
  let result = name
    .trim()
    .toLowerCase()
    .replace(/[\s\-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')

  if (/^\d/.test(result)) {
    result = '_' + result
  }

  return result || 'variable'
}
