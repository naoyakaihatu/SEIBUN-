// SEIBUNメガネ v2.1.0 — focused public views.
(() => {
  const S=SEIBUN;

  S.menuItem=(icon,title,text,view,tone='mint')=>`<button class="menu-item ${tone}" onclick="SEIBUN.render('${view}')">
    <span class="menu-icon">${icon}</span><span class="menu-copy"><strong>${title}</strong><small>${text}</small></span><b>›</b>
  </button>`;

  S.views.home=()=>{
    const concern=S.getConcern();
    const meta=concern?S.skin.concernMeta(concern):null;
    return `<section class="home-min-v21">
      <div class="home-min-brand-v21"><span class="brand-mark-min-v21">S</span><strong>SEIBUNメガネ</strong></div>
      <div class="home-min-copy-v21">
        <h1>成分表を撮るだけ。</h1>
        <p>今の悩みに合わせて、コスメを星5段階でシンプルに整理します。</p>
      </div>
      <button class="home-min-scan-v21" onclick="SEIBUN.render('scan')"><span>◉</span><strong>成分表をスキャンする</strong><small>カメラ・写真どちらでもOK</small></button>
      ${meta?`<button class="home-current-concern-v21" onclick="SEIBUN.render('diagnosis')"><span>${meta.icon}</span><small>今の悩み</small><strong>${meta.label}</strong><b>変更</b></button>`:''}
      <div class="home-min-links-v21">
        <button onclick="SEIBUN.render('tutorial')">使い方を見る</button>
        <button onclick="SEIBUN.render('ingredients')">成分辞典を見る</button>
      </div>
      <p class="home-min-note-v21">医療診断ではありません。肌との相性には個人差があります。</p>
    </section>`;
  };

  S.views.welcome=S.views.home;
  S.views.flowChoice=S.views.home;

  S.views.tutorial=()=>`<section class="simple-flow-page-v21">
    <div class="simple-page-title-v21"><span class="eyebrow">HOW TO</span><h1>使い方</h1><p>3つだけです。</p></div>
    <div class="simple-steps-v21">
      <article><span>1</span><div><strong>悩みを1つ選ぶ</strong><small>初回だけ。あとで変更できます。</small></div></article>
      <article><span>2</span><div><strong>成分表を撮る</strong><small>裏面の全成分が入るように撮影。</small></div></article>
      <article><span>3</span><div><strong>星と結論を見る</strong><small>詳しい理由は必要な時だけ開けます。</small></div></article>
    </div>
    <button class="primary wide main-action-v21" onclick="SEIBUN.render('scan')">メガネを使う →</button>
  </section>`;

  S.views.history=()=>{
    const h=S.getHistory();
    const saved=S.isPersistenceEnabled();
    return `<section class="history-min-v21">
      <div class="simple-page-title-v21"><span class="eyebrow">HISTORY</span><h1>履歴</h1><p>${h.length}件の結果があります。</p></div>
      <div class="history-min-list-v21">
        ${h.length?h.map((x,i)=>{
          const score=x.displayScore??x.score??null;
          const c=x.concern?S.skin.concernMeta(x.concern):null;
          return `<article class="history-min-card-v21">
            <div><small>${S.escape(x.date||'')}</small><strong>${S.starsInline(score)} ${score==null?'結果なし':`${S.scoreToStars(score)} / 5`}</strong>${c?`<span>${c.icon} ${c.label}</span>`:''}</div>
            <button onclick="SEIBUN.historyUI.remove(${i})" aria-label="削除">×</button>
          </article>`;
        }).join(''):S.empty('履歴はまだありません','商品をチェックすると、ここに結果が残ります。','<button class="primary" onclick="SEIBUN.render(\'scan\')">商品をチェックする</button>')}
      </div>
      <details class="details-v3 history-settings-v21"><summary>保存・データ設定</summary><div class="details-body-v3">
        <p>${saved?'この端末に保存しています。':'現在は一時保存です。タブを閉じると消えます。'}</p>
        <div class="actions">${saved?'<button class="secondary" onclick="SEIBUN.historyUI.stopSave()">端末保存を解除</button>':'<button class="primary" onclick="SEIBUN.historyUI.persist()">この端末に保存</button>'}<button class="danger-ghost" onclick="SEIBUN.historyUI.resetAll()">すべて削除</button></div>
      </div></details>
    </section>`;
  };
  S.views.mypage=S.views.history;

  S.historyUI={
    persist(){
      S.persistGuestData();
      S.render('history',{replace:true,instant:true});
    },
    stopSave(){
      if(!confirm('端末への保存を解除しますか？ 今開いているタブのデータは残ります。'))return;
      S.stopPersistentSave();
      S.render('history',{replace:true,instant:true});
    },
    remove(index){
      const h=S.getHistory();
      h.splice(index,1);
      S.saveJSON(APP_CONFIG.storage.history,h);
      S.render('history',{replace:true,instant:true});
    },
    resetAll(){
      if(!confirm('肌設定・選んだ悩み・解析履歴をすべて削除しますか？'))return;
      S.resetAllData();
      S.render('home',{replace:true,instant:true});
    }
  };

  S.views.knowledge=()=>{
    const cats=[...new Set(KNOWLEDGE.map(x=>x.cat))];
    return `<div class="page-head"><div><span class="kicker">LEARN</span><h1>美容の基本</h1><p>必要なところだけ短く確認できます。</p></div></div>
      ${cats.map(cat=>`<section class="knowledge-section"><h2>${cat}</h2><div>${KNOWLEDGE.filter(x=>x.cat===cat).map(x=>`<details class="knowledge-item"><summary>${x.title}</summary><p>${x.body}</p></details>`).join('')}</div></section>`).join('')}`;
  };
})();
