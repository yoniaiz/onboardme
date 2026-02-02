# TODO #0: connect --relations

## Game Overview

**Type:** Relationship mapping  
**Goal:** Discover how the main pieces of the system connect to each other  
**Level:** 0 (TODO #0)  
**Sub-task:** Third sub-task of TODO #0

## Core Concept

Players build a mental model of the system's architecture by investigating how key building blocks relate to each other. The game presents the main entities/components found in the project and challenges players to discover and define the relationships between them.

## Learning Outcomes

- How the main pieces of the system connect
- The domain model / component hierarchy
- Key relationships (ownership, composition, dependencies)
- Mental map for navigating the codebase

## Gameplay Loop

```
1. SEE ENTITIES     →  "Here are the main pieces we found"
       ↓
2. PICK A PAIR      →  Player selects two entities to investigate
       ↓
3. INVESTIGATE      →  Player looks at code in IDE (models, imports, etc.)
       ↓
4. DEFINE RELATION  →  Answer: How do these two connect?
       ↓
5. BUILD MAP        →  Connection added to visual map
       ↓
6. REPEAT           →  Until all key connections mapped
```

## Key Design Decisions

### Visual Map Building
Players see a diagram being built as they work. This provides tangible progress and a useful artifact.

### Player Chooses Investigation Order
No forced sequence. Players can investigate connections in any order, giving autonomy.

### Real Code Investigation
Players must look at actual model files, import statements, and type definitions to answer correctly.

### Adapts to Project Type
The "entities" adapt based on project type:
- Backend API: Database models, services
- Frontend: Components, pages, hooks
- CLI: Commands, subcommands
- Library: Modules, exported classes

## Relationship Types

Common relationships players will identify:

| Relationship | Meaning | Example |
|--------------|---------|---------|
| belongs_to | One-to-one ownership | User belongs_to Organization |
| has_many | One-to-many | Project has_many Tasks |
| many_to_many | Join table relationship | Users many_to_many Organizations |
| renders_inside | Component composition | Page renders_inside Layout |
| imports_from | Module dependency | AuthService imports_from UserService |
| extends | Inheritance | AdminUser extends User |
| calls | Function invocation | deploy calls build |

## Why It's Fun

| Element | Engagement Driver |
|---------|-------------------|
| Visual map building | Tangible progress, satisfaction |
| Player chooses investigation order | Autonomy |
| Each connection is a mini-puzzle | Bite-sized challenges |
| Map gets more complete | Accumulation, visual reward |
| Real code investigation | Practical skill building |

## Visual Examples

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and visual design.

## Monster Reaction on Completion

After completing TODO #0, the Monster speaks for the first time:

```
"So. You can see how the pieces connect."
"User to Organization to Project to Task..."
"Impressive. That's almost correct."
"I mean, there's also a UserOrganizationProjectTaskLegacyBridge table."
"Don't ask. Nobody asks."
"...Alright. You passed the warmup. Now let's see what you're really made of."
```
