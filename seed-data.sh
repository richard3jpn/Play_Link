#!/bin/bash

# ダミーデータ挿入スクリプト (bash版)

# チームのUUID
TEAM_DRAGONS="ba6a277a-727e-4a32-abd7-8130638a14f8"
TEAM_TIGERS="8b8a5d38-d499-4c46-8568-085a17f1a4de"

# Data Connect エミュレーターエンドポイント
DC_ENDPOINT="http://localhost:9399/emulator/playlink/playlink-connector/execute"

echo "🚀 ダミーデータ投入を開始します"
echo ""
echo "🏃 選手データを挿入中..."

# 東京ドラゴンズの選手
curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"田中 大輔","uniformNumber":1,"position":"投手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 田中 大輔 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"佐藤 健太","uniformNumber":2,"position":"捕手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 佐藤 健太 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"鈴木 一郎","uniformNumber":3,"position":"一塁手","bats":"左","throws":"左"}}' > /dev/null && echo "  ✓ 鈴木 一郎 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"高橋 翔","uniformNumber":4,"position":"二塁手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 高橋 翔 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"伊藤 誠","uniformNumber":5,"position":"三塁手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 伊藤 誠 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"渡辺 航","uniformNumber":6,"position":"遊撃手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 渡辺 航 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"山本 勇","uniformNumber":7,"position":"外野手","bats":"左","throws":"左"}}' > /dev/null && echo "  ✓ 山本 勇 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"中村 武","uniformNumber":8,"position":"外野手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 中村 武 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"小林 聡","uniformNumber":9,"position":"外野手","bats":"左","throws":"右"}}' > /dev/null && echo "  ✓ 小林 聡 (東京ドラゴンズ)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_DRAGONS'","name":"加藤 隆","uniformNumber":10,"position":"投手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 加藤 隆 (東京ドラゴンズ)"

# 大阪タイガースの選手
curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"松本 龍一","uniformNumber":1,"position":"投手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 松本 龍一 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"井上 拓也","uniformNumber":2,"position":"捕手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 井上 拓也 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"木村 優太","uniformNumber":3,"position":"一塁手","bats":"左","throws":"左"}}' > /dev/null && echo "  ✓ 木村 優太 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"斎藤 慎太郎","uniformNumber":4,"position":"二塁手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 斎藤 慎太郎 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"清水 剛","uniformNumber":5,"position":"三塁手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 清水 剛 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"福田 光","uniformNumber":6,"position":"遊撃手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 福田 光 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"藤田 健","uniformNumber":7,"position":"外野手","bats":"左","throws":"左"}}' > /dev/null && echo "  ✓ 藤田 健 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"岡田 浩二","uniformNumber":8,"position":"外野手","bats":"右","throws":"右"}}' > /dev/null && echo "  ✓ 岡田 浩二 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"長谷川 翼","uniformNumber":9,"position":"外野手","bats":"左","throws":"右"}}' > /dev/null && echo "  ✓ 長谷川 翼 (大阪タイガース)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedPlayer","variables":{"teamId":"'$TEAM_TIGERS'","name":"吉田 剛史","uniformNumber":10,"position":"投手","bats":"左","throws":"左"}}' > /dev/null && echo "  ✓ 吉田 剛史 (大阪タイガース)"

echo ""
echo "✅ 選手データの挿入完了"
echo ""
echo "⚾ 試合データを挿入中..."

# 東京ドラゴンズの試合
curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_DRAGONS'","opponentName":"横浜ベイスターズ","gameDate":"2025-10-15","location":"東京スタジアム","isHome":true,"status":"final","homeScore":5,"awayScore":3}}' > /dev/null && echo "  ✓ vs 横浜ベイスターズ (2025-10-15)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_DRAGONS'","opponentName":"埼玉ライオンズ","gameDate":"2025-10-20","location":"埼玉球場","isHome":false,"status":"final","homeScore":2,"awayScore":4}}' > /dev/null && echo "  ✓ vs 埼玉ライオンズ (2025-10-20)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_DRAGONS'","opponentName":"千葉マリンズ","gameDate":"2025-10-25","location":"東京スタジアム","isHome":true,"status":"final","homeScore":6,"awayScore":2}}' > /dev/null && echo "  ✓ vs 千葉マリンズ (2025-10-25)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_DRAGONS'","opponentName":"神奈川ホークス","gameDate":"2025-11-01","location":"神奈川球場","isHome":false,"status":"final","homeScore":3,"awayScore":3}}' > /dev/null && echo "  ✓ vs 神奈川ホークス (2025-11-01)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_DRAGONS'","opponentName":"大阪タイガース","gameDate":"2025-11-10","location":"東京スタジアム","isHome":true,"status":"scheduled"}}' > /dev/null && echo "  ✓ vs 大阪タイガース (2025-11-10)"

# 大阪タイガースの試合
curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_TIGERS'","opponentName":"京都サムライ","gameDate":"2025-10-12","location":"大阪ドーム","isHome":true,"status":"final","homeScore":7,"awayScore":4}}' > /dev/null && echo "  ✓ vs 京都サムライ (2025-10-12)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_TIGERS'","opponentName":"兵庫ファイターズ","gameDate":"2025-10-18","location":"兵庫スタジアム","isHome":false,"status":"final","homeScore":1,"awayScore":5}}' > /dev/null && echo "  ✓ vs 兵庫ファイターズ (2025-10-18)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_TIGERS'","opponentName":"奈良イーグルス","gameDate":"2025-10-23","location":"大阪ドーム","isHome":true,"status":"final","homeScore":8,"awayScore":3}}' > /dev/null && echo "  ✓ vs 奈良イーグルス (2025-10-23)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_TIGERS'","opponentName":"和歌山パンダース","gameDate":"2025-10-30","location":"和歌山球場","isHome":false,"status":"final","homeScore":4,"awayScore":4}}' > /dev/null && echo "  ✓ vs 和歌山パンダース (2025-10-30)"

curl -s -X POST "$DC_ENDPOINT" -H "Content-Type: application/json" \
  -d '{"name":"SeedGame","variables":{"teamId":"'$TEAM_TIGERS'","opponentName":"東京ドラゴンズ","gameDate":"2025-11-10","location":"東京スタジアム","isHome":false,"status":"scheduled"}}' > /dev/null && echo "  ✓ vs 東京ドラゴンズ (2025-11-10)"

echo ""
echo "✅ 試合データの挿入完了"
echo ""
echo "🎉 すべてのダミーデータの投入が完了しました！"
