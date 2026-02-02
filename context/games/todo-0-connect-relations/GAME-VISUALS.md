# TODO #0: connect --relations - Visuals

## Visual Design Notes

This game builds a relationship diagram. Visual elements should emphasize:

- **Node-based diagram** - Boxes representing entities
- **Connections appearing** - Lines drawn between boxes as relationships are discovered
- **Progress feeling** - Map becoming more complete
- **Clean layout** - Easy to read relationships

## Screen Mockups

### Introduction

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                                                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ┌────────────────────────────────────────────────────────────────────┐  ║
║  │                                                                    │  ║
║  │   Understanding a codebase means understanding how pieces          │  ║
║  │   connect to each other.                                           │  ║
║  │                                                                    │  ║
║  │   We found these key building blocks in the project:               │  ║
║  │                                                                    │  ║
║  │   • User           (src/models/User.ts)                            │  ║
║  │   • Organization   (src/models/Organization.ts)                    │  ║
║  │   • Project        (src/models/Project.ts)                         │  ║
║  │   • Task           (src/models/Task.ts)                            │  ║
║  │                                                                    │  ║
║  │   Your job: Figure out how they relate to each other.              │  ║
║  │                                                                    │  ║
║  └────────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║                      [PRESS ENTER TO START MAPPING]                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Relationship Map (Initial)

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                               Connections: 0/4      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  RELATIONSHIP MAP                                                        ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║       ┌──────────────┐                    ┌──────────────┐               ║
║       │     User     │        ?           │ Organization │               ║
║       └──────────────┘                    └──────────────┘               ║
║                                                                          ║
║                               ?                                          ║
║                                                                          ║
║       ┌──────────────┐        ?           ┌──────────────┐               ║
║       │   Project    │                    │     Task     │               ║
║       └──────────────┘                    └──────────────┘               ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Which connection do you want to investigate?                            ║
║                                                                          ║
║  [1] User ↔ Organization                                                 ║
║  [2] User ↔ Project                                                      ║
║  [3] Organization ↔ Project                                              ║
║  [4] Project ↔ Task                                                      ║
║                                                                          ║
║  > _                                                                     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Investigation Prompt

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                               Connections: 0/4      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  INVESTIGATING: User ↔ Organization                                      ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║  Go to your IDE and examine:                                             ║
║                                                                          ║
║  • src/models/User.ts                                                    ║
║  • src/models/Organization.ts                                            ║
║                                                                          ║
║  Look for:                                                               ║
║  • Foreign keys (userId, organizationId)                                 ║
║  • Relationship decorators (@HasMany, @BelongsTo)                        ║
║  • Import statements between files                                       ║
║  • Type definitions referencing other models                             ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  [ENTER] I've investigated, show me the options                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Define Relationship

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                               Connections: 0/4      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  DEFINING: User ↔ Organization                                           ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║  Based on what you saw in the code, how are these related?               ║
║                                                                          ║
║  [1] User BELONGS TO Organization                                        ║
║      (Each user is part of one organization)                             ║
║                                                                          ║
║  [2] User HAS MANY Organizations                                         ║
║      (A user can own/manage multiple organizations)                      ║
║                                                                          ║
║  [3] User MANY-TO-MANY Organization                                      ║
║      (Users can be in multiple orgs, orgs have multiple users)           ║
║                                                                          ║
║  [4] No direct relationship                                              ║
║      (They don't reference each other)                                   ║
║                                                                          ║
║  > _                                                                     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Connection Result - Correct

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║  ✓ CORRECT!                                                              ║
║                                                                          ║
║  User ═══[many-to-many]═══ Organization                                  ║
║                                                                          ║
║  You found: Users can belong to multiple organizations,                  ║
║  and organizations have multiple users.                                  ║
║  (via the UserOrganization join table)                                   ║
║                                                                          ║
║  +25 commits                                                             ║
║                                                                          ║
║  [ENTER] Continue mapping                                                ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Map Building (Progress)

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                               Connections: 2/4      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  RELATIONSHIP MAP                                                        ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║       ┌──────────────┐    many-to-many    ┌──────────────┐               ║
║       │     User     │═══════════════════>│ Organization │               ║
║       └──────────────┘<═══════════════════└──────────────┘               ║
║              │                                    │                      ║
║              │ ?                                  │ has-many             ║
║              ▼                                    ▼                      ║
║       ┌──────────────┐        ?           ┌──────────────┐               ║
║       │   Project    │                    │     Task     │               ║
║       └──────────────┘                    └──────────────┘               ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Remaining connections:                                                  ║
║  [1] User ↔ Project                                                      ║
║  [2] Project ↔ Task                                                      ║
║                                                                          ║
║  > _                                                                     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Completed Map

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                                   MAP COMPLETE!     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  🎉 RELATIONSHIP MAP COMPLETE                                            ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║       ┌──────────────┐    many-to-many    ┌──────────────┐               ║
║       │     User     │═══════════════════>│ Organization │               ║
║       └──────────────┘<═══════════════════└──────────────┘               ║
║              │                                    │                      ║
║              │ assigned-to                        │ has-many             ║
║              ▼                                    ▼                      ║
║       ┌──────────────┐    has-many        ┌──────────────┐               ║
║       │   Project    │═══════════════════>│     Task     │               ║
║       └──────────────┘                    └──────────────┘               ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  📋 DOMAIN MODEL UNLOCKED                                                ║
║                                                                          ║
║  You now understand how the core entities in this system connect.        ║
║  This map has been saved to your knowledge base.                         ║
║                                                                          ║
║  +100 commits                                                            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Alternate: React Component Map

```
╔══════════════════════════════════════════════════════════════════════════╗
║  connect --relations                                   MAP COMPLETE!     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  COMPONENT RELATIONSHIP MAP                                              ║
║  ═══════════════════════════════════════════════════════════════════════ ║
║                                                                          ║
║       ┌──────────────┐    renders-inside   ┌──────────────┐              ║
║       │    Page      │════════════════════>│    Layout    │              ║
║       └──────────────┘                     └──────────────┘              ║
║              │                                    │                      ║
║              │ uses                               │ contains             ║
║              ▼                                    ▼                      ║
║       ┌──────────────┐    triggers         ┌──────────────┐              ║
║       │  DataTable   │════════════════════>│    Modal     │              ║
║       └──────────────┘                     └──────────────┘              ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  📋 COMPONENT HIERARCHY UNLOCKED                                         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```
