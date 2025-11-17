import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'playlink-connector',
  service: 'playlink',
  location: 'us-east4'
};

export const createTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeam', inputVars);
}
createTeamRef.operationName = 'CreateTeam';

export function createTeam(dcOrVars, vars) {
  return executeMutation(createTeamRef(dcOrVars, vars));
}

export const updateTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeam', inputVars);
}
updateTeamRef.operationName = 'UpdateTeam';

export function updateTeam(dcOrVars, vars) {
  return executeMutation(updateTeamRef(dcOrVars, vars));
}

export const createPlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePlayer', inputVars);
}
createPlayerRef.operationName = 'CreatePlayer';

export function createPlayer(dcOrVars, vars) {
  return executeMutation(createPlayerRef(dcOrVars, vars));
}

export const updatePlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePlayer', inputVars);
}
updatePlayerRef.operationName = 'UpdatePlayer';

export function updatePlayer(dcOrVars, vars) {
  return executeMutation(updatePlayerRef(dcOrVars, vars));
}

export const deactivatePlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivatePlayer', inputVars);
}
deactivatePlayerRef.operationName = 'DeactivatePlayer';

export function deactivatePlayer(dcOrVars, vars) {
  return executeMutation(deactivatePlayerRef(dcOrVars, vars));
}

export const createGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGame', inputVars);
}
createGameRef.operationName = 'CreateGame';

export function createGame(dcOrVars, vars) {
  return executeMutation(createGameRef(dcOrVars, vars));
}

export const updateGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGame', inputVars);
}
updateGameRef.operationName = 'UpdateGame';

export function updateGame(dcOrVars, vars) {
  return executeMutation(updateGameRef(dcOrVars, vars));
}

export const finalizeGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinalizeGame', inputVars);
}
finalizeGameRef.operationName = 'FinalizeGame';

export function finalizeGame(dcOrVars, vars) {
  return executeMutation(finalizeGameRef(dcOrVars, vars));
}

export const startGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartGame', inputVars);
}
startGameRef.operationName = 'StartGame';

export function startGame(dcOrVars, vars) {
  return executeMutation(startGameRef(dcOrVars, vars));
}

export const createLineupEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLineupEntry', inputVars);
}
createLineupEntryRef.operationName = 'CreateLineupEntry';

export function createLineupEntry(dcOrVars, vars) {
  return executeMutation(createLineupEntryRef(dcOrVars, vars));
}

export const updateLineupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLineup', inputVars);
}
updateLineupRef.operationName = 'UpdateLineup';

export function updateLineup(dcOrVars, vars) {
  return executeMutation(updateLineupRef(dcOrVars, vars));
}

export const deleteLineupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLineup', inputVars);
}
deleteLineupRef.operationName = 'DeleteLineup';

export function deleteLineup(dcOrVars, vars) {
  return executeMutation(deleteLineupRef(dcOrVars, vars));
}

export const recordPlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPlay', inputVars);
}
recordPlayRef.operationName = 'RecordPlay';

export function recordPlay(dcOrVars, vars) {
  return executeMutation(recordPlayRef(dcOrVars, vars));
}

export const updatePlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePlay', inputVars);
}
updatePlayRef.operationName = 'UpdatePlay';

export function updatePlay(dcOrVars, vars) {
  return executeMutation(updatePlayRef(dcOrVars, vars));
}

export const deletePlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePlay', inputVars);
}
deletePlayRef.operationName = 'DeletePlay';

export function deletePlay(dcOrVars, vars) {
  return executeMutation(deletePlayRef(dcOrVars, vars));
}

export const createArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateArticle', inputVars);
}
createArticleRef.operationName = 'CreateArticle';

export function createArticle(dcOrVars, vars) {
  return executeMutation(createArticleRef(dcOrVars, vars));
}

export const updateArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateArticle', inputVars);
}
updateArticleRef.operationName = 'UpdateArticle';

export function updateArticle(dcOrVars, vars) {
  return executeMutation(updateArticleRef(dcOrVars, vars));
}

export const unpublishArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnpublishArticle', inputVars);
}
unpublishArticleRef.operationName = 'UnpublishArticle';

export function unpublishArticle(dcOrVars, vars) {
  return executeMutation(unpublishArticleRef(dcOrVars, vars));
}

export const deleteArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteArticle', inputVars);
}
deleteArticleRef.operationName = 'DeleteArticle';

export function deleteArticle(dcOrVars, vars) {
  return executeMutation(deleteArticleRef(dcOrVars, vars));
}

export const createScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSchedule', inputVars);
}
createScheduleRef.operationName = 'CreateSchedule';

export function createSchedule(dcOrVars, vars) {
  return executeMutation(createScheduleRef(dcOrVars, vars));
}

export const updateScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSchedule', inputVars);
}
updateScheduleRef.operationName = 'UpdateSchedule';

export function updateSchedule(dcOrVars, vars) {
  return executeMutation(updateScheduleRef(dcOrVars, vars));
}

export const deleteScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSchedule', inputVars);
}
deleteScheduleRef.operationName = 'DeleteSchedule';

export function deleteSchedule(dcOrVars, vars) {
  return executeMutation(deleteScheduleRef(dcOrVars, vars));
}

export const updateUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProfile', inputVars);
}
updateUserProfileRef.operationName = 'UpdateUserProfile';

export function updateUserProfile(dcOrVars, vars) {
  return executeMutation(updateUserProfileRef(dcOrVars, vars));
}

export const addTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTeamMember', inputVars);
}
addTeamMemberRef.operationName = 'AddTeamMember';

export function addTeamMember(dcOrVars, vars) {
  return executeMutation(addTeamMemberRef(dcOrVars, vars));
}

export const updateTeamMemberRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeamMemberRole', inputVars);
}
updateTeamMemberRoleRef.operationName = 'UpdateTeamMemberRole';

export function updateTeamMemberRole(dcOrVars, vars) {
  return executeMutation(updateTeamMemberRoleRef(dcOrVars, vars));
}

export const removeTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeamMember', inputVars);
}
removeTeamMemberRef.operationName = 'RemoveTeamMember';

export function removeTeamMember(dcOrVars, vars) {
  return executeMutation(removeTeamMemberRef(dcOrVars, vars));
}

export const seedPlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPlayer', inputVars);
}
seedPlayerRef.operationName = 'SeedPlayer';

export function seedPlayer(dcOrVars, vars) {
  return executeMutation(seedPlayerRef(dcOrVars, vars));
}

export const seedGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedGame', inputVars);
}
seedGameRef.operationName = 'SeedGame';

export function seedGame(dcOrVars, vars) {
  return executeMutation(seedGameRef(dcOrVars, vars));
}

export const getTeamBySlugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamBySlug', inputVars);
}
getTeamBySlugRef.operationName = 'GetTeamBySlug';

export function getTeamBySlug(dcOrVars, vars) {
  return executeQuery(getTeamBySlugRef(dcOrVars, vars));
}

export const getTeamsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeams');
}
getTeamsRef.operationName = 'GetTeams';

export function getTeams(dc) {
  return executeQuery(getTeamsRef(dc));
}

export const getGamesByTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamesByTeam', inputVars);
}
getGamesByTeamRef.operationName = 'GetGamesByTeam';

export function getGamesByTeam(dcOrVars, vars) {
  return executeQuery(getGamesByTeamRef(dcOrVars, vars));
}

export const getGameDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameDetail', inputVars);
}
getGameDetailRef.operationName = 'GetGameDetail';

export function getGameDetail(dcOrVars, vars) {
  return executeQuery(getGameDetailRef(dcOrVars, vars));
}

export const getGameLineupsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameLineups', inputVars);
}
getGameLineupsRef.operationName = 'GetGameLineups';

export function getGameLineups(dcOrVars, vars) {
  return executeQuery(getGameLineupsRef(dcOrVars, vars));
}

export const getGamePlaysRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamePlays', inputVars);
}
getGamePlaysRef.operationName = 'GetGamePlays';

export function getGamePlays(dcOrVars, vars) {
  return executeQuery(getGamePlaysRef(dcOrVars, vars));
}

export const getUpcomingGamesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUpcomingGames', inputVars);
}
getUpcomingGamesRef.operationName = 'GetUpcomingGames';

export function getUpcomingGames(dcOrVars, vars) {
  return executeQuery(getUpcomingGamesRef(dcOrVars, vars));
}

export const getPlayersByTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayersByTeam', inputVars);
}
getPlayersByTeamRef.operationName = 'GetPlayersByTeam';

export function getPlayersByTeam(dcOrVars, vars) {
  return executeQuery(getPlayersByTeamRef(dcOrVars, vars));
}

export const getPlayerDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerDetail', inputVars);
}
getPlayerDetailRef.operationName = 'GetPlayerDetail';

export function getPlayerDetail(dcOrVars, vars) {
  return executeQuery(getPlayerDetailRef(dcOrVars, vars));
}

export const getPlayerStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerStats', inputVars);
}
getPlayerStatsRef.operationName = 'GetPlayerStats';

export function getPlayerStats(dcOrVars, vars) {
  return executeQuery(getPlayerStatsRef(dcOrVars, vars));
}

export const getTeamStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamStats', inputVars);
}
getTeamStatsRef.operationName = 'GetTeamStats';

export function getTeamStats(dcOrVars, vars) {
  return executeQuery(getTeamStatsRef(dcOrVars, vars));
}

export const getPublishedArticlesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublishedArticles', inputVars);
}
getPublishedArticlesRef.operationName = 'GetPublishedArticles';

export function getPublishedArticles(dcOrVars, vars) {
  return executeQuery(getPublishedArticlesRef(dcOrVars, vars));
}

export const getArticleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArticleDetail', inputVars);
}
getArticleDetailRef.operationName = 'GetArticleDetail';

export function getArticleDetail(dcOrVars, vars) {
  return executeQuery(getArticleDetailRef(dcOrVars, vars));
}

export const getAllArticlesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllArticles', inputVars);
}
getAllArticlesRef.operationName = 'GetAllArticles';

export function getAllArticles(dcOrVars, vars) {
  return executeQuery(getAllArticlesRef(dcOrVars, vars));
}

export const getSchedulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSchedules', inputVars);
}
getSchedulesRef.operationName = 'GetSchedules';

export function getSchedules(dcOrVars, vars) {
  return executeQuery(getSchedulesRef(dcOrVars, vars));
}

export const getUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile', inputVars);
}
getUserProfileRef.operationName = 'GetUserProfile';

export function getUserProfile(dcOrVars, vars) {
  return executeQuery(getUserProfileRef(dcOrVars, vars));
}

export const getTeamMembersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamMembers', inputVars);
}
getTeamMembersRef.operationName = 'GetTeamMembers';

export function getTeamMembers(dcOrVars, vars) {
  return executeQuery(getTeamMembersRef(dcOrVars, vars));
}

