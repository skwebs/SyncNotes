# Folder Structure - Sync Notes Web

```
SyncNotes-Web/
├── app/                    # Next.js App Router pages
│   ├── notes/
│   │   ├── [id]/           # View Note page
│   │   ├── add/            # Add Note page
│   │   └── edit/           # Edit Note page
│   ├── favicon.ico
│   ├── globals.css         # Tailwind directives & global styles
│   ├── layout.tsx          # Root layout & Providers wrap
│   └── page.tsx            # Home page (Notes List)
├── components/             # Reusable UI components
│   └── Providers.tsx       # QueryClientProvider
├── hooks/                  # Custom React hooks
│   └── useNotes.ts         # TanStack Query hooks
├── services/               # API service layer
│   └── api.ts              # Axios instance & endpoints
├── types/                  # TypeScript definitions
│   └── index.ts
├── public/                 # Static assets
├── AI_CONTEXT/             # Documentation for AI
├── .env.local              # Local environment variables
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```
