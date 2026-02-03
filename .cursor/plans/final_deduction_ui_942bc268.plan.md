---
name: Final Deduction UI
overview: Create the final deduction UI components for file-detective, including the deduction question screen and the "Case Closed" result screen showing correct/incorrect feedback with project profile and commits earned.
todos:
  - id: deduction-screen
    content: Create DeductionScreen component with prompt, options (ink-select-input), and optional case notes reference
    status: completed
  - id: result-screen
    content: Create DeductionResultScreen component with Case Closed header, player vs actual comparison, correct/incorrect feedback, project profile box, and commits display
    status: completed
  - id: export-components
    content: Export DeductionScreen and DeductionResultScreen from src/ui/components/index.ts
    status: completed
isProject: false
---

# Final Deduction UI

## Summary

Create `src/ui/components/deduction.tsx` with two main components:

1. **DeductionScreen** - Multiple-choice project type selection with case notes reference
2. **DeductionResultScreen** - "Case Closed" feedback showing correct/incorrect status, project profile, and commits

## Dependencies

**No new dependencies needed** - the existing packages are sufficient:

- `ink-select-input` - Already installed, for option selection
- `ink-divider` - Already installed, for visual separation
- `ink` primitives - Box with borderStyle for styled containers

## Component Design

### 1. DeductionScreen

Shows the final deduction question with selectable options.

```typescript
interface DeductionScreenProps {
  prompt: string;
  options: DeductionOption[];
  caseNotes: CaseNote[];
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}
```

**Visual layout (from [GAME-VISUALS.md](context/games/todo-0-file-detective/GAME-VISUALS.md:166-185)):**

- Header: "FINAL DEDUCTION"
- Prompt text
- "PROJECT TYPE:" label
- Numbered options [1]-[N] using `ink-select-input`
- Optional: Case notes reference section (collapsed/expandable)

### 2. DeductionResultScreen

Shows the "Case Closed" result after player submits deduction.

```typescript
interface DeductionResultScreenProps {
  playerChoice: string;
  correctAnswer: string;
  projectInfo: ProjectTypeInfo;
  correct: boolean;
  commitsEarned: number;
  missedClues?: string[];
}
```

**Visual layout (from [GAME-VISUALS.md](context/games/todo-0-file-detective/GAME-VISUALS.md:188-250)):**

- Header: "CASE CLOSED" with magnifying glass icon
- Player's deduction vs actual project
- Result indicator: "CORRECT!" (green) or "Not quite..." (red)
- Divider
- If incorrect: "The clues you missed:" section with bullet points
- Project profile box showing Type, Language, Framework, Architecture
- Commits earned display (+100 for correct, +50 partial)

## Implementation Details

### Reuse existing patterns from:

- `[src/ui/components/evidence-board.tsx](src/ui/components/evidence-board.tsx)` - Box styling, useInput, SelectInput usage
- `[src/ui/components/question.tsx](src/ui/components/question.tsx)` - FeedbackDisplay pattern
- `[src/ui/theme.tsx](src/ui/theme.tsx)` - colors (primary, error, gold), symbols (success, error, star)

### Types to import from file-detective:

- `DeductionOption`, `ProjectTypeInfo`, `CaseNote` from `[src/games/file-detective/types.ts](src/games/file-detective/types.ts)`

### Project Profile Box structure:

```
PROJECT PROFILE:
  Type:        Backend REST API
  Language:    TypeScript
  Framework:   Express.js
  Architecture: MVC (if provided)
```

Use `LabeledValue` from `styled-box.tsx` for consistent key-value display.

## File Changes

### Create: `src/ui/components/deduction.tsx`

Components:

- `DeductionScreen` - The question/selection screen
- `DeductionResultScreen` - The result screen
- `ProjectProfile` (internal) - Reusable project info display

### Update: `src/ui/components/index.ts`

Add exports:

```typescript
export { DeductionScreen, DeductionResultScreen } from "./deduction.tsx";
```

## Integration Point

These components will be used by task 3.6 (Game Screen Integration) when the investigation `step` is `"deduction"`. The game screen will:

1. Show `DeductionScreen` for the question
2. After answer submission, show `DeductionResultScreen` with the result

