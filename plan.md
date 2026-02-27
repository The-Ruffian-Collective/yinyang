# YinYang Dashboard — Upgrade Roadmap

## App Overview

YinYang is a personal productivity dashboard. Single-page app, vanilla JS (no framework, no build step). ES6 modules. Five tabs: **Prompts**, **Projects (Kanban)**, **Canvas**, **Gallery**, **Portfolio**. All user data stored in browser localStorage. ~245KB, ~1,658 JS lines.

**Branch:** `claude/localstorage-compatibility-se8t3`
**Entry point:** `index.html`
**Styles:** `src/css/main.css` imports all component/utility CSS
**JS entry:** `src/js/main.js` imports all modules

---

## localStorage Keys (Current)

| Key | Type | Module |
|---|---|---|
| `prompts` | JSON array `{id, title, content}` | Prompt Library |
| `kanbanCards` | JSON array `{id, title, description, column}` | Kanban |
| `activeTab` | string | Tab nav |
| `theme` | string `'dark'/'light'` | Theme toggle |
| `galleryImages` | JSON array `{id, src, name, size, type, timestamp}` | Gallery |
| `galleryPersist` | boolean | Gallery |

> ⚠️ No schema versioning or migration logic exists yet. Steps 2+ must not break these schemas without a migration.

---

## The 5-Step Plan

### ✅ Step 1 — Design System & UI Polish
**Status:** Complete

Create a CSS design token foundation and raise visual quality consistently across all components.

- `src/css/utilities/tokens.css` — CSS custom properties (colours, spacing, radius, shadows, transitions)
- Refactor all component CSS to use tokens
- Unified button system (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-ghost`)
- `:focus-visible` keyboard accessibility across all interactive elements
- Improved empty states with icons and better copy
- Consistent card entrance animations across all modules

**Files:** `tokens.css` (new), `main.css`, all `src/css/components/*.css`

---

### ⬜ Step 2 — Data Portability (Export / Import / Backup)
**Status:** Pending

Give the user full control over their data.

- Export All Data → downloads single JSON file of all localStorage
- Import Data → reads JSON, validates schema, restores to localStorage
- Lightweight data versioning (`dataVersion` key in localStorage)
- Migration utility: `src/js/utils/migrate.js`
- Settings panel/modal to house controls + "Clear All Data" (with confirmation)

**Files:** `src/js/utils/storage.js`, `src/js/utils/migrate.js` (new), `index.html`, `src/js/main.js`, optionally `src/js/modules/settings.js`

> ⚠️ Must be done before any schema changes in Steps 3/4.

---

### ⬜ Step 3 — Prompt Library Pro
**Status:** Pending

- Tags/categories on each prompt (add to schema via Step 2 migration)
- Tag filter bar above prompt list
- Search expanded to title + content + tags
- Toast notification for clipboard copy
- Duplicate prompt action
- Word/character count on textarea
- Sort options: newest, oldest, alphabetical

**Files:** `src/js/modules/prompt-library.js`, `src/css/components/prompt-library.css`, `src/js/utils/storage.js`

---

### ⬜ Step 4 — Kanban Board Upgrade
**Status:** Pending

- Priority levels (Low / Medium / High) with colour-coded card indicators
- Due dates with visual overdue highlighting
- Expanded card detail modal/drawer
- Column card counts (already in HTML, needs JS wiring — partially done)
- Add/rename columns
- Done archive toggle
- Keyboard shortcut: `n` to add new card

**Files:** `src/js/modules/kanban-board.js`, `src/css/components/kanban-board.css`, `src/js/utils/storage.js`

---

### ⬜ Step 5 — PWA & Progressive Enhancement
**Status:** Pending

- `manifest.json` (name, icons, theme colour, display: standalone)
- `sw.js` service worker (cache-first for static assets)
- Register service worker in `main.js`
- "Install App" prompt UI (`beforeinstallprompt` event)
- Global keyboard shortcuts panel (`?` key)
- Mobile UX: swipe-to-switch tabs, larger touch targets, better canvas on mobile

**Files:** `manifest.json` (new), `sw.js` (new), `index.html`, `src/js/main.js`, `src/css/utilities/responsive.css`

---

## Verification Checklist (Each Step)

1. Open `index.html` directly in browser (no build step)
2. Check dark mode AND light mode
3. Check mobile viewport (375px)
4. Verify localStorage data survives page reload
5. Check browser console for errors

---

## Agent Notes

- The user has existing localStorage data (prompts, kanban cards etc.) — **never break existing schemas without a migration in place**
- No build step — changes are live immediately on file save
- Use the front-end skill for UI-heavy work where available
- After each step: update `project-status.md`, commit, push, ask user for approval before moving on
