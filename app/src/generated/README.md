# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `playlink-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetTeamBySlug*](#getteambyslug)
  - [*GetTeams*](#getteams)
  - [*GetGamesByTeam*](#getgamesbyteam)
  - [*GetGameDetail*](#getgamedetail)
  - [*GetGameLineups*](#getgamelineups)
  - [*GetGamePlays*](#getgameplays)
  - [*GetUpcomingGames*](#getupcominggames)
  - [*GetPlayersByTeam*](#getplayersbyteam)
  - [*GetPlayerDetail*](#getplayerdetail)
  - [*GetPlayerStats*](#getplayerstats)
  - [*GetTeamStats*](#getteamstats)
  - [*GetPublishedArticles*](#getpublishedarticles)
  - [*GetArticleDetail*](#getarticledetail)
  - [*GetAllArticles*](#getallarticles)
  - [*GetSchedules*](#getschedules)
  - [*GetUserProfile*](#getuserprofile)
  - [*GetTeamMembers*](#getteammembers)
- [**Mutations**](#mutations)
  - [*CreateTeam*](#createteam)
  - [*UpdateTeam*](#updateteam)
  - [*CreatePlayer*](#createplayer)
  - [*UpdatePlayer*](#updateplayer)
  - [*DeactivatePlayer*](#deactivateplayer)
  - [*CreateGame*](#creategame)
  - [*UpdateGame*](#updategame)
  - [*FinalizeGame*](#finalizegame)
  - [*StartGame*](#startgame)
  - [*CreateLineupEntry*](#createlineupentry)
  - [*UpdateLineup*](#updatelineup)
  - [*DeleteLineup*](#deletelineup)
  - [*RecordPlay*](#recordplay)
  - [*UpdatePlay*](#updateplay)
  - [*DeletePlay*](#deleteplay)
  - [*CreateArticle*](#createarticle)
  - [*UpdateArticle*](#updatearticle)
  - [*UnpublishArticle*](#unpublisharticle)
  - [*DeleteArticle*](#deletearticle)
  - [*CreateSchedule*](#createschedule)
  - [*UpdateSchedule*](#updateschedule)
  - [*DeleteSchedule*](#deleteschedule)
  - [*UpdateUserProfile*](#updateuserprofile)
  - [*AddTeamMember*](#addteammember)
  - [*UpdateTeamMemberRole*](#updateteammemberrole)
  - [*RemoveTeamMember*](#removeteammember)
  - [*SeedPlayer*](#seedplayer)
  - [*SeedGame*](#seedgame)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `playlink-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@playlink/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@playlink/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@playlink/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `playlink-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetTeamBySlug
You can execute the `GetTeamBySlug` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getTeamBySlug(vars: GetTeamBySlugVariables): QueryPromise<GetTeamBySlugData, GetTeamBySlugVariables>;

interface GetTeamBySlugRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamBySlugVariables): QueryRef<GetTeamBySlugData, GetTeamBySlugVariables>;
}
export const getTeamBySlugRef: GetTeamBySlugRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeamBySlug(dc: DataConnect, vars: GetTeamBySlugVariables): QueryPromise<GetTeamBySlugData, GetTeamBySlugVariables>;

interface GetTeamBySlugRef {
  ...
  (dc: DataConnect, vars: GetTeamBySlugVariables): QueryRef<GetTeamBySlugData, GetTeamBySlugVariables>;
}
export const getTeamBySlugRef: GetTeamBySlugRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeamBySlugRef:
```typescript
const name = getTeamBySlugRef.operationName;
console.log(name);
```

### Variables
The `GetTeamBySlug` query requires an argument of type `GetTeamBySlugVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeamBySlugVariables {
  slug: string;
}
```
### Return Type
Recall that executing the `GetTeamBySlug` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeamBySlugData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTeamBySlugData {
  teams: ({
    id: UUIDString;
    name: string;
    slug: string;
    logoUrl?: string | null;
    description?: string | null;
    createdAt: TimestampString;
  } & Team_Key)[];
}
```
### Using `GetTeamBySlug`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeamBySlug, GetTeamBySlugVariables } from '@playlink/dataconnect';

// The `GetTeamBySlug` query requires an argument of type `GetTeamBySlugVariables`:
const getTeamBySlugVars: GetTeamBySlugVariables = {
  slug: ..., 
};

// Call the `getTeamBySlug()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeamBySlug(getTeamBySlugVars);
// Variables can be defined inline as well.
const { data } = await getTeamBySlug({ slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeamBySlug(dataConnect, getTeamBySlugVars);

console.log(data.teams);

// Or, you can use the `Promise` API.
getTeamBySlug(getTeamBySlugVars).then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

### Using `GetTeamBySlug`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeamBySlugRef, GetTeamBySlugVariables } from '@playlink/dataconnect';

// The `GetTeamBySlug` query requires an argument of type `GetTeamBySlugVariables`:
const getTeamBySlugVars: GetTeamBySlugVariables = {
  slug: ..., 
};

// Call the `getTeamBySlugRef()` function to get a reference to the query.
const ref = getTeamBySlugRef(getTeamBySlugVars);
// Variables can be defined inline as well.
const ref = getTeamBySlugRef({ slug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeamBySlugRef(dataConnect, getTeamBySlugVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

## GetTeams
You can execute the `GetTeams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getTeams(): QueryPromise<GetTeamsData, undefined>;

interface GetTeamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTeamsData, undefined>;
}
export const getTeamsRef: GetTeamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeams(dc: DataConnect): QueryPromise<GetTeamsData, undefined>;

interface GetTeamsRef {
  ...
  (dc: DataConnect): QueryRef<GetTeamsData, undefined>;
}
export const getTeamsRef: GetTeamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeamsRef:
```typescript
const name = getTeamsRef.operationName;
console.log(name);
```

### Variables
The `GetTeams` query has no variables.
### Return Type
Recall that executing the `GetTeams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeamsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTeamsData {
  teams: ({
    id: UUIDString;
    name: string;
    slug: string;
    logoUrl?: string | null;
    description?: string | null;
  } & Team_Key)[];
}
```
### Using `GetTeams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeams } from '@playlink/dataconnect';


// Call the `getTeams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeams();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeams(dataConnect);

console.log(data.teams);

// Or, you can use the `Promise` API.
getTeams().then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

### Using `GetTeams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeamsRef } from '@playlink/dataconnect';


// Call the `getTeamsRef()` function to get a reference to the query.
const ref = getTeamsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeamsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

## GetGamesByTeam
You can execute the `GetGamesByTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getGamesByTeam(vars: GetGamesByTeamVariables): QueryPromise<GetGamesByTeamData, GetGamesByTeamVariables>;

interface GetGamesByTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamesByTeamVariables): QueryRef<GetGamesByTeamData, GetGamesByTeamVariables>;
}
export const getGamesByTeamRef: GetGamesByTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGamesByTeam(dc: DataConnect, vars: GetGamesByTeamVariables): QueryPromise<GetGamesByTeamData, GetGamesByTeamVariables>;

interface GetGamesByTeamRef {
  ...
  (dc: DataConnect, vars: GetGamesByTeamVariables): QueryRef<GetGamesByTeamData, GetGamesByTeamVariables>;
}
export const getGamesByTeamRef: GetGamesByTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGamesByTeamRef:
```typescript
const name = getGamesByTeamRef.operationName;
console.log(name);
```

### Variables
The `GetGamesByTeam` query requires an argument of type `GetGamesByTeamVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGamesByTeamVariables {
  teamId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetGamesByTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGamesByTeamData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGamesByTeamData {
  games: ({
    id: UUIDString;
    opponentName: string;
    gameDate: DateString;
    homeScore?: number | null;
    awayScore?: number | null;
    isHome: boolean;
    location?: string | null;
    videoUrl?: string | null;
  } & Game_Key)[];
}
```
### Using `GetGamesByTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGamesByTeam, GetGamesByTeamVariables } from '@playlink/dataconnect';

// The `GetGamesByTeam` query requires an argument of type `GetGamesByTeamVariables`:
const getGamesByTeamVars: GetGamesByTeamVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getGamesByTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGamesByTeam(getGamesByTeamVars);
// Variables can be defined inline as well.
const { data } = await getGamesByTeam({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGamesByTeam(dataConnect, getGamesByTeamVars);

console.log(data.games);

// Or, you can use the `Promise` API.
getGamesByTeam(getGamesByTeamVars).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

### Using `GetGamesByTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGamesByTeamRef, GetGamesByTeamVariables } from '@playlink/dataconnect';

// The `GetGamesByTeam` query requires an argument of type `GetGamesByTeamVariables`:
const getGamesByTeamVars: GetGamesByTeamVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getGamesByTeamRef()` function to get a reference to the query.
const ref = getGamesByTeamRef(getGamesByTeamVars);
// Variables can be defined inline as well.
const ref = getGamesByTeamRef({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGamesByTeamRef(dataConnect, getGamesByTeamVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.games);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

## GetGameDetail
You can execute the `GetGameDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getGameDetail(vars: GetGameDetailVariables): QueryPromise<GetGameDetailData, GetGameDetailVariables>;

interface GetGameDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameDetailVariables): QueryRef<GetGameDetailData, GetGameDetailVariables>;
}
export const getGameDetailRef: GetGameDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGameDetail(dc: DataConnect, vars: GetGameDetailVariables): QueryPromise<GetGameDetailData, GetGameDetailVariables>;

interface GetGameDetailRef {
  ...
  (dc: DataConnect, vars: GetGameDetailVariables): QueryRef<GetGameDetailData, GetGameDetailVariables>;
}
export const getGameDetailRef: GetGameDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGameDetailRef:
```typescript
const name = getGameDetailRef.operationName;
console.log(name);
```

### Variables
The `GetGameDetail` query requires an argument of type `GetGameDetailVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGameDetailVariables {
  gameId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGameDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGameDetailData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGameDetailData {
  game?: {
    id: UUIDString;
    opponentName: string;
    gameDate: DateString;
    location?: string | null;
    homeScore?: number | null;
    awayScore?: number | null;
    isHome: boolean;
    status: string;
    videoUrl?: string | null;
    createdAt: TimestampString;
  } & Game_Key;
}
```
### Using `GetGameDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGameDetail, GetGameDetailVariables } from '@playlink/dataconnect';

// The `GetGameDetail` query requires an argument of type `GetGameDetailVariables`:
const getGameDetailVars: GetGameDetailVariables = {
  gameId: ..., 
};

// Call the `getGameDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGameDetail(getGameDetailVars);
// Variables can be defined inline as well.
const { data } = await getGameDetail({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGameDetail(dataConnect, getGameDetailVars);

console.log(data.game);

// Or, you can use the `Promise` API.
getGameDetail(getGameDetailVars).then((response) => {
  const data = response.data;
  console.log(data.game);
});
```

### Using `GetGameDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGameDetailRef, GetGameDetailVariables } from '@playlink/dataconnect';

// The `GetGameDetail` query requires an argument of type `GetGameDetailVariables`:
const getGameDetailVars: GetGameDetailVariables = {
  gameId: ..., 
};

// Call the `getGameDetailRef()` function to get a reference to the query.
const ref = getGameDetailRef(getGameDetailVars);
// Variables can be defined inline as well.
const ref = getGameDetailRef({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGameDetailRef(dataConnect, getGameDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.game);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.game);
});
```

## GetGameLineups
You can execute the `GetGameLineups` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getGameLineups(vars: GetGameLineupsVariables): QueryPromise<GetGameLineupsData, GetGameLineupsVariables>;

interface GetGameLineupsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameLineupsVariables): QueryRef<GetGameLineupsData, GetGameLineupsVariables>;
}
export const getGameLineupsRef: GetGameLineupsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGameLineups(dc: DataConnect, vars: GetGameLineupsVariables): QueryPromise<GetGameLineupsData, GetGameLineupsVariables>;

interface GetGameLineupsRef {
  ...
  (dc: DataConnect, vars: GetGameLineupsVariables): QueryRef<GetGameLineupsData, GetGameLineupsVariables>;
}
export const getGameLineupsRef: GetGameLineupsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGameLineupsRef:
```typescript
const name = getGameLineupsRef.operationName;
console.log(name);
```

### Variables
The `GetGameLineups` query requires an argument of type `GetGameLineupsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGameLineupsVariables {
  gameId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGameLineups` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGameLineupsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGameLineupsData {
  gameLineups: ({
    id: UUIDString;
    battingOrder?: number | null;
    position?: string | null;
    isStarter: boolean;
    player: {
      id: UUIDString;
      name: string;
      uniformNumber?: number | null;
      position?: string | null;
    } & Player_Key;
  } & GameLineup_Key)[];
}
```
### Using `GetGameLineups`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGameLineups, GetGameLineupsVariables } from '@playlink/dataconnect';

// The `GetGameLineups` query requires an argument of type `GetGameLineupsVariables`:
const getGameLineupsVars: GetGameLineupsVariables = {
  gameId: ..., 
};

// Call the `getGameLineups()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGameLineups(getGameLineupsVars);
// Variables can be defined inline as well.
const { data } = await getGameLineups({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGameLineups(dataConnect, getGameLineupsVars);

console.log(data.gameLineups);

// Or, you can use the `Promise` API.
getGameLineups(getGameLineupsVars).then((response) => {
  const data = response.data;
  console.log(data.gameLineups);
});
```

### Using `GetGameLineups`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGameLineupsRef, GetGameLineupsVariables } from '@playlink/dataconnect';

// The `GetGameLineups` query requires an argument of type `GetGameLineupsVariables`:
const getGameLineupsVars: GetGameLineupsVariables = {
  gameId: ..., 
};

// Call the `getGameLineupsRef()` function to get a reference to the query.
const ref = getGameLineupsRef(getGameLineupsVars);
// Variables can be defined inline as well.
const ref = getGameLineupsRef({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGameLineupsRef(dataConnect, getGameLineupsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gameLineups);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gameLineups);
});
```

## GetGamePlays
You can execute the `GetGamePlays` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getGamePlays(vars: GetGamePlaysVariables): QueryPromise<GetGamePlaysData, GetGamePlaysVariables>;

interface GetGamePlaysRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamePlaysVariables): QueryRef<GetGamePlaysData, GetGamePlaysVariables>;
}
export const getGamePlaysRef: GetGamePlaysRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGamePlays(dc: DataConnect, vars: GetGamePlaysVariables): QueryPromise<GetGamePlaysData, GetGamePlaysVariables>;

interface GetGamePlaysRef {
  ...
  (dc: DataConnect, vars: GetGamePlaysVariables): QueryRef<GetGamePlaysData, GetGamePlaysVariables>;
}
export const getGamePlaysRef: GetGamePlaysRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGamePlaysRef:
```typescript
const name = getGamePlaysRef.operationName;
console.log(name);
```

### Variables
The `GetGamePlays` query requires an argument of type `GetGamePlaysVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGamePlaysVariables {
  gameId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGamePlays` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGamePlaysData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGamePlaysData {
  gamePlays: ({
    id: UUIDString;
    inning: number;
    isTop: boolean;
    batter: {
      id: UUIDString;
      name: string;
      uniformNumber?: number | null;
    } & Player_Key;
      pitcher?: {
        id: UUIDString;
        name: string;
      } & Player_Key;
        playType: string;
        result: string;
        rbi: number;
        runsScored: number;
        createdAt: TimestampString;
  } & GamePlay_Key)[];
}
```
### Using `GetGamePlays`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGamePlays, GetGamePlaysVariables } from '@playlink/dataconnect';

// The `GetGamePlays` query requires an argument of type `GetGamePlaysVariables`:
const getGamePlaysVars: GetGamePlaysVariables = {
  gameId: ..., 
};

// Call the `getGamePlays()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGamePlays(getGamePlaysVars);
// Variables can be defined inline as well.
const { data } = await getGamePlays({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGamePlays(dataConnect, getGamePlaysVars);

console.log(data.gamePlays);

// Or, you can use the `Promise` API.
getGamePlays(getGamePlaysVars).then((response) => {
  const data = response.data;
  console.log(data.gamePlays);
});
```

### Using `GetGamePlays`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGamePlaysRef, GetGamePlaysVariables } from '@playlink/dataconnect';

// The `GetGamePlays` query requires an argument of type `GetGamePlaysVariables`:
const getGamePlaysVars: GetGamePlaysVariables = {
  gameId: ..., 
};

// Call the `getGamePlaysRef()` function to get a reference to the query.
const ref = getGamePlaysRef(getGamePlaysVars);
// Variables can be defined inline as well.
const ref = getGamePlaysRef({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGamePlaysRef(dataConnect, getGamePlaysVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gamePlays);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gamePlays);
});
```

## GetUpcomingGames
You can execute the `GetUpcomingGames` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getUpcomingGames(vars: GetUpcomingGamesVariables): QueryPromise<GetUpcomingGamesData, GetUpcomingGamesVariables>;

interface GetUpcomingGamesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUpcomingGamesVariables): QueryRef<GetUpcomingGamesData, GetUpcomingGamesVariables>;
}
export const getUpcomingGamesRef: GetUpcomingGamesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUpcomingGames(dc: DataConnect, vars: GetUpcomingGamesVariables): QueryPromise<GetUpcomingGamesData, GetUpcomingGamesVariables>;

interface GetUpcomingGamesRef {
  ...
  (dc: DataConnect, vars: GetUpcomingGamesVariables): QueryRef<GetUpcomingGamesData, GetUpcomingGamesVariables>;
}
export const getUpcomingGamesRef: GetUpcomingGamesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUpcomingGamesRef:
```typescript
const name = getUpcomingGamesRef.operationName;
console.log(name);
```

### Variables
The `GetUpcomingGames` query requires an argument of type `GetUpcomingGamesVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUpcomingGamesVariables {
  teamId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetUpcomingGames` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUpcomingGamesData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUpcomingGamesData {
  games: ({
    id: UUIDString;
    opponentName: string;
    gameDate: DateString;
    location?: string | null;
    isHome: boolean;
    status: string;
  } & Game_Key)[];
}
```
### Using `GetUpcomingGames`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUpcomingGames, GetUpcomingGamesVariables } from '@playlink/dataconnect';

// The `GetUpcomingGames` query requires an argument of type `GetUpcomingGamesVariables`:
const getUpcomingGamesVars: GetUpcomingGamesVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getUpcomingGames()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUpcomingGames(getUpcomingGamesVars);
// Variables can be defined inline as well.
const { data } = await getUpcomingGames({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUpcomingGames(dataConnect, getUpcomingGamesVars);

console.log(data.games);

// Or, you can use the `Promise` API.
getUpcomingGames(getUpcomingGamesVars).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

### Using `GetUpcomingGames`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUpcomingGamesRef, GetUpcomingGamesVariables } from '@playlink/dataconnect';

// The `GetUpcomingGames` query requires an argument of type `GetUpcomingGamesVariables`:
const getUpcomingGamesVars: GetUpcomingGamesVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getUpcomingGamesRef()` function to get a reference to the query.
const ref = getUpcomingGamesRef(getUpcomingGamesVars);
// Variables can be defined inline as well.
const ref = getUpcomingGamesRef({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUpcomingGamesRef(dataConnect, getUpcomingGamesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.games);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.games);
});
```

## GetPlayersByTeam
You can execute the `GetPlayersByTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getPlayersByTeam(vars: GetPlayersByTeamVariables): QueryPromise<GetPlayersByTeamData, GetPlayersByTeamVariables>;

interface GetPlayersByTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayersByTeamVariables): QueryRef<GetPlayersByTeamData, GetPlayersByTeamVariables>;
}
export const getPlayersByTeamRef: GetPlayersByTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPlayersByTeam(dc: DataConnect, vars: GetPlayersByTeamVariables): QueryPromise<GetPlayersByTeamData, GetPlayersByTeamVariables>;

interface GetPlayersByTeamRef {
  ...
  (dc: DataConnect, vars: GetPlayersByTeamVariables): QueryRef<GetPlayersByTeamData, GetPlayersByTeamVariables>;
}
export const getPlayersByTeamRef: GetPlayersByTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPlayersByTeamRef:
```typescript
const name = getPlayersByTeamRef.operationName;
console.log(name);
```

### Variables
The `GetPlayersByTeam` query requires an argument of type `GetPlayersByTeamVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPlayersByTeamVariables {
  teamId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPlayersByTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPlayersByTeamData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPlayersByTeamData {
  players: ({
    id: UUIDString;
    name: string;
    uniformNumber?: number | null;
    position?: string | null;
    bats?: string | null;
    throws?: string | null;
    photoUrl?: string | null;
    isActive: boolean;
  } & Player_Key)[];
}
```
### Using `GetPlayersByTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPlayersByTeam, GetPlayersByTeamVariables } from '@playlink/dataconnect';

// The `GetPlayersByTeam` query requires an argument of type `GetPlayersByTeamVariables`:
const getPlayersByTeamVars: GetPlayersByTeamVariables = {
  teamId: ..., 
};

// Call the `getPlayersByTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPlayersByTeam(getPlayersByTeamVars);
// Variables can be defined inline as well.
const { data } = await getPlayersByTeam({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPlayersByTeam(dataConnect, getPlayersByTeamVars);

console.log(data.players);

// Or, you can use the `Promise` API.
getPlayersByTeam(getPlayersByTeamVars).then((response) => {
  const data = response.data;
  console.log(data.players);
});
```

### Using `GetPlayersByTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPlayersByTeamRef, GetPlayersByTeamVariables } from '@playlink/dataconnect';

// The `GetPlayersByTeam` query requires an argument of type `GetPlayersByTeamVariables`:
const getPlayersByTeamVars: GetPlayersByTeamVariables = {
  teamId: ..., 
};

// Call the `getPlayersByTeamRef()` function to get a reference to the query.
const ref = getPlayersByTeamRef(getPlayersByTeamVars);
// Variables can be defined inline as well.
const ref = getPlayersByTeamRef({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPlayersByTeamRef(dataConnect, getPlayersByTeamVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.players);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.players);
});
```

## GetPlayerDetail
You can execute the `GetPlayerDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getPlayerDetail(vars: GetPlayerDetailVariables): QueryPromise<GetPlayerDetailData, GetPlayerDetailVariables>;

interface GetPlayerDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayerDetailVariables): QueryRef<GetPlayerDetailData, GetPlayerDetailVariables>;
}
export const getPlayerDetailRef: GetPlayerDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPlayerDetail(dc: DataConnect, vars: GetPlayerDetailVariables): QueryPromise<GetPlayerDetailData, GetPlayerDetailVariables>;

interface GetPlayerDetailRef {
  ...
  (dc: DataConnect, vars: GetPlayerDetailVariables): QueryRef<GetPlayerDetailData, GetPlayerDetailVariables>;
}
export const getPlayerDetailRef: GetPlayerDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPlayerDetailRef:
```typescript
const name = getPlayerDetailRef.operationName;
console.log(name);
```

### Variables
The `GetPlayerDetail` query requires an argument of type `GetPlayerDetailVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPlayerDetailVariables {
  playerId: UUIDString;
}
```
### Return Type
Recall that executing the `GetPlayerDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPlayerDetailData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPlayerDetailData {
  player?: {
    id: UUIDString;
    name: string;
    uniformNumber?: number | null;
    position?: string | null;
    bats?: string | null;
    throws?: string | null;
    photoUrl?: string | null;
    isActive: boolean;
    team: {
      id: UUIDString;
      name: string;
      logoUrl?: string | null;
    } & Team_Key;
  } & Player_Key;
}
```
### Using `GetPlayerDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPlayerDetail, GetPlayerDetailVariables } from '@playlink/dataconnect';

// The `GetPlayerDetail` query requires an argument of type `GetPlayerDetailVariables`:
const getPlayerDetailVars: GetPlayerDetailVariables = {
  playerId: ..., 
};

// Call the `getPlayerDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPlayerDetail(getPlayerDetailVars);
// Variables can be defined inline as well.
const { data } = await getPlayerDetail({ playerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPlayerDetail(dataConnect, getPlayerDetailVars);

console.log(data.player);

// Or, you can use the `Promise` API.
getPlayerDetail(getPlayerDetailVars).then((response) => {
  const data = response.data;
  console.log(data.player);
});
```

### Using `GetPlayerDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPlayerDetailRef, GetPlayerDetailVariables } from '@playlink/dataconnect';

// The `GetPlayerDetail` query requires an argument of type `GetPlayerDetailVariables`:
const getPlayerDetailVars: GetPlayerDetailVariables = {
  playerId: ..., 
};

// Call the `getPlayerDetailRef()` function to get a reference to the query.
const ref = getPlayerDetailRef(getPlayerDetailVars);
// Variables can be defined inline as well.
const ref = getPlayerDetailRef({ playerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPlayerDetailRef(dataConnect, getPlayerDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.player);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.player);
});
```

## GetPlayerStats
You can execute the `GetPlayerStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getPlayerStats(vars: GetPlayerStatsVariables): QueryPromise<GetPlayerStatsData, GetPlayerStatsVariables>;

interface GetPlayerStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayerStatsVariables): QueryRef<GetPlayerStatsData, GetPlayerStatsVariables>;
}
export const getPlayerStatsRef: GetPlayerStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPlayerStats(dc: DataConnect, vars: GetPlayerStatsVariables): QueryPromise<GetPlayerStatsData, GetPlayerStatsVariables>;

interface GetPlayerStatsRef {
  ...
  (dc: DataConnect, vars: GetPlayerStatsVariables): QueryRef<GetPlayerStatsData, GetPlayerStatsVariables>;
}
export const getPlayerStatsRef: GetPlayerStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPlayerStatsRef:
```typescript
const name = getPlayerStatsRef.operationName;
console.log(name);
```

### Variables
The `GetPlayerStats` query requires an argument of type `GetPlayerStatsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPlayerStatsVariables {
  playerId: UUIDString;
  season: number;
}
```
### Return Type
Recall that executing the `GetPlayerStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPlayerStatsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPlayerStatsData {
  playerStats?: {
    season: number;
    gamesPlayed: number;
    atBats: number;
    hits: number;
    doubles: number;
    triples: number;
    homeRuns: number;
    rbi: number;
    walks: number;
    strikeouts: number;
    battingAverage?: number | null;
    updatedAt: TimestampString;
  };
}
```
### Using `GetPlayerStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPlayerStats, GetPlayerStatsVariables } from '@playlink/dataconnect';

// The `GetPlayerStats` query requires an argument of type `GetPlayerStatsVariables`:
const getPlayerStatsVars: GetPlayerStatsVariables = {
  playerId: ..., 
  season: ..., 
};

// Call the `getPlayerStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPlayerStats(getPlayerStatsVars);
// Variables can be defined inline as well.
const { data } = await getPlayerStats({ playerId: ..., season: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPlayerStats(dataConnect, getPlayerStatsVars);

console.log(data.playerStats);

// Or, you can use the `Promise` API.
getPlayerStats(getPlayerStatsVars).then((response) => {
  const data = response.data;
  console.log(data.playerStats);
});
```

### Using `GetPlayerStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPlayerStatsRef, GetPlayerStatsVariables } from '@playlink/dataconnect';

// The `GetPlayerStats` query requires an argument of type `GetPlayerStatsVariables`:
const getPlayerStatsVars: GetPlayerStatsVariables = {
  playerId: ..., 
  season: ..., 
};

// Call the `getPlayerStatsRef()` function to get a reference to the query.
const ref = getPlayerStatsRef(getPlayerStatsVars);
// Variables can be defined inline as well.
const ref = getPlayerStatsRef({ playerId: ..., season: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPlayerStatsRef(dataConnect, getPlayerStatsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.playerStats);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.playerStats);
});
```

## GetTeamStats
You can execute the `GetTeamStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getTeamStats(vars: GetTeamStatsVariables): QueryPromise<GetTeamStatsData, GetTeamStatsVariables>;

interface GetTeamStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamStatsVariables): QueryRef<GetTeamStatsData, GetTeamStatsVariables>;
}
export const getTeamStatsRef: GetTeamStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeamStats(dc: DataConnect, vars: GetTeamStatsVariables): QueryPromise<GetTeamStatsData, GetTeamStatsVariables>;

interface GetTeamStatsRef {
  ...
  (dc: DataConnect, vars: GetTeamStatsVariables): QueryRef<GetTeamStatsData, GetTeamStatsVariables>;
}
export const getTeamStatsRef: GetTeamStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeamStatsRef:
```typescript
const name = getTeamStatsRef.operationName;
console.log(name);
```

### Variables
The `GetTeamStats` query requires an argument of type `GetTeamStatsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeamStatsVariables {
  teamId: UUIDString;
  season: number;
}
```
### Return Type
Recall that executing the `GetTeamStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeamStatsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTeamStatsData {
  players: ({
    id: UUIDString;
    name: string;
    uniformNumber?: number | null;
    position?: string | null;
  } & Player_Key)[];
}
```
### Using `GetTeamStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeamStats, GetTeamStatsVariables } from '@playlink/dataconnect';

// The `GetTeamStats` query requires an argument of type `GetTeamStatsVariables`:
const getTeamStatsVars: GetTeamStatsVariables = {
  teamId: ..., 
  season: ..., 
};

// Call the `getTeamStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeamStats(getTeamStatsVars);
// Variables can be defined inline as well.
const { data } = await getTeamStats({ teamId: ..., season: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeamStats(dataConnect, getTeamStatsVars);

console.log(data.players);

// Or, you can use the `Promise` API.
getTeamStats(getTeamStatsVars).then((response) => {
  const data = response.data;
  console.log(data.players);
});
```

### Using `GetTeamStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeamStatsRef, GetTeamStatsVariables } from '@playlink/dataconnect';

// The `GetTeamStats` query requires an argument of type `GetTeamStatsVariables`:
const getTeamStatsVars: GetTeamStatsVariables = {
  teamId: ..., 
  season: ..., 
};

// Call the `getTeamStatsRef()` function to get a reference to the query.
const ref = getTeamStatsRef(getTeamStatsVars);
// Variables can be defined inline as well.
const ref = getTeamStatsRef({ teamId: ..., season: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeamStatsRef(dataConnect, getTeamStatsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.players);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.players);
});
```

## GetPublishedArticles
You can execute the `GetPublishedArticles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getPublishedArticles(vars: GetPublishedArticlesVariables): QueryPromise<GetPublishedArticlesData, GetPublishedArticlesVariables>;

interface GetPublishedArticlesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublishedArticlesVariables): QueryRef<GetPublishedArticlesData, GetPublishedArticlesVariables>;
}
export const getPublishedArticlesRef: GetPublishedArticlesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublishedArticles(dc: DataConnect, vars: GetPublishedArticlesVariables): QueryPromise<GetPublishedArticlesData, GetPublishedArticlesVariables>;

interface GetPublishedArticlesRef {
  ...
  (dc: DataConnect, vars: GetPublishedArticlesVariables): QueryRef<GetPublishedArticlesData, GetPublishedArticlesVariables>;
}
export const getPublishedArticlesRef: GetPublishedArticlesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublishedArticlesRef:
```typescript
const name = getPublishedArticlesRef.operationName;
console.log(name);
```

### Variables
The `GetPublishedArticles` query requires an argument of type `GetPublishedArticlesVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPublishedArticlesVariables {
  teamId: UUIDString;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetPublishedArticles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublishedArticlesData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublishedArticlesData {
  articles: ({
    id: UUIDString;
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    publishedAt?: TimestampString | null;
    author: {
      displayName?: string | null;
      avatarUrl?: string | null;
    };
      linkedGame?: {
        id: UUIDString;
        opponentName: string;
        gameDate: DateString;
        homeScore?: number | null;
        awayScore?: number | null;
      } & Game_Key;
  } & Article_Key)[];
}
```
### Using `GetPublishedArticles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublishedArticles, GetPublishedArticlesVariables } from '@playlink/dataconnect';

// The `GetPublishedArticles` query requires an argument of type `GetPublishedArticlesVariables`:
const getPublishedArticlesVars: GetPublishedArticlesVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getPublishedArticles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublishedArticles(getPublishedArticlesVars);
// Variables can be defined inline as well.
const { data } = await getPublishedArticles({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublishedArticles(dataConnect, getPublishedArticlesVars);

console.log(data.articles);

// Or, you can use the `Promise` API.
getPublishedArticles(getPublishedArticlesVars).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

### Using `GetPublishedArticles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublishedArticlesRef, GetPublishedArticlesVariables } from '@playlink/dataconnect';

// The `GetPublishedArticles` query requires an argument of type `GetPublishedArticlesVariables`:
const getPublishedArticlesVars: GetPublishedArticlesVariables = {
  teamId: ..., 
  limit: ..., // optional
};

// Call the `getPublishedArticlesRef()` function to get a reference to the query.
const ref = getPublishedArticlesRef(getPublishedArticlesVars);
// Variables can be defined inline as well.
const ref = getPublishedArticlesRef({ teamId: ..., limit: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublishedArticlesRef(dataConnect, getPublishedArticlesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.articles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

## GetArticleDetail
You can execute the `GetArticleDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getArticleDetail(vars: GetArticleDetailVariables): QueryPromise<GetArticleDetailData, GetArticleDetailVariables>;

interface GetArticleDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArticleDetailVariables): QueryRef<GetArticleDetailData, GetArticleDetailVariables>;
}
export const getArticleDetailRef: GetArticleDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getArticleDetail(dc: DataConnect, vars: GetArticleDetailVariables): QueryPromise<GetArticleDetailData, GetArticleDetailVariables>;

interface GetArticleDetailRef {
  ...
  (dc: DataConnect, vars: GetArticleDetailVariables): QueryRef<GetArticleDetailData, GetArticleDetailVariables>;
}
export const getArticleDetailRef: GetArticleDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getArticleDetailRef:
```typescript
const name = getArticleDetailRef.operationName;
console.log(name);
```

### Variables
The `GetArticleDetail` query requires an argument of type `GetArticleDetailVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetArticleDetailVariables {
  articleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetArticleDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetArticleDetailData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetArticleDetailData {
  article?: {
    id: UUIDString;
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    isPublished: boolean;
    publishedAt?: TimestampString | null;
    createdAt: TimestampString;
    author: {
      id: UUIDString;
      displayName?: string | null;
      avatarUrl?: string | null;
    } & User_Key;
      linkedGame?: {
        id: UUIDString;
        opponentName: string;
        gameDate: DateString;
        homeScore?: number | null;
        awayScore?: number | null;
      } & Game_Key;
  } & Article_Key;
}
```
### Using `GetArticleDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getArticleDetail, GetArticleDetailVariables } from '@playlink/dataconnect';

// The `GetArticleDetail` query requires an argument of type `GetArticleDetailVariables`:
const getArticleDetailVars: GetArticleDetailVariables = {
  articleId: ..., 
};

// Call the `getArticleDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getArticleDetail(getArticleDetailVars);
// Variables can be defined inline as well.
const { data } = await getArticleDetail({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getArticleDetail(dataConnect, getArticleDetailVars);

console.log(data.article);

// Or, you can use the `Promise` API.
getArticleDetail(getArticleDetailVars).then((response) => {
  const data = response.data;
  console.log(data.article);
});
```

### Using `GetArticleDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getArticleDetailRef, GetArticleDetailVariables } from '@playlink/dataconnect';

// The `GetArticleDetail` query requires an argument of type `GetArticleDetailVariables`:
const getArticleDetailVars: GetArticleDetailVariables = {
  articleId: ..., 
};

// Call the `getArticleDetailRef()` function to get a reference to the query.
const ref = getArticleDetailRef(getArticleDetailVars);
// Variables can be defined inline as well.
const ref = getArticleDetailRef({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getArticleDetailRef(dataConnect, getArticleDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.article);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.article);
});
```

## GetAllArticles
You can execute the `GetAllArticles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getAllArticles(vars: GetAllArticlesVariables): QueryPromise<GetAllArticlesData, GetAllArticlesVariables>;

interface GetAllArticlesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllArticlesVariables): QueryRef<GetAllArticlesData, GetAllArticlesVariables>;
}
export const getAllArticlesRef: GetAllArticlesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllArticles(dc: DataConnect, vars: GetAllArticlesVariables): QueryPromise<GetAllArticlesData, GetAllArticlesVariables>;

interface GetAllArticlesRef {
  ...
  (dc: DataConnect, vars: GetAllArticlesVariables): QueryRef<GetAllArticlesData, GetAllArticlesVariables>;
}
export const getAllArticlesRef: GetAllArticlesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllArticlesRef:
```typescript
const name = getAllArticlesRef.operationName;
console.log(name);
```

### Variables
The `GetAllArticles` query requires an argument of type `GetAllArticlesVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAllArticlesVariables {
  teamId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAllArticles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllArticlesData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAllArticlesData {
  articles: ({
    id: UUIDString;
    title: string;
    isPublished: boolean;
    publishedAt?: TimestampString | null;
    createdAt: TimestampString;
    author: {
      displayName?: string | null;
    };
  } & Article_Key)[];
}
```
### Using `GetAllArticles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllArticles, GetAllArticlesVariables } from '@playlink/dataconnect';

// The `GetAllArticles` query requires an argument of type `GetAllArticlesVariables`:
const getAllArticlesVars: GetAllArticlesVariables = {
  teamId: ..., 
};

// Call the `getAllArticles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllArticles(getAllArticlesVars);
// Variables can be defined inline as well.
const { data } = await getAllArticles({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllArticles(dataConnect, getAllArticlesVars);

console.log(data.articles);

// Or, you can use the `Promise` API.
getAllArticles(getAllArticlesVars).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

### Using `GetAllArticles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllArticlesRef, GetAllArticlesVariables } from '@playlink/dataconnect';

// The `GetAllArticles` query requires an argument of type `GetAllArticlesVariables`:
const getAllArticlesVars: GetAllArticlesVariables = {
  teamId: ..., 
};

// Call the `getAllArticlesRef()` function to get a reference to the query.
const ref = getAllArticlesRef(getAllArticlesVars);
// Variables can be defined inline as well.
const ref = getAllArticlesRef({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllArticlesRef(dataConnect, getAllArticlesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.articles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

## GetSchedules
You can execute the `GetSchedules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getSchedules(vars: GetSchedulesVariables): QueryPromise<GetSchedulesData, GetSchedulesVariables>;

interface GetSchedulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchedulesVariables): QueryRef<GetSchedulesData, GetSchedulesVariables>;
}
export const getSchedulesRef: GetSchedulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSchedules(dc: DataConnect, vars: GetSchedulesVariables): QueryPromise<GetSchedulesData, GetSchedulesVariables>;

interface GetSchedulesRef {
  ...
  (dc: DataConnect, vars: GetSchedulesVariables): QueryRef<GetSchedulesData, GetSchedulesVariables>;
}
export const getSchedulesRef: GetSchedulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSchedulesRef:
```typescript
const name = getSchedulesRef.operationName;
console.log(name);
```

### Variables
The `GetSchedules` query requires an argument of type `GetSchedulesVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSchedulesVariables {
  teamId: UUIDString;
  startDate: TimestampString;
  endDate: TimestampString;
}
```
### Return Type
Recall that executing the `GetSchedules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSchedulesData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSchedulesData {
  schedules: ({
    id: UUIDString;
    title: string;
    eventType: string;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    location?: string | null;
    description?: string | null;
  } & Schedule_Key)[];
}
```
### Using `GetSchedules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSchedules, GetSchedulesVariables } from '@playlink/dataconnect';

// The `GetSchedules` query requires an argument of type `GetSchedulesVariables`:
const getSchedulesVars: GetSchedulesVariables = {
  teamId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `getSchedules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSchedules(getSchedulesVars);
// Variables can be defined inline as well.
const { data } = await getSchedules({ teamId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSchedules(dataConnect, getSchedulesVars);

console.log(data.schedules);

// Or, you can use the `Promise` API.
getSchedules(getSchedulesVars).then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

### Using `GetSchedules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSchedulesRef, GetSchedulesVariables } from '@playlink/dataconnect';

// The `GetSchedules` query requires an argument of type `GetSchedulesVariables`:
const getSchedulesVars: GetSchedulesVariables = {
  teamId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `getSchedulesRef()` function to get a reference to the query.
const ref = getSchedulesRef(getSchedulesVars);
// Variables can be defined inline as well.
const ref = getSchedulesRef({ teamId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSchedulesRef(dataConnect, getSchedulesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.schedules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.schedules);
});
```

## GetUserProfile
You can execute the `GetUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getUserProfile(vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface GetUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
}
export const getUserProfileRef: GetUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProfile(dc: DataConnect, vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface GetUserProfileRef {
  ...
  (dc: DataConnect, vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
}
export const getUserProfileRef: GetUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProfileRef:
```typescript
const name = getUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserProfileVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProfileData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserProfileData {
  user?: {
    id: UUIDString;
    email: string;
    displayName?: string | null;
    avatarUrl?: string | null;
  } & User_Key;
}
```
### Using `GetUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProfile, GetUserProfileVariables } from '@playlink/dataconnect';

// The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`:
const getUserProfileVars: GetUserProfileVariables = {
  userId: ..., 
};

// Call the `getUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProfile(getUserProfileVars);
// Variables can be defined inline as well.
const { data } = await getUserProfile({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProfile(dataConnect, getUserProfileVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserProfile(getUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProfileRef, GetUserProfileVariables } from '@playlink/dataconnect';

// The `GetUserProfile` query requires an argument of type `GetUserProfileVariables`:
const getUserProfileVars: GetUserProfileVariables = {
  userId: ..., 
};

// Call the `getUserProfileRef()` function to get a reference to the query.
const ref = getUserProfileRef(getUserProfileVars);
// Variables can be defined inline as well.
const ref = getUserProfileRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProfileRef(dataConnect, getUserProfileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetTeamMembers
You can execute the `GetTeamMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getTeamMembers(vars: GetTeamMembersVariables): QueryPromise<GetTeamMembersData, GetTeamMembersVariables>;

interface GetTeamMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamMembersVariables): QueryRef<GetTeamMembersData, GetTeamMembersVariables>;
}
export const getTeamMembersRef: GetTeamMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeamMembers(dc: DataConnect, vars: GetTeamMembersVariables): QueryPromise<GetTeamMembersData, GetTeamMembersVariables>;

interface GetTeamMembersRef {
  ...
  (dc: DataConnect, vars: GetTeamMembersVariables): QueryRef<GetTeamMembersData, GetTeamMembersVariables>;
}
export const getTeamMembersRef: GetTeamMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeamMembersRef:
```typescript
const name = getTeamMembersRef.operationName;
console.log(name);
```

### Variables
The `GetTeamMembers` query requires an argument of type `GetTeamMembersVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeamMembersVariables {
  teamId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTeamMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeamMembersData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTeamMembersData {
  teamMembers: ({
    id: UUIDString;
    role: string;
    joinedAt: TimestampString;
    user: {
      id: UUIDString;
      displayName?: string | null;
      email: string;
      avatarUrl?: string | null;
    } & User_Key;
  } & TeamMember_Key)[];
}
```
### Using `GetTeamMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeamMembers, GetTeamMembersVariables } from '@playlink/dataconnect';

// The `GetTeamMembers` query requires an argument of type `GetTeamMembersVariables`:
const getTeamMembersVars: GetTeamMembersVariables = {
  teamId: ..., 
};

// Call the `getTeamMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeamMembers(getTeamMembersVars);
// Variables can be defined inline as well.
const { data } = await getTeamMembers({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeamMembers(dataConnect, getTeamMembersVars);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
getTeamMembers(getTeamMembersVars).then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

### Using `GetTeamMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeamMembersRef, GetTeamMembersVariables } from '@playlink/dataconnect';

// The `GetTeamMembers` query requires an argument of type `GetTeamMembersVariables`:
const getTeamMembersVars: GetTeamMembersVariables = {
  teamId: ..., 
};

// Call the `getTeamMembersRef()` function to get a reference to the query.
const ref = getTeamMembersRef(getTeamMembersVars);
// Variables can be defined inline as well.
const ref = getTeamMembersRef({ teamId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeamMembersRef(dataConnect, getTeamMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `playlink-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateTeam
You can execute the `CreateTeam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createTeam(vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface CreateTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
}
export const createTeamRef: CreateTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTeam(dc: DataConnect, vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface CreateTeamRef {
  ...
  (dc: DataConnect, vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
}
export const createTeamRef: CreateTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTeamRef:
```typescript
const name = createTeamRef.operationName;
console.log(name);
```

### Variables
The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTeamVariables {
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateTeam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTeamData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTeamData {
  team_insert: Team_Key;
}
```
### Using `CreateTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTeam, CreateTeamVariables } from '@playlink/dataconnect';

// The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`:
const createTeamVars: CreateTeamVariables = {
  name: ..., 
  slug: ..., 
  logoUrl: ..., // optional
  description: ..., // optional
};

// Call the `createTeam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTeam(createTeamVars);
// Variables can be defined inline as well.
const { data } = await createTeam({ name: ..., slug: ..., logoUrl: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTeam(dataConnect, createTeamVars);

console.log(data.team_insert);

// Or, you can use the `Promise` API.
createTeam(createTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team_insert);
});
```

### Using `CreateTeam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTeamRef, CreateTeamVariables } from '@playlink/dataconnect';

// The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`:
const createTeamVars: CreateTeamVariables = {
  name: ..., 
  slug: ..., 
  logoUrl: ..., // optional
  description: ..., // optional
};

// Call the `createTeamRef()` function to get a reference to the mutation.
const ref = createTeamRef(createTeamVars);
// Variables can be defined inline as well.
const ref = createTeamRef({ name: ..., slug: ..., logoUrl: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTeamRef(dataConnect, createTeamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.team_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.team_insert);
});
```

## UpdateTeam
You can execute the `UpdateTeam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateTeam(vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface UpdateTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
}
export const updateTeamRef: UpdateTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeam(dc: DataConnect, vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface UpdateTeamRef {
  ...
  (dc: DataConnect, vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
}
export const updateTeamRef: UpdateTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeamRef:
```typescript
const name = updateTeamRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeamVariables {
  teamId: UUIDString;
  name?: string | null;
  logoUrl?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateTeam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeamData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeamData {
  team_update?: Team_Key | null;
}
```
### Using `UpdateTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeam, UpdateTeamVariables } from '@playlink/dataconnect';

// The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`:
const updateTeamVars: UpdateTeamVariables = {
  teamId: ..., 
  name: ..., // optional
  logoUrl: ..., // optional
  description: ..., // optional
};

// Call the `updateTeam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeam(updateTeamVars);
// Variables can be defined inline as well.
const { data } = await updateTeam({ teamId: ..., name: ..., logoUrl: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeam(dataConnect, updateTeamVars);

console.log(data.team_update);

// Or, you can use the `Promise` API.
updateTeam(updateTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team_update);
});
```

### Using `UpdateTeam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeamRef, UpdateTeamVariables } from '@playlink/dataconnect';

// The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`:
const updateTeamVars: UpdateTeamVariables = {
  teamId: ..., 
  name: ..., // optional
  logoUrl: ..., // optional
  description: ..., // optional
};

// Call the `updateTeamRef()` function to get a reference to the mutation.
const ref = updateTeamRef(updateTeamVars);
// Variables can be defined inline as well.
const ref = updateTeamRef({ teamId: ..., name: ..., logoUrl: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeamRef(dataConnect, updateTeamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.team_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.team_update);
});
```

## CreatePlayer
You can execute the `CreatePlayer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createPlayer(vars: CreatePlayerVariables): MutationPromise<CreatePlayerData, CreatePlayerVariables>;

interface CreatePlayerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePlayerVariables): MutationRef<CreatePlayerData, CreatePlayerVariables>;
}
export const createPlayerRef: CreatePlayerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPlayer(dc: DataConnect, vars: CreatePlayerVariables): MutationPromise<CreatePlayerData, CreatePlayerVariables>;

interface CreatePlayerRef {
  ...
  (dc: DataConnect, vars: CreatePlayerVariables): MutationRef<CreatePlayerData, CreatePlayerVariables>;
}
export const createPlayerRef: CreatePlayerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPlayerRef:
```typescript
const name = createPlayerRef.operationName;
console.log(name);
```

### Variables
The `CreatePlayer` mutation requires an argument of type `CreatePlayerVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePlayerVariables {
  teamId: UUIDString;
  name: string;
  uniformNumber?: number | null;
  position?: string | null;
  bats?: string | null;
  throws?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreatePlayer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePlayerData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePlayerData {
  player_insert: Player_Key;
}
```
### Using `CreatePlayer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPlayer, CreatePlayerVariables } from '@playlink/dataconnect';

// The `CreatePlayer` mutation requires an argument of type `CreatePlayerVariables`:
const createPlayerVars: CreatePlayerVariables = {
  teamId: ..., 
  name: ..., 
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
  photoUrl: ..., // optional
};

// Call the `createPlayer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPlayer(createPlayerVars);
// Variables can be defined inline as well.
const { data } = await createPlayer({ teamId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPlayer(dataConnect, createPlayerVars);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
createPlayer(createPlayerVars).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

### Using `CreatePlayer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPlayerRef, CreatePlayerVariables } from '@playlink/dataconnect';

// The `CreatePlayer` mutation requires an argument of type `CreatePlayerVariables`:
const createPlayerVars: CreatePlayerVariables = {
  teamId: ..., 
  name: ..., 
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
  photoUrl: ..., // optional
};

// Call the `createPlayerRef()` function to get a reference to the mutation.
const ref = createPlayerRef(createPlayerVars);
// Variables can be defined inline as well.
const ref = createPlayerRef({ teamId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPlayerRef(dataConnect, createPlayerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

## UpdatePlayer
You can execute the `UpdatePlayer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updatePlayer(vars: UpdatePlayerVariables): MutationPromise<UpdatePlayerData, UpdatePlayerVariables>;

interface UpdatePlayerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayerVariables): MutationRef<UpdatePlayerData, UpdatePlayerVariables>;
}
export const updatePlayerRef: UpdatePlayerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePlayer(dc: DataConnect, vars: UpdatePlayerVariables): MutationPromise<UpdatePlayerData, UpdatePlayerVariables>;

interface UpdatePlayerRef {
  ...
  (dc: DataConnect, vars: UpdatePlayerVariables): MutationRef<UpdatePlayerData, UpdatePlayerVariables>;
}
export const updatePlayerRef: UpdatePlayerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePlayerRef:
```typescript
const name = updatePlayerRef.operationName;
console.log(name);
```

### Variables
The `UpdatePlayer` mutation requires an argument of type `UpdatePlayerVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePlayerVariables {
  playerId: UUIDString;
  name?: string | null;
  uniformNumber?: number | null;
  position?: string | null;
  bats?: string | null;
  throws?: string | null;
  photoUrl?: string | null;
  isActive?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdatePlayer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePlayerData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePlayerData {
  player_update?: Player_Key | null;
}
```
### Using `UpdatePlayer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePlayer, UpdatePlayerVariables } from '@playlink/dataconnect';

// The `UpdatePlayer` mutation requires an argument of type `UpdatePlayerVariables`:
const updatePlayerVars: UpdatePlayerVariables = {
  playerId: ..., 
  name: ..., // optional
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
  photoUrl: ..., // optional
  isActive: ..., // optional
};

// Call the `updatePlayer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePlayer(updatePlayerVars);
// Variables can be defined inline as well.
const { data } = await updatePlayer({ playerId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., photoUrl: ..., isActive: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePlayer(dataConnect, updatePlayerVars);

console.log(data.player_update);

// Or, you can use the `Promise` API.
updatePlayer(updatePlayerVars).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

### Using `UpdatePlayer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePlayerRef, UpdatePlayerVariables } from '@playlink/dataconnect';

// The `UpdatePlayer` mutation requires an argument of type `UpdatePlayerVariables`:
const updatePlayerVars: UpdatePlayerVariables = {
  playerId: ..., 
  name: ..., // optional
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
  photoUrl: ..., // optional
  isActive: ..., // optional
};

// Call the `updatePlayerRef()` function to get a reference to the mutation.
const ref = updatePlayerRef(updatePlayerVars);
// Variables can be defined inline as well.
const ref = updatePlayerRef({ playerId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., photoUrl: ..., isActive: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePlayerRef(dataConnect, updatePlayerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

## DeactivatePlayer
You can execute the `DeactivatePlayer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deactivatePlayer(vars: DeactivatePlayerVariables): MutationPromise<DeactivatePlayerData, DeactivatePlayerVariables>;

interface DeactivatePlayerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivatePlayerVariables): MutationRef<DeactivatePlayerData, DeactivatePlayerVariables>;
}
export const deactivatePlayerRef: DeactivatePlayerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivatePlayer(dc: DataConnect, vars: DeactivatePlayerVariables): MutationPromise<DeactivatePlayerData, DeactivatePlayerVariables>;

interface DeactivatePlayerRef {
  ...
  (dc: DataConnect, vars: DeactivatePlayerVariables): MutationRef<DeactivatePlayerData, DeactivatePlayerVariables>;
}
export const deactivatePlayerRef: DeactivatePlayerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivatePlayerRef:
```typescript
const name = deactivatePlayerRef.operationName;
console.log(name);
```

### Variables
The `DeactivatePlayer` mutation requires an argument of type `DeactivatePlayerVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivatePlayerVariables {
  playerId: UUIDString;
}
```
### Return Type
Recall that executing the `DeactivatePlayer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivatePlayerData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivatePlayerData {
  player_update?: Player_Key | null;
}
```
### Using `DeactivatePlayer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivatePlayer, DeactivatePlayerVariables } from '@playlink/dataconnect';

// The `DeactivatePlayer` mutation requires an argument of type `DeactivatePlayerVariables`:
const deactivatePlayerVars: DeactivatePlayerVariables = {
  playerId: ..., 
};

// Call the `deactivatePlayer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivatePlayer(deactivatePlayerVars);
// Variables can be defined inline as well.
const { data } = await deactivatePlayer({ playerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivatePlayer(dataConnect, deactivatePlayerVars);

console.log(data.player_update);

// Or, you can use the `Promise` API.
deactivatePlayer(deactivatePlayerVars).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

### Using `DeactivatePlayer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivatePlayerRef, DeactivatePlayerVariables } from '@playlink/dataconnect';

// The `DeactivatePlayer` mutation requires an argument of type `DeactivatePlayerVariables`:
const deactivatePlayerVars: DeactivatePlayerVariables = {
  playerId: ..., 
};

// Call the `deactivatePlayerRef()` function to get a reference to the mutation.
const ref = deactivatePlayerRef(deactivatePlayerVars);
// Variables can be defined inline as well.
const ref = deactivatePlayerRef({ playerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivatePlayerRef(dataConnect, deactivatePlayerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_update);
});
```

## CreateGame
You can execute the `CreateGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createGame(vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface CreateGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
}
export const createGameRef: CreateGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGame(dc: DataConnect, vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface CreateGameRef {
  ...
  (dc: DataConnect, vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
}
export const createGameRef: CreateGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGameRef:
```typescript
const name = createGameRef.operationName;
console.log(name);
```

### Variables
The `CreateGame` mutation requires an argument of type `CreateGameVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGameVariables {
  teamId: UUIDString;
  opponentName: string;
  gameDate: DateString;
  location?: string | null;
  isHome?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGameData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGameData {
  game_insert: Game_Key;
}
```
### Using `CreateGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGame, CreateGameVariables } from '@playlink/dataconnect';

// The `CreateGame` mutation requires an argument of type `CreateGameVariables`:
const createGameVars: CreateGameVariables = {
  teamId: ..., 
  opponentName: ..., 
  gameDate: ..., 
  location: ..., // optional
  isHome: ..., // optional
};

// Call the `createGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGame(createGameVars);
// Variables can be defined inline as well.
const { data } = await createGame({ teamId: ..., opponentName: ..., gameDate: ..., location: ..., isHome: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGame(dataConnect, createGameVars);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
createGame(createGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

### Using `CreateGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGameRef, CreateGameVariables } from '@playlink/dataconnect';

// The `CreateGame` mutation requires an argument of type `CreateGameVariables`:
const createGameVars: CreateGameVariables = {
  teamId: ..., 
  opponentName: ..., 
  gameDate: ..., 
  location: ..., // optional
  isHome: ..., // optional
};

// Call the `createGameRef()` function to get a reference to the mutation.
const ref = createGameRef(createGameVars);
// Variables can be defined inline as well.
const ref = createGameRef({ teamId: ..., opponentName: ..., gameDate: ..., location: ..., isHome: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGameRef(dataConnect, createGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

## UpdateGame
You can execute the `UpdateGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateGame(vars: UpdateGameVariables): MutationPromise<UpdateGameData, UpdateGameVariables>;

interface UpdateGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGameVariables): MutationRef<UpdateGameData, UpdateGameVariables>;
}
export const updateGameRef: UpdateGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGame(dc: DataConnect, vars: UpdateGameVariables): MutationPromise<UpdateGameData, UpdateGameVariables>;

interface UpdateGameRef {
  ...
  (dc: DataConnect, vars: UpdateGameVariables): MutationRef<UpdateGameData, UpdateGameVariables>;
}
export const updateGameRef: UpdateGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGameRef:
```typescript
const name = updateGameRef.operationName;
console.log(name);
```

### Variables
The `UpdateGame` mutation requires an argument of type `UpdateGameVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGameVariables {
  gameId: UUIDString;
  opponentName?: string | null;
  gameDate?: DateString | null;
  location?: string | null;
  videoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGameData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGameData {
  game_update?: Game_Key | null;
}
```
### Using `UpdateGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGame, UpdateGameVariables } from '@playlink/dataconnect';

// The `UpdateGame` mutation requires an argument of type `UpdateGameVariables`:
const updateGameVars: UpdateGameVariables = {
  gameId: ..., 
  opponentName: ..., // optional
  gameDate: ..., // optional
  location: ..., // optional
  videoUrl: ..., // optional
};

// Call the `updateGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGame(updateGameVars);
// Variables can be defined inline as well.
const { data } = await updateGame({ gameId: ..., opponentName: ..., gameDate: ..., location: ..., videoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGame(dataConnect, updateGameVars);

console.log(data.game_update);

// Or, you can use the `Promise` API.
updateGame(updateGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

### Using `UpdateGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGameRef, UpdateGameVariables } from '@playlink/dataconnect';

// The `UpdateGame` mutation requires an argument of type `UpdateGameVariables`:
const updateGameVars: UpdateGameVariables = {
  gameId: ..., 
  opponentName: ..., // optional
  gameDate: ..., // optional
  location: ..., // optional
  videoUrl: ..., // optional
};

// Call the `updateGameRef()` function to get a reference to the mutation.
const ref = updateGameRef(updateGameVars);
// Variables can be defined inline as well.
const ref = updateGameRef({ gameId: ..., opponentName: ..., gameDate: ..., location: ..., videoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGameRef(dataConnect, updateGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

## FinalizeGame
You can execute the `FinalizeGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
finalizeGame(vars: FinalizeGameVariables): MutationPromise<FinalizeGameData, FinalizeGameVariables>;

interface FinalizeGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinalizeGameVariables): MutationRef<FinalizeGameData, FinalizeGameVariables>;
}
export const finalizeGameRef: FinalizeGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
finalizeGame(dc: DataConnect, vars: FinalizeGameVariables): MutationPromise<FinalizeGameData, FinalizeGameVariables>;

interface FinalizeGameRef {
  ...
  (dc: DataConnect, vars: FinalizeGameVariables): MutationRef<FinalizeGameData, FinalizeGameVariables>;
}
export const finalizeGameRef: FinalizeGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the finalizeGameRef:
```typescript
const name = finalizeGameRef.operationName;
console.log(name);
```

### Variables
The `FinalizeGame` mutation requires an argument of type `FinalizeGameVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FinalizeGameVariables {
  gameId: UUIDString;
  homeScore: number;
  awayScore: number;
}
```
### Return Type
Recall that executing the `FinalizeGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FinalizeGameData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FinalizeGameData {
  game_update?: Game_Key | null;
}
```
### Using `FinalizeGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, finalizeGame, FinalizeGameVariables } from '@playlink/dataconnect';

// The `FinalizeGame` mutation requires an argument of type `FinalizeGameVariables`:
const finalizeGameVars: FinalizeGameVariables = {
  gameId: ..., 
  homeScore: ..., 
  awayScore: ..., 
};

// Call the `finalizeGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await finalizeGame(finalizeGameVars);
// Variables can be defined inline as well.
const { data } = await finalizeGame({ gameId: ..., homeScore: ..., awayScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await finalizeGame(dataConnect, finalizeGameVars);

console.log(data.game_update);

// Or, you can use the `Promise` API.
finalizeGame(finalizeGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

### Using `FinalizeGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, finalizeGameRef, FinalizeGameVariables } from '@playlink/dataconnect';

// The `FinalizeGame` mutation requires an argument of type `FinalizeGameVariables`:
const finalizeGameVars: FinalizeGameVariables = {
  gameId: ..., 
  homeScore: ..., 
  awayScore: ..., 
};

// Call the `finalizeGameRef()` function to get a reference to the mutation.
const ref = finalizeGameRef(finalizeGameVars);
// Variables can be defined inline as well.
const ref = finalizeGameRef({ gameId: ..., homeScore: ..., awayScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = finalizeGameRef(dataConnect, finalizeGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

## StartGame
You can execute the `StartGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
startGame(vars: StartGameVariables): MutationPromise<StartGameData, StartGameVariables>;

interface StartGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartGameVariables): MutationRef<StartGameData, StartGameVariables>;
}
export const startGameRef: StartGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
startGame(dc: DataConnect, vars: StartGameVariables): MutationPromise<StartGameData, StartGameVariables>;

interface StartGameRef {
  ...
  (dc: DataConnect, vars: StartGameVariables): MutationRef<StartGameData, StartGameVariables>;
}
export const startGameRef: StartGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the startGameRef:
```typescript
const name = startGameRef.operationName;
console.log(name);
```

### Variables
The `StartGame` mutation requires an argument of type `StartGameVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface StartGameVariables {
  gameId: UUIDString;
}
```
### Return Type
Recall that executing the `StartGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `StartGameData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface StartGameData {
  game_update?: Game_Key | null;
}
```
### Using `StartGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, startGame, StartGameVariables } from '@playlink/dataconnect';

// The `StartGame` mutation requires an argument of type `StartGameVariables`:
const startGameVars: StartGameVariables = {
  gameId: ..., 
};

// Call the `startGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await startGame(startGameVars);
// Variables can be defined inline as well.
const { data } = await startGame({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await startGame(dataConnect, startGameVars);

console.log(data.game_update);

// Or, you can use the `Promise` API.
startGame(startGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

### Using `StartGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, startGameRef, StartGameVariables } from '@playlink/dataconnect';

// The `StartGame` mutation requires an argument of type `StartGameVariables`:
const startGameVars: StartGameVariables = {
  gameId: ..., 
};

// Call the `startGameRef()` function to get a reference to the mutation.
const ref = startGameRef(startGameVars);
// Variables can be defined inline as well.
const ref = startGameRef({ gameId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = startGameRef(dataConnect, startGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_update);
});
```

## CreateLineupEntry
You can execute the `CreateLineupEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createLineupEntry(vars: CreateLineupEntryVariables): MutationPromise<CreateLineupEntryData, CreateLineupEntryVariables>;

interface CreateLineupEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLineupEntryVariables): MutationRef<CreateLineupEntryData, CreateLineupEntryVariables>;
}
export const createLineupEntryRef: CreateLineupEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLineupEntry(dc: DataConnect, vars: CreateLineupEntryVariables): MutationPromise<CreateLineupEntryData, CreateLineupEntryVariables>;

interface CreateLineupEntryRef {
  ...
  (dc: DataConnect, vars: CreateLineupEntryVariables): MutationRef<CreateLineupEntryData, CreateLineupEntryVariables>;
}
export const createLineupEntryRef: CreateLineupEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLineupEntryRef:
```typescript
const name = createLineupEntryRef.operationName;
console.log(name);
```

### Variables
The `CreateLineupEntry` mutation requires an argument of type `CreateLineupEntryVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLineupEntryVariables {
  gameId: UUIDString;
  playerId: UUIDString;
  battingOrder?: number | null;
  position?: string | null;
  isStarter?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateLineupEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLineupEntryData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLineupEntryData {
  gameLineup_insert: GameLineup_Key;
}
```
### Using `CreateLineupEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLineupEntry, CreateLineupEntryVariables } from '@playlink/dataconnect';

// The `CreateLineupEntry` mutation requires an argument of type `CreateLineupEntryVariables`:
const createLineupEntryVars: CreateLineupEntryVariables = {
  gameId: ..., 
  playerId: ..., 
  battingOrder: ..., // optional
  position: ..., // optional
  isStarter: ..., // optional
};

// Call the `createLineupEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLineupEntry(createLineupEntryVars);
// Variables can be defined inline as well.
const { data } = await createLineupEntry({ gameId: ..., playerId: ..., battingOrder: ..., position: ..., isStarter: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLineupEntry(dataConnect, createLineupEntryVars);

console.log(data.gameLineup_insert);

// Or, you can use the `Promise` API.
createLineupEntry(createLineupEntryVars).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_insert);
});
```

### Using `CreateLineupEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLineupEntryRef, CreateLineupEntryVariables } from '@playlink/dataconnect';

// The `CreateLineupEntry` mutation requires an argument of type `CreateLineupEntryVariables`:
const createLineupEntryVars: CreateLineupEntryVariables = {
  gameId: ..., 
  playerId: ..., 
  battingOrder: ..., // optional
  position: ..., // optional
  isStarter: ..., // optional
};

// Call the `createLineupEntryRef()` function to get a reference to the mutation.
const ref = createLineupEntryRef(createLineupEntryVars);
// Variables can be defined inline as well.
const ref = createLineupEntryRef({ gameId: ..., playerId: ..., battingOrder: ..., position: ..., isStarter: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLineupEntryRef(dataConnect, createLineupEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameLineup_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_insert);
});
```

## UpdateLineup
You can execute the `UpdateLineup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateLineup(vars: UpdateLineupVariables): MutationPromise<UpdateLineupData, UpdateLineupVariables>;

interface UpdateLineupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLineupVariables): MutationRef<UpdateLineupData, UpdateLineupVariables>;
}
export const updateLineupRef: UpdateLineupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLineup(dc: DataConnect, vars: UpdateLineupVariables): MutationPromise<UpdateLineupData, UpdateLineupVariables>;

interface UpdateLineupRef {
  ...
  (dc: DataConnect, vars: UpdateLineupVariables): MutationRef<UpdateLineupData, UpdateLineupVariables>;
}
export const updateLineupRef: UpdateLineupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLineupRef:
```typescript
const name = updateLineupRef.operationName;
console.log(name);
```

### Variables
The `UpdateLineup` mutation requires an argument of type `UpdateLineupVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLineupVariables {
  lineupId: UUIDString;
  battingOrder?: number | null;
  position?: string | null;
}
```
### Return Type
Recall that executing the `UpdateLineup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLineupData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLineupData {
  gameLineup_update?: GameLineup_Key | null;
}
```
### Using `UpdateLineup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLineup, UpdateLineupVariables } from '@playlink/dataconnect';

// The `UpdateLineup` mutation requires an argument of type `UpdateLineupVariables`:
const updateLineupVars: UpdateLineupVariables = {
  lineupId: ..., 
  battingOrder: ..., // optional
  position: ..., // optional
};

// Call the `updateLineup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLineup(updateLineupVars);
// Variables can be defined inline as well.
const { data } = await updateLineup({ lineupId: ..., battingOrder: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLineup(dataConnect, updateLineupVars);

console.log(data.gameLineup_update);

// Or, you can use the `Promise` API.
updateLineup(updateLineupVars).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_update);
});
```

### Using `UpdateLineup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLineupRef, UpdateLineupVariables } from '@playlink/dataconnect';

// The `UpdateLineup` mutation requires an argument of type `UpdateLineupVariables`:
const updateLineupVars: UpdateLineupVariables = {
  lineupId: ..., 
  battingOrder: ..., // optional
  position: ..., // optional
};

// Call the `updateLineupRef()` function to get a reference to the mutation.
const ref = updateLineupRef(updateLineupVars);
// Variables can be defined inline as well.
const ref = updateLineupRef({ lineupId: ..., battingOrder: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLineupRef(dataConnect, updateLineupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameLineup_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_update);
});
```

## DeleteLineup
You can execute the `DeleteLineup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deleteLineup(vars: DeleteLineupVariables): MutationPromise<DeleteLineupData, DeleteLineupVariables>;

interface DeleteLineupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLineupVariables): MutationRef<DeleteLineupData, DeleteLineupVariables>;
}
export const deleteLineupRef: DeleteLineupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLineup(dc: DataConnect, vars: DeleteLineupVariables): MutationPromise<DeleteLineupData, DeleteLineupVariables>;

interface DeleteLineupRef {
  ...
  (dc: DataConnect, vars: DeleteLineupVariables): MutationRef<DeleteLineupData, DeleteLineupVariables>;
}
export const deleteLineupRef: DeleteLineupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLineupRef:
```typescript
const name = deleteLineupRef.operationName;
console.log(name);
```

### Variables
The `DeleteLineup` mutation requires an argument of type `DeleteLineupVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLineupVariables {
  lineupId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLineup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLineupData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLineupData {
  gameLineup_delete?: GameLineup_Key | null;
}
```
### Using `DeleteLineup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLineup, DeleteLineupVariables } from '@playlink/dataconnect';

// The `DeleteLineup` mutation requires an argument of type `DeleteLineupVariables`:
const deleteLineupVars: DeleteLineupVariables = {
  lineupId: ..., 
};

// Call the `deleteLineup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLineup(deleteLineupVars);
// Variables can be defined inline as well.
const { data } = await deleteLineup({ lineupId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLineup(dataConnect, deleteLineupVars);

console.log(data.gameLineup_delete);

// Or, you can use the `Promise` API.
deleteLineup(deleteLineupVars).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_delete);
});
```

### Using `DeleteLineup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLineupRef, DeleteLineupVariables } from '@playlink/dataconnect';

// The `DeleteLineup` mutation requires an argument of type `DeleteLineupVariables`:
const deleteLineupVars: DeleteLineupVariables = {
  lineupId: ..., 
};

// Call the `deleteLineupRef()` function to get a reference to the mutation.
const ref = deleteLineupRef(deleteLineupVars);
// Variables can be defined inline as well.
const ref = deleteLineupRef({ lineupId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLineupRef(dataConnect, deleteLineupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameLineup_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameLineup_delete);
});
```

## RecordPlay
You can execute the `RecordPlay` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
recordPlay(vars: RecordPlayVariables): MutationPromise<RecordPlayData, RecordPlayVariables>;

interface RecordPlayRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPlayVariables): MutationRef<RecordPlayData, RecordPlayVariables>;
}
export const recordPlayRef: RecordPlayRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordPlay(dc: DataConnect, vars: RecordPlayVariables): MutationPromise<RecordPlayData, RecordPlayVariables>;

interface RecordPlayRef {
  ...
  (dc: DataConnect, vars: RecordPlayVariables): MutationRef<RecordPlayData, RecordPlayVariables>;
}
export const recordPlayRef: RecordPlayRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordPlayRef:
```typescript
const name = recordPlayRef.operationName;
console.log(name);
```

### Variables
The `RecordPlay` mutation requires an argument of type `RecordPlayVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordPlayVariables {
  gameId: UUIDString;
  inning: number;
  isTop: boolean;
  batterId: UUIDString;
  pitcherId?: UUIDString | null;
  playType: string;
  result: string;
  rbi?: number | null;
  runsScored?: number | null;
}
```
### Return Type
Recall that executing the `RecordPlay` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordPlayData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordPlayData {
  gamePlay_insert: GamePlay_Key;
}
```
### Using `RecordPlay`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordPlay, RecordPlayVariables } from '@playlink/dataconnect';

// The `RecordPlay` mutation requires an argument of type `RecordPlayVariables`:
const recordPlayVars: RecordPlayVariables = {
  gameId: ..., 
  inning: ..., 
  isTop: ..., 
  batterId: ..., 
  pitcherId: ..., // optional
  playType: ..., 
  result: ..., 
  rbi: ..., // optional
  runsScored: ..., // optional
};

// Call the `recordPlay()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordPlay(recordPlayVars);
// Variables can be defined inline as well.
const { data } = await recordPlay({ gameId: ..., inning: ..., isTop: ..., batterId: ..., pitcherId: ..., playType: ..., result: ..., rbi: ..., runsScored: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordPlay(dataConnect, recordPlayVars);

console.log(data.gamePlay_insert);

// Or, you can use the `Promise` API.
recordPlay(recordPlayVars).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_insert);
});
```

### Using `RecordPlay`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordPlayRef, RecordPlayVariables } from '@playlink/dataconnect';

// The `RecordPlay` mutation requires an argument of type `RecordPlayVariables`:
const recordPlayVars: RecordPlayVariables = {
  gameId: ..., 
  inning: ..., 
  isTop: ..., 
  batterId: ..., 
  pitcherId: ..., // optional
  playType: ..., 
  result: ..., 
  rbi: ..., // optional
  runsScored: ..., // optional
};

// Call the `recordPlayRef()` function to get a reference to the mutation.
const ref = recordPlayRef(recordPlayVars);
// Variables can be defined inline as well.
const ref = recordPlayRef({ gameId: ..., inning: ..., isTop: ..., batterId: ..., pitcherId: ..., playType: ..., result: ..., rbi: ..., runsScored: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordPlayRef(dataConnect, recordPlayVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gamePlay_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_insert);
});
```

## UpdatePlay
You can execute the `UpdatePlay` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updatePlay(vars: UpdatePlayVariables): MutationPromise<UpdatePlayData, UpdatePlayVariables>;

interface UpdatePlayRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayVariables): MutationRef<UpdatePlayData, UpdatePlayVariables>;
}
export const updatePlayRef: UpdatePlayRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePlay(dc: DataConnect, vars: UpdatePlayVariables): MutationPromise<UpdatePlayData, UpdatePlayVariables>;

interface UpdatePlayRef {
  ...
  (dc: DataConnect, vars: UpdatePlayVariables): MutationRef<UpdatePlayData, UpdatePlayVariables>;
}
export const updatePlayRef: UpdatePlayRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePlayRef:
```typescript
const name = updatePlayRef.operationName;
console.log(name);
```

### Variables
The `UpdatePlay` mutation requires an argument of type `UpdatePlayVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePlayVariables {
  playId: UUIDString;
  playType?: string | null;
  result?: string | null;
  rbi?: number | null;
  runsScored?: number | null;
}
```
### Return Type
Recall that executing the `UpdatePlay` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePlayData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePlayData {
  gamePlay_update?: GamePlay_Key | null;
}
```
### Using `UpdatePlay`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePlay, UpdatePlayVariables } from '@playlink/dataconnect';

// The `UpdatePlay` mutation requires an argument of type `UpdatePlayVariables`:
const updatePlayVars: UpdatePlayVariables = {
  playId: ..., 
  playType: ..., // optional
  result: ..., // optional
  rbi: ..., // optional
  runsScored: ..., // optional
};

// Call the `updatePlay()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePlay(updatePlayVars);
// Variables can be defined inline as well.
const { data } = await updatePlay({ playId: ..., playType: ..., result: ..., rbi: ..., runsScored: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePlay(dataConnect, updatePlayVars);

console.log(data.gamePlay_update);

// Or, you can use the `Promise` API.
updatePlay(updatePlayVars).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_update);
});
```

### Using `UpdatePlay`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePlayRef, UpdatePlayVariables } from '@playlink/dataconnect';

// The `UpdatePlay` mutation requires an argument of type `UpdatePlayVariables`:
const updatePlayVars: UpdatePlayVariables = {
  playId: ..., 
  playType: ..., // optional
  result: ..., // optional
  rbi: ..., // optional
  runsScored: ..., // optional
};

// Call the `updatePlayRef()` function to get a reference to the mutation.
const ref = updatePlayRef(updatePlayVars);
// Variables can be defined inline as well.
const ref = updatePlayRef({ playId: ..., playType: ..., result: ..., rbi: ..., runsScored: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePlayRef(dataConnect, updatePlayVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gamePlay_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_update);
});
```

## DeletePlay
You can execute the `DeletePlay` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deletePlay(vars: DeletePlayVariables): MutationPromise<DeletePlayData, DeletePlayVariables>;

interface DeletePlayRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePlayVariables): MutationRef<DeletePlayData, DeletePlayVariables>;
}
export const deletePlayRef: DeletePlayRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePlay(dc: DataConnect, vars: DeletePlayVariables): MutationPromise<DeletePlayData, DeletePlayVariables>;

interface DeletePlayRef {
  ...
  (dc: DataConnect, vars: DeletePlayVariables): MutationRef<DeletePlayData, DeletePlayVariables>;
}
export const deletePlayRef: DeletePlayRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePlayRef:
```typescript
const name = deletePlayRef.operationName;
console.log(name);
```

### Variables
The `DeletePlay` mutation requires an argument of type `DeletePlayVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePlayVariables {
  playId: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePlay` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePlayData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePlayData {
  gamePlay_delete?: GamePlay_Key | null;
}
```
### Using `DeletePlay`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePlay, DeletePlayVariables } from '@playlink/dataconnect';

// The `DeletePlay` mutation requires an argument of type `DeletePlayVariables`:
const deletePlayVars: DeletePlayVariables = {
  playId: ..., 
};

// Call the `deletePlay()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePlay(deletePlayVars);
// Variables can be defined inline as well.
const { data } = await deletePlay({ playId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePlay(dataConnect, deletePlayVars);

console.log(data.gamePlay_delete);

// Or, you can use the `Promise` API.
deletePlay(deletePlayVars).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_delete);
});
```

### Using `DeletePlay`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePlayRef, DeletePlayVariables } from '@playlink/dataconnect';

// The `DeletePlay` mutation requires an argument of type `DeletePlayVariables`:
const deletePlayVars: DeletePlayVariables = {
  playId: ..., 
};

// Call the `deletePlayRef()` function to get a reference to the mutation.
const ref = deletePlayRef(deletePlayVars);
// Variables can be defined inline as well.
const ref = deletePlayRef({ playId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePlayRef(dataConnect, deletePlayVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gamePlay_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gamePlay_delete);
});
```

## CreateArticle
You can execute the `CreateArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createArticle(vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface CreateArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
}
export const createArticleRef: CreateArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createArticle(dc: DataConnect, vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface CreateArticleRef {
  ...
  (dc: DataConnect, vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
}
export const createArticleRef: CreateArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createArticleRef:
```typescript
const name = createArticleRef.operationName;
console.log(name);
```

### Variables
The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateArticleVariables {
  teamId: UUIDString;
  authorId: UUIDString;
  title: string;
  content: string;
  thumbnailUrl?: string | null;
  linkedGameId?: UUIDString | null;
  isPublished?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateArticleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateArticleData {
  article_insert: Article_Key;
}
```
### Using `CreateArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createArticle, CreateArticleVariables } from '@playlink/dataconnect';

// The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`:
const createArticleVars: CreateArticleVariables = {
  teamId: ..., 
  authorId: ..., 
  title: ..., 
  content: ..., 
  thumbnailUrl: ..., // optional
  linkedGameId: ..., // optional
  isPublished: ..., // optional
};

// Call the `createArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createArticle(createArticleVars);
// Variables can be defined inline as well.
const { data } = await createArticle({ teamId: ..., authorId: ..., title: ..., content: ..., thumbnailUrl: ..., linkedGameId: ..., isPublished: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createArticle(dataConnect, createArticleVars);

console.log(data.article_insert);

// Or, you can use the `Promise` API.
createArticle(createArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_insert);
});
```

### Using `CreateArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createArticleRef, CreateArticleVariables } from '@playlink/dataconnect';

// The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`:
const createArticleVars: CreateArticleVariables = {
  teamId: ..., 
  authorId: ..., 
  title: ..., 
  content: ..., 
  thumbnailUrl: ..., // optional
  linkedGameId: ..., // optional
  isPublished: ..., // optional
};

// Call the `createArticleRef()` function to get a reference to the mutation.
const ref = createArticleRef(createArticleVars);
// Variables can be defined inline as well.
const ref = createArticleRef({ teamId: ..., authorId: ..., title: ..., content: ..., thumbnailUrl: ..., linkedGameId: ..., isPublished: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createArticleRef(dataConnect, createArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_insert);
});
```

## UpdateArticle
You can execute the `UpdateArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateArticle(vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface UpdateArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
}
export const updateArticleRef: UpdateArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateArticle(dc: DataConnect, vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface UpdateArticleRef {
  ...
  (dc: DataConnect, vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
}
export const updateArticleRef: UpdateArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateArticleRef:
```typescript
const name = updateArticleRef.operationName;
console.log(name);
```

### Variables
The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateArticleVariables {
  articleId: UUIDString;
  title?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  linkedGameId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateArticleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateArticleData {
  article_update?: Article_Key | null;
}
```
### Using `UpdateArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateArticle, UpdateArticleVariables } from '@playlink/dataconnect';

// The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`:
const updateArticleVars: UpdateArticleVariables = {
  articleId: ..., 
  title: ..., // optional
  content: ..., // optional
  thumbnailUrl: ..., // optional
  linkedGameId: ..., // optional
};

// Call the `updateArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateArticle(updateArticleVars);
// Variables can be defined inline as well.
const { data } = await updateArticle({ articleId: ..., title: ..., content: ..., thumbnailUrl: ..., linkedGameId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateArticle(dataConnect, updateArticleVars);

console.log(data.article_update);

// Or, you can use the `Promise` API.
updateArticle(updateArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

### Using `UpdateArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateArticleRef, UpdateArticleVariables } from '@playlink/dataconnect';

// The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`:
const updateArticleVars: UpdateArticleVariables = {
  articleId: ..., 
  title: ..., // optional
  content: ..., // optional
  thumbnailUrl: ..., // optional
  linkedGameId: ..., // optional
};

// Call the `updateArticleRef()` function to get a reference to the mutation.
const ref = updateArticleRef(updateArticleVars);
// Variables can be defined inline as well.
const ref = updateArticleRef({ articleId: ..., title: ..., content: ..., thumbnailUrl: ..., linkedGameId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateArticleRef(dataConnect, updateArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

## UnpublishArticle
You can execute the `UnpublishArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
unpublishArticle(vars: UnpublishArticleVariables): MutationPromise<UnpublishArticleData, UnpublishArticleVariables>;

interface UnpublishArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnpublishArticleVariables): MutationRef<UnpublishArticleData, UnpublishArticleVariables>;
}
export const unpublishArticleRef: UnpublishArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
unpublishArticle(dc: DataConnect, vars: UnpublishArticleVariables): MutationPromise<UnpublishArticleData, UnpublishArticleVariables>;

interface UnpublishArticleRef {
  ...
  (dc: DataConnect, vars: UnpublishArticleVariables): MutationRef<UnpublishArticleData, UnpublishArticleVariables>;
}
export const unpublishArticleRef: UnpublishArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the unpublishArticleRef:
```typescript
const name = unpublishArticleRef.operationName;
console.log(name);
```

### Variables
The `UnpublishArticle` mutation requires an argument of type `UnpublishArticleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UnpublishArticleVariables {
  articleId: UUIDString;
}
```
### Return Type
Recall that executing the `UnpublishArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UnpublishArticleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UnpublishArticleData {
  article_update?: Article_Key | null;
}
```
### Using `UnpublishArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, unpublishArticle, UnpublishArticleVariables } from '@playlink/dataconnect';

// The `UnpublishArticle` mutation requires an argument of type `UnpublishArticleVariables`:
const unpublishArticleVars: UnpublishArticleVariables = {
  articleId: ..., 
};

// Call the `unpublishArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await unpublishArticle(unpublishArticleVars);
// Variables can be defined inline as well.
const { data } = await unpublishArticle({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await unpublishArticle(dataConnect, unpublishArticleVars);

console.log(data.article_update);

// Or, you can use the `Promise` API.
unpublishArticle(unpublishArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

### Using `UnpublishArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, unpublishArticleRef, UnpublishArticleVariables } from '@playlink/dataconnect';

// The `UnpublishArticle` mutation requires an argument of type `UnpublishArticleVariables`:
const unpublishArticleVars: UnpublishArticleVariables = {
  articleId: ..., 
};

// Call the `unpublishArticleRef()` function to get a reference to the mutation.
const ref = unpublishArticleRef(unpublishArticleVars);
// Variables can be defined inline as well.
const ref = unpublishArticleRef({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = unpublishArticleRef(dataConnect, unpublishArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

## DeleteArticle
You can execute the `DeleteArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deleteArticle(vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface DeleteArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
}
export const deleteArticleRef: DeleteArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteArticle(dc: DataConnect, vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface DeleteArticleRef {
  ...
  (dc: DataConnect, vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
}
export const deleteArticleRef: DeleteArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteArticleRef:
```typescript
const name = deleteArticleRef.operationName;
console.log(name);
```

### Variables
The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteArticleVariables {
  articleId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteArticleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteArticleData {
  article_delete?: Article_Key | null;
}
```
### Using `DeleteArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteArticle, DeleteArticleVariables } from '@playlink/dataconnect';

// The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`:
const deleteArticleVars: DeleteArticleVariables = {
  articleId: ..., 
};

// Call the `deleteArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteArticle(deleteArticleVars);
// Variables can be defined inline as well.
const { data } = await deleteArticle({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteArticle(dataConnect, deleteArticleVars);

console.log(data.article_delete);

// Or, you can use the `Promise` API.
deleteArticle(deleteArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_delete);
});
```

### Using `DeleteArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteArticleRef, DeleteArticleVariables } from '@playlink/dataconnect';

// The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`:
const deleteArticleVars: DeleteArticleVariables = {
  articleId: ..., 
};

// Call the `deleteArticleRef()` function to get a reference to the mutation.
const ref = deleteArticleRef(deleteArticleVars);
// Variables can be defined inline as well.
const ref = deleteArticleRef({ articleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteArticleRef(dataConnect, deleteArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_delete);
});
```

## CreateSchedule
You can execute the `CreateSchedule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createSchedule(vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface CreateScheduleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
}
export const createScheduleRef: CreateScheduleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSchedule(dc: DataConnect, vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface CreateScheduleRef {
  ...
  (dc: DataConnect, vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
}
export const createScheduleRef: CreateScheduleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createScheduleRef:
```typescript
const name = createScheduleRef.operationName;
console.log(name);
```

### Variables
The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateScheduleVariables {
  teamId: UUIDString;
  title: string;
  eventType: string;
  startTime: TimestampString;
  endTime?: TimestampString | null;
  location?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateSchedule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateScheduleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateScheduleData {
  schedule_insert: Schedule_Key;
}
```
### Using `CreateSchedule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSchedule, CreateScheduleVariables } from '@playlink/dataconnect';

// The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`:
const createScheduleVars: CreateScheduleVariables = {
  teamId: ..., 
  title: ..., 
  eventType: ..., 
  startTime: ..., 
  endTime: ..., // optional
  location: ..., // optional
  description: ..., // optional
};

// Call the `createSchedule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSchedule(createScheduleVars);
// Variables can be defined inline as well.
const { data } = await createSchedule({ teamId: ..., title: ..., eventType: ..., startTime: ..., endTime: ..., location: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSchedule(dataConnect, createScheduleVars);

console.log(data.schedule_insert);

// Or, you can use the `Promise` API.
createSchedule(createScheduleVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_insert);
});
```

### Using `CreateSchedule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createScheduleRef, CreateScheduleVariables } from '@playlink/dataconnect';

// The `CreateSchedule` mutation requires an argument of type `CreateScheduleVariables`:
const createScheduleVars: CreateScheduleVariables = {
  teamId: ..., 
  title: ..., 
  eventType: ..., 
  startTime: ..., 
  endTime: ..., // optional
  location: ..., // optional
  description: ..., // optional
};

// Call the `createScheduleRef()` function to get a reference to the mutation.
const ref = createScheduleRef(createScheduleVars);
// Variables can be defined inline as well.
const ref = createScheduleRef({ teamId: ..., title: ..., eventType: ..., startTime: ..., endTime: ..., location: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createScheduleRef(dataConnect, createScheduleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_insert);
});
```

## UpdateSchedule
You can execute the `UpdateSchedule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateSchedule(vars: UpdateScheduleVariables): MutationPromise<UpdateScheduleData, UpdateScheduleVariables>;

interface UpdateScheduleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScheduleVariables): MutationRef<UpdateScheduleData, UpdateScheduleVariables>;
}
export const updateScheduleRef: UpdateScheduleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSchedule(dc: DataConnect, vars: UpdateScheduleVariables): MutationPromise<UpdateScheduleData, UpdateScheduleVariables>;

interface UpdateScheduleRef {
  ...
  (dc: DataConnect, vars: UpdateScheduleVariables): MutationRef<UpdateScheduleData, UpdateScheduleVariables>;
}
export const updateScheduleRef: UpdateScheduleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateScheduleRef:
```typescript
const name = updateScheduleRef.operationName;
console.log(name);
```

### Variables
The `UpdateSchedule` mutation requires an argument of type `UpdateScheduleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateScheduleVariables {
  scheduleId: UUIDString;
  title?: string | null;
  eventType?: string | null;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
  location?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSchedule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateScheduleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateScheduleData {
  schedule_update?: Schedule_Key | null;
}
```
### Using `UpdateSchedule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSchedule, UpdateScheduleVariables } from '@playlink/dataconnect';

// The `UpdateSchedule` mutation requires an argument of type `UpdateScheduleVariables`:
const updateScheduleVars: UpdateScheduleVariables = {
  scheduleId: ..., 
  title: ..., // optional
  eventType: ..., // optional
  startTime: ..., // optional
  endTime: ..., // optional
  location: ..., // optional
  description: ..., // optional
};

// Call the `updateSchedule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSchedule(updateScheduleVars);
// Variables can be defined inline as well.
const { data } = await updateSchedule({ scheduleId: ..., title: ..., eventType: ..., startTime: ..., endTime: ..., location: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSchedule(dataConnect, updateScheduleVars);

console.log(data.schedule_update);

// Or, you can use the `Promise` API.
updateSchedule(updateScheduleVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_update);
});
```

### Using `UpdateSchedule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateScheduleRef, UpdateScheduleVariables } from '@playlink/dataconnect';

// The `UpdateSchedule` mutation requires an argument of type `UpdateScheduleVariables`:
const updateScheduleVars: UpdateScheduleVariables = {
  scheduleId: ..., 
  title: ..., // optional
  eventType: ..., // optional
  startTime: ..., // optional
  endTime: ..., // optional
  location: ..., // optional
  description: ..., // optional
};

// Call the `updateScheduleRef()` function to get a reference to the mutation.
const ref = updateScheduleRef(updateScheduleVars);
// Variables can be defined inline as well.
const ref = updateScheduleRef({ scheduleId: ..., title: ..., eventType: ..., startTime: ..., endTime: ..., location: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateScheduleRef(dataConnect, updateScheduleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_update);
});
```

## DeleteSchedule
You can execute the `DeleteSchedule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deleteSchedule(vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface DeleteScheduleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
}
export const deleteScheduleRef: DeleteScheduleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSchedule(dc: DataConnect, vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface DeleteScheduleRef {
  ...
  (dc: DataConnect, vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
}
export const deleteScheduleRef: DeleteScheduleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteScheduleRef:
```typescript
const name = deleteScheduleRef.operationName;
console.log(name);
```

### Variables
The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteScheduleVariables {
  scheduleId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSchedule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteScheduleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteScheduleData {
  schedule_delete?: Schedule_Key | null;
}
```
### Using `DeleteSchedule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSchedule, DeleteScheduleVariables } from '@playlink/dataconnect';

// The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`:
const deleteScheduleVars: DeleteScheduleVariables = {
  scheduleId: ..., 
};

// Call the `deleteSchedule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSchedule(deleteScheduleVars);
// Variables can be defined inline as well.
const { data } = await deleteSchedule({ scheduleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSchedule(dataConnect, deleteScheduleVars);

console.log(data.schedule_delete);

// Or, you can use the `Promise` API.
deleteSchedule(deleteScheduleVars).then((response) => {
  const data = response.data;
  console.log(data.schedule_delete);
});
```

### Using `DeleteSchedule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteScheduleRef, DeleteScheduleVariables } from '@playlink/dataconnect';

// The `DeleteSchedule` mutation requires an argument of type `DeleteScheduleVariables`:
const deleteScheduleVars: DeleteScheduleVariables = {
  scheduleId: ..., 
};

// Call the `deleteScheduleRef()` function to get a reference to the mutation.
const ref = deleteScheduleRef(deleteScheduleVars);
// Variables can be defined inline as well.
const ref = deleteScheduleRef({ scheduleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteScheduleRef(dataConnect, deleteScheduleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.schedule_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.schedule_delete);
});
```

## UpdateUserProfile
You can execute the `UpdateUserProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateUserProfile(vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserProfile(dc: DataConnect, vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface UpdateUserProfileRef {
  ...
  (dc: DataConnect, vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
}
export const updateUserProfileRef: UpdateUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserProfileRef:
```typescript
const name = updateUserProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserProfileVariables {
  userId: UUIDString;
  displayName?: string | null;
  avatarUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUserProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserProfileData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserProfile, UpdateUserProfileVariables } from '@playlink/dataconnect';

// The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  userId: ..., 
  displayName: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateUserProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserProfile(updateUserProfileVars);
// Variables can be defined inline as well.
const { data } = await updateUserProfile({ userId: ..., displayName: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserProfile(dataConnect, updateUserProfileVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserProfile(updateUserProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserProfileRef, UpdateUserProfileVariables } from '@playlink/dataconnect';

// The `UpdateUserProfile` mutation requires an argument of type `UpdateUserProfileVariables`:
const updateUserProfileVars: UpdateUserProfileVariables = {
  userId: ..., 
  displayName: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateUserProfileRef()` function to get a reference to the mutation.
const ref = updateUserProfileRef(updateUserProfileVars);
// Variables can be defined inline as well.
const ref = updateUserProfileRef({ userId: ..., displayName: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserProfileRef(dataConnect, updateUserProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## AddTeamMember
You can execute the `AddTeamMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
addTeamMember(vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface AddTeamMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
}
export const addTeamMemberRef: AddTeamMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTeamMember(dc: DataConnect, vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface AddTeamMemberRef {
  ...
  (dc: DataConnect, vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
}
export const addTeamMemberRef: AddTeamMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTeamMemberRef:
```typescript
const name = addTeamMemberRef.operationName;
console.log(name);
```

### Variables
The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddTeamMemberVariables {
  userId: UUIDString;
  teamId: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that executing the `AddTeamMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTeamMemberData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTeamMemberData {
  teamMember_insert: TeamMember_Key;
}
```
### Using `AddTeamMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTeamMember, AddTeamMemberVariables } from '@playlink/dataconnect';

// The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`:
const addTeamMemberVars: AddTeamMemberVariables = {
  userId: ..., 
  teamId: ..., 
  role: ..., // optional
};

// Call the `addTeamMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTeamMember(addTeamMemberVars);
// Variables can be defined inline as well.
const { data } = await addTeamMember({ userId: ..., teamId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTeamMember(dataConnect, addTeamMemberVars);

console.log(data.teamMember_insert);

// Or, you can use the `Promise` API.
addTeamMember(addTeamMemberVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_insert);
});
```

### Using `AddTeamMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTeamMemberRef, AddTeamMemberVariables } from '@playlink/dataconnect';

// The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`:
const addTeamMemberVars: AddTeamMemberVariables = {
  userId: ..., 
  teamId: ..., 
  role: ..., // optional
};

// Call the `addTeamMemberRef()` function to get a reference to the mutation.
const ref = addTeamMemberRef(addTeamMemberVars);
// Variables can be defined inline as well.
const ref = addTeamMemberRef({ userId: ..., teamId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTeamMemberRef(dataConnect, addTeamMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_insert);
});
```

## UpdateTeamMemberRole
You can execute the `UpdateTeamMemberRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateTeamMemberRole(vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface UpdateTeamMemberRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeamMemberRole(dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface UpdateTeamMemberRoleRef {
  ...
  (dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeamMemberRoleRef:
```typescript
const name = updateTeamMemberRoleRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeamMemberRoleVariables {
  memberId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `UpdateTeamMemberRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeamMemberRoleData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeamMemberRoleData {
  teamMember_update?: TeamMember_Key | null;
}
```
### Using `UpdateTeamMemberRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeamMemberRole, UpdateTeamMemberRoleVariables } from '@playlink/dataconnect';

// The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`:
const updateTeamMemberRoleVars: UpdateTeamMemberRoleVariables = {
  memberId: ..., 
  role: ..., 
};

// Call the `updateTeamMemberRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeamMemberRole(updateTeamMemberRoleVars);
// Variables can be defined inline as well.
const { data } = await updateTeamMemberRole({ memberId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeamMemberRole(dataConnect, updateTeamMemberRoleVars);

console.log(data.teamMember_update);

// Or, you can use the `Promise` API.
updateTeamMemberRole(updateTeamMemberRoleVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_update);
});
```

### Using `UpdateTeamMemberRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeamMemberRoleRef, UpdateTeamMemberRoleVariables } from '@playlink/dataconnect';

// The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`:
const updateTeamMemberRoleVars: UpdateTeamMemberRoleVariables = {
  memberId: ..., 
  role: ..., 
};

// Call the `updateTeamMemberRoleRef()` function to get a reference to the mutation.
const ref = updateTeamMemberRoleRef(updateTeamMemberRoleVars);
// Variables can be defined inline as well.
const ref = updateTeamMemberRoleRef({ memberId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeamMemberRoleRef(dataConnect, updateTeamMemberRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_update);
});
```

## RemoveTeamMember
You can execute the `RemoveTeamMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
removeTeamMember(vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface RemoveTeamMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeTeamMember(dc: DataConnect, vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface RemoveTeamMemberRef {
  ...
  (dc: DataConnect, vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeTeamMemberRef:
```typescript
const name = removeTeamMemberRef.operationName;
console.log(name);
```

### Variables
The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveTeamMemberVariables {
  memberId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveTeamMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveTeamMemberData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}
```
### Using `RemoveTeamMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeTeamMember, RemoveTeamMemberVariables } from '@playlink/dataconnect';

// The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`:
const removeTeamMemberVars: RemoveTeamMemberVariables = {
  memberId: ..., 
};

// Call the `removeTeamMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeTeamMember(removeTeamMemberVars);
// Variables can be defined inline as well.
const { data } = await removeTeamMember({ memberId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeTeamMember(dataConnect, removeTeamMemberVars);

console.log(data.teamMember_delete);

// Or, you can use the `Promise` API.
removeTeamMember(removeTeamMemberVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_delete);
});
```

### Using `RemoveTeamMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeTeamMemberRef, RemoveTeamMemberVariables } from '@playlink/dataconnect';

// The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`:
const removeTeamMemberVars: RemoveTeamMemberVariables = {
  memberId: ..., 
};

// Call the `removeTeamMemberRef()` function to get a reference to the mutation.
const ref = removeTeamMemberRef(removeTeamMemberVars);
// Variables can be defined inline as well.
const ref = removeTeamMemberRef({ memberId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeTeamMemberRef(dataConnect, removeTeamMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_delete);
});
```

## SeedPlayer
You can execute the `SeedPlayer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
seedPlayer(vars: SeedPlayerVariables): MutationPromise<SeedPlayerData, SeedPlayerVariables>;

interface SeedPlayerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedPlayerVariables): MutationRef<SeedPlayerData, SeedPlayerVariables>;
}
export const seedPlayerRef: SeedPlayerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedPlayer(dc: DataConnect, vars: SeedPlayerVariables): MutationPromise<SeedPlayerData, SeedPlayerVariables>;

interface SeedPlayerRef {
  ...
  (dc: DataConnect, vars: SeedPlayerVariables): MutationRef<SeedPlayerData, SeedPlayerVariables>;
}
export const seedPlayerRef: SeedPlayerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedPlayerRef:
```typescript
const name = seedPlayerRef.operationName;
console.log(name);
```

### Variables
The `SeedPlayer` mutation requires an argument of type `SeedPlayerVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedPlayerVariables {
  teamId: UUIDString;
  name: string;
  uniformNumber?: number | null;
  position?: string | null;
  bats?: string | null;
  throws?: string | null;
}
```
### Return Type
Recall that executing the `SeedPlayer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedPlayerData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedPlayerData {
  player_insert: Player_Key;
}
```
### Using `SeedPlayer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedPlayer, SeedPlayerVariables } from '@playlink/dataconnect';

// The `SeedPlayer` mutation requires an argument of type `SeedPlayerVariables`:
const seedPlayerVars: SeedPlayerVariables = {
  teamId: ..., 
  name: ..., 
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
};

// Call the `seedPlayer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedPlayer(seedPlayerVars);
// Variables can be defined inline as well.
const { data } = await seedPlayer({ teamId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedPlayer(dataConnect, seedPlayerVars);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
seedPlayer(seedPlayerVars).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

### Using `SeedPlayer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedPlayerRef, SeedPlayerVariables } from '@playlink/dataconnect';

// The `SeedPlayer` mutation requires an argument of type `SeedPlayerVariables`:
const seedPlayerVars: SeedPlayerVariables = {
  teamId: ..., 
  name: ..., 
  uniformNumber: ..., // optional
  position: ..., // optional
  bats: ..., // optional
  throws: ..., // optional
};

// Call the `seedPlayerRef()` function to get a reference to the mutation.
const ref = seedPlayerRef(seedPlayerVars);
// Variables can be defined inline as well.
const ref = seedPlayerRef({ teamId: ..., name: ..., uniformNumber: ..., position: ..., bats: ..., throws: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedPlayerRef(dataConnect, seedPlayerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.player_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.player_insert);
});
```

## SeedGame
You can execute the `SeedGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
seedGame(vars: SeedGameVariables): MutationPromise<SeedGameData, SeedGameVariables>;

interface SeedGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedGameVariables): MutationRef<SeedGameData, SeedGameVariables>;
}
export const seedGameRef: SeedGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedGame(dc: DataConnect, vars: SeedGameVariables): MutationPromise<SeedGameData, SeedGameVariables>;

interface SeedGameRef {
  ...
  (dc: DataConnect, vars: SeedGameVariables): MutationRef<SeedGameData, SeedGameVariables>;
}
export const seedGameRef: SeedGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedGameRef:
```typescript
const name = seedGameRef.operationName;
console.log(name);
```

### Variables
The `SeedGame` mutation requires an argument of type `SeedGameVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedGameVariables {
  teamId: UUIDString;
  opponentName: string;
  gameDate: DateString;
  location?: string | null;
  isHome: boolean;
  status: string;
  homeScore?: number | null;
  awayScore?: number | null;
}
```
### Return Type
Recall that executing the `SeedGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedGameData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedGameData {
  game_insert: Game_Key;
}
```
### Using `SeedGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedGame, SeedGameVariables } from '@playlink/dataconnect';

// The `SeedGame` mutation requires an argument of type `SeedGameVariables`:
const seedGameVars: SeedGameVariables = {
  teamId: ..., 
  opponentName: ..., 
  gameDate: ..., 
  location: ..., // optional
  isHome: ..., 
  status: ..., 
  homeScore: ..., // optional
  awayScore: ..., // optional
};

// Call the `seedGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedGame(seedGameVars);
// Variables can be defined inline as well.
const { data } = await seedGame({ teamId: ..., opponentName: ..., gameDate: ..., location: ..., isHome: ..., status: ..., homeScore: ..., awayScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedGame(dataConnect, seedGameVars);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
seedGame(seedGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

### Using `SeedGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedGameRef, SeedGameVariables } from '@playlink/dataconnect';

// The `SeedGame` mutation requires an argument of type `SeedGameVariables`:
const seedGameVars: SeedGameVariables = {
  teamId: ..., 
  opponentName: ..., 
  gameDate: ..., 
  location: ..., // optional
  isHome: ..., 
  status: ..., 
  homeScore: ..., // optional
  awayScore: ..., // optional
};

// Call the `seedGameRef()` function to get a reference to the mutation.
const ref = seedGameRef(seedGameVars);
// Variables can be defined inline as well.
const ref = seedGameRef({ teamId: ..., opponentName: ..., gameDate: ..., location: ..., isHome: ..., status: ..., homeScore: ..., awayScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedGameRef(dataConnect, seedGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

