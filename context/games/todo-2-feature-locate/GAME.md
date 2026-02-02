# TODO #2: feature --locate

## Game Overview

**Type:** Feature Planning (Mark & Plan)  
**Goal:** Understand where new features should be implemented  
**Level:** 2 (TODO #2)  
**Sub-task:** Second sub-task of TODO #2  
**Duration:** ~10 minutes

## Core Concept

Given a feature request, player must explore the codebase to understand existing patterns, then mark where they would add new code. This teaches architectural thinking and pattern recognition.

**Philosophy:** Before writing code, you need to know where it belongs.

## Learning Outcomes

- Recognizing code organization patterns
- Finding similar existing features to follow
- Understanding where different types of code live
- Planning feature implementation
- Architectural intuition

## Game Flow

### Phase 1: Feature Request (~1 min)

CLI presents a realistic feature request:

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                           FEATURE PLAN    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 FEATURE REQUEST                                 │   │
│  │                                                     │   │
│  │  "Add CSV export functionality for user reports"    │   │
│  │                                                     │   │
│  │  Users should be able to download their activity    │   │
│  │  reports as CSV files.                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Your task: Figure out where this feature would live.       │
│                                                             │
│  [Press ENTER to start planning]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: Exploration & Marking (~7 min)

Player explores and marks locations:

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                              PLANNING     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Feature: "CSV export for user reports"                     │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Explore the codebase and mark 2-4 locations where          │
│  you'd add code for this feature:                           │
│                                                             │
│     // ONBOARD:FEATURE csv-export                           │
│                                                             │
│  Consider:                                                  │
│  • Is there existing export/download functionality?         │
│  • Where do similar features live?                          │
│  • What layers need new code? (route, service, UI?)         │
│                                                             │
│  Mark locations in the files where you'd add new code.      │
│                                                             │
│  [Press ENTER when done marking]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Validation (~2 min)

CLI validates the marked locations:

```
┌─────────────────────────────────────────────────────────────┐
│  feature --locate                            VALIDATING     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Scanning for markers: // ONBOARD:FEATURE csv-export        │
│                                                             │
│  Found 3 markers:                                           │
│                                                             │
│  ✓ src/services/export.service.ts                           │
│    Good! Follows existing export pattern.                   │
│                                                             │
│  ✓ src/routes/reports.ts                                    │
│    Correct! This is where report endpoints live.            │
│                                                             │
│  ✗ src/models/user.ts                                       │
│    Hmm, models define data structure, not export logic.     │
│    Export functionality typically lives in services.        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Score: 2/3 reasonable locations                            │
│                                                             │
│  You missed: Consider adding a UI component for the         │
│  download button (src/components/reports/)                  │
│                                                             │
│  Cleaning up markers... done.                               │
│                                                             │
│  +35 commits                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Marker Syntax

```
// ONBOARD:FEATURE <feature-id>
```

- `ONBOARD:FEATURE` - Marker type (feature planning)
- `<feature-id>` - Unique ID for this feature (provided by CLI)

## Validation Logic

Validation is more flexible than bug hunting (multiple valid answers):

1. Grep for markers with correct feature-id
2. Check each location:
   - Is it a reasonable file type for this feature?
   - Does it follow existing patterns in the codebase?
   - Is it in the right layer (service for logic, route for endpoints, etc.)?
3. Score based on:
   - Valid locations found
   - Key locations covered (e.g., service layer, route layer)
   - Bonus for finding existing patterns to follow

## Example Feature Requests

### Backend API
- "Add rate limiting to authentication endpoints"
- "Add webhook notifications for order status changes"
- "Add bulk delete endpoint for admin users"

### Frontend
- "Add dark mode toggle to user settings"
- "Add keyboard shortcuts for common actions"
- "Add infinite scroll to the activity feed"

### Fullstack
- "Add user avatar upload functionality"
- "Add real-time notifications"
- "Add export to PDF for invoices"

### CLI
- "Add `--format json` output option"
- "Add `config` subcommand for settings"
- "Add progress bar for long operations"

## Adaptability

Validation adapts to detected architecture:

| Architecture | Expected Locations |
|--------------|-------------------|
| **MVC** | Model?, Controller, Route, View |
| **Clean/Layered** | Service, Repository?, Controller, Route |
| **Feature-based** | Feature folder with all related files |
| **Component-based** | Component, Hook?, Service? |

## Design Decisions

### Why Feature Planning?
- Real-world skill developers use constantly
- Teaches architectural thinking
- Different from bug hunting (constructive vs. detective)
- Helps understand codebase organization

### Why Mark in Code?
- Consistent mechanic with `grep --hunt`
- Proves player actually explored
- More engaging than typing paths
- Visual confirmation of understanding

### Flexible Validation
- Multiple valid answers (unlike exact bug location)
- Focus on reasonable thinking, not perfect answer
- Partial credit for good locations

### No Time Pressure
- Planning should be thoughtful
- Different pacing from urgent bug hunt
- Encourages exploration over rushing

## Monster Reaction on Completion

After completing TODO #2 (last task before boss):

```
*MASSIVE STATIC SURGE*

*the codebase trembles*

"..."

*the noise settles into an unsettling hum*

"You know where the bugs live."

*creak*

"You know where new code should go."

*slrrrrp slrrrrp*

"You're thinking like..."

*pause*

"...like someone who BELONGS here."

*the static grows darker*

*TANGLE TANGLE TANGLE*

"Fine."

*crackle*

"You want to understand this codebase?"

*whirrrrrrrrrr*

"Then come understand ME."

*the ASCII form flickers into view*

     ╭─────────╮
     │ { ◉ ◉ } │
     │  ~~~~   │
     ╰────┬────╯
       ╱│││╲

*HRRRRRRRRRRNNNNNN*

"I AM this codebase."

*tentacles spread*

"Every shortcut."

*tangle*

"Every 'temporary' fix."

*tangle tangle*

"Every forgotten TODO."

*TANGLE TANGLE TANGLE*

"Every developer who left without documenting."

*kzzzzzzzzzt*

"You've cleared the TODOs."

*static spike*

"Now there's only one thing left."

*creak... creak... creak...*

"FIXME."

*the noise builds to a crescendo*

"The monster itself."

*0x464958204D45*

"Let's finish this."

*[BOSS BATTLE INITIATED]*
```

## Visual Reference

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and UI design.
