# DATA SOURCES / INGREDIENT POLICY — v1.1.0

## 基本方針

SEIBUNメガネは、
「その可能性がある」だけの独自成分・メーカー呼称を掲載しません。

### 一般成分
主な確認先:
- 日本化粧品工業会 化粧品の成分表示名称リスト
- European Commission CosIng

一般成分では、表示名称や化粧品上の機能分類を中心に扱います。

## メーカー公式情報

以下はメーカー公式ページで名称・構成・位置づけを確認したものです。

### 資生堂
- 4MSK
- m-トラネキサム酸

公式:
https://www.shiseido.co.jp/sw/onlinestore/servicegarden/beautytopics/20240827/article01.html
https://www.shiseido.co.jp/sp/haku/laboratory/ingredient.html

### ポーラ
- ニールワン
- ルシノール
- PCE-DP

公式:
https://www.pola.co.jp/brand/wrinkle/products/index.html
https://www.pola.co.jp/brand/whiteshot/science/index.html

### 花王
- カモミラET
- セラミド機能成分
- エクトビオシス

公式:
https://www.kao.com/jp/innovation/research-development/fundamental/biological-science/functional-material/
https://www.kao.com/jp/innovation/research-development/fundamental/production-technology/micromixer/
https://www.kao.com/jp/newsroom/news/release/2025/20250807-001/

### カネボウ化粧品
- バウンスライトディフュージョン
- バランスクリアC

公式:
https://www.kanebo-cosmetics.jp/dew/products/holic/bright_bounce/
https://www.kanebo-cosmetics.jp/dew/products/brightening/uv_day_essence/

### コーセー
- コウジ酸
- ライスパワー No.11（公式採用・解説）

公式:
https://maison.kose.co.jp/site/p/kojicacid.aspx
https://maison.kose.co.jp/site/p/onebykose-hakkoscience.aspx

## 複合名の扱い

「独自開発成分」「複合保湿成分」などのマーケティング名は、
全成分表示に記載される単一成分とは限りません。

メーカーが構成を公式に開示している場合のみ、
- 複合名
- 構成成分
を分離して表示します。

## スコア

メーカー公式の効能値を点数化しているわけではありません。

SEIBUNメガネの内部参考スコアは:
- ユーザーの肌傾向
- 成分の配合目的カテゴリ
- 敏感傾向
- 登録した反応歴
- データカバー率

を使った独自の「目的の一致」整理です。

安全性・品質・医学的適合性を表しません。


## v1.1.3 根拠レベル

SEIBUNメガネでは「OCRで名前が読めること」と「分析に使えること」を分けます。

### Level 3 — メーカー公式確認
メーカー公式ページで名称・位置づけ・構成等を確認できる情報。

### Level 2 — 一次情報・標準DB確認
JCIAの表示名称情報、CosIng、厚生労働省・PMDA等、
成分名称や化粧品上の機能を確認できる情報。

### Level 1 — 一般情報
名称は詳細DBにあるが、現在の分析根拠としては弱い情報。

### Level 0 — 名称辞書のみ
OCRで成分名を見つけるためだけのレコード。

内部参考スコアには原則としてLevel 2以上だけを使用します。
Level 0〜1は「それらしいので点数に加える」という扱いをしません。

## OCR表記ゆれポリシー

吸収するもの:
- Unicode全角/半角
- ハイフン等の記号差
- 空白・句読点
- 登録済み和名 / 英語名 / INCI / 別名
- 長い成分名で、一意に判断できる1文字程度のOCR誤り

採用しないもの:
- 複数候補が近い曖昧一致
- 短い成分名の推測補完
- メーカー独自名称だと推測されるだけの語
- 辞書に根拠なく自動生成した別名
