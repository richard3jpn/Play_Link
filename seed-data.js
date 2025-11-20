#!/usr/bin/env node

/**
 * ダミーデータ挿入スクリプト
 *
 * 使い方: node seed-data.js
 */

const { initializeApp } = require('firebase/app');
const { getDataConnect, connectDataConnectEmulator, executeMutation } = require('firebase/data-connect');
const { connectorConfig, seedPlayer, seedGame } = require('./app/src/generated');

// Firebase設定
const firebaseConfig = {
  apiKey: "demo-api-key",
  projectId: "playlink-fcfea",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const dataConnect = getDataConnect(app, connectorConfig);

// エミュレーター接続
connectDataConnectEmulator(dataConnect, 'localhost', 9399);

// チームのUUID
const TEAMS = {
  dragons: 'ba6a277a-727e-4a32-abd7-8130638a14f8',
  tigers: '8b8a5d38-d499-4c46-8568-085a17f1a4de'
};

// 選手データ
const dragonPlayers = [
  { name: '田中 大輔', uniformNumber: 1, position: '投手', bats: '右', throws: '右' },
  { name: '佐藤 健太', uniformNumber: 2, position: '捕手', bats: '右', throws: '右' },
  { name: '鈴木 一郎', uniformNumber: 3, position: '一塁手', bats: '左', throws: '左' },
  { name: '高橋 翔', uniformNumber: 4, position: '二塁手', bats: '右', throws: '右' },
  { name: '伊藤 誠', uniformNumber: 5, position: '三塁手', bats: '右', throws: '右' },
  { name: '渡辺 航', uniformNumber: 6, position: '遊撃手', bats: '右', throws: '右' },
  { name: '山本 勇', uniformNumber: 7, position: '外野手', bats: '左', throws: '左' },
  { name: '中村 武', uniformNumber: 8, position: '外野手', bats: '右', throws: '右' },
  { name: '小林 聡', uniformNumber: 9, position: '外野手', bats: '左', throws: '右' },
  { name: '加藤 隆', uniformNumber: 10, position: '投手', bats: '右', throws: '右' }
];

const tigerPlayers = [
  { name: '松本 龍一', uniformNumber: 1, position: '投手', bats: '右', throws: '右' },
  { name: '井上 拓也', uniformNumber: 2, position: '捕手', bats: '右', throws: '右' },
  { name: '木村 優太', uniformNumber: 3, position: '一塁手', bats: '左', throws: '左' },
  { name: '斎藤 慎太郎', uniformNumber: 4, position: '二塁手', bats: '右', throws: '右' },
  { name: '清水 剛', uniformNumber: 5, position: '三塁手', bats: '右', throws: '右' },
  { name: '福田 光', uniformNumber: 6, position: '遊撃手', bats: '右', throws: '右' },
  { name: '藤田 健', uniformNumber: 7, position: '外野手', bats: '左', throws: '左' },
  { name: '岡田 浩二', uniformNumber: 8, position: '外野手', bats: '右', throws: '右' },
  { name: '長谷川 翼', uniformNumber: 9, position: '外野手', bats: '左', throws: '右' },
  { name: '吉田 剛史', uniformNumber: 10, position: '投手', bats: '左', throws: '左' }
];

// 試合データ
const dragonGames = [
  { opponentName: '横浜ベイスターズ', gameDate: '2025-10-15', location: '東京スタジアム', isHome: true, status: 'final', homeScore: 5, awayScore: 3 },
  { opponentName: '埼玉ライオンズ', gameDate: '2025-10-20', location: '埼玉球場', isHome: false, status: 'final', homeScore: 2, awayScore: 4 },
  { opponentName: '千葉マリンズ', gameDate: '2025-10-25', location: '東京スタジアム', isHome: true, status: 'final', homeScore: 6, awayScore: 2 },
  { opponentName: '神奈川ホークス', gameDate: '2025-11-01', location: '神奈川球場', isHome: false, status: 'final', homeScore: 3, awayScore: 3 },
  { opponentName: '大阪タイガース', gameDate: '2025-11-10', location: '東京スタジアム', isHome: true, status: 'scheduled', homeScore: null, awayScore: null }
];

const tigerGames = [
  { opponentName: '京都サムライ', gameDate: '2025-10-12', location: '大阪ドーム', isHome: true, status: 'final', homeScore: 7, awayScore: 4 },
  { opponentName: '兵庫ファイターズ', gameDate: '2025-10-18', location: '兵庫スタジアム', isHome: false, status: 'final', homeScore: 1, awayScore: 5 },
  { opponentName: '奈良イーグルス', gameDate: '2025-10-23', location: '大阪ドーム', isHome: true, status: 'final', homeScore: 8, awayScore: 3 },
  { opponentName: '和歌山パンダース', gameDate: '2025-10-30', location: '和歌山球場', isHome: false, status: 'final', homeScore: 4, awayScore: 4 },
  { opponentName: '東京ドラゴンズ', gameDate: '2025-11-10', location: '東京スタジアム', isHome: false, status: 'scheduled', homeScore: null, awayScore: null }
];

async function seedPlayers() {
  console.log('🏃 選手データを挿入中...');

  // 東京ドラゴンズの選手
  for (const player of dragonPlayers) {
    try {
      await seedPlayer(dataConnect, {
        teamId: TEAMS.dragons,
        ...player
      });
      console.log(`  ✓ ${player.name} (東京ドラゴンズ)`);
    } catch (error) {
      console.error(`  ✗ ${player.name}:`, error.message);
    }
  }

  // 大阪タイガースの選手
  for (const player of tigerPlayers) {
    try {
      await seedPlayer(dataConnect, {
        teamId: TEAMS.tigers,
        ...player
      });
      console.log(`  ✓ ${player.name} (大阪タイガース)`);
    } catch (error) {
      console.error(`  ✗ ${player.name}:`, error.message);
    }
  }

  console.log('✅ 選手データの挿入完了\n');
}

async function seedGames() {
  console.log('⚾ 試合データを挿入中...');

  // 東京ドラゴンズの試合
  for (const game of dragonGames) {
    try {
      await seedGame(dataConnect, {
        teamId: TEAMS.dragons,
        ...game
      });
      console.log(`  ✓ vs ${game.opponentName} (${game.gameDate})`);
    } catch (error) {
      console.error(`  ✗ vs ${game.opponentName}:`, error.message);
    }
  }

  // 大阪タイガースの試合
  for (const game of tigerGames) {
    try {
      await seedGame(dataConnect, {
        teamId: TEAMS.tigers,
        ...game
      });
      console.log(`  ✓ vs ${game.opponentName} (${game.gameDate})`);
    } catch (error) {
      console.error(`  ✗ vs ${game.opponentName}:`, error.message);
    }
  }

  console.log('✅ 試合データの挿入完了\n');
}

async function main() {
  console.log('🚀 ダミーデータ投入を開始します\n');

  try {
    await seedPlayers();
    await seedGames();

    console.log('🎉 すべてのダミーデータの投入が完了しました！');
    process.exit(0);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

main();
