# Skill Contract Template

Every game skill MUST follow this contract structure. This ensures consistent behavior, fair evaluation, and safe operation across all OnboardMe games.

---

## Contract Structure

### Goal

What skill this game teaches or tests. Be specific about the learning outcome.

**Example:**
> Learn to identify project type, tech stack, and architecture by examining file structure, dependencies, and documentation.

---

### Inputs

Define exactly what resources the skill may access:

| Resource Type | Allowed | Examples |
|---------------|---------|----------|
| Files to read | List explicitly | `package.json`, `README.md`, `src/**/*.ts` |
| Commands to run | List with constraints | `npm test` (read-only), `git log` |
| Files to edit | Only if game requires | `CASE_FILE.md` (artifact only) |

**Important:**
- Default to read-only unless the game explicitly requires edits
- Never allow arbitrary file writes
- Command allowlist should be minimal

---

### State Keys

Define what the skill reads from and writes to `state.json`:

**Reads:**
```typescript
player.name           // For personalized dialogue
player.currentLives   // Adjust difficulty
progress.currentGame  // Resume context
monster.currentMood   // Voice selection
behavior.hintUsageCount // Hint availability
```

**Writes:**
```typescript
progress.questionHistory[]  // Add results
monster.respectLevel        // Update based on performance
monster.memorableExchanges  // Store callback moments
session.conversationSummary // For resume
```

---

### Rubric (MANDATORY)

Every game MUST define a 4-tier rubric for answer evaluation:

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Answer shows misunderstanding or wrong direction | "It's a Python project" (when it's Node) |
| **Partial** | Right direction, missing key details | "It's a Node API" (missing framework, database) |
| **Correct** | Accurate and complete answer | "It's an Express API with PostgreSQL" |
| **Deep** | Shows insight beyond the question | "Express API with PostgreSQL, uses repository pattern, includes rate limiting middleware" |

**Scoring:**
- Incorrect: 0 commits, lose 1 life
- Partial: 1 commit, probe for more detail
- Correct: 2 commits
- Deep: 3 commits, Monster shows grudging respect

**Probing Pattern for Partial Answers:**
```
Monster: "*whirrrr* Close. Can you be more specific about the framework?"
Monster: "*kzzzt* You're warm. What database does it use?"
```

---

### Recovery

Define how to handle edge cases:

**User is stuck (progressive hints):**
1. First request: Vague direction ("Have you checked the config files?")
2. Second request: More specific ("The database config might help...")
3. Third request: Nearly explicit ("Look at `src/db/connection.ts`")
4. Cost: Each hint costs 1 commit from final score

**User disputes scoring:**
```
Monster: "*crackle* You think THAT was correct?"
Monster: "*heh* Fine. Explain your reasoning."
[User explains]
Monster: "*long pause* ...I'll allow it."
         OR
Monster: "*kzzzt* Nice try. Still wrong."
```

**Conversation derails:**
```
Monster: "*static spike* That's... interesting."
Monster: "*slrrrrp* But not relevant."
Monster: "Back to the question: [restate current challenge]"
Monster: "*[RELEVANCE RESTORED]*"
```

---

### Timeboxing

Every game must have clear time boundaries:

| Parameter | Value | Notes |
|-----------|-------|-------|
| Expected duration | X minutes | Target completion time |
| Warning trigger | X + 5 min | "You're taking a while..." |
| Move-on trigger | X + 10 min | "Let's move on." |
| Checkpoint interval | Every N questions | Save progress |

**Checkpoint behavior:**
- Save progress to state.json
- Allow graceful exit
- Enable resume from checkpoint

---

## Template for New Game Skills

```markdown
# [Game Name] Skill

## Goal

[One sentence: What skill does this teach?]

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| [files] | read | [purpose] |
| [commands] | run | [constraints] |

## State

**Reads:** [list keys]
**Writes:** [list keys]

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| Incorrect | [criteria] | [example] |
| Partial | [criteria] | [example] |
| Correct | [criteria] | [example] |
| Deep | [criteria] | [example] |

## Flow

1. [Step 1]
2. [Step 2]
...

## Recovery

**Stuck:** [progressive hints]
**Disputed:** [handling]
**Off-script:** [redirect]

## Timing

- Duration: X minutes
- Checkpoints: every N questions
```

---

*Document Version: 1.0*
*Last Updated: 2026-02-05*
