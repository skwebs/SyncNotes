# Project Context

Project:
Student Notes

Purpose:
Learning project for:

- Expo SDK 55
- Expo Router
- TypeScript
- TanStack Query
- Google Apps Script
- Google Sheets
- CRUD Architecture

Main Features:
- Notes CRUD
- Search
- Pull to refresh

Backend:
Google Apps Script + Google Sheets

Target:
Android first

## Coding Rules
- Project is Android-first. Prefer Android behavior and latest non-deprecated APIs.
- Prefer minimal solutions for UI issues, but ensure reliability. For example, `KeyboardAwareScrollView` requires `enableAutomaticScroll={true}`, `keyboardOpeningTime={0}`, and `extraScrollHeight={100}` for consistent behavior on Android.
- Avoid over-engineering fixes; identify and address the root cause directly.