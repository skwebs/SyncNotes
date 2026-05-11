# Apps Script Context

Goal:
No manual sheet creation.

Apps Script must:

- Create Spreadsheet
- Create Sheet
- Create Headers
- Save Spreadsheet ID
- Safe rerun support

Required Function:
setupProject()

Spreadsheet Name:
Student Notes DB

Sheet Name:
notes

Columns:
id
title
subject
description
created_at
updated_at

Store Spreadsheet ID:
Script Properties

Required Files:
- code.gs
- setup.gs
- database.gs
- notes.gs
- helpers.gs