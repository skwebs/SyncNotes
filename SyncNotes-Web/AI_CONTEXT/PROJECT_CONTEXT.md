# Project Context - Sync Notes Web

## Overview
Sync Notes Web is the web-based counterpart to the Sync Notes mobile app. It provides a seamless interface for managing notes that are stored in a Google Sheet via a Google Apps Script backend.

## Key Differences from Mobile App
- **Layout:** Uses a responsive grid layout that adapts from a single column on mobile to multiple columns on larger screens.
- **Navigation:** Uses Next.js App Router instead of Expo Router.
- **Styling:** Uses Tailwind CSS 4 for a utility-first styling approach, whereas the mobile app uses React Native's StyleSheet.
- **Icons:** Uses `lucide-react` instead of Expo's icon sets.

## Architecture
- **App Router:** `app/` directory for file-based routing.
- **Services:** `services/api.ts` for direct axios calls.
- **Hooks:** `hooks/useNotes.ts` for TanStack Query mutations and queries.
- **Types:** `types/index.ts` for shared TypeScript interfaces.
- **Components:** `components/Providers.tsx` for context providers.

## Backend
The app communicates with a Google Apps Script Web App. The URL is stored in `NEXT_PUBLIC_API_URL`.
The backend handles CRUD operations on a Google Sheet named "SyncNotes_Database".
