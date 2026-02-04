# Game Feedback Evaluation

Playtest a game using the E2E sandbox and generate a professional feedback evaluation.

## Prerequisites

Read the evaluation framework first:
- `context/evaluation/FEEDBACK-FRAMEWORK.md` — Understand the 12 evaluation dimensions

## Workflow

### Step 1: Identify Game

Determine which game to evaluate:
- Check `tests/e2e/sandbox/` for available game sandboxes
- Check `tests/e2e/configs/` for game test configs

Default: `file-detective` if not specified.

### Step 2: Run E2E Sandbox Playtest

Execute the game sandbox and systematically interact with ALL screens and states:

```bash
bun run tests/e2e/sandbox/{game-name}.sandbox.ts
```

**Playtest Protocol:**
1. Observe the initial screen — note first impressions
2. Try all navigation options (up, down, enter, escape)
3. Test correct AND incorrect inputs
4. Complete the full game flow if possible
5. Note any visual glitches, lag, or confusing moments
6. Record the exact screen output at key moments

### Step 3: Evaluate Each Dimension

For each of the 12 dimensions, score all 3 items on the -3 to +3 scale.

**Scoring Guidelines:**
- Base scores on OBSERVED behavior, not assumptions
- Consider both positive and negative interactions
- Use 0 when uncertain or not applicable
- Be critical but fair — this is for improvement

### Step 4: Document Qualitative Feedback

Capture:
- **Strengths** — What worked well?
- **Weaknesses** — What needs improvement?
- **Issues** — Specific bugs or UX problems (with screen context)
- **Suggestions** — Actionable improvement ideas
- **Memorable Moments** — What stood out (good or bad)?
- **Summary** — Overall impression in 2-3 sentences

### Step 5: Generate Feedback JSON

Create feedback file at:
```
feedback/{game-id}/{timestamp}.json
```

Use ISO8601 timestamp format: `2026-02-04T12-30-00Z.json`

**JSON Structure:**

```json
{
  "metadata": {
    "game_id": "file-detective",
    "game_version": "0.1.0",
    "evaluator_type": "agent",
    "evaluator_id": "cursor-agent",
    "timestamp": "2026-02-04T12:30:00Z",
    "session_duration_seconds": 120,
    "completed_game": true
  },
  "scores": {
    "functional": {
      "ease_of_control": { "EC-1": 2, "EC-2": 1, "EC-3": 2 },
      "progress_feedback": { "PF-1": 1, "PF-2": 2, "PF-3": 1 },
      "visual_appeal": { "VA-1": 2, "VA-2": 1, "VA-3": 2 },
      "clarity_of_goals": { "CG-1": 2, "CG-2": 1, "CG-3": 2 },
      "challenge": { "CH-1": 1, "CH-2": 1, "CH-3": 0 },
      "responsiveness": { "RS-1": 3, "RS-2": 3, "RS-3": 3 }
    },
    "psychosocial": {
      "mastery": { "MA-1": 1, "MA-2": 1, "MA-3": 1 },
      "curiosity": { "CU-1": 1, "CU-2": 1, "CU-3": 0 },
      "immersion": { "IM-1": 1, "IM-2": 2, "IM-3": 0 },
      "autonomy": { "AU-1": 2, "AU-2": 1, "AU-3": 1 }
    },
    "cli_specific": {
      "layout_typography": { "LT-1": 2, "LT-2": 1, "LT-3": 1 },
      "error_handling": { "EH-1": 1, "EH-2": 0, "EH-3": 1 }
    }
  },
  "calculated_scores": {
    "dimensions": {
      "ease_of_control": 1.67,
      "progress_feedback": 1.33,
      "visual_appeal": 1.67,
      "clarity_of_goals": 1.67,
      "challenge": 0.67,
      "responsiveness": 3.0,
      "mastery": 1.0,
      "curiosity": 0.67,
      "immersion": 1.0,
      "autonomy": 1.33,
      "layout_typography": 1.33,
      "error_handling": 0.67
    },
    "levels": {
      "functional": 1.67,
      "psychosocial": 1.0,
      "cli_specific": 1.0
    },
    "overall": 1.33
  },
  "qualitative": {
    "strengths": [
      "Detective theme creates engaging narrative context",
      "Evidence board UI is visually clear and well-organized"
    ],
    "weaknesses": [
      "Limited feedback on wrong answers",
      "Navigation between categories could be clearer"
    ],
    "issues": [
      {
        "screen": "Evidence Board",
        "description": "Description of the issue",
        "severity": "minor"
      }
    ],
    "suggestions": [
      {
        "category": "ux",
        "description": "Add visual highlight to currently selected category",
        "priority": "medium"
      }
    ],
    "memorable_moments": [
      {
        "type": "positive",
        "description": "The Monster dialogue after completion was entertaining"
      }
    ],
    "summary": "File Detective has a solid foundation with engaging narrative and clear UI structure. Focus areas for improvement: wrong answer feedback, category navigation clarity, and adding more game juice/polish."
  }
}
```

### Step 6: Present Summary

After saving feedback, present:
1. **Overall Score** with interpretation
2. **Top 3 Strengths**
3. **Top 3 Priority Improvements**
4. **Link to full feedback file**

## E2E Interaction Reference

```typescript
// Available E2E methods
e2e.debug("label")      // Print current screen
e2e.lastFrame()         // Get screen as string
e2e.press("enter")      // Keys: enter, up, down, left, right, escape, tab, backspace
e2e.type("text")        // Type text input
e2e.waitFor(fn)         // Wait for condition
e2e.getResults()        // Captured AnswerResult[]
e2e.getGameResult()     // Final GameResult (null until complete)
```

## Dimension Quick Reference

| Level | Dimension | Focus |
|-------|-----------|-------|
| Functional | Ease of Control | Intuitive keyboard controls |
| Functional | Progress Feedback | State/progress communication |
| Functional | Visual Appeal | Terminal aesthetics |
| Functional | Clarity of Goals | Clear objectives |
| Functional | Challenge | Appropriate difficulty |
| Functional | Responsiveness | Quick UI response |
| Psychosocial | Mastery | Feeling skilled |
| Psychosocial | Curiosity | Want to explore |
| Psychosocial | Immersion | Theme engagement |
| Psychosocial | Autonomy | Meaningful choices |
| CLI-Specific | Layout & Typography | Readable, organized text |
| CLI-Specific | Error Handling | Graceful mistake recovery |

## Important Notes

- **Be thorough** — Interact with every screen and option
- **Be specific** — Reference exact screens and behaviors in feedback
- **Be actionable** — Suggestions should be concrete improvements
- **Be fair** — Acknowledge both strengths and weaknesses
- **Save everything** — All feedback is valuable for iteration
