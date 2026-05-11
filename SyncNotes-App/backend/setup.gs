/**
 * Initial setup for the project.
 * Supports existing Spreadsheet ID via manual entry in Script Properties or parameter.
 */
function setupProject(existingId) {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = existingId || props.getProperty('SPREADSHEET_ID');
  let ss;

  if (spreadsheetId) {
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
      props.setProperty('SPREADSHEET_ID', spreadsheetId);
    } catch (e) {
      console.log('Provided Spreadsheet ID is invalid or inaccessible.');
    }
  }

  // If still no spreadsheet and no ID provided, only then create a new one
  if (!ss && !existingId) {
    ss = SpreadsheetApp.create('Student Notes DB');
    spreadsheetId = ss.getId();
    props.setProperty('SPREADSHEET_ID', spreadsheetId);
    console.log('Created new Spreadsheet with ID: ' + spreadsheetId);
  }

  if (!ss) {
    return {
      success: false,
      message: 'No valid Spreadsheet ID found or provided.'
    };
  }

  let sheet = ss.getSheetByName('notes');
  if (!sheet) {
    sheet = ss.insertSheet('notes');
    console.log('Created "notes" sheet.');
  }

  const headers = ['id', 'title', 'subject', 'description', 'created_at', 'updated_at'];
  const currentHeaders = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, headers.length).getValues()[0] : [];
  
  if (JSON.stringify(currentHeaders) !== JSON.stringify(headers)) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    console.log('Headers initialized.');
  }

  return {
    success: true,
    spreadsheetId: spreadsheetId,
    message: 'Project setup successfully using ID: ' + spreadsheetId
  };
}
