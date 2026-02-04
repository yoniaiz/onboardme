# Game Evaluation Framework

A professional player experience evaluation framework adapted from the validated [Player Experience Inventory (PXI)](https://playerexperienceinventory.org/) for CLI-based games.

## Overview

This framework measures player experience across **12 dimensions** organized into three levels:
- **Functional Level** (6 constructs) — Direct, immediate experience during gameplay
- **Psychosocial Level** (4 constructs) — Emotional experiences derived from playing
- **CLI-Specific Level** (2 constructs) — Terminal/CLI-specific considerations

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

#### 1. Ease of Control
*How intuitive and responsive are the controls?*

| ID | Statement |
|----|-----------|
| EC-1 | The controls felt intuitive and easy to learn |
| EC-2 | I could perform actions without struggling with the interface |
| EC-3 | Keyboard shortcuts and navigation felt natural |

#### 2. Progress Feedback
*How well does the game communicate state and progress?*

| ID | Statement |
|----|-----------|
| PF-1 | I always knew my current progress in the game |
| PF-2 | The game clearly showed the results of my actions |
| PF-3 | Visual feedback helped me understand what was happening |

#### 3. Visual Appeal
*How aesthetically pleasing is the terminal UI?*

| ID | Statement |
|----|-----------|
| VA-1 | The visual design of the game was appealing |
| VA-2 | Colors, borders, and ASCII art enhanced the experience |
| VA-3 | The terminal aesthetics fit the game's theme |

#### 4. Clarity of Goals
*How clear are instructions and objectives?*

| ID | Statement |
|----|-----------|
| CG-1 | I understood what I was supposed to do at all times |
| CG-2 | The game's rules and mechanics were clear |
| CG-3 | Instructions were easy to follow |

#### 5. Challenge
*Is the difficulty appropriately balanced?*

| ID | Statement |
|----|-----------|
| CH-1 | The difficulty level felt appropriate |
| CH-2 | The game challenged me without being frustrating |
| CH-3 | I felt the game tested my skills fairly |

#### 6. Responsiveness
*How quickly does the UI respond to input?*

| ID | Statement |
|----|-----------|
| RS-1 | The interface responded quickly to my inputs |
| RS-2 | Screen updates felt instant and smooth |
| RS-3 | There was no noticeable lag or delay |

### Psychosocial Level

#### 7. Mastery
*Do players feel a sense of skill and accomplishment?*

| ID | Statement |
|----|-----------|
| MA-1 | I felt a sense of mastery while playing |
| MA-2 | I felt I was good at playing this game |
| MA-3 | I felt capable while navigating the game |

#### 8. Curiosity
*Does the game spark interest and exploration?*

| ID | Statement |
|----|-----------|
| CU-1 | The game made me curious about what comes next |
| CU-2 | I wanted to explore and discover more |
| CU-3 | The content kept my interest throughout |

#### 9. Immersion
*Does the theme/narrative engage the player?*

| ID | Statement |
|----|-----------|
| IM-1 | I felt immersed in the game's theme |
| IM-2 | The narrative elements enhanced my experience |
| IM-3 | I forgot I was using a terminal |

#### 10. Autonomy
*Do players feel in control of meaningful choices?*

| ID | Statement |
|----|-----------|
| AU-1 | I felt I could make meaningful choices |
| AU-2 | The game respected my decisions |
| AU-3 | I felt in control of my progress path |

### CLI-Specific Level

#### 11. Layout & Typography
*Is text readable and well-organized?*

| ID | Statement |
|----|-----------|
| LT-1 | Text was easy to read and well-spaced |
| LT-2 | Information was organized logically on screen |
| LT-3 | Important elements stood out clearly |

#### 12. Error Handling
*How gracefully are mistakes handled?*

| ID | Statement |
|----|-----------|
| EH-1 | The game handled my mistakes gracefully |
| EH-2 | Error messages were helpful and clear |
| EH-3 | I could easily recover from wrong inputs |

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

### Game Identification

```yaml
game_id: "file-detective"
game_version: "0.1.0"
evaluator_type: "agent" | "human"
evaluator_id: "string"
timestamp: "ISO8601"
session_duration_seconds: number
completed_game: boolean
```

### Quantitative Scores

```yaml
scores:
  functional:
    ease_of_control: { EC-1: number, EC-2: number, EC-3: number }
    progress_feedback: { PF-1: number, PF-2: number, PF-3: number }
    visual_appeal: { VA-1: number, VA-2: number, VA-3: number }
    clarity_of_goals: { CG-1: number, CG-2: number, CG-3: number }
    challenge: { CH-1: number, CH-2: number, CH-3: number }
    responsiveness: { RS-1: number, RS-2: number, RS-3: number }
  psychosocial:
    mastery: { MA-1: number, MA-2: number, MA-3: number }
    curiosity: { CU-1: number, CU-2: number, CU-3: number }
    immersion: { IM-1: number, IM-2: number, IM-3: number }
    autonomy: { AU-1: number, AU-2: number, AU-3: number }
  cli_specific:
    layout_typography: { LT-1: number, LT-2: number, LT-3: number }
    error_handling: { EH-1: number, EH-2: number, EH-3: number }
```

### Qualitative Feedback

```yaml
qualitative:
  # What worked well
  strengths:
    - "string"
  
  # What needs improvement
  weaknesses:
    - "string"
  
  # Specific issues encountered
  issues:
    - screen: "string"
      description: "string"
      severity: "critical" | "major" | "minor"
  
  # Improvement suggestions
  suggestions:
    - category: "ui" | "ux" | "gameplay" | "narrative" | "performance"
      description: "string"
      priority: "high" | "medium" | "low"
  
  # Memorable moments (positive or negative)
  memorable_moments:
    - type: "positive" | "negative"
      description: "string"
  
  # Overall impression
  summary: "string"
```

## Usage

### For Agents

1. Run the game using the E2E sandbox framework
2. Interact with all screens and game states
3. Fill out the feedback form based on observations
4. Save to `feedback/{game-id}/{timestamp}.json`

### For Humans

1. Play the game naturally
2. Complete the feedback form immediately after
3. Be specific in qualitative sections
4. Save to `feedback/{game-id}/{timestamp}.json`

## Analysis

Feedback data enables:
- **Trend Analysis** — Track improvements across versions
- **Dimension Comparison** — Identify weakest areas
- **Issue Tracking** — Catalog and prioritize bugs/UX issues
- **Benchmarking** — Compare games against each other

## References

- [Player Experience Inventory (PXI)](https://playerexperienceinventory.org/)
- [PXI User Guide](https://playerexperienceinventory.org/docs)
- [Games User Research Playtest Kit](https://gamesuserresearch.com/playtest-kit/)
