# Folder Structure

app/
components/
hooks/
services/
types/
constants/
utils/

Example:

app/
├── _layout.tsx
├── index.tsx
├── notes/
│   ├── index.tsx
│   ├── add.tsx
│   └── [id].tsx

components/
├── AppButton.tsx
├── AppInput.tsx
├── Loader.tsx
└── NoteCard.tsx

hooks/
├── useNotes.ts
├── useCreateNote.ts

services/
├── api.ts
└── notes.ts