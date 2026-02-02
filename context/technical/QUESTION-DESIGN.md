# Question Design Principles

## Anti-Shortcut Design

Questions must require **real exploration**, not just grep:

| ❌ Bad Question | ✅ Good Question |
|----------------|------------------|
| "What port does the API run on?" | "Trace from app startup to where the port is configured. What file defines it and why that specific value?" |
| "Find the validateEmail function" | "A user reports 'test@test' is accepted. Find where validation happens and why it fails to catch this." |
| "What does PaymentService do?" | "PaymentService calls 3 other services. Name them and explain why each is needed." |

## Question Requirements

1. **Multi-hop:** Requires visiting 2+ files
2. **Contextual:** Must understand *why*, not just *what*
3. **Verifiable:** AI can verify answer is reasoned
4. **Time-appropriate:** Enough time to explore, not read everything
5. **Learning-oriented:** Even wrong answers teach something

## The Teaching Loop

```
┌──────────┐     ┌──────────┐     ┌─────────────────────┐
│   PLAY   │ ──► │  RESULT  │ ──► │  AI EXPLAINS        │
│   GAME   │     │ (Win/Lose)│     │  "Here's what this  │
└──────────┘     └──────────┘     │   actually means.." │
                                   └──────────┬──────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │ KNOWLEDGE UNLOCKED  │
                                   │ (Saved to log)      │
                                   └─────────────────────┘

Wrong answer? → STILL get explanation
Right answer? → Get DEEPER context as reward
```
