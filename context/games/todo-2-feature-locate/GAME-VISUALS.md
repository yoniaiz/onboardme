# TODO #2: feature --locate - Visuals

## Visual Design Notes

This game is about planning where new code belongs. Visual elements should emphasize:

- **Blueprint/planning aesthetic** - architectural feel
- **Exploration encouragement** - discovery-oriented
- **Flexible validation** - multiple right answers possible
- **Pattern recognition** - highlighting existing conventions

## Screen Mockups

### Phase 1: Feature Request

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                           FEATURE PLAN    │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 INCOMING FEATURE REQUEST                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  From: Product Team                                         │
│  Priority: Medium                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  "Add CSV export functionality for user reports"    │   │
│  │                                                     │   │
│  │  Users should be able to download their activity    │   │
│  │  reports as CSV files from the reports page.        │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Before you write any code, you need to figure out          │
│  WHERE it should live.                                      │
│                                                             │
│  [Press ENTER to start planning]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: Planning Mode

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                              PLANNING     │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  Feature: "CSV export for user reports"                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍 EXPLORATION GUIDE                               │   │
│  │                                                     │   │
│  │  Questions to consider:                             │   │
│  │  • Is there existing export/download functionality? │   │
│  │  • Where do similar features live in this codebase? │   │
│  │  • What layers need new code?                       │   │
│  │    - Route/endpoint for the API                     │   │
│  │    - Service for the business logic                 │   │
│  │    - UI component for the download button           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Mark 2-4 locations where you'd add code:                   │
│                                                             │
│    // ONBOARD:FEATURE csv-export                            │
│                                                             │
│  Take your time exploring. No timer on this one.            │
│                                                             │
│  [Press ENTER when done marking]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Validation - Good Result

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                            PLAN REVIEW    │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📍 YOUR IMPLEMENTATION PLAN                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Found 3 markers:                                           │
│                                                             │
│  ✓ src/services/export.service.ts:12                        │
│  │ Excellent! Following existing export pattern.            │
│  │ This file already has PDF export - CSV fits here.        │
│  │                                                          │
│  ✓ src/routes/reports.ts:45                                 │
│  │ Correct! Report-related endpoints live here.             │
│  │ New endpoint: GET /api/reports/:id/csv                   │
│  │                                                          │
│  ✓ src/components/reports/ReportActions.tsx:23              │
│  │ Good thinking! This is where download buttons go.        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🎯 Score: 3/3 - Excellent architectural thinking!          │
│                                                             │
│  You identified all the layers that need changes.           │
│                                                             │
│  Cleaning up markers... done.                               │
│                                                             │
│  +50 commits                                                │
│                                                             │
│  [ENTER to continue]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Validation - Partial Result

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                            PLAN REVIEW    │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  Found 2 markers:                                           │
│                                                             │
│  ✓ src/routes/reports.ts:45                                 │
│  │ Correct! This is where the endpoint should go.           │
│  │                                                          │
│  ✗ src/utils/helpers.ts:10                                  │
│  │ Not quite. Utils are for generic helpers.                │
│  │ Export logic is business logic - belongs in services.    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🤔 Score: 1/2 - Partial understanding                      │
│                                                             │
│  You missed:                                                │
│  • Service layer - Check src/services/ for existing         │
│    export patterns (hint: pdf-export.service.ts)            │
│  • UI layer - Where would the download button go?           │
│                                                             │
│  Cleaning up markers... done.                               │
│                                                             │
│  +25 commits                                                │
│                                                             │
│  [ENTER to continue]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Validation - Wrong Approach

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                            PLAN REVIEW    │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  Found 2 markers:                                           │
│                                                             │
│  ✗ src/models/User.ts:30                                    │
│  │ Models define data structure, not functionality.         │
│  │ Export logic doesn't belong here.                        │
│  │                                                          │
│  ✗ package.json:15                                          │
│  │ This is for dependencies, not feature code.              │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  💡 Let's think about this differently:                     │
│                                                             │
│  For a feature like CSV export, consider:                   │
│                                                             │
│  1. SERVICE LAYER - Where business logic lives              │
│     Look for: src/services/ or similar                      │
│     Find existing: Is there already an export feature?      │
│                                                             │
│  2. ROUTE LAYER - Where API endpoints are defined           │
│     Look for: src/routes/ or src/api/                       │
│                                                             │
│  3. UI LAYER - Where user interactions happen               │
│     Look for: src/components/ related to reports            │
│                                                             │
│  Cleaning up markers... done.                               │
│                                                             │
│  +10 commits (for trying!)                                  │
│                                                             │
│  [ENTER to continue]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Summary Screen

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                              COMPLETE     │
│  ═══════════════════════════════════════════════════════════│
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📐 ARCHITECTURAL INSIGHT GAINED                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  You learned about this codebase's organization:            │
│                                                             │
│  • Services live in: src/services/                          │
│  • Routes live in: src/routes/                              │
│  • UI components in: src/components/                        │
│  • Existing pattern: pdf-export.service.ts                  │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  💡 PRO TIP                                                 │
│                                                             │
│  When adding a new feature, always look for similar         │
│  existing features first. Following established patterns    │
│  makes code reviews easier and keeps the codebase           │
│  consistent.                                                │
│                                                             │
│  [ENTER to see Monster reaction]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Visual Guidelines

- Blueprint/architectural aesthetic (planning feel)
- No timer - encourage thoughtful exploration
- Clear feedback on each marked location
- Educational tone when wrong (teach, don't punish)
- Show what patterns exist for future reference
