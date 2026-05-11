/**
 * Database access helpers.
 */
function getNotesSheet() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) throw new Error('Spreadsheet ID not found. Run setup first.');
  
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName('notes');
  if (!sheet) throw new Error('Sheet "notes" not found.');
  
  return sheet;
}

function getNextId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 1;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const maxId = Math.max(...ids.map(r => r[0]));
  return maxId + 1;
}
