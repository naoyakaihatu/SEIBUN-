// SEIBUNメガネ v2.0.0 — legal / clarity layer.
(() => {
  const S=SEIBUN;

  S.legal={
    scoreNote(){
      return `<div class="legal-inline"><strong>星評価について</strong><p>星は、入力した肌の悩みと、確認できた成分の一般的な配合目的を照らし合わせた参考目安です。商品の品質・安全性・治療効果・アレルギーの有無を示すものではありません。読み取れた成分が少ない場合は「暫定」と表示し、撮り直しを案内します。</p></div>`;
    },
    productDataNote(){
      return `<div class="legal-inline"><strong>商品表示を優先してください</strong><p>成分表示はリニューアル等で変わることがあります。購入・使用前は実際の容器やメーカー公式表示を優先してください。</p></div>`;
    },
    activeIngredientNote(){
      return `<div class="legal-inline"><strong>「有効成分」について</strong><p>成分名だけでは、その商品で医薬部外品の有効成分として扱われているかは確定できません。商品表示で「有効成分」と記載されている場合に確認してください。</p></div>`;
    },
    whiteningNote(){
      return `<div class="legal-inline"><strong>「美白」という表現について</strong><p>医薬部外品の文脈では、承認された範囲の表現を指します。できているしみを消す、肌そのものを白くする、治療するという意味ではありません。</p></div>`;
    },
    reactionNote(){
      return `<div class="legal-inline"><strong>肌との相性には個人差があります</strong><p>刺激感とアレルギー反応は同じではありません。強い赤み、腫れ、かゆみ、痛み等がある場合は使用を中止し、必要に応じて医療機関へ相談してください。</p></div>`;
    }
  };

  S.views.legal=()=>{
    const l=APP_CONFIG.legal||{};
    const saved=S.isPersistenceEnabled();
    return `<section class="legal-page-v2">
      <div class="page-head"><div><span class="eyebrow">ABOUT THIS RESULT</span><h1>この評価について</h1><p>難しい注意書きは最小限に。必要な内容だけまとめています。</p></div><span class="count">更新 ${l.lastUpdated||''}</span></div>

      <section class="policy-card important"><h2>まず知っておいてほしいこと</h2><ul>
        <li>SEIBUNメガネは、化粧品選びのための参考ツールです。</li>
        <li>星評価は「あなたの悩みとの方向性」を整理した目安で、安全性や効果を保証する点数ではありません。</li>
        <li>成分表の読み取りには誤認識が起こることがあります。</li>
        <li>実際の容器・メーカー公式表示・使用感を優先してください。</li>
      </ul></section>

      <section class="policy-card"><h2>1. 星評価</h2>${S.legal.scoreNote()}<p>内部では読み取り量や辞書照合状態を確認していますが、画面では専門的な「信頼度」指標を前面に出さず、「十分読み取れた」「一部からの暫定目安」「撮り直すと精度UP」のように次の行動が分かる表現にしています。</p></section>

      <section class="policy-card"><h2>2. 成分辞典</h2><p>成分の一般的な配合目的や処方上の役割を、日常語のタグと短い説明で整理します。個々の製品での配合量や組み合わせによって意味は変わります。</p>${S.legal.activeIngredientNote()}${S.legal.whiteningNote()}${S.legal.productDataNote()}</section>

      <section class="policy-card"><h2>3. OCR・カメラ</h2><p>画像から文字を読み取るため、反射・湾曲・ピンぼけ・小さな文字などで誤認識する場合があります。うまく読めない時は、撮り直し・手入力・テキスト貼り付けを利用できます。</p></section>

      <section class="policy-card"><h2>4. 肌設定</h2><p>普段は「今いちばん気になること」を1つ選ぶだけで利用できます。じっくり肌診断は任意で、病名や皮膚疾患を診断するものではありません。</p>${S.legal.reactionNote()}</section>

      <section class="policy-card"><h2>5. データ保存</h2><p><strong>通常：</strong>肌設定と解析履歴は sessionStorage に一時保存します。タブを閉じると原則として消えます。</p><p><strong>「この端末に保存」を押した場合：</strong>肌設定・選んだ悩み・解析履歴を localStorage に保存し、次回同じブラウザで利用できます。現在の状態：<strong>${saved?'端末保存 ON':'端末保存 OFF'}</strong>。</p><p>履歴画面から保存解除・全データ削除ができます。クラウド保存や会員登録は現在実装していません。</p></section>

      <section class="policy-card"><h2>6. 広告・アフィリエイト</h2><p>${l.affiliateEnabled?'アフィリエイト広告を利用しています。':'現在版にはアフィリエイトリンクを実装していません。'}</p><p>将来広告を導入しても、広告報酬によって星評価のロジックを変更しない方針です。</p></section>

      <section class="policy-card"><h2>7. お問い合わせ</h2><p>不具合や成分情報の訂正はお問い合わせ画面から連絡できます。現在のフォームはサイトのサーバーに内容を保存しません。</p></section>

      <div class="note">このページは、サービスの用途と限界を分かりやすく示すためのものです。公開・収益化の直前には、実際の運営主体、広告方法、保存データに合わせて最終確認を行ってください。</div>
    </section>`;
  };
})();
