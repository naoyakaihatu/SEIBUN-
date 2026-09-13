// SEIBUNメガネ v2.0.0 — one-tap concern + optional deep skin check.
(() => {
  const S=SEIBUN;
  const K={};
  S.skin=K;

  K.axisLabels={
    dry:'乾燥',oil:'皮脂',sens:'刺激・敏感傾向',pore:'毛穴・皮脂',
    tone:'シミ・くすみ',firm:'ハリ',rough:'肌荒れ・赤み',
    stress:'ストレス影響',sleep:'睡眠リズム',uv:'紫外線環境',routine:'ケア負荷'
  };

  K.concerns=[
    {id:'dry',icon:'💧',label:'乾燥',text:'つっぱり・カサつき'},
    {id:'pore',icon:'○',label:'毛穴・皮脂',text:'テカリ・毛穴目立ち'},
    {id:'tone',icon:'✦',label:'シミ・くすみ',text:'透明感を意識'},
    {id:'firm',icon:'↗',label:'ハリ',text:'弾力・ハリ不足'},
    {id:'rough',icon:'盾',label:'肌荒れ・赤み',text:'荒れやすさが気になる'},
    {id:'sens',icon:'!',label:'刺激・敏感',text:'しみやすさが気になる'}
  ];
  K.concernMeta=id=>K.concerns.find(x=>x.id===id)||K.concerns[0];
  K.currentSeason=()=>SKIN_RESEARCH.currentSeason();
  K.seasonLabel=season=>SKIN_RESEARCH.seasonLabel(season);
  K.questionsFor=(season=K.currentSeason())=>[...DEEP_DIAGNOSIS,...(SKIN_RESEARCH.seasonalQuestions[season]||[])];

  K.profileFromConcern = concern => {
    const scores={dry:35,oil:35,sens:35,pore:35,tone:35,firm:35,rough:35};
    if(concern==='dry'){scores.dry=90;scores.rough=50;scores.sens=45;}
    if(concern==='pore'){scores.pore=90;scores.oil=78;scores.dry=38;}
    if(concern==='tone'){scores.tone=90;scores.dry=42;}
    if(concern==='firm'){scores.firm=90;scores.dry=48;}
    if(concern==='rough'){scores.rough=90;scores.sens=72;scores.dry=55;}
    if(concern==='sens'){scores.sens=92;scores.rough=76;scores.dry=60;}
    return {
      mode:'instant',
      focusConcern:concern,
      scores,
      context:{},allergy:{},demographics:{season:K.currentSeason()},research:{},
      createdAt:new Date().toISOString()
    };
  };

  K.selectConcern = (concern,nextView='scan') => {
    if(!K.concernMeta(concern))return;
    S.setConcern(concern);
    const current=S.getProfile();
    if(current?.mode==='deep'){
      const profile=JSON.parse(JSON.stringify(current));
      profile.focusConcern=concern;
      profile.scores=profile.scores||{};
      profile.scores[concern]=Math.max(profile.scores[concern]||0,85);
      profile.updatedAt=new Date().toISOString();
      S.saveProfile(profile);
    }else{
      S.saveProfile(K.profileFromConcern(concern));
    }

    if(S.state.pendingScanResult){
      S.ocr?.showPendingResult?.();
      return;
    }
    if(nextView){
      S.render(nextView,{replace:nextView==='home'});
      if(nextView==='checker'&&S.state.checkerDraft){
        requestAnimationFrame(()=>{const el=S.$('checkText');if(el)el.value=S.state.checkerDraft});
      }
    }
  };

  K.concernPickerHtml = (nextView='scan',compact=false) => {
    const selected=S.getConcern();
    return `<section class="concern-picker-v2 ${compact?'compact':''}">
      <div class="concern-picker-head-v2">
        <span class="eyebrow">1 TAP</span>
        <h2>今、一番気になるのは？</h2>
        <p>1つ選ぶだけでOK。あとから変更できます。</p>
      </div>
      <div class="concern-chips-v2">
        ${K.concerns.map(c=>`<button class="concern-chip-v2 ${selected===c.id?'selected':''}" onclick="SEIBUN.skin.selectConcern('${c.id}','${nextView}')">
          <span>${c.icon}</span><strong>${c.label}</strong><small>${c.text}</small>
        </button>`).join('')}
      </div>
    </section>`;
  };

  K.enableProgress = total => {
    const form=S.$('skinForm');
    if(!form)return;
    const update=()=>{
      const answered=new Set([...form.querySelectorAll('input[type="radio"]:checked')].map(x=>x.name)).size;
      const text=S.$('skinProgressText'),bar=S.$('skinProgressBar');
      if(text)text.textContent=`${answered} / ${total} 問`;
      if(bar)bar.style.width=`${Math.round(answered/Math.max(1,total)*100)}%`;
    };
    form.addEventListener('change',update);
    update();
  };

  K.priorities = (profile=S.getProfile()) => {
    if(!profile)return [];
    const adjusted={...(profile.scores||{})};
    const c=profile.context||{};
    if((c.stress||0)>=60||(c.sleep||0)>=60){
      adjusted.rough=(adjusted.rough||0)+10;
      adjusted.sens=(adjusted.sens||0)+8;
      adjusted.dry=(adjusted.dry||0)+5;
    }
    if((c.uv||0)>=60)adjusted.tone=(adjusted.tone||0)+10;
    if((c.routine||0)>=60){adjusted.sens=(adjusted.sens||0)+8;adjusted.rough=(adjusted.rough||0)+5;}
    return Object.entries(adjusted)
      .filter(([k])=>PRIORITY_META?.[k])
      .sort((a,b)=>b[1]-a[1]).slice(0,3)
      .map(([axis,value],i)=>({axis,value:S.clamp(Math.round(value),0,100),rank:i+1,...PRIORITY_META[axis]}));
  };

  K.candidateIngredients = (profile=S.getProfile(),limit=6) => INGREDIENTS
    .map(ing=>({ing,res:SEIBUN.ingredients.fit(ing,profile)}))
    .filter(x=>x.res&&x.res.fit>=45)
    .sort((a,b)=>b.res.fit-a.res.fit).slice(0,limit);

  S.views.diagnosis = () => {
    const deepCount=K.questionsFor().length;
    const selected=S.getConcern();
    return `<section class="skin-entry-v2 skin-min-v21">
      <div class="simple-page-title-v21"><span class="eyebrow">SKIN SETTING</span><h1>肌設定</h1><p>普段は1タップだけで十分です。</p></div>
      ${K.concernPickerHtml('diagnosis',true)}
      <details class="details-v3"><summary>じっくり肌診断</summary><div class="details-body-v3"><p>${deepCount}問前後・約6〜8分。季節や生活リズムまで含めて詳しく確認します。</p><button class="secondary wide" onclick="SEIBUN.skin.start('deep')">じっくり診断を始める</button></div></details>
      ${selected?`<button class="primary wide main-action-v21" onclick="SEIBUN.render('scan')">この設定で商品をチェック →</button>`:''}
    </section>`;
  };

  K.start = (mode='deep',season=K.currentSeason()) => {
    const questions=K.questionsFor(season);
    const allergy=`<section class="question-block">
      <span class="kicker">REACTION HISTORY</span>
      <h3>化粧品で気になる反応はありますか？</h3>
      <p>分かるものだけで大丈夫です。アレルギー診断ではありません。</p>
      <div class="form-grid">
        ${[
          ['allergy_fragrance','香料・精油で赤み・かゆみ等が出た'],
          ['allergy_preservative','特定の防腐成分で反応した'],
          ['allergy_botanical','植物・発酵由来成分で反応した'],
          ['allergy_past_reaction','化粧品で強い反応が出て使用を中止した']
        ].map(([name,label])=>`<label>${label}<select name="${name}"><option value="unknown">わからない / 該当なし</option><option value="yes">ある</option><option value="no">ない</option></select></label>`).join('')}
        <label class="full">避けている成分（任意）<textarea name="allergy_known" rows="2" placeholder="分かる範囲で入力"></textarea></label>
      </div>
    </section>`;

    S.state.view='diagnosis';
    S.$('app').innerHTML=`<section class="skin-check-v2">
      <div class="skin-check-head-v2">
        <span class="eyebrow">DEEP SKIN CHECK</span>
        <h1>じっくり肌診断</h1>
        <p>${K.seasonLabel(season)}の質問を含めて、今の肌傾向を詳しく整理します。</p>
      </div>
      <div class="season-picker-v4">
        <span>今の季節</span>
        ${SKIN_RESEARCH.seasons.map(([id,label])=>`<button type="button" class="${season===id?'active':''}" onclick="SEIBUN.skin.start('deep','${id}')">${label}</button>`).join('')}
      </div>
      <form id="skinForm" data-mode="deep" class="question-list">
        <input type="hidden" name="season" value="${season}">
        <div class="skin-answer-progress"><div><strong>進み具合</strong><span id="skinProgressText">0 / ${questions.length} 問</span></div><div><i id="skinProgressBar"></i></div></div>
        ${questions.map((q,i)=>`<section class="question-block reveal ${q.seasonal?'season-question':''}">
          <small>${i+1} / ${questions.length}</small><h3>${q.q}</h3>
          <div class="answer-list">${q.opts.map(o=>`<label><input type="radio" name="${q.id}" value="${o[1]}" required><span>${o[0]}</span></label>`).join('')}</div>
        </section>`).join('')}
        ${allergy}
        <div class="sticky-actions"><button type="button" class="secondary" onclick="SEIBUN.back()">戻る</button><button class="primary next-flow-button" type="submit">診断を更新 →</button></div>
      </form>
      <div id="skinComplete"></div>
    </section>`;
    S.updateNavigationUI('diagnosis');
    S.$('skinForm')?.addEventListener('submit',K.submit);
    K.enableProgress(questions.length);
    window.scrollTo({top:0});
    requestAnimationFrame(S.animate);
  };

  K.submit = e => {
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const season=String(fd.get('season')||K.currentSeason());
    const questions=K.questionsFor(season);
    const totals={},max={};
    questions.forEach(q=>{
      totals[q.axis]=(totals[q.axis]||0)+Number(fd.get(q.id)||0);
      max[q.axis]=(max[q.axis]||0)+3;
    });
    const normalized={};
    Object.keys(totals).forEach(k=>normalized[k]=Math.round(totals[k]/max[k]*100));
    const scores={},context={};
    ['dry','oil','sens','pore','tone','firm','rough'].forEach(k=>scores[k]=normalized[k]??0);
    ['stress','sleep','uv','routine'].forEach(k=>{if(k in normalized)context[k]=normalized[k]});

    const allergy={
      fragrance:fd.get('allergy_fragrance')||'unknown',
      preservative:fd.get('allergy_preservative')||'unknown',
      botanical:fd.get('allergy_botanical')||'unknown',
      pastReaction:fd.get('allergy_past_reaction')||'unknown',
      knownText:String(fd.get('allergy_known')||'').trim()
    };
    let concern=S.getConcern();
    if(!concern){
      const top=Object.entries(scores).sort((a,b)=>b[1]-a[1]).find(([k])=>K.concerns.some(c=>c.id===k));
      concern=top?.[0]||'dry';
      S.setConcern(concern);
    }
    const profile={mode:'deep',focusConcern:concern,scores,context,allergy,demographics:{season},research:{},createdAt:new Date().toISOString()};
    S.saveProfile(profile);

    const pending=!!S.state.pendingScanResult;
    const top=K.priorities(profile);
    S.$('skinComplete').innerHTML=`<section class="complete-card-v2">
      <span class="pop-label">UPDATE COMPLETE</span><h2>肌設定を更新しました</h2>
      <p>${top.map(x=>x.title).join('・')}を中心に、商品結果を見直せます。</p>
      <button class="primary next-flow-button" onclick="${pending?'SEIBUN.ocr.showPendingResult()':"SEIBUN.render('skinAnalysis')"}">${pending?'この商品の結果を更新 →':'肌設定を見る →'}</button>
    </section>`;
    S.$('skinComplete')?.scrollIntoView({behavior:'smooth',block:'center'});
  };

  K.startDeepForScan = scanPackage => {
    if(scanPackage)S.state.pendingScanResult=scanPackage;
    const current=S.state.view;
    if(current&&current!=='diagnosis')S.state.navStack.push(current);
    K.start('deep');
  };

  S.views.skinAnalysis = () => {
    const p=S.getProfile();
    if(!p)return `<section class="panel"><h1>肌設定はまだありません</h1>${K.concernPickerHtml('skinAnalysis',true)}</section>`;
    const concern=K.concernMeta(S.getConcern()||p.focusConcern||'dry');
    const priorities=K.priorities(p);
    return `<section class="skin-summary-v2 skin-min-v21">
      <div class="simple-page-title-v21"><span class="eyebrow">MY SETTING</span><h1>今の肌設定</h1></div>
      <section class="focus-card-min-v21"><span>${concern.icon}</span><div><small>今いちばん気になること</small><h2>${concern.label}</h2><p>${concern.text}</p></div></section>
      ${p.mode==='deep'?`<details class="details-v3"><summary>じっくり診断の内容</summary><div class="details-body-v3"><div class="priority-simple-v2">${priorities.map(x=>`<article><b>${x.rank}</b><strong>${x.title}</strong><small>${x.value>=70?'高め':x.value>=45?'やや高め':'軽め'}</small></article>`).join('')}</div></div></details>`:''}
      <button class="primary wide main-action-v21" onclick="SEIBUN.render('scan')">商品をチェックする →</button>
      <button class="text-button" onclick="SEIBUN.render('diagnosis')">設定を変更する</button>
    </section>`;
  };
})();
