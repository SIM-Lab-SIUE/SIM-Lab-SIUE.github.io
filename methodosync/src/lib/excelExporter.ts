import ExcelJS from 'exceljs'
import type { CodebookRow } from '../types/annotation'
import { downloadBlob } from '../utils/downloadBlob'

export async function exportToExcel(rows: CodebookRow[]): Promise<void> {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'MethodoSync — SIM Lab @ SIUE'
  workbook.created = new Date()

  const sheet = workbook.addWorksheet('Codebook', {
    views: [{ state: 'frozen', ySplit: 1 }],
  })

  sheet.columns = [
    { header: 'Variable Name',                key: 'variableName',   width: 22 },
    { header: 'Variable Label',               key: 'variableLabel',  width: 30 },
    { header: 'Definition',                   key: 'definitionText', width: 38 },
    { header: 'Coding Rules — Inclusion',     key: 'inclusionRules', width: 35 },
    { header: 'Coding Rules — Exclusion',     key: 'exclusionRules', width: 35 },
    { header: 'Values / Scale',               key: 'valuesScale',    width: 28 },
    { header: 'Anchor Example',               key: 'anchorExample',  width: 40 },
  ]

  // Style header row
  const headerRow = sheet.getRow(1)
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D7377' } }
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Calibri', size: 11 }
    cell.alignment = { vertical: 'middle', wrapText: true }
    cell.border = { bottom: { style: 'medium', color: { argb: 'FF085A5E' } } }
  })
  headerRow.height = 28

  // Data rows
  rows.forEach((row, index) => {
    const dataRow = sheet.addRow({
      variableName:   row.variableName,
      variableLabel:  row.variableLabel,
      definitionText: row.definitionText,
      inclusionRules: row.inclusionRules,
      exclusionRules: row.exclusionRules,
      valuesScale:    row.valuesScale,
      anchorExample:  row.anchorExample,
    })

    const fillColor = index % 2 === 0 ? 'FFFFF4E6' : 'FFFFFFFF'
    dataRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = { vertical: 'top', wrapText: true }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fillColor } }
    })
    dataRow.height = 60
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  downloadBlob(blob, 'methodosync-codebook.xlsx')
}
