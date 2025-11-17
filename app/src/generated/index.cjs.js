const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'playlink-connector',
  service: 'playlink',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeam', inputVars);
}
createTeamRef.operationName = 'CreateTeam';
exports.createTeamRef = createTeamRef;

exports.createTeam = function createTeam(dcOrVars, vars) {
  return executeMutation(createTeamRef(dcOrVars, vars));
};

const updateTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeam', inputVars);
}
updateTeamRef.operationName = 'UpdateTeam';
exports.updateTeamRef = updateTeamRef;

exports.updateTeam = function updateTeam(dcOrVars, vars) {
  return executeMutation(updateTeamRef(dcOrVars, vars));
};

const createPlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePlayer', inputVars);
}
createPlayerRef.operationName = 'CreatePlayer';
exports.createPlayerRef = createPlayerRef;

exports.createPlayer = function createPlayer(dcOrVars, vars) {
  return executeMutation(createPlayerRef(dcOrVars, vars));
};

const updatePlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePlayer', inputVars);
}
updatePlayerRef.operationName = 'UpdatePlayer';
exports.updatePlayerRef = updatePlayerRef;

exports.updatePlayer = function updatePlayer(dcOrVars, vars) {
  return executeMutation(updatePlayerRef(dcOrVars, vars));
};

const deactivatePlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivatePlayer', inputVars);
}
deactivatePlayerRef.operationName = 'DeactivatePlayer';
exports.deactivatePlayerRef = deactivatePlayerRef;

exports.deactivatePlayer = function deactivatePlayer(dcOrVars, vars) {
  return executeMutation(deactivatePlayerRef(dcOrVars, vars));
};

const createGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGame', inputVars);
}
createGameRef.operationName = 'CreateGame';
exports.createGameRef = createGameRef;

exports.createGame = function createGame(dcOrVars, vars) {
  return executeMutation(createGameRef(dcOrVars, vars));
};

const updateGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGame', inputVars);
}
updateGameRef.operationName = 'UpdateGame';
exports.updateGameRef = updateGameRef;

exports.updateGame = function updateGame(dcOrVars, vars) {
  return executeMutation(updateGameRef(dcOrVars, vars));
};

const finalizeGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinalizeGame', inputVars);
}
finalizeGameRef.operationName = 'FinalizeGame';
exports.finalizeGameRef = finalizeGameRef;

exports.finalizeGame = function finalizeGame(dcOrVars, vars) {
  return executeMutation(finalizeGameRef(dcOrVars, vars));
};

const startGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartGame', inputVars);
}
startGameRef.operationName = 'StartGame';
exports.startGameRef = startGameRef;

exports.startGame = function startGame(dcOrVars, vars) {
  return executeMutation(startGameRef(dcOrVars, vars));
};

const createLineupEntryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLineupEntry', inputVars);
}
createLineupEntryRef.operationName = 'CreateLineupEntry';
exports.createLineupEntryRef = createLineupEntryRef;

exports.createLineupEntry = function createLineupEntry(dcOrVars, vars) {
  return executeMutation(createLineupEntryRef(dcOrVars, vars));
};

const updateLineupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLineup', inputVars);
}
updateLineupRef.operationName = 'UpdateLineup';
exports.updateLineupRef = updateLineupRef;

exports.updateLineup = function updateLineup(dcOrVars, vars) {
  return executeMutation(updateLineupRef(dcOrVars, vars));
};

const deleteLineupRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLineup', inputVars);
}
deleteLineupRef.operationName = 'DeleteLineup';
exports.deleteLineupRef = deleteLineupRef;

exports.deleteLineup = function deleteLineup(dcOrVars, vars) {
  return executeMutation(deleteLineupRef(dcOrVars, vars));
};

const recordPlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPlay', inputVars);
}
recordPlayRef.operationName = 'RecordPlay';
exports.recordPlayRef = recordPlayRef;

exports.recordPlay = function recordPlay(dcOrVars, vars) {
  return executeMutation(recordPlayRef(dcOrVars, vars));
};

const updatePlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePlay', inputVars);
}
updatePlayRef.operationName = 'UpdatePlay';
exports.updatePlayRef = updatePlayRef;

exports.updatePlay = function updatePlay(dcOrVars, vars) {
  return executeMutation(updatePlayRef(dcOrVars, vars));
};

const deletePlayRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePlay', inputVars);
}
deletePlayRef.operationName = 'DeletePlay';
exports.deletePlayRef = deletePlayRef;

exports.deletePlay = function deletePlay(dcOrVars, vars) {
  return executeMutation(deletePlayRef(dcOrVars, vars));
};

const createArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateArticle', inputVars);
}
createArticleRef.operationName = 'CreateArticle';
exports.createArticleRef = createArticleRef;

exports.createArticle = function createArticle(dcOrVars, vars) {
  return executeMutation(createArticleRef(dcOrVars, vars));
};

const updateArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateArticle', inputVars);
}
updateArticleRef.operationName = 'UpdateArticle';
exports.updateArticleRef = updateArticleRef;

exports.updateArticle = function updateArticle(dcOrVars, vars) {
  return executeMutation(updateArticleRef(dcOrVars, vars));
};

const unpublishArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UnpublishArticle', inputVars);
}
unpublishArticleRef.operationName = 'UnpublishArticle';
exports.unpublishArticleRef = unpublishArticleRef;

exports.unpublishArticle = function unpublishArticle(dcOrVars, vars) {
  return executeMutation(unpublishArticleRef(dcOrVars, vars));
};

const deleteArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteArticle', inputVars);
}
deleteArticleRef.operationName = 'DeleteArticle';
exports.deleteArticleRef = deleteArticleRef;

exports.deleteArticle = function deleteArticle(dcOrVars, vars) {
  return executeMutation(deleteArticleRef(dcOrVars, vars));
};

const createScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSchedule', inputVars);
}
createScheduleRef.operationName = 'CreateSchedule';
exports.createScheduleRef = createScheduleRef;

exports.createSchedule = function createSchedule(dcOrVars, vars) {
  return executeMutation(createScheduleRef(dcOrVars, vars));
};

const updateScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSchedule', inputVars);
}
updateScheduleRef.operationName = 'UpdateSchedule';
exports.updateScheduleRef = updateScheduleRef;

exports.updateSchedule = function updateSchedule(dcOrVars, vars) {
  return executeMutation(updateScheduleRef(dcOrVars, vars));
};

const deleteScheduleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSchedule', inputVars);
}
deleteScheduleRef.operationName = 'DeleteSchedule';
exports.deleteScheduleRef = deleteScheduleRef;

exports.deleteSchedule = function deleteSchedule(dcOrVars, vars) {
  return executeMutation(deleteScheduleRef(dcOrVars, vars));
};

const updateUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserProfile', inputVars);
}
updateUserProfileRef.operationName = 'UpdateUserProfile';
exports.updateUserProfileRef = updateUserProfileRef;

exports.updateUserProfile = function updateUserProfile(dcOrVars, vars) {
  return executeMutation(updateUserProfileRef(dcOrVars, vars));
};

const addTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTeamMember', inputVars);
}
addTeamMemberRef.operationName = 'AddTeamMember';
exports.addTeamMemberRef = addTeamMemberRef;

exports.addTeamMember = function addTeamMember(dcOrVars, vars) {
  return executeMutation(addTeamMemberRef(dcOrVars, vars));
};

const updateTeamMemberRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeamMemberRole', inputVars);
}
updateTeamMemberRoleRef.operationName = 'UpdateTeamMemberRole';
exports.updateTeamMemberRoleRef = updateTeamMemberRoleRef;

exports.updateTeamMemberRole = function updateTeamMemberRole(dcOrVars, vars) {
  return executeMutation(updateTeamMemberRoleRef(dcOrVars, vars));
};

const removeTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeamMember', inputVars);
}
removeTeamMemberRef.operationName = 'RemoveTeamMember';
exports.removeTeamMemberRef = removeTeamMemberRef;

exports.removeTeamMember = function removeTeamMember(dcOrVars, vars) {
  return executeMutation(removeTeamMemberRef(dcOrVars, vars));
};

const seedPlayerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPlayer', inputVars);
}
seedPlayerRef.operationName = 'SeedPlayer';
exports.seedPlayerRef = seedPlayerRef;

exports.seedPlayer = function seedPlayer(dcOrVars, vars) {
  return executeMutation(seedPlayerRef(dcOrVars, vars));
};

const seedGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedGame', inputVars);
}
seedGameRef.operationName = 'SeedGame';
exports.seedGameRef = seedGameRef;

exports.seedGame = function seedGame(dcOrVars, vars) {
  return executeMutation(seedGameRef(dcOrVars, vars));
};

const getTeamBySlugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamBySlug', inputVars);
}
getTeamBySlugRef.operationName = 'GetTeamBySlug';
exports.getTeamBySlugRef = getTeamBySlugRef;

exports.getTeamBySlug = function getTeamBySlug(dcOrVars, vars) {
  return executeQuery(getTeamBySlugRef(dcOrVars, vars));
};

const getTeamsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeams');
}
getTeamsRef.operationName = 'GetTeams';
exports.getTeamsRef = getTeamsRef;

exports.getTeams = function getTeams(dc) {
  return executeQuery(getTeamsRef(dc));
};

const getGamesByTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamesByTeam', inputVars);
}
getGamesByTeamRef.operationName = 'GetGamesByTeam';
exports.getGamesByTeamRef = getGamesByTeamRef;

exports.getGamesByTeam = function getGamesByTeam(dcOrVars, vars) {
  return executeQuery(getGamesByTeamRef(dcOrVars, vars));
};

const getGameDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameDetail', inputVars);
}
getGameDetailRef.operationName = 'GetGameDetail';
exports.getGameDetailRef = getGameDetailRef;

exports.getGameDetail = function getGameDetail(dcOrVars, vars) {
  return executeQuery(getGameDetailRef(dcOrVars, vars));
};

const getGameLineupsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameLineups', inputVars);
}
getGameLineupsRef.operationName = 'GetGameLineups';
exports.getGameLineupsRef = getGameLineupsRef;

exports.getGameLineups = function getGameLineups(dcOrVars, vars) {
  return executeQuery(getGameLineupsRef(dcOrVars, vars));
};

const getGamePlaysRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGamePlays', inputVars);
}
getGamePlaysRef.operationName = 'GetGamePlays';
exports.getGamePlaysRef = getGamePlaysRef;

exports.getGamePlays = function getGamePlays(dcOrVars, vars) {
  return executeQuery(getGamePlaysRef(dcOrVars, vars));
};

const getUpcomingGamesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUpcomingGames', inputVars);
}
getUpcomingGamesRef.operationName = 'GetUpcomingGames';
exports.getUpcomingGamesRef = getUpcomingGamesRef;

exports.getUpcomingGames = function getUpcomingGames(dcOrVars, vars) {
  return executeQuery(getUpcomingGamesRef(dcOrVars, vars));
};

const getPlayersByTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayersByTeam', inputVars);
}
getPlayersByTeamRef.operationName = 'GetPlayersByTeam';
exports.getPlayersByTeamRef = getPlayersByTeamRef;

exports.getPlayersByTeam = function getPlayersByTeam(dcOrVars, vars) {
  return executeQuery(getPlayersByTeamRef(dcOrVars, vars));
};

const getPlayerDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerDetail', inputVars);
}
getPlayerDetailRef.operationName = 'GetPlayerDetail';
exports.getPlayerDetailRef = getPlayerDetailRef;

exports.getPlayerDetail = function getPlayerDetail(dcOrVars, vars) {
  return executeQuery(getPlayerDetailRef(dcOrVars, vars));
};

const getPlayerStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerStats', inputVars);
}
getPlayerStatsRef.operationName = 'GetPlayerStats';
exports.getPlayerStatsRef = getPlayerStatsRef;

exports.getPlayerStats = function getPlayerStats(dcOrVars, vars) {
  return executeQuery(getPlayerStatsRef(dcOrVars, vars));
};

const getTeamStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamStats', inputVars);
}
getTeamStatsRef.operationName = 'GetTeamStats';
exports.getTeamStatsRef = getTeamStatsRef;

exports.getTeamStats = function getTeamStats(dcOrVars, vars) {
  return executeQuery(getTeamStatsRef(dcOrVars, vars));
};

const getPublishedArticlesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublishedArticles', inputVars);
}
getPublishedArticlesRef.operationName = 'GetPublishedArticles';
exports.getPublishedArticlesRef = getPublishedArticlesRef;

exports.getPublishedArticles = function getPublishedArticles(dcOrVars, vars) {
  return executeQuery(getPublishedArticlesRef(dcOrVars, vars));
};

const getArticleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArticleDetail', inputVars);
}
getArticleDetailRef.operationName = 'GetArticleDetail';
exports.getArticleDetailRef = getArticleDetailRef;

exports.getArticleDetail = function getArticleDetail(dcOrVars, vars) {
  return executeQuery(getArticleDetailRef(dcOrVars, vars));
};

const getAllArticlesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllArticles', inputVars);
}
getAllArticlesRef.operationName = 'GetAllArticles';
exports.getAllArticlesRef = getAllArticlesRef;

exports.getAllArticles = function getAllArticles(dcOrVars, vars) {
  return executeQuery(getAllArticlesRef(dcOrVars, vars));
};

const getSchedulesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSchedules', inputVars);
}
getSchedulesRef.operationName = 'GetSchedules';
exports.getSchedulesRef = getSchedulesRef;

exports.getSchedules = function getSchedules(dcOrVars, vars) {
  return executeQuery(getSchedulesRef(dcOrVars, vars));
};

const getUserProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile', inputVars);
}
getUserProfileRef.operationName = 'GetUserProfile';
exports.getUserProfileRef = getUserProfileRef;

exports.getUserProfile = function getUserProfile(dcOrVars, vars) {
  return executeQuery(getUserProfileRef(dcOrVars, vars));
};

const getTeamMembersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeamMembers', inputVars);
}
getTeamMembersRef.operationName = 'GetTeamMembers';
exports.getTeamMembersRef = getTeamMembersRef;

exports.getTeamMembers = function getTeamMembers(dcOrVars, vars) {
  return executeQuery(getTeamMembersRef(dcOrVars, vars));
};
