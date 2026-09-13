# DEPLOYMENT — SEIBUNメガネ v2.0.0

静的サイトとしてCloudflare Pages / Vercel等へ配置できます。

## 重要

ブラウザ内カメラの `getUserMedia` は、原則としてHTTPSまたはlocalhostが必要です。

## 配置

リポジトリまたはアップロード対象のルートを `SEIBUN-MEGANE-v2.0.0` にし、ビルドコマンドなしで静的配信します。

## OCR

Tesseract.js本体・Worker・言語データは外部CDNを利用します。CSPは `_headers` で許可対象を確認してください。
