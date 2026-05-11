/**
 * Main entry point for GET requests.
 */
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'setup') {
    return createResponse(setupProject(e.parameter.spreadsheetId));
  }
  
  if (action === 'getNotes') {
    return createResponse(getNotes());
  }

  return createResponse({ error: 'Invalid action' }, 400);
}

/**
 * Main entry point for POST requests.
 */
function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  if (action === 'addNote') {
    return createResponse(addNote(data));
  }
  
  if (action === 'updateNote') {
    return createResponse(updateNote(data));
  }
  
  if (action === 'deleteNote') {
    return createResponse(deleteNote(data.id));
  }

  return createResponse({ error: 'Invalid action' }, 400);
}

/**
 * Creates a JSON response.
 */
function createResponse(data, status = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
