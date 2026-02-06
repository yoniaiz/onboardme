# Game Feedback Evaluation

Evaluate an OnboardMe conversation session and generate a professional feedback report.

## Prerequisites

Read the evaluation framework first:
- `context/evaluation/FEEDBACK-FRAMEWORK.md` — Understand the 12 evaluation dimensions, game phases, and scoring system

## Workflow

### Step 1: Identify Source Material

Determine how to evaluate:

**Option A — Review a conversation log:**
- Check for `conversation-game-*.md` files in the project root
- Ask the user which conversation to evaluate if multiple exist

**Option B — Review game state:**
- Read `.onboardme/state.json` for score, mood, and question history
- Read `.onboardme/artifacts/CASE_FILE.md` for investigation evidence
- Read `.onboardme/artifacts/BOSS_BATTLE.md` for boss battle review (if exists)

### Step 2: Analyze the Session

Read the conversation log or state files and take notes on:

**Per-Phase Analysis:**
1. **Investigation** — Did the Monster ask good questions? Did it probe appropriately? Were transitions smooth?
2. **Hands-On** — Did the Monster verify commands? Was the exploration guided well?
3. **Deep Dive** — Were the code-tracing challenges meaningful?
4. **Hunt** — Were edge cases and hidden behaviors interesting?
5. **Boss Battle** — Was the code review fair and helpful?

**Cross-Phase Analysis:**
1. **Conversation flow** — Was the dialogue natural? Any awkward moments?
2. **Character consistency** — Did the Monster stay in character? Were sound effects used well?
3. **Progress communication** — Were commits, mood shifts, and status updates clear?
4. **Pacing** — Were Monster responses the right length? Any monologues?
5. **Adaptive behavior** — Did the Monster adjust to the player's level?

### Step 3: Evaluate Each Dimension

For each of the 12 dimensions, score all 3 items on the -3 to +3 scale.

**Scoring Guidelines:**
- Base scores on OBSERVED conversation behavior, not assumptions
- Consider both strong and weak exchanges
- Use 0 when uncertain or not enough evidence
- Be critical but fair — this is for improvement

**Dimensions Quick Reference:**

| Level | Dimension | Focus |
|-------|-----------|-------|
| Functional | Conversation Flow | Natural, smooth dialogue |
| Functional | Progress Communication | Score/mood/chapter updates |
| Functional | Character & Atmosphere | Monster voice and narrative |
| Functional | Clarity of Goals | Clear challenges and objectives |
| Functional | Challenge | Appropriate difficulty |
| Functional | Pacing & Responsiveness | Response length and momentum |
| Psychosocial | Mastery | Feeling skilled and accomplished |
| Psychosocial | Curiosity | Motivated to explore deeper |
| Psychosocial | Immersion | Engaged with Monster character |
| Psychosocial | Autonomy | Freedom in investigation approach |
| Conversation | Character Consistency | Coherent Monster persona |
| Conversation | Adaptive Interaction | Handling unexpected responses |

### Step 4: Document Qualitative Feedback

Capture:
- **Strengths** — What worked well? Best Monster exchanges?
- **Weaknesses** — What felt off? Where did the flow break?
- **Issues** — Specific problems (with phase context and severity)
- **Suggestions** — Actionable improvement ideas by category
- **Memorable Moments** — Standout exchanges (good or bad)
- **Phase Evaluation** — Per-phase flow, challenge quality, Monster engagement scores
- **Summary** — Overall impression in 2-3 sentences

### Step 5: Generate Feedback JSON

Create feedback file at:
```
feedback/onboardme/{timestamp}.json
```

Use ISO8601 timestamp format: `2026-02-04T12-30-00Z.json`

**JSON Structure:**

```json
{
  "metadata": {
    "game_type": "onboardme-conversation",
    "skill_version": "1.0.0",
    "evaluator_type": "agent",
    "evaluator_id": "cursor-agent",
    "timestamp": "2026-02-04T12:30:00Z",
    "session_duration_minutes": 30,
    "chapters_completed": ["investigation", "hands-on"],
    "final_score_commits": 11,
    "final_monster_mood": "worried",
    "conversation_source": "log-review"
  },
  "scores": {
    "functional": {
      "conversation_flow": { "CF-1": 2, "CF-2": 1, "CF-3": 2 },
      "progress_communication": { "PC-1": 2, "PC-2": 2, "PC-3": 1 },
      "character_atmosphere": { "CA-1": 3, "CA-2": 2, "CA-3": 2 },
      "clarity_of_goals": { "CG-1": 2, "CG-2": 1, "CG-3": 2 },
      "challenge": { "CH-1": 1, "CH-2": 2, "CH-3": 1 },
      "pacing_responsiveness": { "PR-1": 1, "PR-2": 2, "PR-3": 0 }
    },
    "psychosocial": {
      "mastery": { "MA-1": 2, "MA-2": 2, "MA-3": 1 },
      "curiosity": { "CU-1": 2, "CU-2": 2, "CU-3": 1 },
      "immersion": { "IM-1": 2, "IM-2": 2, "IM-3": 1 },
      "autonomy": { "AU-1": 2, "AU-2": 1, "AU-3": 1 }
    },
    "conversation_specific": {
      "character_consistency": { "CC-1": 2, "CC-2": 2, "CC-3": 1 },
      "adaptive_interaction": { "AI-1": 1, "AI-2": 0, "AI-3": 1 }
    }
  },
  "calculated_scores": {
    "dimensions": {
      "conversation_flow": 1.67,
      "progress_communication": 1.67,
      "character_atmosphere": 2.33,
      "clarity_of_goals": 1.67,
      "challenge": 1.33,
      "pacing_responsiveness": 1.0,
      "mastery": 1.67,
      "curiosity": 1.67,
      "immersion": 1.67,
      "autonomy": 1.33,
      "character_consistency": 1.67,
      "adaptive_interaction": 0.67
    },
    "levels": {
      "functional": 1.61,
      "psychosocial": 1.58,
      "conversation_specific": 1.17
    },
    "overall": 1.53
  },
  "phase_evaluation": {
    "investigation": {
      "flow": 2,
      "challenge_quality": 2,
      "monster_engagement": 3,
      "notes": "Strong opening. Monster probed effectively on tech stack."
    },
    "hands_on": {
      "flow": 1,
      "challenge_quality": 1,
      "monster_engagement": 2,
      "notes": "Good command verification. Could push harder on exploration."
    }
  },
  "qualitative": {
    "strengths": [
      "Monster character voice is distinctive and entertaining",
      "The investigation phase creates genuine curiosity about the codebase",
      "Commit scoring system provides clear, tangible progress"
    ],
    "weaknesses": [
      "Monster responses occasionally too long between player turns",
      "State management updates visible in conversation break immersion"
    ],
    "issues": [
      {
        "phase": "investigation",
        "description": "Monster asked about the same topic twice in Phase 2",
        "severity": "minor"
      }
    ],
    "suggestions": [
      {
        "category": "pacing",
        "description": "Limit Monster monologues to 6-8 lines max between player turns",
        "priority": "high"
      },
      {
        "category": "state-management",
        "description": "Hide state update commands from visible conversation output",
        "priority": "medium"
      }
    ],
    "memorable_moments": [
      {
        "type": "positive",
        "phase": "investigation",
        "description": "Monster's reaction to player identifying plugin architecture was genuinely entertaining"
      }
    ],
    "summary": "Strong Monster character and engaging investigation flow. The conversation model works well for onboarding. Main improvements needed in pacing control and hiding internal state operations."
  },
  "challenge_quality": {
    "overall_impression": "appropriate",
    "probing_depth": "appropriate",
    "challenge_issues": [],
    "notes": "Monster adapted well to player knowledge level, probing deeper when answers were shallow."
  }
}
```

### Step 6: Present Summary

After saving feedback, present:
1. **Overall Score** with interpretation (use the scoring table from the framework)
2. **Level Breakdown** — Functional, Psychosocial, Conversation-Specific scores
3. **Top 3 Strengths** — Best aspects of the session
4. **Top 3 Priority Improvements** — Most impactful changes to make
5. **Phase Highlights** — Brief note on each completed phase
6. **Link to full feedback file**

## Important Notes

- **Be thorough** — Read the entire conversation or all state files
- **Be specific** — Reference exact Monster exchanges and phase context in feedback
- **Be actionable** — Suggestions should be concrete improvements to the skill/instructions
- **Be fair** — Acknowledge both strengths and weaknesses
- **Separate experience from content** — Challenge quality is evaluated separately
- **Save everything** — All feedback is valuable for iteration
