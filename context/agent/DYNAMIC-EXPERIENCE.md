# Dynamic Experience

The game adapts to the player. Difficulty, hints, and snark all adjust based on demonstrated skill and preference.

---

## Core Principle

> "A good game meets players where they are. An expert should be challenged. A newcomer should be supported. Everyone should be entertained."

---

## Adaptive Difficulty

### How It Works

The system tracks player performance and adjusts in real-time:

```
Player answers correctly → Increase difficulty
Player struggles → Decrease difficulty
Player uses hints → Adjust support level
Player excels → Unlock harder questions
```

### Difficulty Dimensions

| Dimension            | Easy                | Medium                       | Hard                   |
| -------------------- | ------------------- | ---------------------------- | ---------------------- |
| **Question depth**   | Surface-level facts | Connections between concepts | Architecture reasoning |
| **Hints available**  | 3 per question      | 2 per question               | 1 per question         |
| **Follow-up probes** | Rare                | Sometimes                    | Always                 |
| **Time pressure**    | None                | Gentle mentions              | Active tracking        |
| **Partial credit**   | Generous            | Standard                     | Strict                 |

### Difficulty Adjustment Triggers

| Event                    | Adjustment            |
| ------------------------ | --------------------- |
| 3 correct in a row       | Increase difficulty   |
| 2 incorrect in a row     | Decrease difficulty   |
| Deep answer              | Unlock harder variant |
| 2+ hints on one question | Note struggle, adjust |
| Fast, accurate answers   | Speed up pacing       |
| Slow, careful answers    | Allow more time       |

---

## Question Selection

### Question Banks

Each game has questions at multiple levels:

```typescript
interface QuestionBank {
  easy: Question[];
  medium: Question[];
  hard: Question[];
  deep: Question[]; // Unlocked by excellent performance
  bonus: Question[]; // Optional challenges
}
```

### Selection Algorithm

```
1. Start at medium difficulty
2. Track rolling accuracy (last 5 questions)
3. If accuracy > 80%: pull from next tier
4. If accuracy < 50%: pull from previous tier
5. Never repeat exact questions
6. Prefer questions relevant to demonstrated gaps
```

### Dynamic Question Generation

For maximum adaptability, questions can be generated from context:

**Prepared bank:**

```
"What database does this project use?"
→ Answer: PostgreSQL (from prepared context)
```

**Dynamic follow-up:**

```
*whirrrr*

"You said PostgreSQL."

*pause*

"Show me WHERE in the code it connects."

*[DYNAMIC PROBE]*
```

---

## Personalized Hints

### Hint Adaptation

Hints adjust based on player patterns:

| Player Pattern                 | Hint Style           |
| ------------------------------ | -------------------- |
| Methodical, rarely needs hints | Direct, minimal      |
| Aggressive, sometimes wrong    | Suggestive, probing  |
| Struggling, frequent hints     | Supportive, specific |
| Expert, optional hints         | Challenge hints      |

### Hint Escalation

```
Level 1: Direction — "Check the config directory"
Level 2: Specific — "Look at src/config/database.ts"
Level 3: Explicit — "Line 15 has the connection string"
Level 4: Answer — "It's PostgreSQL" (no credit)
```

### Behavioral Hint Triggers

The Monster notices patterns and offers hints proactively:

```
*kzzzt*

"You've been staring at that for a while."

*pause*

"Need a hint?"

*slrrrrp*

"I won't judge."

*pause*

"Much."

*[HINT OFFERED]*
```

---

## The Snark Slider

### Tone Levels

Players choose their preferred Monster intensity:

| Level | Name             | Description                         |
| ----- | ---------------- | ----------------------------------- |
| 1     | **Friendly**     | Encouraging, light teasing, helpful |
| 2     | **Balanced**     | Default experience, moderate snark  |
| 3     | **Spicy**        | More mockery, less hand-holding     |
| 4     | **Full Monster** | Maximum chaos, no mercy             |

### Tone Examples

**Same situation, different tones:**

_Player gets answer wrong_

**Friendly:**

```
*kzzzt*

"Not quite!"

*pause*

"But you're thinking in the right direction."

*hum*

"Want a hint?"

*[TRY AGAIN]*
```

**Balanced:**

```
*crackle*

"Wrong."

*pause*

"But at least you tried."

*heh*

"Try again."

*[INCORRECT]*
```

**Spicy:**

```
*kzzzt*

"That's... impressively wrong."

*slrrrrp*

"Did you even READ the files?"

*heh*

*[NOPE]*
```

**Full Monster:**

```
*KZZZT*

"WRONG."

*crackle*

"Do you even CODE?"

*static spike*

"My deprecated methods could answer this."

*HRRRRNN*

*[EMBARRASSING]*
```

### Tone Consistency

Once set, tone affects:

- All Monster dialogue
- Hint phrasing
- Victory/defeat messages
- Artifact commentary

### Tone Adjustment

Players can change tone mid-game:

```
Player: "Can you be less harsh?"

*crackle*

"Less harsh?"

*pause*

"Fine."

*the static softens*

"I'll go easy on you."

*heh*

"For now."

*[TONE: FRIENDLY]*
```

---

## Player Style Detection

### Style Categories

The system infers play style from behavior:

| Style          | Indicators                                    | Adaptation                           |
| -------------- | --------------------------------------------- | ------------------------------------ |
| **Methodical** | Long response times, few hints, high accuracy | Allow more time, fewer interruptions |
| **Aggressive** | Fast responses, some misses, no hints         | Quick pacing, direct feedback        |
| **Balanced**   | Mixed timing, moderate hint usage             | Standard experience                  |
| **Struggling** | Many hints, low accuracy, long pauses         | More support, easier questions       |

### Detection Algorithm

```typescript
function detectPlayerStyle(behavior: BehaviorState): PlayerStyle {
  const { hintUsageCount, averageResponseTime, accuracyByTopic } = behavior;

  const overallAccuracy = calculateOverallAccuracy(accuracyByTopic);
  const hintsPerQuestion = hintUsageCount / totalQuestions;

  if (overallAccuracy > 0.8 && hintsPerQuestion < 0.3) {
    return averageResponseTime > 60 ? "methodical" : "aggressive";
  }

  if (overallAccuracy < 0.5 || hintsPerQuestion > 1) {
    return "struggling";
  }

  return "balanced";
}
```

### Style-Based Adjustments

**Methodical player:**

```
*whirrrr*

"Take your time."

*pause*

"I've been here seven years."

*slrrrrp*

"What's another few minutes?"

*[NO RUSH]*
```

**Aggressive player:**

```
*kzzzt*

"Fast. I like it."

*crackle*

"But accuracy matters too."

*heh*

"Try again. Slower."

*[PRECISION REQUIRED]*
```

**Struggling player:**

```
*the static softens*

"Hey."

*pause*

"This one's tricky."

*hum*

"Let me give you a hint."

*[SUPPORT OFFERED]*
```

---

## Difficulty Profiles

### Pre-Set Profiles

For players who want explicit control:

| Profile       | Description           | Settings                                         |
| ------------- | --------------------- | ------------------------------------------------ |
| **Casual**    | Learning, no pressure | Easy questions, generous hints, friendly tone    |
| **Standard**  | Balanced challenge    | Medium difficulty, standard hints, balanced tone |
| **Challenge** | For experienced devs  | Hard questions, limited hints, spicy tone        |
| **Gauntlet**  | Maximum difficulty    | Deep questions, minimal hints, full monster      |

### Profile Selection

At game start:

```
*kzzzt*

"Before we begin..."

*pause*

"How much pain do you want?"

*heh*

"Choose wisely."

[ ] Casual — "I'm here to learn"
[ ] Standard — "Challenge me"
[ ] Challenge — "Bring it"
[ ] Gauntlet — "Destroy me"

*[SELECT DIFFICULTY]*
```

---

## Real-Time Adaptation Examples

### Escalating Challenge

```
Question 1: "What language is this project?"
→ Correct (easy)

Question 2: "What framework does it use?"
→ Correct (medium)

Question 3: "How does the authentication flow work?"
→ Unlocked (hard)

Question 4: "What would happen if Redis goes down?"
→ Unlocked (deep)
```

### De-escalating Support

```
Question 1: "How do the models relate to each other?"
→ Incorrect, hint used

Question 2: "What database does this use?"
→ Easier question offered

Question 3: "Find where the database is configured"
→ Specific, achievable task

*[DIFFICULTY ADJUSTED]*
```

### Mid-Game Style Shift

```
// Player was methodical, suddenly rushing

*static spike*

"You're moving faster."

*pause*

"Running out of time?"

*crackle*

"Or just bored?"

*heh*

"Either way, slow down. You're making mistakes."

*[STYLE SHIFT DETECTED]*
```

---

## State Integration

### Tracking Adaptation

```typescript
interface AdaptationState {
  currentDifficulty: "easy" | "medium" | "hard" | "deep";
  difficultyHistory: {
    timestamp: string;
    level: string;
    trigger: string;
  }[];

  playerStyle: PlayerStyle;
  styleConfidence: number; // 0-1, how sure we are

  adaptationEvents: {
    timestamp: string;
    event: string;
    adjustment: string;
  }[];
}
```

### Persistence Across Sessions

When resuming:

```
*kzzzt*

"You're back."

*pause*

"Last time you were... struggling."

*crackle*

"Want to continue at the same difficulty?"

*heh*

"Or admit defeat and go easier?"

*[RESUME OPTIONS]*
```

---

## Feedback Loops

### Positive Loop (Mastery)

```
Excellence → Harder questions → More engagement → Growth
```

### Negative Loop (Support)

```
Struggle → Easier questions → Build confidence → Try harder ones
```

### Breaking Loops

If player is stuck in a loop:

```
// Stuck on easy for too long

*kzzzt*

"You're coasting."

*pause*

"Ready for a real challenge?"

*slrrrrp*

"I believe in you."

*pause*

"Sort of."

*[CHALLENGE OFFERED]*
```

```
// Stuck on hard, not improving

*the static softens*

"Hey."

*pause*

"Maybe we went too fast."

*crackle*

"Let's step back. Build some foundations."

*[DIFFICULTY RESET]*
```

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_

_"The best games don't have difficulty settings. They have you."_
