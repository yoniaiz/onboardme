# Emotional Pacing Guide

> **The rhythm of tension and release that makes experiences feel alive.**

This document specifies the emotional pacing throughout OnboardMe, ensuring players experience valleys between peaks rather than constant intensity.

---

## Core Principle

> "Action is like candy—occasional peaks keep it exciting, but constant intensity makes it bland."

Research shows that constant high intensity leads to:
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
   INTRO  TODO1   TODO2    TODO3    TODO4   TODO5  FIXME
    
    ↑      ↑        ↑        ↑        ↑       ↑      ↑
  Hook   Peak1   Peak2    Peak3    Peak4   Peak5  Climax
          ↓        ↓        ↓        ↓       ↓
        Valley1  Valley2  Valley3  Valley4  Valley5
```

---

## Pacing Phases

### Phase 1: Hook (Cold Open)
**Duration:** 17 seconds  
**Intensity:** Medium  
**Goal:** Create curiosity without overwhelming

```
*kzzzt*
"Oh. A new one."
"Welcome to the codebase."
```

**Emotional state:** Intrigued, curious

---

### Phase 2: Introduction
**Duration:** 2-3 minutes  
**Intensity:** Low-Medium  
**Goal:** Orient player, set expectations

- Game explanation
- TODO list overview
- Controls and mechanics

**Emotional state:** Learning, preparing

---

### Phase 3: TODO #1 - First Peak
**Duration:** 12-15 minutes  
**Intensity:** Medium-High  
**Goal:** Engage player with challenges

- Active gameplay
- Questions and challenges
- Learning codebase structure

**Emotional state:** Focused, challenged

**Peak moment:** Completing final sub-task

---

### Phase 4: Valley #1 - First Breath
**Duration:** 30-45 seconds  
**Intensity:** Low  
**Goal:** Let player process accomplishment

**Sequence:**
1. Completion celebration (5 seconds)
2. Stats reveal (10 seconds)
3. **Silence** (2-3 seconds) ← Critical
4. Monster appears (15-20 seconds)
5. Transition to next TODO (5 seconds)

**Emotional state:** Accomplished, reflective

**What happens in the silence:**
- No dialogue
- No sound effects
- Just ambient presence: `*drip...*` or `*distant crackle*`
- Player sits with their achievement

---

### Phase 5: TODO #2 - Building Peak
**Duration:** 12-15 minutes  
**Intensity:** Medium-High  
**Goal:** Increase complexity

**Emotional state:** Confident, engaged

---

### Phase 6: Valley #2 - Deepening
**Duration:** 45-60 seconds  
**Intensity:** Low-Medium  
**Goal:** Introduce Monster's backstory hints

**Sequence:**
1. Completion celebration
2. Stats reveal
3. **Silence** (2-3 seconds)
4. Monster appears with more vulnerability
5. Brief knowledge unlock moment
6. Transition

**Emotional state:** Curious about Monster, empathetic

---

### Phase 7: TODO #3 - Emotional Peak
**Duration:** 15-18 minutes  
**Intensity:** High  
**Goal:** Reveal Monster's origin story

**Peak moment:** Monster's backstory revelation

**Emotional state:** Empathetic, determined

---

### Phase 8: Valley #3 - Processing
**Duration:** 60-75 seconds  
**Intensity:** Medium  
**Goal:** Let backstory sink in

**Sequence:**
1. Completion celebration
2. Stats reveal
3. **Longer silence** (4-5 seconds) ← Emotional processing
4. Monster appears, more vulnerable
5. Memory log unlocked
6. Transition

**Emotional state:** Reflective, connected to Monster

---

### Phase 9: TODO #4 - Existential Peak
**Duration:** 15-18 minutes  
**Intensity:** High  
**Goal:** Monster's existential crisis

**Emotional state:** Understanding, conflicted

---

### Phase 10: Valley #4 - False Peace
**Duration:** 60 seconds  
**Intensity:** Low  
**Goal:** Calm before the storm

**Sequence:**
1. Completion celebration
2. Stats reveal
3. **Silence** (3-4 seconds)
4. Monster appears, resigned/peaceful
5. Hint of upcoming confrontation
6. Transition

**Emotional state:** Calm, anticipatory

---

### Phase 11: TODO #5 - Desperate Peak
**Duration:** 15-18 minutes  
**Intensity:** Very High  
**Goal:** Monster's desperation

**Peak moment:** Monster's plea/threat

**Emotional state:** Tense, conflicted

---

### Phase 12: Valley #5 - Before the Storm
**Duration:** 75-90 seconds  
**Intensity:** Medium-High  
**Goal:** Build tension for boss battle

**Sequence:**
1. Completion celebration
2. Stats reveal
3. **Tense silence** (5 seconds) ← Anticipation
4. Monster's desperate dialogue
5. Boss battle warning
6. Brief preparation moment
7. Transition to boss

**Emotional state:** Anxious, prepared, determined

---

### Phase 13: BOSS BATTLE - Climax
**Duration:** 15-20 minutes  
**Intensity:** Maximum  
**Goal:** Test everything learned

**Internal pacing:**
- Phase 1: High intensity
- Brief respite between phases (10 seconds)
- Phase 2: Higher intensity
- Brief respite (10 seconds)
- Phase 3: Maximum intensity

**Emotional state:** Focused, determined, stressed

---

### Phase 14: Victory - Resolution
**Duration:** 2-3 minutes  
**Intensity:** High → Low (descending)  
**Goal:** Emotional catharsis

**Sequence:**
1. Victory moment (high intensity)
2. **Long silence** (8-10 seconds) ← Let it sink in
3. Monster's peaceful transformation
4. Knowledge transfer
5. Victory stats
6. Shareable summary
7. Post-game suggestion

**Emotional state:** Triumphant → Bittersweet → Accomplished

---

## Valley Design Principles

### What Makes a Good Valley?

1. **Silence is powerful**
   - 2-5 seconds of no dialogue or sound effects
   - Only ambient presence indicators
   - Lets players breathe

2. **Gradual transitions**
   - Don't snap from peak to valley
   - Use fading sounds: `*the static fades*`
   - Slow reveal of next content

3. **Reflection opportunities**
   - Show stats (what was accomplished)
   - Display unlocked knowledge
   - Brief Monster dialogue that's less intense

4. **Ambient atmosphere**
   - Subtle sounds without dialogue
   - `*drip...*` or `*distant crackle*`
   - Reminds players Monster is present without demanding attention

### What to Avoid in Valleys

- ❌ Immediate next challenge
- ❌ Loud or jarring sounds
- ❌ Complex new information
- ❌ Time pressure
- ❌ Multiple simultaneous stimuli

---

## Silence Specifications

| Moment | Silence Duration | Purpose |
|--------|------------------|---------|
| After TODO #1 | 2-3 seconds | First breath |
| After TODO #2 | 2-3 seconds | Processing |
| After TODO #3 | 4-5 seconds | Emotional backstory processing |
| After TODO #4 | 3-4 seconds | Existential weight |
| After TODO #5 | 5 seconds | Tension before boss |
| After Boss Victory | 8-10 seconds | Let triumph sink in |

**Implementation:** Actual silence—no text, no sounds, just a blank screen or minimal UI.

---

## Ambient Presence During Valleys

While valleys are "quiet," they're not empty. Subtle atmospheric elements maintain immersion:

### Ambient Sound Indicators

Appear randomly during valley moments (not all at once):

```
*drip...*
```

```
*distant crackle*
```

```
*whirrrr (fading)*
```

```
*static... barely audible*
```

**Display rules:**
- Appear in a muted corner of the screen
- Fade in slowly (500ms)
- Stay visible for 2-3 seconds
- Fade out slowly (500ms)
- Only one at a time
- 30% chance of appearing during any valley

---

## Monster Dialogue Pacing in Valleys

Monster appearances after TODOs should feel different from in-game watching:

### Valley Monster Appearance

```
[Completion celebration]

[Stats reveal]

[2-3 seconds of silence]

*the static returns*

*kzzzt*

*crackle*

"[Dialogue begins - slower, more contemplative]"

*pause*

"[More dialogue]"

*the noise fades*

*[DISCONNECTED]*

[5 second transition]

[Next TODO begins]
```

**Key differences from in-game Monster:**
- Slower entry (2-3 seconds vs instant)
- More pauses between lines
- Softer exit
- Longer transition to next content

---

## Pacing Mistakes to Avoid

### ❌ The "Constant Action" Trap
```
TODO Complete → IMMEDIATE Monster → IMMEDIATE Next TODO
```
**Problem:** No time to process, feels rushed

### ✓ Correct Pacing
```
TODO Complete → Celebration → Stats → Silence → Monster → Transition → Next TODO
```
**Benefit:** Player has time to feel accomplishment

---

### ❌ The "Dead Air" Trap
```
TODO Complete → 30 seconds of nothing → Next TODO
```
**Problem:** Too much emptiness, loses momentum

### ✓ Correct Pacing
```
TODO Complete → 2-3 seconds silence → Ambient presence → Monster → Next TODO
```
**Benefit:** Breathing room without boredom

---

### ❌ The "Inconsistent Rhythm" Trap
```
TODO #1: 5 second valley
TODO #2: 30 second valley
TODO #3: 2 second valley
```
**Problem:** Unpredictable, jarring

### ✓ Correct Pacing
```
TODO #1: 30-45 second valley
TODO #2: 45-60 second valley
TODO #3: 60-75 second valley (emotional moment)
```
**Benefit:** Gradual escalation, predictable rhythm

---

## Testing Checklist

- [ ] Players report feeling "breathing room" between challenges
- [ ] Completion moments feel satisfying (not rushed)
- [ ] Monster appearances feel dramatic (not jarring)
- [ ] Silence moments create anticipation (not boredom)
- [ ] Emotional peaks have maximum impact
- [ ] Players don't report fatigue until late game (expected)
- [ ] Boss battle feels climactic (not "just another TODO")

---

## Implementation Notes

### For Developers

1. **Timing is critical** — Use actual delays, not just fast text
2. **Silence is content** — Don't fill every moment
3. **Ambient presence** — Subtle reminders, not interruptions
4. **Transitions matter** — Fade in/out, don't snap
5. **Test with real players** — Pacing is felt, not measured

### Configuration Options

Consider allowing players to adjust pacing:
- **Normal:** As specified in this document
- **Fast:** 50% shorter valleys (for experienced players)
- **Relaxed:** 50% longer valleys (for thoughtful players)

---

## Related Documents

- [COLD-OPEN.md](./COLD-OPEN.md) — Introduction sequence
- [MONSTER-VOICE.md](./MONSTER-VOICE.md) — Monster dialogue style
- [GAME-NARRATIVE.md](./GAME-NARRATIVE.md) — Overall narrative arc
- [JUICE-FEEDBACK.md](../visuals/JUICE-FEEDBACK.md) — Feedback systems

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"In music, the silence between notes is as important as the notes themselves. In games, the valleys between peaks are as important as the peaks."*
