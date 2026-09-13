# QA — SEIBUNメガネ ver0.1

## 自動確認済み

- JavaScript構文チェック：全ファイルOK
- 統合成分DB：416件読み込み
- サンプル全成分テキスト：8/8成分を認識
- `フェノキシエタノール` を `エタノール` と二重認識しないことを確認
- 簡単診断ロジック：3タイプ生成
- じっくり診断：F01〜F16 / M01〜M16形式のコード生成ロジック
- 32プロフィール用SVG：32/32存在
- おすすめ成分TOP5生成
- 商品星評価生成
- 必須公開ビュー：20/20定義
- 旧カルテ/JAN/商品検索/SEIBUN NAVIコード：公開版から撤去

## 公開前に実機確認が必要

- iPhone Safari / Android Chromeのカメラ権限
- 実商品50〜100件でOCR精度
- 光沢パッケージ・曲面容器で明るさ警告が出すぎないか
- OCRミニ知識8秒の読みやすさ
- 320〜430px幅で質問文・結果・辞典のレイアウト
- 32タイプの本番イラスト差し替え後の見え方

## 2026-09-13 自動テスト結果

`QA_AUTOMATED.txt` に実行結果を保存。

- Ingredient DB: 416
- Recommendation ingredients: 15/15 in DB
- 32 profile codes: 32/32 unique
- Simple types: dry / oily / balance の3種すべて生成可能
- Sample ingredient recognition: 8/8
- 星境界：33→1、34→2、42→3、68→4、82→5
- Views: 20/20
- Type assets: 32/32

ブラウザ実機・物理スマホのカメラQAはこの環境では未実施。HTTPS公開後に別途確認する。
