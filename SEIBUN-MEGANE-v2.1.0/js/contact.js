// Contact form — no server storage in current beta.
(() => {
  const S=SEIBUN;
  S.contact={};

  S.views.contact = () => {
    const cfg=APP_CONFIG.contact||{};
    const email=cfg.email||'';
    return `<div class="page-head">
      <div><span class="kicker">CONTACT</span><h1>お問い合わせ</h1><p>不具合・情報の訂正・広告や取材などのご連絡はこちら。</p></div>
    </div>

    <section class="contact-intro">
      <span class="sticker mint">CONTACT</span>
      <h2>気になることがあれば、ここから。</h2>
      <p>現在版では、フォーム内容をこのサイトのサーバーへ保存しません。送信時は、お使いのメールアプリを開いて送信します。</p>
    </section>

    ${!email?`<div class="publish-note"><strong>送信先メールアドレスはまだ未設定です</strong><p>フォーム自体は利用できますが、公開前に <code>data/config.js</code> の <code>contact.email</code> をサイト専用メールへ設定してください。未設定の間は入力内容をコピーできます。</p></div>`:''}

    <section class="contact-card">
      <div class="form-grid">
        <label>お問い合わせ種別
          <select id="contactType">
            <option>サイトの不具合</option>
            <option>成分・商品情報の訂正</option>
            <option>広告・アフィリエイト・お仕事</option>
            <option>権利関係・削除依頼</option>
            <option>その他</option>
          </select>
        </label>
        <label>お名前 / ハンドルネーム
          <input id="contactName" placeholder="任意">
        </label>
        <label class="full">返信先メールアドレス
          <input id="contactReply" type="email" placeholder="返信が必要な場合のみ入力">
        </label>
        <label class="full">お問い合わせ内容
          <textarea id="contactMessage" rows="8" placeholder="できるだけ具体的にご記入ください"></textarea>
        </label>
      </div>

      <div class="contact-caution">
        <strong>入力しないでほしい情報</strong>
        <p>パスワード、住所、電話番号、クレジットカード情報、診断書などの機微な情報は送らないでください。肌症状やアレルギー等の健康情報も、問い合わせに必要な最小限にしてください。</p>
      </div>

      <label class="contact-consent">
        <input id="contactConsent" type="checkbox">
        <span>入力内容が自分のメールアプリへ引き継がれ、メール送信に利用されることを確認しました。</span>
      </label>

      <div class="actions">
        <button class="primary" onclick="SEIBUN.contact.submit()">${email?'メールアプリを開く':'内容をコピーする'}</button>
        <button class="secondary" onclick="SEIBUN.contact.clear()">入力をクリア</button>
      </div>
      <div id="contactResult"></div>
    </section>

    <section class="contact-meta">
      <h2>現在の問い合わせ方法</h2>
      <p>${email?`送信先：${S.escape(email)}`:'送信先メールアドレスは公開準備中です。'}</p>
      <p>将来、独自のWebフォームやクラウド送信を導入する場合は、送信内容の保存先・利用目的・保存期間等をプライバシーポリシーに追加します。</p>
    </section>`;
  };

  S.contact.build = () => {
    const type=S.$('contactType')?.value||'お問い合わせ';
    const name=S.$('contactName')?.value.trim()||'未記入';
    const reply=S.$('contactReply')?.value.trim()||'未記入';
    const message=S.$('contactMessage')?.value.trim()||'';
    const prefix=(APP_CONFIG.contact?.subjectPrefix||`[${S.brandName()} お問い合わせ]`);
    const subject=`${prefix} ${type}`;
    const body=[
      `サイト：${S.brandName()}`,
      `種別：${type}`,
      `お名前：${name}`,
      `返信先：${reply}`,
      '',
      'お問い合わせ内容：',
      message
    ].join('\n');
    return {subject,body,message};
  };

  S.contact.submit = async () => {
    const out=S.$('contactResult');
    const consent=S.$('contactConsent')?.checked;
    const data=S.contact.build();
    if(!data.message){
      out.innerHTML='<div class="note">お問い合わせ内容を入力してください。</div>';
      return;
    }
    if(!consent){
      out.innerHTML='<div class="note">送信方法について確認欄にチェックしてください。</div>';
      return;
    }

    const email=(APP_CONFIG.contact?.email||'').trim();
    if(email){
      const href=`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      window.location.href=href;
      out.innerHTML='<div class="note">メールアプリが開かない場合は、送信先メールアドレスへ直接ご連絡ください。</div>';
      return;
    }

    try{
      await navigator.clipboard.writeText(data.body);
      out.innerHTML='<div class="note"><strong>入力内容をコピーしました。</strong><p>送信先メールアドレスが設定されたら、メールに貼り付けて送信できます。</p></div>';
    }catch{
      out.innerHTML=`<div class="note"><strong>コピーできませんでした。</strong><p>下の内容を手動でコピーしてください。</p><pre class="contact-preview">${S.escape(data.body)}</pre></div>`;
    }
  };

  S.contact.clear = () => {
    ['contactName','contactReply','contactMessage'].forEach(id=>{const el=S.$(id);if(el)el.value=''});
    if(S.$('contactConsent'))S.$('contactConsent').checked=false;
    if(S.$('contactResult'))S.$('contactResult').innerHTML='';
  };
})();
