# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createTeam, updateTeam, createPlayer, updatePlayer, deactivatePlayer, createGame, updateGame, finalizeGame, startGame, createLineupEntry } from '@playlink/dataconnect';


// Operation CreateTeam:  For variables, look at type CreateTeamVars in ../index.d.ts
const { data } = await CreateTeam(dataConnect, createTeamVars);

// Operation UpdateTeam:  For variables, look at type UpdateTeamVars in ../index.d.ts
const { data } = await UpdateTeam(dataConnect, updateTeamVars);

// Operation CreatePlayer:  For variables, look at type CreatePlayerVars in ../index.d.ts
const { data } = await CreatePlayer(dataConnect, createPlayerVars);

// Operation UpdatePlayer:  For variables, look at type UpdatePlayerVars in ../index.d.ts
const { data } = await UpdatePlayer(dataConnect, updatePlayerVars);

// Operation DeactivatePlayer:  For variables, look at type DeactivatePlayerVars in ../index.d.ts
const { data } = await DeactivatePlayer(dataConnect, deactivatePlayerVars);

// Operation CreateGame:  For variables, look at type CreateGameVars in ../index.d.ts
const { data } = await CreateGame(dataConnect, createGameVars);

// Operation UpdateGame:  For variables, look at type UpdateGameVars in ../index.d.ts
const { data } = await UpdateGame(dataConnect, updateGameVars);

// Operation FinalizeGame:  For variables, look at type FinalizeGameVars in ../index.d.ts
const { data } = await FinalizeGame(dataConnect, finalizeGameVars);

// Operation StartGame:  For variables, look at type StartGameVars in ../index.d.ts
const { data } = await StartGame(dataConnect, startGameVars);

// Operation CreateLineupEntry:  For variables, look at type CreateLineupEntryVars in ../index.d.ts
const { data } = await CreateLineupEntry(dataConnect, createLineupEntryVars);


```