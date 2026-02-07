1. game 2 is a bit boring and the questions are not adjusted correctly to the project type. it's important to see that user can run the project and use it and understand the flows but i think something should be a bit more interesting and challenging here. same goes for game 3, maybe they somehow can be combined, i would want them to work together and be more interesting and challenging way maybe interacting with the actual code like we have in game 4 and 5.

2. the screen that shows the game progression showed after chapter 2 but not after chapter 1, its a bit strange, should we show it after every chapter? also should we show more visuals like the spagetti monster ascii art after each chapter based on the monster mood? it can be showed in the begginging and underneed it will be the message.

3. for game 3, it was not so bad because we discovered things a long the way but it seems like agent is guessing which flow to focus on, and in my test the flow was not implemented, but then he adjusted to real flow which was cool, but i wonder is from the beginning we should map our the main flows of the system to make sure we focus the energy on most important flows and parts of the system and not some subflows.

4. game 3 had a bug where we where asked to proceed to next chapter i said continue but then it kept asking questions related to game3 or was it part of game 4, it was hard to understand what happened because it kept marking the game3 artifact.

5. game 4 has a bug
   """"
   Good! Tests are passing. Now let me pick a sabotage target. The player traced the watchlist flow and understands near-miss detection. Perfect callback opportunity: I'll sabotage the watchlist limit check. Let me read the relevant file to plan the sabotage.
   Perfect! I found it. Line 223: if (currentCount >= MAX_WATCHLIST_ITEMS). I'll change >= to > which will allow one extra item past the limit (boundary bug). This is subtle and plausible. Let me check the test file to confirm this will break tests.
   """"
   it just tells me what its going to change, this is excatly what we don't want as part of our game because user needs to figure out the bug and fix it.

6. seems like game4 requesting feature when its part of game5, it doesnt request writing code but i'm not sure about it, what do you think about it?

7. for boss challenge there is a small problem right now, because basically user can just copy paste into different agent the feature request and implement it.
   im thinking about more layers for validaiton to see if user actually understands the codebase and can implement the feature request.
   maybe first it starts with few questions where and what would he do, then user creates a plan and boss review it, finally its implementation and boss review it again, checks if its tested, and tries to challenge or break it. then he asks actual questions about the implementation that user must explain and defend. so that way user must know what he did
