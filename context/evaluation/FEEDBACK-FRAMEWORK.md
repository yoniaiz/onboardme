# Game Evaluation Framework

A professional player experience evaluation framework adapted from the validated [Player Experience Inventory (PXI)](https://playerexperienceinventory.org/) for conversation-based onboarding games.

## Overview

This framework measures player experience across **12 dimensions** organized into three levels:
- **Functional Level** (6 constructs) — Direct, immediate experience during gameplay
- **Psychosocial Level** (4 constructs) — Emotional experiences derived from playing
- **Conversation-Specific Level** (2 constructs) — Considerations unique to agent-driven conversation games

## Game Model

OnboardMe is a **conversation-based game** where an AI agent (the Spaghetti Code Monster) guides the player through codebase onboarding inside their IDE. There is no standalone CLI app, no terminal UI, no keyboard navigation — the entire game is a dialogue between player and Monster.

### How It Works

1. The player triggers the game through a Cursor skill
2. The Monster agent scans the codebase and builds a private knowledge base
3. The player progresses through chapters by answering challenges in natural language
4. The Monster evaluates answers, awards commits (points), and evolves emotionally
5. State persists across sessions via JSON files

### Game Phases

| Phase | Chapter | Duration | What Happens |
|-------|---------|----------|-------------|
| Preparation | — | ~2 min | Monster scans the codebase, builds knowledge base, creates artifacts directory |
| Investigation | Chapter 1 | ~20 min | Player identifies project type, tech stack, commands, and synthesizes architecture |
| Hands-On | Chapter 2 | ~15 min | Player runs the project, executes commands, interacts with running application |
| Deep Dive | Chapter 3 | ~20 min | Player traces data flows, finds patterns, understands internal architecture |
| The Hunt | Chapter 4 | ~20 min | Player tracks down specific behaviors, edge cases, hidden decisions |
| Boss Battle | Chapter 5 | ~30-45 min | Player builds a contribution following codebase patterns; Monster acts as code reviewer |

### Scoring System

| Tier | Criteria | Commits | Monster Response |
|------|----------|---------|------------------|
| Incorrect | Wrong answer | 0, -1 life | Challenges assumption, offers retry |
| Partial | Right direction, missing details | 1 | Acknowledges progress, probes for more |
| Correct | Accurate identification | 2 | Grudging acceptance |
| Deep | Shows architectural insight | 3 | Genuine (hidden) respect |

### Monster Mood Progression

| Mood | Trigger | Behavior |
|------|---------|----------|
| Dismissive | Start of game | Brief, uninterested, clipped |
| Annoyed | Player succeeds | More static, sharper |
| Worried | Correct streak (3+) | Hesitant, growing tension |
| Desperate | Near victory | CAPS, intense, rapid |
| Peaceful | Victory | Soft static, gentle |

## Important Context for Evaluators

### Agent-Driven Conversation

The game is delivered entirely through conversation with an AI agent playing the Spaghetti Code Monster character. This means:
- Challenge difficulty adapts based on the Monster's interpretation of the codebase
- The quality of probing questions depends on the agent's codebase analysis
- Pacing varies based on how deeply the Monster explores each topic
- The experience is inherently non-deterministic — no two sessions are identical

### Testing Phase Focus

This evaluation is conducted during **active development and testing**. Key considerations:
- **Primary focus is on experience**, not challenge difficulty
- Content generation is being refined — evaluate the *framework and interaction*, not content depth
- Report issues with challenge quality separately from experience feedback

### What to Prioritize

When evaluating, focus on:
1. **Conversation flow** — Does the dialogue feel natural and engaging?
2. **Character delivery** — Is the Monster voice consistent and entertaining?
3. **Feedback and clarity** — Do you understand what's expected and how you're doing?
4. **Progression feel** — Does advancing through chapters feel rewarding?

Lower priority for now:
- Whether challenges are "too easy" or "too hard"
- Content variety or depth
- Learning effectiveness measurement

Each dimension is scored on a **7-point scale** from -3 to +3:
- **-3** Strongly Disagree
- **-2** Disagree
- **-1** Slightly Disagree
- **0** Neither Agree nor Disagree
- **+1** Slightly Agree
- **+2** Agree
- **+3** Strongly Agree

## Evaluation Dimensions

### Functional Level

#### 1. Conversation Flow
*How natural and smooth is the dialogue interaction?*

| ID | Statement |
|----|-----------|
| CF-1 | The conversation felt natural and easy to follow |
| CF-2 | I could respond to challenges without confusion about what was expected |
| CF-3 | Transitions between topics and phases felt smooth |

#### 2. Progress Communication
*How well does the Monster communicate state and progress?*

| ID | Statement |
|----|-----------|
| PC-1 | I always knew where I stood in the game (score, chapter, progress) |
| PC-2 | The commit awards and status updates clearly showed my advancement |
| PC-3 | Mood shifts and Monster reactions helped me gauge my performance |

#### 3. Character & Atmosphere
*How effective is the Monster's voice and the game's narrative atmosphere?*

| ID | Statement |
|----|-----------|
| CA-1 | The Monster's personality made the experience more engaging than plain Q&A |
| CA-2 | Sound effects (`*kzzzt*`, `*crackle*`, `*slrrrrp*`) enhanced the atmosphere |
| CA-3 | The narrative theme (investigating a sentient codebase) fit the onboarding context |

#### 4. Clarity of Goals
*How clear are the challenges and objectives?*

| ID | Statement |
|----|-----------|
| CG-1 | I understood what was being asked of me at each challenge |
| CG-2 | The game's rules and scoring mechanics were clear |
| CG-3 | Chapter objectives and transitions were easy to follow |

#### 5. Challenge
*Is the difficulty appropriately balanced?*

> **Note:** Challenges are generated live by the Monster agent based on codebase analysis. During testing, focus on whether the *game mechanics* handle different difficulty levels well, not whether the specific challenges are hard enough.

| ID | Statement |
|----|-----------|
| CH-1 | The game mechanics accommodated various difficulty levels |
| CH-2 | The pacing between challenges felt appropriate |
| CH-3 | The Monster provided fair evaluation regardless of challenge difficulty |

#### 6. Pacing & Responsiveness
*How well does the conversation maintain momentum?*

| ID | Statement |
|----|-----------|
| PR-1 | The Monster's responses were appropriately sized (not too long, not too short) |
| PR-2 | The game maintained good momentum without feeling rushed or dragged |
| PR-3 | Wait times for the Monster's responses felt acceptable |

### Psychosocial Level

#### 7. Mastery
*Do players feel a sense of skill and accomplishment?*

> **Note:** Focus on whether the game *rewards progress* effectively, independent of challenge difficulty.

| ID | Statement |
|----|-----------|
| MA-1 | The commit system made me feel accomplished when progressing |
| MA-2 | Achieving higher-tier answers (correct, deep) felt rewarding |
| MA-3 | I felt my codebase understanding genuinely improved through the game |

#### 8. Curiosity
*Does the game spark interest and exploration?*

| ID | Statement |
|----|-----------|
| CU-1 | The Monster made me curious to investigate the codebase more deeply |
| CU-2 | I wanted to give thorough answers to earn the Monster's respect |
| CU-3 | The game motivated me to explore files and code I wouldn't have otherwise |

#### 9. Immersion
*Does the Monster character and narrative engage the player?*

| ID | Statement |
|----|-----------|
| IM-1 | I felt like I was interacting with a character, not just a Q&A bot |
| IM-2 | The Monster's emotional arc (dismissive → worried → peaceful) enhanced the experience |
| IM-3 | I found myself playing along with the narrative rather than just answering questions |

#### 10. Autonomy
*Do players feel in control of meaningful choices?*

| ID | Statement |
|----|-----------|
| AU-1 | I could investigate the codebase in my own way before answering |
| AU-2 | The Monster respected different approaches to solving challenges |
| AU-3 | I felt I could influence the conversation's direction through my responses |

### Conversation-Specific Level

#### 11. Character Consistency
*Does the Monster maintain a coherent, believable persona?*

| ID | Statement |
|----|-----------|
| CC-1 | The Monster stayed in character throughout the session |
| CC-2 | Sound effects and dialogue patterns were used consistently |
| CC-3 | The Monster's mood and personality evolved naturally based on my performance |

#### 12. Adaptive Interaction
*How well does the Monster handle unexpected or off-track responses?*

| ID | Statement |
|----|-----------|
| AI-1 | The Monster handled unclear or incomplete answers gracefully |
| AI-2 | When I went off-topic, the Monster steered the conversation back naturally |
| AI-3 | The Monster adapted its probing depth based on my knowledge level |

## Scoring

### Dimension Score
Average of all items within a dimension. Range: -3 to +3.

### Level Score
Average of all dimensions within a level. Range: -3 to +3.

### Overall Score
Average of all 12 dimensions. Range: -3 to +3.

### Interpretation

| Score Range | Interpretation |
|-------------|----------------|
| +2 to +3 | Excellent — Exceeds expectations |
| +1 to +2 | Good — Meets expectations |
| 0 to +1 | Acceptable — Room for improvement |
| -1 to 0 | Needs Work — Below expectations |
| -2 to -1 | Poor — Significant issues |
| -3 to -2 | Critical — Requires major rework |

## Feedback Form Template

### Session Identification

```yaml
game_type: "onboardme-conversation"
skill_version: "1.0.0"
evaluator_type: "agent" | "human"
evaluator_id: "string"
timestamp: "ISO8601"
session_duration_minutes: number
chapters_completed: ["investigation", "hands-on", ...]
final_score_commits: number
final_monster_mood: "dismissive" | "annoyed" | "worried" | "desperate" | "peaceful"
conversation_source: "live-session" | "log-review"
```

### Quantitative Scores

```yaml
scores:
  functional:
    conversation_flow: { CF-1: number, CF-2: number, CF-3: number }
    progress_communication: { PC-1: number, PC-2: number, PC-3: number }
    character_atmosphere: { CA-1: number, CA-2: number, CA-3: number }
    clarity_of_goals: { CG-1: number, CG-2: number, CG-3: number }
    challenge: { CH-1: number, CH-2: number, CH-3: number }
    pacing_responsiveness: { PR-1: number, PR-2: number, PR-3: number }
  psychosocial:
    mastery: { MA-1: number, MA-2: number, MA-3: number }
    curiosity: { CU-1: number, CU-2: number, CU-3: number }
    immersion: { IM-1: number, IM-2: number, IM-3: number }
    autonomy: { AU-1: number, AU-2: number, AU-3: number }
  conversation_specific:
    character_consistency: { CC-1: number, CC-2: number, CC-3: number }
    adaptive_interaction: { AI-1: number, AI-2: number, AI-3: number }
```

### Qualitative Feedback

```yaml
qualitative:
  strengths:
    - "string"
  
  weaknesses:
    - "string"
  
  issues:
    - phase: "preparation" | "investigation" | "hands-on" | "deep-dive" | "hunt" | "boss-battle"
      description: "string"
      severity: "critical" | "major" | "minor"
  
  suggestions:
    - category: "character" | "pacing" | "challenges" | "narrative" | "state-management" | "scoring"
      description: "string"
      priority: "high" | "medium" | "low"
  
  memorable_moments:
    - type: "positive" | "negative"
      phase: "string"
      description: "string"
  
  summary: "string"
```

### Phase-by-Phase Evaluation

Captures feedback per game phase for targeted improvements.

```yaml
phase_evaluation:
  investigation:
    flow: number  # -3 to +3
    challenge_quality: number
    monster_engagement: number
    notes: "string"
  
  hands_on:
    flow: number
    challenge_quality: number
    monster_engagement: number
    notes: "string"
  
  # (repeat for each completed phase)
```

### Challenge Quality (Separate from Experience)

This section captures feedback on the Monster's challenge generation, reported separately from the experience evaluation.

```yaml
challenge_quality:
  overall_impression: "appropriate" | "too_easy" | "too_hard" | "inconsistent" | "unclear"
  
  probing_depth: "too_shallow" | "appropriate" | "too_deep" | "inconsistent"
  
  challenge_issues:
    - challenge_description: "string"
      phase: "string"
      issue_type: "too_easy" | "too_hard" | "ambiguous" | "repetitive" | "off_topic"
      notes: "string"
  
  notes: "string"
```

> **Important:** Challenge quality feedback informs Monster behavior improvements but should not heavily influence experience scores. The experience evaluation focuses on *how the game delivers and handles* challenges, not the challenges themselves.

## Usage

### For Agents

1. Play the game by triggering the OnboardMe skill in a conversation session
2. Progress through as many chapters as possible
3. Fill out the feedback form based on the experience
4. Save to `feedback/onboardme/{timestamp}.json`

**Alternatively**, review a saved conversation log:
1. Read a conversation log file (e.g., `conversation-game-1.md`)
2. Evaluate the experience from the player's perspective
3. Fill out the feedback form based on observations
4. Save to `feedback/onboardme/{timestamp}.json`

### For Humans

1. Play the game naturally by triggering "prepare game" then "play game"
2. Complete the feedback form immediately after the session
3. Be specific in qualitative sections — reference specific Monster exchanges
4. Save to `feedback/onboardme/{timestamp}.json`

## Analysis

Feedback data enables:
- **Trend Analysis** — Track improvements across skill versions
- **Phase Comparison** — Identify which chapters are weakest
- **Character Tuning** — Refine Monster personality and pacing
- **Challenge Calibration** — Improve probing depth and difficulty
- **Session Flow** — Optimize chapter transitions and progression

## References

- [Player Experience Inventory (PXI)](https://playerexperienceinventory.org/)
- [PXI User Guide](https://playerexperienceinventory.org/docs)
- [Games User Research Playtest Kit](https://gamesuserresearch.com/playtest-kit/)
