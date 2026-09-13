(()=>{
  const S=SEIBUN;
  const I={}; S.ingredients=I;
  I.records=INGREDIENT_DB;
  I.byName=new Map(I.records.map(x=>[x.name,x]));
  I.aliasIndex=[];
  I.records.forEach(ing=>{
    S.unique([ing.name,...(ing.aliases||[]),ing.inci]).forEach(alias=>{
      const key=S.canonical(alias); if(key)I.aliasIndex.push({key,alias,ing});
    });
  });
  I.recByName=new Map(INGREDIENT_RECOMMENDATIONS.map(x=>[x.name,x]));

  I.levenshtein=(a,b)=>{
    if(a===b)return 0; const row=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}
    return row[b.length];
  };
  I.extractRegion=raw=>{
    let text=S.norm(raw).replace(/\r/g,'\n');
    const marker=/(?:全成分|有効成分|その他の成分)\s*[:：]?/i.exec(text); if(marker)text=text.slice(marker.index);
    const stop=/(?:ご?使用上の注意|ご?使用方法|注意事項|販売名|内容量|製造販売元|発売元|お問い合わせ)\s*[:：]?/i.exec(text); if(stop&&stop.index>0)text=text.slice(0,stop.index);
    return text.replace(/(?:全成分|有効成分|その他の成分)\s*[:：]?/ig,'');
  };
  I.tokens=raw=>I.extractRegion(raw).replace(/\n+/g,'、').replace(/[，,;；]/g,'、').split('、').map(x=>x.trim().replace(/^[・●\-\s]+|[・●\-\s]+$/g,'')).filter(Boolean);
  I.findToken=token=>{
    const ct=S.canonical(token); if(!ct)return null;
    const exact=I.aliasIndex.find(x=>x.key===ct); if(exact)return {ing:exact.ing,score:1,type:'exact'};
    if(ct.length<8)return null;
    let best=null, second=0;
    for(const x of I.aliasIndex){if(x.key.length<8||Math.abs(x.key.length-ct.length)>2)continue;const d=I.levenshtein(ct,x.key);const sim=1-d/Math.max(ct.length,x.key.length);if(d<=1&&sim>.87){if(!best||sim>best.score){second=best?.score||second;best={ing:x.ing,score:sim,type:'fuzzy',distance:d}}else if(sim>second)second=sim}}
    if(best&&best.score-second>=.06)return best; return null;
  };
  I.parse=raw=>{
    const found=[],seen=new Set(),unknown=[];
    I.tokens(raw).forEach((token,position)=>{const m=I.findToken(token);if(m&&!seen.has(m.ing.name)){seen.add(m.ing.name);found.push({...m.ing,_position:position,_confidence:m.score,_matchType:m.type})}else if(!m&&token.length>=2&&token.length<70)unknown.push(token)});
    // OCR sometimes removes punctuation. Recover longer exact aliases from the whole text.
    // Longest non-overlapping matches win so "フェノキシエタノール" does not also become "エタノール".
    const whole=S.canonical(I.extractRegion(raw));
    const candidates=[];
    I.aliasIndex.filter(x=>x.key.length>=5).forEach(x=>{let from=0;while(true){const pos=whole.indexOf(x.key,from);if(pos<0)break;candidates.push({...x,start:pos,end:pos+x.key.length});from=pos+1}});
    candidates.sort((a,b)=>(b.key.length-a.key.length)||(a.start-b.start));
    const selected=[];
    candidates.forEach(c=>{if(!selected.some(x=>!(c.end<=x.start||c.start>=x.end)))selected.push(c)});
    selected.sort((a,b)=>a.start-b.start).forEach(x=>{if(!seen.has(x.ing.name)){seen.add(x.ing.name);found.push({...x.ing,_position:999+x.start/100000,_confidence:1,_matchType:'whole'})}});
    return {found:found.sort((a,b)=>a._position-b._position),unknown:S.unique(unknown).slice(0,30)};
  };

  I.needVector=profile=>{
    const sc=profile?.scores||{};
    const vec={dry:(sc.dry??50)/100,oil:(sc.oil??45)/100,reactive:(sc.reactive??sc.sens??40)/100,tone:(sc.tone??35)/100,firm:(sc.firm??35)/100,pore:(sc.pore??sc.oil??40)/100};
    if(profile?.gender==='male'){vec.oil=S.clamp(vec.oil+.05,0,1);vec.pore=S.clamp(vec.pore+.04,0,1)}
    if(profile?.gender==='female'){vec.dry=S.clamp(vec.dry+.03,0,1);vec.firm=S.clamp(vec.firm+.03,0,1)}
    if(['40s','50s','60plus'].includes(profile?.age))vec.firm=S.clamp(vec.firm+.07,0,1);
    if(profile?.age==='teens')vec.oil=S.clamp(vec.oil+.05,0,1);
    return vec;
  };
  I.recommendationScore=(rec,profile)=>{
    const vec=I.needVector(profile);let sum=0,weight=0;
    Object.entries(rec.axes||{}).forEach(([axis,w])=>{sum+=(vec[axis]||0)*w;weight+=w});
    let score=weight?sum/weight:0;
    if(rec.sensitivityPenalty&&vec.reactive>.62)score-=rec.sensitivityPenalty*(vec.reactive-.62);
    return S.clamp(score,0,1);
  };
  I.recommendations=(profile,limit=5)=>INGREDIENT_RECOMMENDATIONS.map(r=>({...r,score:I.recommendationScore(r,profile)})).sort((a,b)=>b.score-a.score).slice(0,limit);
  I.whyRecommended=(rec,profile)=>{
    const vec=I.needVector(profile); const labels={dry:'うるおい不足',oil:'皮脂',reactive:'ゆらぎやすさ',tone:'透明感',firm:'ハリ',pore:'毛穴'};
    const axes=Object.keys(rec.axes||{}).sort((a,b)=>(vec[b]||0)*(rec.axes[b]||0)-(vec[a]||0)*(rec.axes[a]||0)).filter(a=>(vec[a]||0)>.45).slice(0,2);
    return axes.length?`今回のチェックでは「${axes.map(a=>labels[a]).join('・')}」の優先度が高いため候補に入っています。`:'今の肌傾向とのバランスから候補に入っています。';
  };
  I.fallbackAffinity=ing=>{
    const text=[ing.category,...(ing.goals||[])].join(' '); const a={};
    if(/乾燥|保湿|バリア/.test(text))a.dry=.65;
    if(/皮脂|毛穴|角質/.test(text)){a.oil=.55;a.pore=.65}
    if(/美白|くすみ|透明/.test(text))a.tone=.7;
    if(/ハリ|ペプチド|レチノール/.test(text))a.firm=.7;
    if(/肌荒れ|整肌/.test(text))a.reactive=.45;
    return a;
  };
  I.affinityForIngredient=(ing,profile)=>{
    const rec=I.recByName.get(ing.name); if(rec)return I.recommendationScore(rec,profile);
    const axes=I.fallbackAffinity(ing);const keys=Object.keys(axes);if(!keys.length)return .18;
    return I.recommendationScore({axes},profile);
  };
  I.cautionFor=(ing,profile)=>{
    const reactive=I.needVector(profile).reactive;
    if(reactive<.58)return null;
    const text=`${ing.name} ${ing.category}`;
    const targeted= /香料|精油|レチノール|サリチル酸|グリコール酸|乳酸/.test(text) || ing.name==='エタノール';
    if(targeted)return '今の肌傾向では刺激感の有無を確認しながら使いたい成分です。';
    return null;
  };
  I.rateProduct=(found,profile)=>{
    if(!found?.length)return {score:null,stars:null,provisional:true,relevant:[],cautions:[]};
    const rows=found.map((ing,i)=>({ing,aff:I.affinityForIngredient(ing,profile),position:i}));
    const top=rows.filter(x=>x.aff>.25).sort((a,b)=>b.aff-a.aff).slice(0,6);
    const support=top.length?top.reduce((a,x)=>a+x.aff,0)/top.length:.12;
    const positives=top.filter(x=>x.aff>.58).length;
    const cautions=rows.map(x=>({ing:x.ing,text:I.cautionFor(x.ing,profile)})).filter(x=>x.text);
    const penalty=Math.min(10,cautions.length*2.5);
    let score=Math.round(46+support*42+Math.min(6,positives*1.2)-penalty);
    const provisional=found.length<3;
    if(provisional)score=Math.min(score,67);
    score=S.clamp(score,26,92);
    return {score,stars:S.scoreToStars(score),provisional,relevant:top.slice(0,5),cautions:cautions.slice(0,4)};
  };

  I.search=(q='')=>{const key=S.canonical(q);if(!key)return I.records.filter(x=>!x.scanOnly);return I.records.filter(x=>S.canonical([x.name,x.inci,...(x.aliases||[]),x.category,...(x.goals||[])].join(' ')).includes(key))};
  I.detailHtml=name=>{
    const ing=I.byName.get(name); if(!ing)return '<p>成分情報が見つかりませんでした。</p>';
    const rec=I.recByName.get(name); const facts=OFFICIAL_FACTS.filter(f=>(f.ingredientNames||[]).includes(name));
    return `<article class="ingredient-detail"><span class="eyebrow">INGREDIENT</span><h2>${S.escape(ing.name)}</h2>${ing.inci?`<p class="inci">${S.escape(ing.inci)}</p>`:''}<p class="lead">${S.escape(rec?.short||ing.summary)}</p><div class="tag-row">${S.unique([ing.category,...(ing.goals||[])]).slice(0,5).map(x=>`<span>${S.escape(x)}</span>`).join('')}</div>${ing.detail?.role?`<section><h3>どんな成分？</h3><p>${S.escape(ing.detail.role)}</p></section>`:''}${ing.detail?.skin?`<section><h3>肌との関わり</h3><p>${S.escape(ing.detail.skin)}</p></section>`:''}${ing.caution||rec?.caution?`<section class="soft-note"><h3>知っておきたいこと</h3><p>${S.escape(rec?.caution||ing.caution)}</p></section>`:''}${facts.length?`<section><h3>メーカー公式情報</h3>${facts.map(f=>`<p><strong>${S.escape(f.company)}｜${S.escape(f.displayName)}</strong><br>${S.escape(f.summary)}</p>`).join('')}</section>`:''}<p class="disclaimer-mini">成分単体で商品の効果・安全性を断定するものではありません。製品全体の処方や使用方法も合わせて確認してください。</p></article>`;
  };
})();
