---
name: Investigation Flow Logic
overview: Expose the FileDetective investigation state to the UI by adding public getters and a typed investigation state interface. The core state machine logic already exists but is private.
todos:
  - id: add-types
    content: Add InvestigationStep and InvestigationState types to types.ts
    status: completed
  - id: add-getter
    content: Add getInvestigationState() public method to FileDetective class
    status: completed
  - id: verify
    content: Run typecheck and tests to verify changes
    status: completed
isProject: false
---

# Investigation Flow Logic (Task 3.3)

## Current State

The investigation state machine is already implemented in `[src/games/file-detective/index.ts](src/games/file-detective/index.ts)`:

- Step tracking: `select` | `evidence` | `deduction`
- `handleSelect()` / `handleEvidence()` / `handleDeduction()` dispatch
- Case notes accumulation in `this.caseNotes`
- Examined tracking in `this.examined` Set
- Question building per step

**Problem**: All state is private with no public getters. The UI (task 3.4) cannot access:

- Current step
- Examined categories
- Case notes
- Current category being examined

## Changes

### 1. Add InvestigationState type to `[src/games/file-detective/types.ts](src/games/file-detective/types.ts)`

```typescript
export type InvestigationStep = "select" | "evidence" | "deduction";

export interface InvestigationState {
  step: InvestigationStep;
  examinedCategories: EvidenceCategoryId[];
  caseNotes: CaseNote[];
  currentCategoryId: EvidenceCategoryId | null;
  totalCategories: number;
}
```

### 2. Add public getter to `[src/games/file-detective/index.ts](src/games/file-detective/index.ts)`

```typescript
getInvestigationState(): InvestigationState {
  return {
    step: this.step,
    examinedCategories: Array.from(this.examined),
    caseNotes: [...this.caseNotes],
    currentCategoryId: this.currentCategory?.id ?? null,
    totalCategories: this.config.evidence.length,
  };
}
```

### 3. Enhance feedback messages

Update `handleEvidence()` result feedback to include the case note added, enabling the UI to show "Case Notes Updated" with context.

## Acceptance Criteria Verification


| Criteria                              | Status | Implementation                               |
| ------------------------------------- | ------ | -------------------------------------------- |
| Player can select evidence category   | Done   | `handleSelect()` + `buildSelectQuestion()`   |
| Questions presented based on category | Done   | `buildEvidenceQuestion()`                    |
| Answers update case notes             | Done   | `handleEvidence()` line 78-82                |
| Track examined vs unexamined          | Done   | `this.examined` Set                          |
| Transition to deduction when ready    | Done   | Auto when all examined, or manual via option |


## Files to Modify

- `[src/games/file-detective/types.ts](src/games/file-detective/types.ts)` - Add `InvestigationStep` and `InvestigationState` types
- `[src/games/file-detective/index.ts](src/games/file-detective/index.ts)` - Add `getInvestigationState()` public method

