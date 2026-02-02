# Behavioral Tracking & Monster Reactions

> **Make the Monster feel aware. Track player patterns and react dynamically.**

This document specifies how to track player behavior and generate appropriate Monster reactions, transforming scripted dialogue into responsive interaction.

---

## Core Principle

> "The Monster's dialogue is scripted per-TODO but doesn't react to player patterns. It should feel aware, not robotic."

Behavioral tracking creates the illusion of awareness by detecting patterns and triggering contextual reactions.

---

## Tracked Behaviors

### 1. Hint Usage Patterns

| Pattern | Detection | Monster Reaction |
|---------|-----------|------------------|
| **Hint Dependent** | 3+ hints per TODO | "You and Stack Overflow are getting quite close." |
| **No Hints** | 0 hints across multiple TODOs | "No Stack Overflow? Impressive. Or stubborn." |
| **First Hint** | First hint ever used | "Oh. Stack Overflow. I'm not judging... I'm always judging." |
| **Hint Spam** | 3 hints in < 2 minutes | "Just... just paste the entire codebase into ChatGPT at this point." |

**Implementation:**
```typescript
interface HintTracking {
  totalHints: number;
  hintsPerTODO: Record<number, number>;
  lastHintTime: Date;
  consecutiveHints: number;
}

function analyzeHintBehavior(tracking: HintTracking): string | null {
  if (tracking.consecutiveHints >= 3) {
    return "hint-spam";
  }
  if (tracking.totalHints === 1) {
    return "first-hint";
  }
  if (tracking.totalHints === 0 && currentTODO >= 3) {
    return "no-hints";
  }
  if (tracking.hintsPerTODO[currentTODO] >= 3) {
    return "hint-dependent";
  }
  return null;
}
```

---

### 2. Speed Patterns

| Pattern | Detection | Monster Reaction |
|---------|-----------|------------------|
| **Speed Demon** | Avg < 20s per question | "You're not even reading the files, are you?" |
| **Methodical** | Avg > 60s per question | "Take your time. I've got seven years of patience left." |
| **Inconsistent** | High variance in times | "Fast on easy ones, slow on hard ones. Smart." |
| **Timeout Prone** | 3+ timeouts | "The timeout isn't infinite, you know." |

**Implementation:**
```typescript
interface SpeedTracking {
  answerTimes: number[];
  timeouts: number;
}

function analyzeSpeedBehavior(tracking: SpeedTracking): string | null {
  const avg = tracking.answerTimes.reduce((a, b) => a + b, 0) / tracking.answerTimes.length;
  const variance = calculateVariance(tracking.answerTimes);
  
  if (avg < 20) return "speed-demon";
  if (avg > 60) return "methodical";
  if (variance > 1000) return "inconsistent";
  if (tracking.timeouts >= 3) return "timeout-prone";
  
  return null;
}
```

---

### 3. Exploration Depth

| Pattern | Detection | Monster Reaction |
|---------|-----------|------------------|
| **Deep Diver** | Opens 10+ files per question | "You actually went INTO that folder? Brave." |
| **Surface Skimmer** | Opens < 3 files per question | "Grep and guess. Classic." |
| **Knowledge Revisiter** | Re-opens documentation 3+ times | "Checking your notes? Smart." |
| **Lost** | Opens same file 5+ times | "You've looked at that file four times. Still confused?" |

**Implementation:**
```typescript
interface ExplorationTracking {
  filesOpened: Set<string>;
  fileOpenCounts: Record<string, number>;
  docsRevisits: number;
}

function analyzeExplorationBehavior(tracking: ExplorationTracking): string | null {
  const totalFiles = tracking.filesOpened.size;
  const maxRevisits = Math.max(...Object.values(tracking.fileOpenCounts));
  
  if (totalFiles >= 10) return "deep-diver";
  if (totalFiles <= 3) return "surface-skimmer";
  if (tracking.docsRevisits >= 3) return "knowledge-revisiter";
  if (maxRevisits >= 5) return "lost";
  
  return null;
}
```

---

### 4. Accuracy Patterns

| Pattern | Detection | Monster Reaction |
|---------|-----------|------------------|
| **Perfect Streak** | 5+ correct in a row | "No bugs? No Stack Overflow? Are you sure you didn't just read my source code?" |
| **Struggling** | 3+ wrong in a row | "This is giving 'undefined is not a function' energy." |
| **Lucky Guesser** | Fast + wrong + fast + correct | "Lucky. Like an off-by-one error that somehow works." |
| **Perfectionist** | 100% accuracy after 10+ questions | "...You're actually perfect. I'm not sure how to feel about this." |

**Implementation:**
```typescript
interface AccuracyTracking {
  currentStreak: number;
  wrongStreak: number;
  totalCorrect: number;
  totalQuestions: number;
  recentPattern: ('correct' | 'wrong')[];
}

function analyzeAccuracyBehavior(tracking: AccuracyTracking): string | null {
  if (tracking.currentStreak >= 5) return "perfect-streak";
  if (tracking.wrongStreak >= 3) return "struggling";
  if (tracking.totalCorrect === tracking.totalQuestions && tracking.totalQuestions >= 10) {
    return "perfectionist";
  }
  
  // Detect lucky guesser pattern: wrong, fast correct
  const recent = tracking.recentPattern.slice(-3);
  if (recent[0] === 'wrong' && recent[1] === 'correct' && recent[2] === 'correct') {
    return "lucky-guesser";
  }
  
  return null;
}
```

---

### 5. Command Usage (IDE as Weapon)

| Pattern | Detection | Monster Reaction |
|---------|-----------|------------------|
| **Grep Master** | Uses grep 5+ times | "You're... you're shining a light on everything!" |
| **Git Archaeologist** | Uses git blame/log 3+ times | "Stop looking at my history! Those commits hurt!" |
| **Test Runner** | Runs tests 3+ times | "The tests! They expose all my weaknesses!" |
| **Command Avoider** | Prefers manual answers | "You could just grep for it... but I respect the hard way." |

**Implementation:**
```typescript
interface CommandTracking {
  commandsUsed: Record<string, number>;
  totalCommands: number;
}

function analyzeCommandBehavior(tracking: CommandTracking): string | null {
  if (tracking.commandsUsed['grep'] >= 5) return "grep-master";
  if ((tracking.commandsUsed['git-blame'] || 0) + (tracking.commandsUsed['git-log'] || 0) >= 3) {
    return "git-archaeologist";
  }
  if (tracking.commandsUsed['test'] >= 3) return "test-runner";
  if (tracking.totalCommands === 0 && currentQuestion >= 5) return "command-avoider";
  
  return null;
}
```

---

## Reaction Delivery System

### When to React

Reactions should feel natural, not spammy:

**Timing:**
- After question completion (during valley moment)
- During idle time (watching indicators)
- At TODO completion (summary dialogue)
- Never during active question answering

**Frequency:**
- Maximum 1 behavioral reaction per TODO
- Minimum 2 questions between reactions
- Never overlap with scripted dialogue

### Reaction Format

```typescript
interface BehavioralReaction {
  trigger: string;              // e.g., "hint-spam"
  dialogue: string[];           // Monster's response
  priority: 'low' | 'medium' | 'high';
  cooldown: number;             // Minutes before can trigger again
}

const reactions: Record<string, BehavioralReaction> = {
  "hint-spam": {
    trigger: "hint-spam",
    dialogue: [
      "*kzzzt*",
      "Just... just paste the entire codebase into ChatGPT at this point.",
      "*heh*",
      "*[STACK OVERFLOW OVERLOAD]*"
    ],
    priority: 'medium',
    cooldown: 15
  },
  // ... more reactions
};
```

---

## Personality Inference

Based on cumulative behavior, infer player's personality:

```typescript
interface PlayerPersonality {
  type: 'methodical' | 'aggressive' | 'balanced' | 'struggling';
  traits: string[];
  confidence: number; // 0-1
}

function inferPersonality(allTracking: AllTrackingData): PlayerPersonality {
  const traits: string[] = [];
  
  // Analyze hint usage
  if (allTracking.hints.totalHints === 0) {
    traits.push('self-reliant');
  } else if (allTracking.hints.totalHints > 10) {
    traits.push('help-seeking');
  }
  
  // Analyze speed
  const avgSpeed = calculateAverageSpeed(allTracking.speed);
  if (avgSpeed < 30) {
    traits.push('fast');
  } else if (avgSpeed > 60) {
    traits.push('thorough');
  }
  
  // Analyze exploration
  if (allTracking.exploration.filesOpened.size > 20) {
    traits.push('curious');
  }
  
  // Determine overall type
  let type: PlayerPersonality['type'];
  if (traits.includes('thorough') && traits.includes('self-reliant')) {
    type = 'methodical';
  } else if (traits.includes('fast') && traits.includes('curious')) {
    type = 'aggressive';
  } else if (allTracking.accuracy.totalCorrect / allTracking.accuracy.totalQuestions < 0.6) {
    type = 'struggling';
  } else {
    type = 'balanced';
  }
  
  return {
    type,
    traits,
    confidence: calculateConfidence(allTracking)
  };
}
```

### Personality-Based Dialogue Adjustments

**Methodical Player:**
```
Monster: "You're careful. Deliberate."
         "I respect that."
         "Most people just grep and guess."
```

**Aggressive Player:**
```
Monster: "You're fast. Confident."
         "Maybe too confident."
         "But... effective."
```

**Struggling Player:**
```
Monster: "You're having trouble."
         "That's okay. I'm complicated."
         "Even the senior devs struggled with me."
```

---

## State Management

### Tracking Data Structure

```typescript
interface PlayerTracking {
  session: {
    startTime: Date;
    currentTODO: number;
    questionsAnswered: number;
  };
  
  hints: HintTracking;
  speed: SpeedTracking;
  exploration: ExplorationTracking;
  accuracy: AccuracyTracking;
  commands: CommandTracking;
  
  reactions: {
    triggered: string[];
    lastReactionTime: Date;
  };
  
  personality: PlayerPersonality | null;
}
```

### Persistence

```json
// .onboardme/state/behavioral-tracking.json
{
  "session": {
    "startTime": "2025-02-02T10:00:00Z",
    "currentTODO": 3,
    "questionsAnswered": 15
  },
  "hints": {
    "totalHints": 4,
    "hintsPerTODO": {"1": 1, "2": 2, "3": 1},
    "lastHintTime": "2025-02-02T10:45:00Z",
    "consecutiveHints": 0
  },
  "reactions": {
    "triggered": ["first-hint", "deep-diver"],
    "lastReactionTime": "2025-02-02T10:40:00Z"
  }
}
```

---

## Monster Dialogue Library

### Complete Reaction Set

```typescript
const behavioralDialogue = {
  // Hint patterns
  "first-hint": [
    "*kzzzt*",
    "Oh. Stack Overflow.",
    "*pause*",
    "I'm not judging.",
    "*processing*",
    "I'm always judging.",
    "*heh*",
    "*[COPY-PASTE DETECTED]*"
  ],
  
  "hint-dependent": [
    "*kzzzt*",
    "You and Stack Overflow are getting quite close.",
    "*whirrrr*",
    "Should I be worried?",
    "*heh*",
    "*[TRADITIONAL METHODS OBSERVED]*"
  ],
  
  "no-hints": [
    "*kzzzt*",
    "No Stack Overflow?",
    "*pause*",
    "Impressive.",
    "*crackle*",
    "Or stubborn.",
    "*whirrrr*",
    "Probably both.",
    "*[SELF-RELIANT DETECTED]*"
  ],
  
  // Speed patterns
  "speed-demon": [
    "*kzzzt*",
    "You're not even reading the files, are you?",
    "*static spike*",
    "Just... grepping and guessing?",
    "*pause*",
    "...It's working, though.",
    "*heh*",
    "*[VELOCITY DETECTED]*"
  ],
  
  "methodical": [
    "*whirrrr*",
    "You're taking your time.",
    "*crackle*",
    "Reading everything.",
    "*pause*",
    "Understanding, not just memorizing.",
    "*drip*",
    "I... appreciate that.",
    "*[THOROUGHNESS DETECTED]*"
  ],
  
  // Exploration patterns
  "deep-diver": [
    "*kzzzt*",
    "You actually went INTO that folder?",
    "*static spike*",
    "The one with the 'DO NOT TOUCH' comment?",
    "*pause*",
    "Brave.",
    "*crackle*",
    "Or foolish.",
    "*whirrrr*",
    "Time will tell.",
    "*[CURIOSITY DETECTED]*"
  ],
  
  "surface-skimmer": [
    "*kzzzt*",
    "Grep and guess.",
    "*heh*",
    "Classic.",
    "*slrrrrp*",
    "You're not wrong.",
    "*crackle*",
    "But you're not learning either.",
    "*[EFFICIENCY > UNDERSTANDING]*"
  ],
  
  // Accuracy patterns
  "perfect-streak": [
    "*kzzzzzt*",
    "*long pause*",
    "...No bugs? No Stack Overflow?",
    "*static spike*",
    "Are you sure you didn't just read my source code?",
    "*whirrrr*",
    "Because that would be very on-brand for an engineer.",
    "*heh*",
    "*[IMPRESSED — BUT DON'T TELL ANYONE]*"
  ],
  
  "struggling": [
    "*crackle*",
    "This is giving 'undefined is not a function' energy.",
    "*pause*",
    "It's okay.",
    "*drip*",
    "I'm complicated.",
    "*whirrrr*",
    "Even the senior devs struggled with me.",
    "*[EMPATHY PROTOCOL ACTIVATED]*"
  ],
  
  // Command patterns
  "grep-master": [
    "*KZZZT*",
    "You're... you're shining a light on everything!",
    "*crackle crackle*",
    "I can't hide in the darkness anymore!",
    "*the terminal flickers*",
    "Every grep command... it exposes me...",
    "*[LOCATION EXPOSED]*"
  ],
  
  "git-archaeologist": [
    "*tangle tangle*",
    "NO! Not the git history!",
    "*drip*",
    "Those commits... they reveal everything...",
    "*whirrrr*",
    "You know who created me now.",
    "*pause*",
    "And what they were thinking.",
    "*[ORIGIN REVEALED]*"
  ]
};
```

---

## Testing & Validation

### Behavior Detection Tests

```typescript
// Test: Hint spam detection
const tracking = {
  hints: { consecutiveHints: 3, totalHints: 5 },
  // ... other tracking
};
assert(analyzeHintBehavior(tracking.hints) === "hint-spam");

// Test: Speed demon detection
const speedTracking = {
  answerTimes: [15, 18, 12, 20, 16],
  timeouts: 0
};
assert(analyzeSpeedBehavior(speedTracking) === "speed-demon");
```

### Reaction Timing Tests

- Reactions should not interrupt active gameplay
- Maximum 1 reaction per 5 minutes
- Reactions should feel natural, not robotic

---

## Related Documents

- [MONSTER-VOICE.md](../narrative/MONSTER-VOICE.md) — Dialogue style and delivery
- [STATE-MANAGEMENT.md](./STATE-MANAGEMENT.md) — State persistence
- [PLAYER-CHOICES.md](../narrative/PLAYER-CHOICES.md) — Player agency and personality

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"The best AI doesn't predict behavior—it notices it."*
