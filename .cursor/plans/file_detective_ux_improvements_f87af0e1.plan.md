---
name: File Detective UX Improvements
overview: Fix UX issues in the File Detective game including control hints, gated deduction, AI-generated insights for correct answers, and implementing missing features from the design spec.
todos:
  - id: types-update
    content: Add insight and missedClues fields to types.ts
    status: completed
  - id: schema-update
    content: Update prepared-schema.ts Zod schema for new fields
    status: completed
  - id: evidence-board-fixes
    content: Fix control hints, add descriptions, gate deduction, add examine prompt
    status: completed
  - id: ai-insights
    content: Pass and display insight in AnswerFeedbackScreen
    status: completed
  - id: briefing-screen
    content: Add case briefing step and screen
    status: completed
  - id: wrong-deduction-hints
    content: Show missed clues in DeductionResultScreen for wrong answers
    status: completed
  - id: update-tests
    content: Update E2E tests and config for new flow
    status: completed
isProject: false
---

# File Detective UX Improvements

## Summary of Changes

Fix 9 UX issues to bring the game up to top-tier gaming experience standards:

- Fix incorrect control hints
- Gate deduction until all evidence collected
- Add AI-generated insights for correct answers
- Implement missing features from design spec (case briefing, evidence descriptions, wrong deduction hints)

---

## 1. Fix Control Hints (Bug)

**File:** `[src/ui/components/evidence-board.tsx](src/ui/components/evidence-board.tsx)`

Current text says "Press 1-5 to examine evidence" but the UI uses arrow navigation via `SelectInput`.

**Fix:** Update hint to match actual controls:

```typescript
// Current (line 152-154):
<Text color={colors.muted}>
  Press 1-{categories.length} to examine evidence, D for deduction
</Text>

// Updated:
<Text color={colors.muted}>
  Use arrows + Enter to select, or press 1-{categories.length} / D
</Text>
```

---

## 2. Gate Deduction Until All Evidence Collected

**File:** `[src/ui/components/evidence-board.tsx](src/ui/components/evidence-board.tsx)`

Only show "Ready to make final deduction" option when all 5 categories are examined.

**Changes:**

- Conditionally add the deduction item to `selectableItems` only when `examinedCount === totalCount`
- Update the `useInput` handler to ignore "D" key when not all evidence collected
- Add visual indicator showing remaining evidence count

---

## 3. Add AI Insights for Correct Answers

**File:** `[src/games/file-detective/types.ts](src/games/file-detective/types.ts)`

Add `insight` field to `EvidenceQuestion`:

```typescript
export interface EvidenceQuestion {
  id: string;
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  insight?: string; // NEW: AI-generated explanation shown on correct answer
}
```

**File:** `[src/games/file-detective/screens.tsx](src/games/file-detective/screens.tsx)`

Update `AnswerFeedbackScreen` to display the insight:

```typescript
interface AnswerFeedbackScreenProps {
  result: AnswerResult;
  insight?: string; // NEW
  onContinue: () => void;
}
```

**File:** `[src/games/file-detective/component.tsx](src/games/file-detective/component.tsx)`

Pass the current question's insight to the feedback screen.

**File:** `[src/games/file-detective/prepared-schema.ts](src/games/file-detective/prepared-schema.ts)`

Update the Zod schema to include optional `insight` field so AI can generate it.

---

## 4. Add Case Briefing Screen (Missing Feature)

**New step in game flow:** Before showing evidence board, show a case briefing.

**File:** `[src/games/file-detective/state.ts](src/games/file-detective/state.ts)`

Add `briefing` step:

```typescript
export type InvestigationStep =
  | "briefing"
  | "select"
  | "evidence"
  | "deduction";
```

**File:** `[src/games/file-detective/ui.tsx](src/games/file-detective/ui.tsx)`

Add case briefing screen rendering when `state.step === "briefing"`.

**New component:** `CaseBriefing` - Shows mission intro, press Enter to begin.

---

## 5. Add Evidence Descriptions (Missing Feature)

**File:** `[src/ui/components/evidence-board.tsx](src/ui/components/evidence-board.tsx)`

Currently only shows titles. Add descriptions next to each category:

```
[1] Root Files          Config files in the project root
[2] Folder Structure    How the project is organized
```

The `EvidenceCategory` type already has a `description` field - just need to render it.

---

## 6. Add "Clues You Missed" for Wrong Deduction (Missing Feature)

**File:** `[src/games/file-detective/types.ts](src/games/file-detective/types.ts)`

Add `missedClues` field to `DeductionOption`:

```typescript
export interface DeductionOption {
  id: string;
  label: string;
  matches: ProjectTypeInfo;
  missedClues?: string[]; // NEW: hints shown when player picks this incorrectly
}
```

**File:** `[src/ui/components/deduction.tsx](src/ui/components/deduction.tsx)`

Update `DeductionResultScreen` to show missed clues when incorrect.

---

## 7. Add "What would you like to examine?" Prompt (Polish)

**File:** `[src/ui/components/evidence-board.tsx](src/ui/components/evidence-board.tsx)`

Add the prompt text above the category list as shown in mockups.

---

## 8. Update E2E Tests

**File:** `[tests/e2e/file-detective.e2e.test.ts](tests/e2e/file-detective.e2e.test.ts)`

Update tests to:

- Account for new case briefing screen (press Enter to start)
- Complete all evidence before attempting deduction (since it's now gated)

**File:** `[tests/e2e/configs/file-detective.ts](tests/e2e/configs/file-detective.ts)`

Add `insight` fields to test config questions.

---

## Implementation Order

1. **Types first** - Add new fields to `EvidenceQuestion` and `DeductionOption`
2. **Schema update** - Update prepared-schema.ts for AI generation
3. **UI fixes** - Control hints, evidence descriptions, examine prompt
4. **Gated deduction** - Hide until all evidence collected
5. **AI insights** - Show insight in feedback screen
6. **Case briefing** - Add new introductory step
7. **Wrong deduction hints** - Show missed clues
8. **Tests** - Update E2E tests for new flow

---

## Files to Modify

| File                                          | Changes                                     |
| --------------------------------------------- | ------------------------------------------- |
| `src/games/file-detective/types.ts`           | Add `insight` and `missedClues` fields      |
| `src/games/file-detective/state.ts`           | Add `briefing` step                         |
| `src/games/file-detective/reducer.ts`         | Handle `briefing` -> `select` transition    |
| `src/games/file-detective/prepared-schema.ts` | Update schema for new fields                |
| `src/games/file-detective/screens.tsx`        | Display insight in feedback                 |
| `src/games/file-detective/ui.tsx`             | Add briefing screen                         |
| `src/games/file-detective/component.tsx`      | Pass insight to feedback, handle briefing   |
| `src/ui/components/evidence-board.tsx`        | Fix hints, gate deduction, add descriptions |
| `src/ui/components/deduction.tsx`             | Show missed clues on wrong answer           |
| `tests/e2e/file-detective.e2e.test.ts`        | Update for new flow                         |
| `tests/e2e/configs/file-detective.ts`         | Add test data for new fields                |
