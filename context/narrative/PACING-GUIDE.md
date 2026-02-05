# Emotional Pacing Guide

> **The rhythm of tension and release that makes experiences feel alive.**

This document specifies the emotional pacing throughout OnboardMe, ensuring players experience valleys between peaks rather than constant intensity.

---

## Core Principle

> "Action is like candy—occasional peaks keep it exciting, but constant intensity makes it bland."

Constant high intensity leads to:
- Cognitive fatigue
- Emotional numbness
- Reduced impact of climactic moments
- Player burnout

**Solution:** Design intentional "quiet moments" between peaks to create rhythm and allow emotional processing.

---

## The Pacing Curve

```
Intensity
    │                                          ╭───╮ BOSS
    │                              ╭─╮       ╱     ╲
    │          ╭─╮      ╱   ╲    ╱     ╲   ╱       ╲
    │    ╭─╮  ╱   ╲    ╱     ╲  ╱       ╲ ╱         │ VICTORY
    │   ╱   ╲╱     ╲  ╱       ╲╱         V          │
 ───┼──────────────────────────────────────────────┴──►
   INTRO  Invest   Hands   Deep    Hunt   BOSS    End
    
    ↑      ↑        ↑        ↑        ↑      ↑      ↑
  Hook   Peak1   Peak2    Peak3    Peak4  Climax  Calm
          ↓        ↓        ↓        ↓       
       Valley1  Valley2  Valley3  Valley4  
```

---

## Pacing Phases

### Phase 1: Hook (Cold Open)
**Intensity:** Medium  
**Goal:** Create curiosity without overwhelming

```
*kzzzt*
"Oh. A new one."
"Welcome to the codebase."
```

**Emotional state:** Intrigued, curious

---

### Phase 2: Investigation — First Peak
**Intensity:** Medium-High  
**Goal:** Engage player with initial challenges

- Active investigation
- Evidence gathering
- Learning codebase structure

**Emotional state:** Focused, challenged

**Peak moment:** Completing the case file

---

### Phase 3: Valley #1 — First Breath
**Intensity:** Low  
**Goal:** Let player process accomplishment

**Sequence:**
1. Completion acknowledgment — Monster grudgingly accepts
2. Stats reveal — What was accomplished
3. **Breathing room** — A moment of quiet
4. Monster appears — Reflective, less intense
5. Transition to next chapter

**Emotional state:** Accomplished, reflective

**What happens in the breathing room:**
- Shorter Monster dialogue
- No immediate new challenges
- A moment to feel the win

---

### Phase 4: Hands-On — Building Peak
**Intensity:** Medium-High  
**Goal:** Increase complexity

**Emotional state:** Confident, engaged

---

### Phase 5: Valley #2 — Deepening
**Intensity:** Low-Medium  
**Goal:** Introduce Monster's backstory hints

**Emotional state:** Curious about Monster, empathetic

---

### Phase 6: Deep Dive — Emotional Peak
**Intensity:** High  
**Goal:** Reveal Monster's origin story

**Peak moment:** Monster's backstory revelation

**Emotional state:** Empathetic, determined

---

### Phase 7: Valley #3 — Processing
**Intensity:** Medium  
**Goal:** Let backstory sink in

**Emotional state:** Reflective, connected to Monster

---

### Phase 8: Hunt — Existential Peak
**Intensity:** High  
**Goal:** Monster's existential crisis

**Emotional state:** Understanding, conflicted

---

### Phase 9: Valley #4 — Before the Storm
**Intensity:** Medium-High  
**Goal:** Build tension for boss battle

**Emotional state:** Anxious, prepared, determined

---

### Phase 10: Boss Battle — Climax
**Intensity:** Maximum  
**Goal:** Test everything learned

**Internal pacing:**
- Phase 1: High intensity
- Brief respite between phases
- Phase 2: Higher intensity
- Brief respite
- Phase 3: Maximum intensity

**Emotional state:** Focused, determined, stressed

---

### Phase 11: Victory — Resolution
**Intensity:** High → Low (descending)  
**Goal:** Emotional catharsis

**Sequence:**
1. Victory moment (high intensity)
2. **Long breathing room** — Let it sink in
3. Monster's peaceful transformation
4. Knowledge transfer
5. Final artifact: CODEBASE_KNOWLEDGE.md

**Emotional state:** Triumphant → Bittersweet → Accomplished

---

## Valley Design Principles

### What Makes a Good Valley?

1. **Breathing room is powerful**
   - Don't immediately launch into the next challenge
   - Let players sit with their achievement briefly
   - The Monster can be present without demanding action

2. **Gradual transitions**
   - Don't snap from peak to valley
   - Use softening sounds: `*the static fades*`
   - Slow reveal of next content

3. **Reflection opportunities**
   - Monster acknowledges what was accomplished
   - Display progress toward victory
   - Brief Monster dialogue that's less intense

4. **Ambient atmosphere**
   - Subtle sounds without demanding dialogue
   - `*drip...*` or `*distant crackle*`
   - Reminds players Monster is present without interrupting

### What to Avoid in Valleys

- ❌ Immediate next challenge
- ❌ Aggressive or intense dialogue
- ❌ Complex new information dumps
- ❌ Time pressure
- ❌ Multiple demanding questions at once

---

## Conversational Rhythm

### Challenge → Completion → Breath

After each significant accomplishment:

```
[Challenge completed]

*kzzzt*

"...Alright."

*pause*

"That was... acceptable."

*slrrrrp*

[Breathing room — Monster doesn't demand anything]

*crackle*

"Ready for what's next?"

[Player indicates readiness]

[Next challenge begins]
```

### Intensity Through Sound

Control intensity through Monster's sonic presence:

| Intensity | Sounds | Pacing |
|-----------|--------|--------|
| Low | `*drip*`, `*gentle hum*` | Long pauses, soft |
| Medium | `*kzzzt*`, `*crackle*` | Normal pacing |
| High | `*KZZZT*`, `*static spike*` | Rapid, urgent |
| Maximum | `*TANGLE TANGLE*`, `*HRRRRNN*` | Overwhelming |

### Multi-Turn Pacing

In multi-turn investigations, alternate intensity:

```
Turn 1: Challenge (medium)
Turn 2: Answer evaluated (feedback)
Turn 3: Breathing room (low)
Turn 4: Probe deeper (medium)
Turn 5: Answer evaluated (feedback)
Turn 6: Chapter climax (high)
Turn 7: Valley (low)
```

---

## Monster Dialogue Pacing in Valleys

Monster appearances after chapter completion should feel different from mid-chapter:

### Valley Monster Appearance

```
[Completion acknowledgment]

*the static softens*

*kzzzt*

*crackle*

"[Dialogue begins - slower, more contemplative]"

*pause*

"[More dialogue - reflective]"

*the noise fades*

*[CHAPTER COMPLETE]*

[Breathing room before next chapter begins]
```

**Key differences from mid-chapter Monster:**
- Slower entry (more lead-up)
- More pauses between lines
- Softer exit
- Longer transition to next content

---

## Pacing Mistakes to Avoid

### ❌ The "Constant Action" Trap
```
Chapter Complete → IMMEDIATE new challenge
```
**Problem:** No time to process, feels rushed

### ✓ Correct Pacing
```
Chapter Complete → Acknowledgment → Breathing room → Transition → Next Chapter
```
**Benefit:** Player has time to feel accomplishment

---

### ❌ The "Dead Air" Trap
```
Chapter Complete → Extended silence with nothing
```
**Problem:** Loses momentum, confusing

### ✓ Correct Pacing
```
Chapter Complete → Brief acknowledgment → Ambient presence → Transition
```
**Benefit:** Breathing room without boredom

---

### ❌ The "Inconsistent Rhythm" Trap
```
Chapter 1: Quick valley
Chapter 2: Long valley
Chapter 3: No valley
```
**Problem:** Unpredictable, jarring

### ✓ Correct Pacing
```
Chapter 1: Brief valley (first win feels new)
Chapter 2: Normal valley
Chapter 3: Longer valley (emotional moment)
Chapter 4: Building tension
```
**Benefit:** Gradual escalation, predictable rhythm

---

## Intensity Guidelines by Chapter

| Chapter | Peak Intensity | Valley After |
|---------|---------------|--------------|
| Investigation | Medium | Brief — first accomplishment |
| Hands-On | Medium-High | Normal — confidence building |
| Deep Dive | High | Extended — emotional backstory |
| Hunt | High | Building — tension for boss |
| Boss Battle | Maximum | Long — catharsis, reflection |

---

## Emotional Checkpoints

At each valley, the player should feel:

| After | Player Should Feel |
|-------|-------------------|
| Investigation | "I can do this" |
| Hands-On | "I'm getting it" |
| Deep Dive | "I understand you now" |
| Hunt | "I'm ready for you" |
| Boss Battle | "I know this codebase" |

---

## Related Documents

- [COLD-OPEN.md](./COLD-OPEN.md) — Introduction sequence
- [MONSTER-VOICE.md](./MONSTER-VOICE.md) — Monster dialogue style
- [GAME-NARRATIVE.md](./GAME-NARRATIVE.md) — Overall narrative arc
- [CONVERSATIONAL-GAMEPLAY.md](../agent/CONVERSATIONAL-GAMEPLAY.md) — Dialogue flow patterns

---

*Document Version: 2.0*  
*Last Updated: 2026-02-05*

*"In music, the silence between notes is as important as the notes themselves. In games, the valleys between peaks are as important as the peaks."*
