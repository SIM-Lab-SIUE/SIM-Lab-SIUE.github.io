import { useState } from 'react'
import { FileSpreadsheet } from 'lucide-react'
import { exportToExcel } from '../../lib/excelExporter'
import { useAppStore } from '../../store/useAppStore'

export function ExportButton() {
  const codebookRows = useAppStore((s) => s.codebookRows)
  const announce = useAppStore((s) => s.announce)
  const [isExporting, setIsExporting] = useState(false)

  async function handleExport() {
    if (codebookRows.length === 0) return
    setIsExporting(true)
    announce('Generating Excel workbook…')
    try {
      await exportToExcel(codebookRows)
      announce('Codebook exported successfully.')
    } catch (err) {
      console.error('Export error:', err)
      announce('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const disabled = codebookRows.length === 0 || isExporting

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled}
      aria-busy={isExporting}
      aria-label="Export codebook to Excel spreadsheet"
      className="btn-primary"
      style={{
        background: 'var(--rose)',
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <FileSpreadsheet size={16} aria-hidden="true" />
      {isExporting
        ? 'Generating…'
        : `Export to Excel (${codebookRows.length} row${codebookRows.length !== 1 ? 's' : ''})`}
    </button>
  )
}
