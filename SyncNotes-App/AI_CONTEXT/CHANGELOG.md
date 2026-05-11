# Changelog

## 2026-05-10
### Changed
- Refactored API configuration to use `EXPO_PUBLIC_API_URL` environment variable.
- Updated `services/api.ts` with fallback error handling for missing environment variables.

### Added
- Integrated Google Apps Script API with React Native.
- Implemented `notesApi` service and TanStack Query hooks.
- Developed Home screen with Notes List, Pull-to-Refresh, and Search.
- Implemented real-time search filtering by title and subject.
- Developed Add Note screen with form validation.
- Developed Note Details screen with delete functionality.
- Developed Edit Note screen for existing notes.
- Added loading indicators and error handling for all screens.
- Migrated project to Expo SDK 55 (latest stable).
- Performed light verification of core flows and compatibility.
- Completed final QA of navigation, search, and data flows.
- Added support for existing Spreadsheet ID in `setupProject()`.
- Enhanced Add/Update UX with mutation-aware loading states.
- Configured Android build for ARM64-v8a target only.
- Added `build:arm64` npm script for optimized APK generation.
- Optimized Android keyboard UX with `KeyboardAvoidingView` and input navigation (Next/Done).
- Renamed application to "Sync Notes" and updated branding.
- Optimized Android build to target only ARM64-v8a (No universal APK).
- Enhanced mutation UX by disabling inputs and actions during active data operations.
- Removed deprecated `blurOnSubmit` API in favor of modern focus management.
- Implemented `react-native-keyboard-aware-scroll-view` for smooth Android keyboard management.
- **Lesson Learned:** Fixed keyboard auto-scroll issue on Android by explicitly enabling `enableAutomaticScroll={true}` and configuring `keyboardOpeningTime={0}` with `extraScrollHeight={100}`. These props were found to be essential for reliable scrolling to the Save button on real Android devices.
- Verified ARM64-specific build script.

### Fixed
- Resolved dependency conflicts during SDK 55 migration using `--legacy-peer-deps`.

### Completed
- Project planning and architecture setup.
