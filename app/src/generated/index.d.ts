import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddTeamMemberData {
  teamMember_insert: TeamMember_Key;
}

export interface AddTeamMemberVariables {
  userId: UUIDString;
  teamId: UUIDString;
  role?: string | null;
}

export interface Article_Key {
  id: UUIDString;
  __typename?: 'Article_Key';
}

export interface CreateArticleData {
  article_insert: Article_Key;
}

export interface CreateArticleVariables {
  teamId: UUIDString;
  authorId: UUIDString;
  title: string;
  content: string;
  thumbnailUrl?: string | null;
  linkedGameId?: UUIDString | null;
  isPublished?: boolean | null;
}

export interface CreateGameData {
  game_insert: Game_Key;
}

export interface CreateGameVariables {
  teamId: UUIDString;
  opponentName: string;
  gameDate: DateString;
  location?: string | null;
  isHome?: boolean | null;
}

export interface CreateLineupEntryData {
  gameLineup_insert: GameLineup_Key;
}

export interface CreateLineupEntryVariables {
  gameId: UUIDString;
  playerId: UUIDString;
  battingOrder?: number | null;
  position?: string | null;
  isStarter?: boolean | null;
}

export interface CreatePlayerData {
  player_insert: Player_Key;
}

export interface CreatePlayerVariables {
  teamId: UUIDString;
  name: string;
  uniformNumber?: number | null;
  position?: string | null;
  bats?: string | null;
  throws?: string | null;
  photoUrl?: string | null;
}

export interface CreateScheduleData {
  schedule_insert: Schedule_Key;
}

export interface CreateScheduleVariables {
  teamId: UUIDString;
  title: string;
  eventType: string;
  startTime: TimestampString;
  endTime?: TimestampString | null;
  location?: string | null;
  description?: string | null;
}

export interface CreateTeamData {
  team_insert: Team_Key;
}

export interface CreateTeamVariables {
  name: string;
  slug: string;
  logoUrl?: string | null;
  description?: string | null;
}

export interface DeactivatePlayerData {
  player_update?: Player_Key | null;
}

export interface DeactivatePlayerVariables {
  playerId: UUIDString;
}

export interface DeleteArticleData {
  article_delete?: Article_Key | null;
}

export interface DeleteArticleVariables {
  articleId: UUIDString;
}

export interface DeleteLineupData {
  gameLineup_delete?: GameLineup_Key | null;
}

export interface DeleteLineupVariables {
  lineupId: UUIDString;
}

export interface DeletePlayData {
  gamePlay_delete?: GamePlay_Key | null;
}

export interface DeletePlayVariables {
  playId: UUIDString;
}

export interface DeleteScheduleData {
  schedule_delete?: Schedule_Key | null;
}

export interface DeleteScheduleVariables {
  scheduleId: UUIDString;
}

export interface FinalizeGameData {
  game_update?: Game_Key | null;
}

export interface FinalizeGameVariables {
  gameId: UUIDString;
  homeScore: number;
  awayScore: number;
}

export interface GameLineup_Key {
  id: UUIDString;
  __typename?: 'GameLineup_Key';
}

export interface GamePlay_Key {
  id: UUIDString;
  __typename?: 'GamePlay_Key';
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

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

export interface GetAllArticlesVariables {
  teamId: UUIDString;
}

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

export interface GetArticleDetailVariables {
  articleId: UUIDString;
}

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

export interface GetGameDetailVariables {
  gameId: UUIDString;
}

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

export interface GetGameLineupsVariables {
  gameId: UUIDString;
}

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

export interface GetGamePlaysVariables {
  gameId: UUIDString;
}

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

export interface GetGamesByTeamVariables {
  teamId: UUIDString;
  limit?: number | null;
}

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

export interface GetPlayerDetailVariables {
  playerId: UUIDString;
}

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

export interface GetPlayerStatsVariables {
  playerId: UUIDString;
  season: number;
}

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

export interface GetPlayersByTeamVariables {
  teamId: UUIDString;
}

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

export interface GetPublishedArticlesVariables {
  teamId: UUIDString;
  limit?: number | null;
}

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

export interface GetSchedulesVariables {
  teamId: UUIDString;
  startDate: TimestampString;
  endDate: TimestampString;
}

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

export interface GetTeamBySlugVariables {
  slug: string;
}

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

export interface GetTeamMembersVariables {
  teamId: UUIDString;
}

export interface GetTeamStatsData {
  players: ({
    id: UUIDString;
    name: string;
    uniformNumber?: number | null;
    position?: string | null;
  } & Player_Key)[];
}

export interface GetTeamStatsVariables {
  teamId: UUIDString;
  season: number;
}

export interface GetTeamsData {
  teams: ({
    id: UUIDString;
    name: string;
    slug: string;
    logoUrl?: string | null;
    description?: string | null;
  } & Team_Key)[];
}

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

export interface GetUpcomingGamesVariables {
  teamId: UUIDString;
  limit?: number | null;
}

export interface GetUserProfileData {
  user?: {
    id: UUIDString;
    email: string;
    displayName?: string | null;
    avatarUrl?: string | null;
  } & User_Key;
}

export interface GetUserProfileVariables {
  userId: UUIDString;
}

export interface PlayerStats_Key {
  playerId: UUIDString;
  season: number;
  __typename?: 'PlayerStats_Key';
}

export interface Player_Key {
  id: UUIDString;
  __typename?: 'Player_Key';
}

export interface RecordPlayData {
  gamePlay_insert: GamePlay_Key;
}

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

export interface RemoveTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}

export interface RemoveTeamMemberVariables {
  memberId: UUIDString;
}

export interface Schedule_Key {
  id: UUIDString;
  __typename?: 'Schedule_Key';
}

export interface SeedGameData {
  game_insert: Game_Key;
}

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

export interface SeedPlayerData {
  player_insert: Player_Key;
}

export interface SeedPlayerVariables {
  teamId: UUIDString;
  name: string;
  uniformNumber?: number | null;
  position?: string | null;
  bats?: string | null;
  throws?: string | null;
}

export interface StartGameData {
  game_update?: Game_Key | null;
}

export interface StartGameVariables {
  gameId: UUIDString;
}

export interface TeamMember_Key {
  id: UUIDString;
  __typename?: 'TeamMember_Key';
}

export interface Team_Key {
  id: UUIDString;
  __typename?: 'Team_Key';
}

export interface UnpublishArticleData {
  article_update?: Article_Key | null;
}

export interface UnpublishArticleVariables {
  articleId: UUIDString;
}

export interface UpdateArticleData {
  article_update?: Article_Key | null;
}

export interface UpdateArticleVariables {
  articleId: UUIDString;
  title?: string | null;
  content?: string | null;
  thumbnailUrl?: string | null;
  linkedGameId?: UUIDString | null;
}

export interface UpdateGameData {
  game_update?: Game_Key | null;
}

export interface UpdateGameVariables {
  gameId: UUIDString;
  opponentName?: string | null;
  gameDate?: DateString | null;
  location?: string | null;
  videoUrl?: string | null;
}

export interface UpdateLineupData {
  gameLineup_update?: GameLineup_Key | null;
}

export interface UpdateLineupVariables {
  lineupId: UUIDString;
  battingOrder?: number | null;
  position?: string | null;
}

export interface UpdatePlayData {
  gamePlay_update?: GamePlay_Key | null;
}

export interface UpdatePlayVariables {
  playId: UUIDString;
  playType?: string | null;
  result?: string | null;
  rbi?: number | null;
  runsScored?: number | null;
}

export interface UpdatePlayerData {
  player_update?: Player_Key | null;
}

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

export interface UpdateScheduleData {
  schedule_update?: Schedule_Key | null;
}

export interface UpdateScheduleVariables {
  scheduleId: UUIDString;
  title?: string | null;
  eventType?: string | null;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
  location?: string | null;
  description?: string | null;
}

export interface UpdateTeamData {
  team_update?: Team_Key | null;
}

export interface UpdateTeamMemberRoleData {
  teamMember_update?: TeamMember_Key | null;
}

export interface UpdateTeamMemberRoleVariables {
  memberId: UUIDString;
  role: string;
}

export interface UpdateTeamVariables {
  teamId: UUIDString;
  name?: string | null;
  logoUrl?: string | null;
  description?: string | null;
}

export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}

export interface UpdateUserProfileVariables {
  userId: UUIDString;
  displayName?: string | null;
  avatarUrl?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
  operationName: string;
}
export const createTeamRef: CreateTeamRef;

export function createTeam(vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;
export function createTeam(dc: DataConnect, vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface UpdateTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
  operationName: string;
}
export const updateTeamRef: UpdateTeamRef;

export function updateTeam(vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;
export function updateTeam(dc: DataConnect, vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface CreatePlayerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePlayerVariables): MutationRef<CreatePlayerData, CreatePlayerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePlayerVariables): MutationRef<CreatePlayerData, CreatePlayerVariables>;
  operationName: string;
}
export const createPlayerRef: CreatePlayerRef;

export function createPlayer(vars: CreatePlayerVariables): MutationPromise<CreatePlayerData, CreatePlayerVariables>;
export function createPlayer(dc: DataConnect, vars: CreatePlayerVariables): MutationPromise<CreatePlayerData, CreatePlayerVariables>;

interface UpdatePlayerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayerVariables): MutationRef<UpdatePlayerData, UpdatePlayerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePlayerVariables): MutationRef<UpdatePlayerData, UpdatePlayerVariables>;
  operationName: string;
}
export const updatePlayerRef: UpdatePlayerRef;

export function updatePlayer(vars: UpdatePlayerVariables): MutationPromise<UpdatePlayerData, UpdatePlayerVariables>;
export function updatePlayer(dc: DataConnect, vars: UpdatePlayerVariables): MutationPromise<UpdatePlayerData, UpdatePlayerVariables>;

interface DeactivatePlayerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivatePlayerVariables): MutationRef<DeactivatePlayerData, DeactivatePlayerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivatePlayerVariables): MutationRef<DeactivatePlayerData, DeactivatePlayerVariables>;
  operationName: string;
}
export const deactivatePlayerRef: DeactivatePlayerRef;

export function deactivatePlayer(vars: DeactivatePlayerVariables): MutationPromise<DeactivatePlayerData, DeactivatePlayerVariables>;
export function deactivatePlayer(dc: DataConnect, vars: DeactivatePlayerVariables): MutationPromise<DeactivatePlayerData, DeactivatePlayerVariables>;

interface CreateGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGameVariables): MutationRef<CreateGameData, CreateGameVariables>;
  operationName: string;
}
export const createGameRef: CreateGameRef;

export function createGame(vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;
export function createGame(dc: DataConnect, vars: CreateGameVariables): MutationPromise<CreateGameData, CreateGameVariables>;

interface UpdateGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGameVariables): MutationRef<UpdateGameData, UpdateGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGameVariables): MutationRef<UpdateGameData, UpdateGameVariables>;
  operationName: string;
}
export const updateGameRef: UpdateGameRef;

export function updateGame(vars: UpdateGameVariables): MutationPromise<UpdateGameData, UpdateGameVariables>;
export function updateGame(dc: DataConnect, vars: UpdateGameVariables): MutationPromise<UpdateGameData, UpdateGameVariables>;

interface FinalizeGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinalizeGameVariables): MutationRef<FinalizeGameData, FinalizeGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FinalizeGameVariables): MutationRef<FinalizeGameData, FinalizeGameVariables>;
  operationName: string;
}
export const finalizeGameRef: FinalizeGameRef;

export function finalizeGame(vars: FinalizeGameVariables): MutationPromise<FinalizeGameData, FinalizeGameVariables>;
export function finalizeGame(dc: DataConnect, vars: FinalizeGameVariables): MutationPromise<FinalizeGameData, FinalizeGameVariables>;

interface StartGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartGameVariables): MutationRef<StartGameData, StartGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: StartGameVariables): MutationRef<StartGameData, StartGameVariables>;
  operationName: string;
}
export const startGameRef: StartGameRef;

export function startGame(vars: StartGameVariables): MutationPromise<StartGameData, StartGameVariables>;
export function startGame(dc: DataConnect, vars: StartGameVariables): MutationPromise<StartGameData, StartGameVariables>;

interface CreateLineupEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLineupEntryVariables): MutationRef<CreateLineupEntryData, CreateLineupEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLineupEntryVariables): MutationRef<CreateLineupEntryData, CreateLineupEntryVariables>;
  operationName: string;
}
export const createLineupEntryRef: CreateLineupEntryRef;

export function createLineupEntry(vars: CreateLineupEntryVariables): MutationPromise<CreateLineupEntryData, CreateLineupEntryVariables>;
export function createLineupEntry(dc: DataConnect, vars: CreateLineupEntryVariables): MutationPromise<CreateLineupEntryData, CreateLineupEntryVariables>;

interface UpdateLineupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLineupVariables): MutationRef<UpdateLineupData, UpdateLineupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLineupVariables): MutationRef<UpdateLineupData, UpdateLineupVariables>;
  operationName: string;
}
export const updateLineupRef: UpdateLineupRef;

export function updateLineup(vars: UpdateLineupVariables): MutationPromise<UpdateLineupData, UpdateLineupVariables>;
export function updateLineup(dc: DataConnect, vars: UpdateLineupVariables): MutationPromise<UpdateLineupData, UpdateLineupVariables>;

interface DeleteLineupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLineupVariables): MutationRef<DeleteLineupData, DeleteLineupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLineupVariables): MutationRef<DeleteLineupData, DeleteLineupVariables>;
  operationName: string;
}
export const deleteLineupRef: DeleteLineupRef;

export function deleteLineup(vars: DeleteLineupVariables): MutationPromise<DeleteLineupData, DeleteLineupVariables>;
export function deleteLineup(dc: DataConnect, vars: DeleteLineupVariables): MutationPromise<DeleteLineupData, DeleteLineupVariables>;

interface RecordPlayRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPlayVariables): MutationRef<RecordPlayData, RecordPlayVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordPlayVariables): MutationRef<RecordPlayData, RecordPlayVariables>;
  operationName: string;
}
export const recordPlayRef: RecordPlayRef;

export function recordPlay(vars: RecordPlayVariables): MutationPromise<RecordPlayData, RecordPlayVariables>;
export function recordPlay(dc: DataConnect, vars: RecordPlayVariables): MutationPromise<RecordPlayData, RecordPlayVariables>;

interface UpdatePlayRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePlayVariables): MutationRef<UpdatePlayData, UpdatePlayVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePlayVariables): MutationRef<UpdatePlayData, UpdatePlayVariables>;
  operationName: string;
}
export const updatePlayRef: UpdatePlayRef;

export function updatePlay(vars: UpdatePlayVariables): MutationPromise<UpdatePlayData, UpdatePlayVariables>;
export function updatePlay(dc: DataConnect, vars: UpdatePlayVariables): MutationPromise<UpdatePlayData, UpdatePlayVariables>;

interface DeletePlayRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePlayVariables): MutationRef<DeletePlayData, DeletePlayVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePlayVariables): MutationRef<DeletePlayData, DeletePlayVariables>;
  operationName: string;
}
export const deletePlayRef: DeletePlayRef;

export function deletePlay(vars: DeletePlayVariables): MutationPromise<DeletePlayData, DeletePlayVariables>;
export function deletePlay(dc: DataConnect, vars: DeletePlayVariables): MutationPromise<DeletePlayData, DeletePlayVariables>;

interface CreateArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
  operationName: string;
}
export const createArticleRef: CreateArticleRef;

export function createArticle(vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;
export function createArticle(dc: DataConnect, vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface UpdateArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
  operationName: string;
}
export const updateArticleRef: UpdateArticleRef;

export function updateArticle(vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;
export function updateArticle(dc: DataConnect, vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface UnpublishArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UnpublishArticleVariables): MutationRef<UnpublishArticleData, UnpublishArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UnpublishArticleVariables): MutationRef<UnpublishArticleData, UnpublishArticleVariables>;
  operationName: string;
}
export const unpublishArticleRef: UnpublishArticleRef;

export function unpublishArticle(vars: UnpublishArticleVariables): MutationPromise<UnpublishArticleData, UnpublishArticleVariables>;
export function unpublishArticle(dc: DataConnect, vars: UnpublishArticleVariables): MutationPromise<UnpublishArticleData, UnpublishArticleVariables>;

interface DeleteArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
  operationName: string;
}
export const deleteArticleRef: DeleteArticleRef;

export function deleteArticle(vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;
export function deleteArticle(dc: DataConnect, vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface CreateScheduleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateScheduleVariables): MutationRef<CreateScheduleData, CreateScheduleVariables>;
  operationName: string;
}
export const createScheduleRef: CreateScheduleRef;

export function createSchedule(vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;
export function createSchedule(dc: DataConnect, vars: CreateScheduleVariables): MutationPromise<CreateScheduleData, CreateScheduleVariables>;

interface UpdateScheduleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateScheduleVariables): MutationRef<UpdateScheduleData, UpdateScheduleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateScheduleVariables): MutationRef<UpdateScheduleData, UpdateScheduleVariables>;
  operationName: string;
}
export const updateScheduleRef: UpdateScheduleRef;

export function updateSchedule(vars: UpdateScheduleVariables): MutationPromise<UpdateScheduleData, UpdateScheduleVariables>;
export function updateSchedule(dc: DataConnect, vars: UpdateScheduleVariables): MutationPromise<UpdateScheduleData, UpdateScheduleVariables>;

interface DeleteScheduleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteScheduleVariables): MutationRef<DeleteScheduleData, DeleteScheduleVariables>;
  operationName: string;
}
export const deleteScheduleRef: DeleteScheduleRef;

export function deleteSchedule(vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;
export function deleteSchedule(dc: DataConnect, vars: DeleteScheduleVariables): MutationPromise<DeleteScheduleData, DeleteScheduleVariables>;

interface UpdateUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  operationName: string;
}
export const updateUserProfileRef: UpdateUserProfileRef;

export function updateUserProfile(vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;
export function updateUserProfile(dc: DataConnect, vars: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface AddTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
  operationName: string;
}
export const addTeamMemberRef: AddTeamMemberRef;

export function addTeamMember(vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;
export function addTeamMember(dc: DataConnect, vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface UpdateTeamMemberRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
  operationName: string;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;

export function updateTeamMemberRole(vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
export function updateTeamMemberRole(dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface RemoveTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
  operationName: string;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;

export function removeTeamMember(vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;
export function removeTeamMember(dc: DataConnect, vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface SeedPlayerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedPlayerVariables): MutationRef<SeedPlayerData, SeedPlayerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SeedPlayerVariables): MutationRef<SeedPlayerData, SeedPlayerVariables>;
  operationName: string;
}
export const seedPlayerRef: SeedPlayerRef;

export function seedPlayer(vars: SeedPlayerVariables): MutationPromise<SeedPlayerData, SeedPlayerVariables>;
export function seedPlayer(dc: DataConnect, vars: SeedPlayerVariables): MutationPromise<SeedPlayerData, SeedPlayerVariables>;

interface SeedGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedGameVariables): MutationRef<SeedGameData, SeedGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SeedGameVariables): MutationRef<SeedGameData, SeedGameVariables>;
  operationName: string;
}
export const seedGameRef: SeedGameRef;

export function seedGame(vars: SeedGameVariables): MutationPromise<SeedGameData, SeedGameVariables>;
export function seedGame(dc: DataConnect, vars: SeedGameVariables): MutationPromise<SeedGameData, SeedGameVariables>;

interface GetTeamBySlugRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamBySlugVariables): QueryRef<GetTeamBySlugData, GetTeamBySlugVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeamBySlugVariables): QueryRef<GetTeamBySlugData, GetTeamBySlugVariables>;
  operationName: string;
}
export const getTeamBySlugRef: GetTeamBySlugRef;

export function getTeamBySlug(vars: GetTeamBySlugVariables): QueryPromise<GetTeamBySlugData, GetTeamBySlugVariables>;
export function getTeamBySlug(dc: DataConnect, vars: GetTeamBySlugVariables): QueryPromise<GetTeamBySlugData, GetTeamBySlugVariables>;

interface GetTeamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTeamsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTeamsData, undefined>;
  operationName: string;
}
export const getTeamsRef: GetTeamsRef;

export function getTeams(): QueryPromise<GetTeamsData, undefined>;
export function getTeams(dc: DataConnect): QueryPromise<GetTeamsData, undefined>;

interface GetGamesByTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamesByTeamVariables): QueryRef<GetGamesByTeamData, GetGamesByTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGamesByTeamVariables): QueryRef<GetGamesByTeamData, GetGamesByTeamVariables>;
  operationName: string;
}
export const getGamesByTeamRef: GetGamesByTeamRef;

export function getGamesByTeam(vars: GetGamesByTeamVariables): QueryPromise<GetGamesByTeamData, GetGamesByTeamVariables>;
export function getGamesByTeam(dc: DataConnect, vars: GetGamesByTeamVariables): QueryPromise<GetGamesByTeamData, GetGamesByTeamVariables>;

interface GetGameDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameDetailVariables): QueryRef<GetGameDetailData, GetGameDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGameDetailVariables): QueryRef<GetGameDetailData, GetGameDetailVariables>;
  operationName: string;
}
export const getGameDetailRef: GetGameDetailRef;

export function getGameDetail(vars: GetGameDetailVariables): QueryPromise<GetGameDetailData, GetGameDetailVariables>;
export function getGameDetail(dc: DataConnect, vars: GetGameDetailVariables): QueryPromise<GetGameDetailData, GetGameDetailVariables>;

interface GetGameLineupsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameLineupsVariables): QueryRef<GetGameLineupsData, GetGameLineupsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGameLineupsVariables): QueryRef<GetGameLineupsData, GetGameLineupsVariables>;
  operationName: string;
}
export const getGameLineupsRef: GetGameLineupsRef;

export function getGameLineups(vars: GetGameLineupsVariables): QueryPromise<GetGameLineupsData, GetGameLineupsVariables>;
export function getGameLineups(dc: DataConnect, vars: GetGameLineupsVariables): QueryPromise<GetGameLineupsData, GetGameLineupsVariables>;

interface GetGamePlaysRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGamePlaysVariables): QueryRef<GetGamePlaysData, GetGamePlaysVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGamePlaysVariables): QueryRef<GetGamePlaysData, GetGamePlaysVariables>;
  operationName: string;
}
export const getGamePlaysRef: GetGamePlaysRef;

export function getGamePlays(vars: GetGamePlaysVariables): QueryPromise<GetGamePlaysData, GetGamePlaysVariables>;
export function getGamePlays(dc: DataConnect, vars: GetGamePlaysVariables): QueryPromise<GetGamePlaysData, GetGamePlaysVariables>;

interface GetUpcomingGamesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUpcomingGamesVariables): QueryRef<GetUpcomingGamesData, GetUpcomingGamesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUpcomingGamesVariables): QueryRef<GetUpcomingGamesData, GetUpcomingGamesVariables>;
  operationName: string;
}
export const getUpcomingGamesRef: GetUpcomingGamesRef;

export function getUpcomingGames(vars: GetUpcomingGamesVariables): QueryPromise<GetUpcomingGamesData, GetUpcomingGamesVariables>;
export function getUpcomingGames(dc: DataConnect, vars: GetUpcomingGamesVariables): QueryPromise<GetUpcomingGamesData, GetUpcomingGamesVariables>;

interface GetPlayersByTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayersByTeamVariables): QueryRef<GetPlayersByTeamData, GetPlayersByTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPlayersByTeamVariables): QueryRef<GetPlayersByTeamData, GetPlayersByTeamVariables>;
  operationName: string;
}
export const getPlayersByTeamRef: GetPlayersByTeamRef;

export function getPlayersByTeam(vars: GetPlayersByTeamVariables): QueryPromise<GetPlayersByTeamData, GetPlayersByTeamVariables>;
export function getPlayersByTeam(dc: DataConnect, vars: GetPlayersByTeamVariables): QueryPromise<GetPlayersByTeamData, GetPlayersByTeamVariables>;

interface GetPlayerDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayerDetailVariables): QueryRef<GetPlayerDetailData, GetPlayerDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPlayerDetailVariables): QueryRef<GetPlayerDetailData, GetPlayerDetailVariables>;
  operationName: string;
}
export const getPlayerDetailRef: GetPlayerDetailRef;

export function getPlayerDetail(vars: GetPlayerDetailVariables): QueryPromise<GetPlayerDetailData, GetPlayerDetailVariables>;
export function getPlayerDetail(dc: DataConnect, vars: GetPlayerDetailVariables): QueryPromise<GetPlayerDetailData, GetPlayerDetailVariables>;

interface GetPlayerStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayerStatsVariables): QueryRef<GetPlayerStatsData, GetPlayerStatsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPlayerStatsVariables): QueryRef<GetPlayerStatsData, GetPlayerStatsVariables>;
  operationName: string;
}
export const getPlayerStatsRef: GetPlayerStatsRef;

export function getPlayerStats(vars: GetPlayerStatsVariables): QueryPromise<GetPlayerStatsData, GetPlayerStatsVariables>;
export function getPlayerStats(dc: DataConnect, vars: GetPlayerStatsVariables): QueryPromise<GetPlayerStatsData, GetPlayerStatsVariables>;

interface GetTeamStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamStatsVariables): QueryRef<GetTeamStatsData, GetTeamStatsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeamStatsVariables): QueryRef<GetTeamStatsData, GetTeamStatsVariables>;
  operationName: string;
}
export const getTeamStatsRef: GetTeamStatsRef;

export function getTeamStats(vars: GetTeamStatsVariables): QueryPromise<GetTeamStatsData, GetTeamStatsVariables>;
export function getTeamStats(dc: DataConnect, vars: GetTeamStatsVariables): QueryPromise<GetTeamStatsData, GetTeamStatsVariables>;

interface GetPublishedArticlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublishedArticlesVariables): QueryRef<GetPublishedArticlesData, GetPublishedArticlesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPublishedArticlesVariables): QueryRef<GetPublishedArticlesData, GetPublishedArticlesVariables>;
  operationName: string;
}
export const getPublishedArticlesRef: GetPublishedArticlesRef;

export function getPublishedArticles(vars: GetPublishedArticlesVariables): QueryPromise<GetPublishedArticlesData, GetPublishedArticlesVariables>;
export function getPublishedArticles(dc: DataConnect, vars: GetPublishedArticlesVariables): QueryPromise<GetPublishedArticlesData, GetPublishedArticlesVariables>;

interface GetArticleDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArticleDetailVariables): QueryRef<GetArticleDetailData, GetArticleDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetArticleDetailVariables): QueryRef<GetArticleDetailData, GetArticleDetailVariables>;
  operationName: string;
}
export const getArticleDetailRef: GetArticleDetailRef;

export function getArticleDetail(vars: GetArticleDetailVariables): QueryPromise<GetArticleDetailData, GetArticleDetailVariables>;
export function getArticleDetail(dc: DataConnect, vars: GetArticleDetailVariables): QueryPromise<GetArticleDetailData, GetArticleDetailVariables>;

interface GetAllArticlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAllArticlesVariables): QueryRef<GetAllArticlesData, GetAllArticlesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAllArticlesVariables): QueryRef<GetAllArticlesData, GetAllArticlesVariables>;
  operationName: string;
}
export const getAllArticlesRef: GetAllArticlesRef;

export function getAllArticles(vars: GetAllArticlesVariables): QueryPromise<GetAllArticlesData, GetAllArticlesVariables>;
export function getAllArticles(dc: DataConnect, vars: GetAllArticlesVariables): QueryPromise<GetAllArticlesData, GetAllArticlesVariables>;

interface GetSchedulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchedulesVariables): QueryRef<GetSchedulesData, GetSchedulesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSchedulesVariables): QueryRef<GetSchedulesData, GetSchedulesVariables>;
  operationName: string;
}
export const getSchedulesRef: GetSchedulesRef;

export function getSchedules(vars: GetSchedulesVariables): QueryPromise<GetSchedulesData, GetSchedulesVariables>;
export function getSchedules(dc: DataConnect, vars: GetSchedulesVariables): QueryPromise<GetSchedulesData, GetSchedulesVariables>;

interface GetUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserProfileVariables): QueryRef<GetUserProfileData, GetUserProfileVariables>;
  operationName: string;
}
export const getUserProfileRef: GetUserProfileRef;

export function getUserProfile(vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;
export function getUserProfile(dc: DataConnect, vars: GetUserProfileVariables): QueryPromise<GetUserProfileData, GetUserProfileVariables>;

interface GetTeamMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamMembersVariables): QueryRef<GetTeamMembersData, GetTeamMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeamMembersVariables): QueryRef<GetTeamMembersData, GetTeamMembersVariables>;
  operationName: string;
}
export const getTeamMembersRef: GetTeamMembersRef;

export function getTeamMembers(vars: GetTeamMembersVariables): QueryPromise<GetTeamMembersData, GetTeamMembersVariables>;
export function getTeamMembers(dc: DataConnect, vars: GetTeamMembersVariables): QueryPromise<GetTeamMembersData, GetTeamMembersVariables>;

