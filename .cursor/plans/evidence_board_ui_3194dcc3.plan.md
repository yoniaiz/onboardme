---
name: Evidence Board UI
overview: Create the Evidence Board and Case Notes UI components for the file-detective game, enabling players to select evidence categories, view investigation progress, and see accumulated findings.
todos:
  - id: add-dependencies
    content: Add ink-select-input and ink-divider dependencies
    status: pending
  - id: evidence-board
    content: Create evidence-board.tsx with category selection using ink-select-input, status display, and keyboard navigation
    status: pending
  - id: case-notes
    content: Create case-notes.tsx for displaying accumulated findings
    status: pending
  - id: export-components
    content: Export new components from src/ui/components/index.ts
    status: pending
isProject: false
---

# Evidence Board UI Component

## Summary

Implement two React/Ink components for the file-detective investigation UI:

1. **EvidenceBoard** - Main component for selecting evidence categories
2. **CaseNotes** - Display of accumulated findings

## Dependencies to Add

```bash
bun add ink-select-input ink-divider
```

- **ink-select-input** - For keyboard-navigable category selection with arrow keys
- **ink-divider** - For visual separation between evidence list and case notes

## Files to Create

### 1. `src/ui/components/evidence-board.tsx`

Main evidence board component that displays:

- Header with "EVIDENCE BOARD" title and progress counter (e.g., "Case Progress: 3/5")
- Five selectable evidence categories with:
  - Number key [1]-[5] for selection
  - Category icon (using emojis from mockups)
  - Title and description
  - Status indicator: `✓ EXAMINED` (green) vs `○ Not examined` (muted)
- Case notes section (using `CaseNotes` component)
- Deduction option `[D] Ready to make final deduction`
- Keyboard input handling via `useInput`

**Props interface:**

```typescript
interface EvidenceBoardProps {
  categories: EvidenceCategory[];
  examinedCategories: EvidenceCategoryId[];
  caseNotes: CaseNote[];
  onSelectCategory: (categoryId: EvidenceCategoryId) => void;
  onStartDeduction: () => void;
  disabled?: boolean;
}
```

**Key implementation details:**

- Use `useTheme()` for colors/symbols
- Use `ink-select-input` for category selection with arrow key navigation
- Use `ink-divider` to separate sections (evidence list, case notes, deduction)
- Custom item rendering to show:
  - Number prefix [1]-[5]
  - Category icon
  - Title and status (examined/not examined)
- Filter out examined categories from selectable items
- Add deduction option [D] as a special item at the end

### 2. `src/ui/components/case-notes.tsx`

Simple component for displaying accumulated case notes:

```typescript
interface CaseNotesProps {
  notes: CaseNote[];
}
```

**Display:**

- Header "CASE NOTES"
- Empty state: "• (none yet)" in muted text
- List of notes with bullet points
- Compact format for space efficiency

### 3. Update `src/ui/components/index.ts`

Export new components:

```typescript
export { EvidenceBoard } from "./evidence-board.tsx";
export { CaseNotes } from "./case-notes.tsx";
```

## Visual Layout (from GAME-VISUALS.md)

```
┌────────────────────────────────────────────────────┐
│  EVIDENCE BOARD                  Case Progress: 3/5│
│                                                    │
│  [1] Root Files          ✓ EXAMINED                │
│  [2] Folder Structure    ✓ EXAMINED                │
│  [3] Dependencies        ✓ EXAMINED                │
│❯ [4] Scripts             ○ Not examined            │  <- ink-select-input cursor
│  [5] Config Files        ○ Not examined            │
│                                                    │
│  ─────────────────────────────────────────────     │  <- ink-divider
│                                                    │
│  CASE NOTES:                                       │
│  • Node.js + TypeScript                            │
│  • Has src/routes/, src/controllers/               │
│  • Dependencies: express, prisma                   │
│                                                    │
│  ─────────────────────────────────────────────     │  <- ink-divider
│                                                    │
│❯ [D] Ready to make final deduction                 │
└────────────────────────────────────────────────────┘
```

The `ink-select-input` provides the `❯` cursor indicator for the currently highlighted option.

## Category Icon Mapping


| Category         | Symbol               |
| ---------------- | -------------------- |
| root-files       | folder icon          |
| folder-structure | directory icon       |
| dependencies     | package icon         |
| scripts          | scroll/document icon |
| config-files     | gear/wrench icon     |


## Keyboard Navigation

Using `ink-select-input`:

- Arrow keys (up/down): Navigate between options
- Enter: Select the highlighted option
- Options include unexamined categories + deduction option
- Examined categories are shown but not selectable (visual distinction only)
- Disabled when `disabled` prop is true (during feedback state)

## Integration Point

These components will be used by task 3.6 (Game Screen Integration) to render the evidence board when the game is in the "select" step of investigation.

## Design Patterns to Follow

- Use existing `RoundedBox` for the main container
- Use `useTheme()` for all colors (primary, muted, text, gold)
- Use theme symbols (success ✓, emptyCircle ○, bullet •)
- Use `ink-select-input` for accessible keyboard navigation
- Use `ink-divider` for visual section separation
- Follow existing component structure from `question.tsx` and `styled-box.tsx`

## ink-select-input Usage

```typescript
import SelectInput from "ink-select-input";

// Custom item component for rich rendering
const items = categories
  .filter(c => !examinedCategories.includes(c.id))
  .map((c, i) => ({
    label: `[${i + 1}] ${getIcon(c.id)} ${c.title}`,
    value: c.id,
  }));

// Add deduction option
items.push({ label: "[D] Ready to make final deduction", value: "deduction" });

<SelectInput items={items} onSelect={handleSelect} />
```

## ink-divider Usage

```typescript
import Divider from "ink-divider";

<Divider />  // Simple horizontal line
```

