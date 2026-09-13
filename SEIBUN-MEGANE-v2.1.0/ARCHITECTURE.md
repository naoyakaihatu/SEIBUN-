# ARCHITECTURE — SEIBUNメガネ v2.0.0

## Frontend

静的HTML / CSS / JavaScriptで構成します。

### data

- `app_data.js`: 肌診断・基礎データ
- `skin_research.js`: 季節別質問
- `scan_lexicon.js`: OCR辞書
- `analysis_rules.js`: 成分重み・分析ルール
- `ingredient_guides.js`: 成分役割ガイド
- `ingredient_master.js`: 成分マスター
- `verified_ingredients_v110.js`: 根拠確認済み成分情報
- `config.js`: ブランド・保存キー・連絡先設定

### js

- `core.js`: 状態、sessionStorage/localStorage、ナビゲーション、共通UI
- `legal.js`: 評価・データ保存等の説明
- `contact.js`: 問い合わせ
- `ingredients.js`: 成分辞典、辞書照合、内部スコア、星表示
- `skin.js`: 1タップ悩み設定、じっくり肌診断
- `ocr.js`: カメラ、OCR、待機表示、エラー復帰
- `views.js`: Home、履歴、美容基礎
- `app.js`: 初期化、PWA

旧カルテ・商品ライブラリの `routine.js` / `products.js` は公開版から削除しています。

## OCR

ブラウザ → getUserMedia / file input → Canvas前処理 → Tesseract.js → 成分辞書照合 → 内部分析 → 星5段階表示。

## Storage

通常:

`sessionStorage`

明示的に「この端末に保存」:

`sessionStorage + localStorage`

localStorage保存対象:

- 肌プロフィール
- 1タップ悩み
- 解析履歴

クラウドDBは使用しません。
