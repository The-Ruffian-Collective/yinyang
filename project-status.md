# YinYang Dashboard — Project Status

> Read `plan.md` for the full roadmap. This file tracks current state and progress.

---

## Active Step: Step 1 — Design System & UI Polish

---

## Module Inventory (Current State)

| Module | File | What it does | Known rough edges |
|---|---|---|---|
| Theme Toggle | `src/js/modules/theme.js` | Dark/light mode, persists to localStorage, system pref detection, keyboard (Space/Enter) | None — solid |
| Tab Navigation | `src/js/modules/tabs.js` | Switches 5 tabs, persists active tab | None — solid |
| Prompt Library | `src/js/modules/prompt-library.js` | Full CRUD for prompts, search by title | No tags, copy is silent colour change only, no sort |
| Kanban Board | `src/js/modules/kanban-board.js` | 3-column drag & drop (Backlog / In Progress / Done), card counts | No priorities, no due dates, no card detail view |
| Canvas Drawing | `src/js/modules/canvas-drawing.js` | Modal-based drawing canvas, colour picker, brush size, clear/save | No export to gallery integration |
| Image Gallery | `src/js/modules/image-gallery.js` | Drag & drop upload, base64 storage, optional persistence toggle | Can hit localStorage size limits with large images |
| Portfolio | `src/js/modules/portfolio-apps.js` | Static showcase of external apps/links | Hardcoded — not user-editable |

---

## localStorage Keys

| Key | Schema | Notes |
|---|---|---|
| `prompts` | `[{id, title, content}]` | ⚠️ Schema change requires migration (Step 2) |
| `kanbanCards` | `[{id, title, description, column}]` | ⚠️ Schema change requires migration (Step 2) |
| `activeTab` | string | Safe to change |
| `theme` | `'dark'` or `'light'` | Safe |
| `galleryImages` | `[{id, src, name, size, type, timestamp}]` | Base64 encoded |
| `galleryPersist` | boolean | Safe |

---

## Step Progress

### ✅ Step 0 — Housekeeping
- [x] `plan.md` created
- [x] `project-status.md` created

### 🔄 Step 1 — Design System & UI Polish
- [x] `src/css/utilities/tokens.css` created
- [x] `src/css/main.css` updated (tokens import + global focus-visible)
- [x] `src/css/components/theme-toggle.css` refactored
- [x] `src/css/components/tabs.css` refactored
- [x] `src/css/components/prompt-library.css` refactored (incl. unified button system)
- [x] `src/css/components/kanban-board.css` refactored
- [x] `src/css/components/canvas-drawing.css` refactored
- [x] `src/css/components/image-gallery.css` refactored
- [x] `src/css/components/portfolio-apps.css` refactored
- [x] Card entrance animations added to Prompts + Kanban
- [ ] Committed and pushed

### ⬜ Step 2 — Data Portability (Export / Import / Backup)
- [ ] `src/js/utils/migrate.js` created
- [ ] `storage.js` updated with versioning
- [ ] Settings panel/modal added
- [ ] Export All Data button functional
- [ ] Import Data button functional
- [ ] Clear All Data with confirmation

### ⬜ Step 3 — Prompt Library Pro
- [ ] Tags/categories on prompts (with migration)
- [ ] Tag filter bar
- [ ] Search expanded to title + content + tags
- [ ] Copy toast notification
- [ ] Duplicate action
- [ ] Word/character count
- [ ] Sort options

### ⬜ Step 4 — Kanban Board Upgrade
- [ ] Priority levels (Low/Medium/High)
- [ ] Due dates + overdue highlighting
- [ ] Card detail modal
- [ ] Add/rename columns
- [ ] Done archive toggle
- [ ] Keyboard shortcut: `n` to add card

### ⬜ Step 5 — PWA & Progressive Enhancement
- [ ] `manifest.json`
- [ ] `sw.js` service worker
- [ ] Install App prompt
- [ ] Keyboard shortcuts panel (`?`)
- [ ] Mobile UX improvements

---

## Agent Instructions

- **Never break existing localStorage schemas** without a migration in Step 2 in place first
- No build step — open `index.html` directly in browser to test
- Always check both dark mode and light mode after CSS changes
- Branch: `claude/localstorage-compatibility-se8t3`
- After each step: update this file, commit, push, ask user for approval
