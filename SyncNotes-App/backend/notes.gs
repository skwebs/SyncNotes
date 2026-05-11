/**
 * CRUD operations for notes.
 */

function getNotes() {
  try {
    const sheet = getNotesSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    const data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
    return data.map(row => ({
      id: row[0],
      title: row[1],
      subject: row[2],
      description: row[3],
      created_at: row[4],
      updated_at: row[5]
    }));
  } catch (e) {
    return { error: e.message };
  }
}

function addNote(note) {
  try {
    const sheet = getNotesSheet();
    const id = getNextId(sheet);
    const now = new Date();
    
    sheet.appendRow([
      id,
      note.title,
      note.subject,
      note.description,
      now,
      now
    ]);
    
    return { success: true, id: id };
  } catch (e) {
    return { error: e.message };
  }
}

function updateNote(note) {
  try {
    const sheet = getNotesSheet();
    const lastRow = sheet.getLastRow();
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    const rowIndex = ids.findIndex(r => r[0] == note.id);
    
    if (rowIndex === -1) throw new Error('Note not found');
    
    const actualRow = rowIndex + 2;
    const now = new Date();
    
    sheet.getRange(actualRow, 2, 1, 3).setValues([[note.title, note.subject, note.description]]);
    sheet.getRange(actualRow, 6).setValue(now);
    
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
}

function deleteNote(id) {
  try {
    const sheet = getNotesSheet();
    const lastRow = sheet.getLastRow();
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    const rowIndex = ids.findIndex(r => r[0] == id);
    
    if (rowIndex === -1) throw new Error('Note not found');
    
    sheet.deleteRow(rowIndex + 2);
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
}
