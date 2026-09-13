// SEIBUN v1.0 — ingredient dictionary, parsing and match logic
(() => {
  const S = SEIBUN;
  const I = {};
  S.ingredients = I;

  const scanMap = new Map();
  INGREDIENTS.forEach(x => scanMap.set(x.name, x));
  SCAN_LEXICON_ENTRIES.forEach(x => {
    if (!scanMap.has(x.name)) {
      scanMap.set(x.name, {
        name:x.name, aliases:[], inci:'', category:x.category||'名称辞書',
        goals:[], summary:'成分名を読み取るための名称辞書に登録されています。',
        caution:'詳細情報は確認中です。', scanOnly:true
      });
    }
  });
  I.records = [...scanMap.values()];
  I.companyFacts = typeof OFFICIAL_COMPANY_FACTS_V110!=='undefined' ? OFFICIAL_COMPANY_FACTS_V110 : [];
  I.factsForIngredient = (name) => I.companyFacts.filter(f=>(f.ingredientNames||[]).includes(name));

  I.aliases = (ing) => [ing.name, ...(ing.aliases||[]), ing.inci].filter(Boolean);

  I.index = [];
  I.records.forEach(ing => {
    const aliases=I.aliases(ing);
    aliases.forEach((alias,aliasIndex) => {
      const key=S.canonical(alias);
      if(!key)return;
      const aliasType=aliasIndex===0?'display':(ing.inci&&alias===ing.inci?'inci':'alias');
      I.index.push({key,ing,alias,aliasType});
    });
  });

  I.levenshtein = (a,b) => {
    if(a===b)return 0;
    if(!a.length)return b.length;
    if(!b.length)return a.length;
    const v=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      let prev=v[0]; v[0]=i;
      for(let j=1;j<=b.length;j++){
        const old=v[j];
        v[j]=Math.min(v[j]+1,v[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));
        prev=old;
      }
    }
    return v[b.length];
  };

  I.extractRegion = (raw) => {
    const text = S.norm(raw).replace(/\r/g,'\n');
    const marker=/(?:\[?\s*全成分\s*\]?|有効成分|その他の成分|その他成分)\s*[:：]?/i;
    const m=marker.exec(text);
    let body=m?text.slice(m.index):text;
    const stop=/(?:ご?使用上の注意|ご?使用方法|注意事項|販売名|内容量|製造販売元|発売元|お問い合わせ)\s*[:：]?/i.exec(body);
    if(stop&&stop.index>0) body=body.slice(0,stop.index);
    return body.replace(/(?:\[?\s*全成分\s*\]?|有効成分|その他の成分|その他成分)\s*[:：]?/ig,'');
  };

  I.tokens = (raw) => I.extractRegion(raw)
    .replace(/\n+/g,'')
    .replace(/[，,]/g,'、')
    .replace(/[;；]/g,'、')
    .split('、')
    .map(x=>x.trim().replace(/^[・●\-\s]+|[・●\-\s]+$/g,''))
    .filter(Boolean);

  I.bestToken = (token) => {
    const ct=S.canonical(token);
    if(!ct)return null;

    let best=null,bestScore=0,secondScore=0;
    const update=(candidate,score)=>{
      if(score>bestScore){
        secondScore=bestScore;
        best=candidate;
        bestScore=score;
      }else if(score>secondScore){
        secondScore=score;
      }
    };

    for(const item of I.index){
      const ca=item.key;

      if(ct===ca){
        return {
          ing:item.ing,score:1,
          type:item.aliasType==='display'?'exact':item.aliasType,
          matchedAlias:item.alias,
          margin:1
        };
      }

      // Conservative containment matching. Short partial matches are not accepted.
      if(ct.length>=6&&ca.length>=6&&(ct.includes(ca)||ca.includes(ct))){
        const score=Math.min(ct.length,ca.length)/Math.max(ct.length,ca.length);
        if(score>=.90){
          update({
            ing:item.ing,score,type:'normalized',
            matchedAlias:item.alias
          },score);
        }
        continue;
      }

      // Fuzzy OCR correction is intentionally strict. Ambiguous candidates are discarded.
      if(ct.length>=8&&ca.length>=8&&Math.abs(ct.length-ca.length)<=3){
        const distance=I.levenshtein(ct,ca);
        const sim=1-distance/Math.max(ct.length,ca.length);
        const tokenLength=Math.max(ct.length,ca.length);
        const threshold=tokenLength>=18?.89:.88;
        if((distance===1&&tokenLength>=8)||sim>=threshold){
          update({
            ing:item.ing,score:sim,type:'fuzzy',
            matchedAlias:item.alias,distance,
            tokenLength
          },sim);
        }
      }
    }

    if(!best)return null;
    const margin=bestScore-secondScore;
    if(best.type==='fuzzy'){
      const oneCharCorrection=best.distance===1&&best.tokenLength>=8&&margin>=.08;
      const veryHighSimilarity=best.score>=.94&&margin>=.055;
      if(!oneCharCorrection&&!veryHighSimilarity)return null;
    }
    if(best.type==='normalized'&&margin<.035)return null;
    return {...best,margin};
  };

  // Longest exact matches are selected first to avoid nested false positives.
  I.globalExact = (raw) => {
    const text=S.canonical(I.extractRegion(raw));
    if(!text)return [];
    const candidates=[];
    for(const item of I.index){
      if(item.key.length<3)continue;
      let from=0;
      while(true){
        const pos=text.indexOf(item.key,from);
        if(pos<0)break;
        candidates.push({
          ing:item.ing,start:pos,end:pos+item.key.length,len:item.key.length,
          alias:item.alias,aliasType:item.aliasType
        });
        from=pos+1;
      }
    }
    candidates.sort((a,b)=>b.len-a.len||a.start-b.start);
    const selected=[];
    for(const c of candidates){
      if(!selected.some(x=>!(c.end<=x.start||c.start>=x.end))) selected.push(c);
    }
    selected.sort((a,b)=>a.start-b.start);
    const seen=new Set();
    return selected.filter(x=>{
      if(seen.has(x.ing.name))return false;
      seen.add(x.ing.name);return true;
    }).map(x=>({
      ...x.ing,
      _confidence:1,
      _position:x.start,
      _matchType:x.aliasType==='display'?'exact':x.aliasType,
      _matchedAlias:x.alias
    }));
  };

  I.likelyUnknown = (text) => {
    if(!text||text.length<2||text.length>80)return false;
    if(/^(全成分|有効成分|その他の成分|ご使用|使用方法|注意|内容量|発売元|製造販売元)/.test(text))return false;
    if(/https?:|www\.|株式会社|東京都|MADE|JAPAN/i.test(text))return false;
    return /[ァ-ヶ一-龠A-Za-z0-9]/.test(text);
  };

  I.parse = (raw) => {
    const exact=I.globalExact(raw);
    const found=[...exact];
    const seen=new Set(found.map(x=>x.name));
    const unknown=[],unknownSeen=new Set();
    let rejectedAmbiguous=0;

    I.tokens(raw).forEach(token=>{
      const m=I.bestToken(token);
      const trusted=m && (
        m.type==='exact' || m.type==='alias' || m.type==='inci' ||
        (m.type==='normalized'&&m.score>=.90&&m.margin>=.035) ||
        (m.type==='fuzzy'&&(
          (m.distance===1&&m.tokenLength>=8&&m.margin>=.08) ||
          (m.score>=.94&&m.margin>=.055)
        ))
      );

      if(trusted){
        if(!seen.has(m.ing.name)){
          seen.add(m.ing.name);
          found.push({
            ...m.ing,
            _confidence:m.score,
            _rawToken:token,
            _matchType:m.type,
            _matchedAlias:m.matchedAlias,
            _matchMargin:m.margin
          });
        }
      }else{
        const clean=token.replace(/^[\[【(（]+|[\]】)）]+$/g,'').trim();
        if(m)rejectedAmbiguous++;
        if(I.likelyUnknown(clean)&&!unknownSeen.has(clean)){
          unknownSeen.add(clean);unknown.push(clean);
        }
      }
    });

    found.sort((a,b)=>(a._position??999999)-(b._position??999999));
    const avgConfidence=found.length?found.reduce((a,x)=>a+(x._confidence??1),0)/found.length:0;
    const matchStats={
      exact:found.filter(x=>x._matchType==='exact').length,
      alias:found.filter(x=>x._matchType==='alias'||x._matchType==='inci').length,
      normalized:found.filter(x=>x._matchType==='normalized').length,
      fuzzy:found.filter(x=>x._matchType==='fuzzy').length,
      rejectedAmbiguous
    };
    return {found,unknown,avgConfidence,matchStats,rejectedAmbiguous};
  };

  I.weight = (ing) => {
    const lookup=(ing?.baseName||ing?.name||'');
    const a=(typeof INGREDIENT_WEIGHTS!=='undefined'&&INGREDIENT_WEIGHTS[lookup])||{};
    const b=(typeof INGREDIENT_WEIGHTS_V06!=='undefined'&&INGREDIENT_WEIGHTS_V06[lookup])||{};
    const c=(typeof INGREDIENT_WEIGHTS_V110!=='undefined'&&INGREDIENT_WEIGHTS_V110[lookup])||{};
    const merged={...a,...b,...c};
    return Object.keys(merged).length?merged:null;
  };

  I.broadCategory = (ing) => {
    const c=ing.category||'', n=ing.name||'';
    if(/保湿|基剤/.test(c))return '保湿・基剤';
    if(/油性|エモリエント|シリコーン/.test(c))return '油性・エモリエント';
    if(/ビタミン|美白|整肌|抗酸化|ペプチド|アミノ酸|タンパク|有効成分/.test(c))return '整肌・美容成分';
    if(/植物|発酵|海藻/.test(c))return '植物・発酵';
    if(/界面活性|乳化/.test(c))return '乳化・界面活性';
    if(/防腐|pH|キレート/.test(c))return '防腐・pH調整';
    if(/増粘|安定化|皮膜/.test(c))return '増粘・安定化';
    if(/精油|香料/.test(c)||n==='香料')return '香料・精油';
    if(/紫外線|粉体|色材/.test(c))return 'UV・粉体';
    return 'その他';
  };

  I.roleCode = (ing) => {
    if(ing?.v06?.roleCode)return ing.v06.roleCode;
    const c=ing?.category||'', n=ing?.name||'';
    if(/防腐/.test(c))return 'preservative';
    if(/pH/.test(c))return 'ph_adjuster';
    if(/乳化|界面活性/.test(c))return 'emulsifier';
    if(/増粘|ゲル/.test(c))return 'thickener';
    if(/精油|香料/.test(c)||n==='香料')return 'fragrance_oil';
    if(/シリコーン/.test(c))return 'silicone';
    if(/エモリエント|油性|植物油/.test(c))return /植物/.test(c)?'emollient_botanical':'emollient';
    if(/ビタミンC/.test(c))return 'vitamin_c';
    if(/ペプチド/.test(c))return 'peptide';
    if(/角質/.test(c)||['サリチル酸','グリコール酸','乳酸','マンデル酸'].includes(n))return 'exfoliant';
    if(/保湿/.test(c))return 'humectant';
    return null;
  };

  I.roleGuide = (ing) => {
    const code=I.roleCode(ing);
    return code&&typeof ROLE_GUIDES_V06!=='undefined'?ROLE_GUIDES_V06[code]:null;
  };

  I.detailLevel = (ing) => {
    if(ing?.v06?.detailLevel!=null)return ing.v06.detailLevel;
    if(ing?.scanOnly)return 0;
    return 2;
  };

  I.evidenceInfo = (ing) => {
    if(!ing)return {level:0,label:'名称のみ',tone:'soft'};
    if(ing.scanOnly||I.detailLevel(ing)===0)return {level:0,label:'名称辞書のみ',tone:'soft'};

    const sources=ing.sources||[];
    const manufacturer=sources.some(x=>/メーカー公式|公式/.test(`${x.role||''} ${x.label||''}`))
      || /メーカー公式情報確認済み/.test(ing.status||'');
    if(manufacturer)return {level:3,label:'メーカー公式確認',tone:'lime'};

    const registry=sources.some(x=>/日本化粧品工業会|JCIA|CosIng|厚生労働省|PMDA/i.test(`${x.label||''} ${x.role||''}`));
    if(registry||/確認済み|一次情報/.test(ing.status||''))return {level:2,label:'一次情報・公的DB確認',tone:'mint'};

    return {level:1,label:'一般情報',tone:'soft'};
  };

  I.scoreEligible = (ing) => {
    const evidence=I.evidenceInfo(ing);
    const confidence=ing?._confidence??1;
    if(!I.weight(ing))return false;
    if(evidence.level<2)return false;
    if(confidence<.90)return false;
    if(ing?._matchType==='fuzzy'&&confidence<.87)return false;
    return true;
  };

  I.attention = (ing,profile=S.getProfile()) => {
    const meta=ing?.v06?.attention||'';
    const w=I.weight(ing)||{};
    const sens=profile?.scores?.sens||0;
    if(meta==='刺激注意'||(w.sensRisk||0)>=.45)return {kind:'caution',label:'刺激は確認'};
    if(meta==='反応歴確認'||/香料|精油/.test(ing?.category||''))return {kind:'history',label:'反応歴を確認'};
    if(meta==='処方依存')return {kind:'formula',label:'処方で変わる'};
    if(meta==='個人差')return {kind:'individual',label:'個人差'};
    if(sens>=65&&(w.sensRisk||0)>=.2)return {kind:'caution',label:'敏感時は確認'};
    return {kind:'normal',label:'一般的な処方成分'};
  };

  I.fit = (ing,profile=S.getProfile()) => {
    if(!profile)return null;
    const w=I.weight(ing);
    if(!w)return null;
    let sum=0,denom=0,matches=[];
    Object.entries(w).forEach(([axis,weight])=>{
      if(axis==='sensRisk'||weight<=0)return;
      const val=profile.scores?.[axis];
      if(val==null)return;
      sum+=val*weight;denom+=weight;
      if(val>=40)matches.push({axis,weight,value:val,contribution:val*weight});
    });
    let fit=denom?sum/denom:0;
    const risk=(w.sensRisk||0)*(profile.scores?.sens||0);
    fit-=risk*.42;
    return {fit:S.clamp(Math.round(fit),0,100),risk:Math.round(risk),matches};
  };

  I.allergyMatches = (found,profile=S.getProfile()) => {
    const a=profile?.allergy||{}, hits=[], seen=new Set();
    const add=(ing,reason)=>{
      const key=ing.name+'|'+reason;
      if(!seen.has(key)){seen.add(key);hits.push({ing,reason})}
    };
    const tokens=String(a.knownText||'').split(/[、,\n;；]+/).map(S.canonical).filter(x=>x.length>=2);
    found.forEach(ing=>{
      const names=I.aliases(ing).map(S.canonical);
      tokens.forEach(t=>{
        if(names.some(n=>n===t||(t.length>=3&&(n.includes(t)||t.includes(n)))))add(ing,'登録した回避成分と名称が一致');
      });
      const c=ing.category||'';
      if(a.fragrance==='yes'&&(/香料|精油/.test(c)||ing.name==='香料'))add(ing,'香料・精油の反応歴と同カテゴリ');
      if(a.preservative==='yes'&&/防腐/.test(c))add(ing,'防腐成分の反応歴と同カテゴリ');
      if(a.botanical==='yes'&&/植物|発酵|海藻/.test(c))add(ing,'植物・発酵由来の反応歴と同カテゴリ');
    });
    return {hits,pastReaction:a.pastReaction==='yes'};
  };

  I.productAnalysis = (found,profile=S.getProfile(),meta={}) => {
    const eligible=found.filter(I.scoreEligible);
    const scorable=eligible.map(ing=>({ing,res:I.fit(ing,profile)})).filter(x=>x.res);
    const excludedFromScore=found.filter(ing=>I.weight(ing)&&!I.scoreEligible(ing));
    const evidenceConfirmed=found.filter(ing=>I.evidenceInfo(ing).level>=2);
    const approximateCount=found.filter(ing=>ing.familyApprox).length;
    const inputScope=meta?.inputScope||'full';

    const useful=scorable.filter(x=>x.res.fit>=35).sort((a,b)=>b.res.fit-a.res.fit);
    const top=useful.slice(0,6);
    const top3=useful.slice(0,3);

    const allAvg=scorable.length
      ? scorable.reduce((a,x)=>a+x.res.fit,0)/scorable.length
      : 0;
    const topAvg=top3.length
      ? top3.reduce((a,x)=>a+x.res.fit,0)/top3.length
      : allAvg;

    const risks=scorable.filter(x=>
      (I.weight(x.ing)?.sensRisk||0)>0 &&
      (profile?.scores?.sens||0)>=55
    );

    // Matching score and data reliability are intentionally separated.
    // Data coverage never lowers a displayed matching score.
    const riskPenalty=Math.min(10,risks.reduce((a,x)=>a+x.res.risk/22,0));
    const coverage=found.length?scorable.length/found.length:0;
    const evidenceCoverage=found.length?evidenceConfirmed.length/found.length:0;
    const avgMatchConfidence=found.length
      ? found.reduce((a,x)=>a+(x._confidence??1),0)/found.length
      : 0;
    const ocrConfidence=Number.isFinite(meta?.avgOcrConfidence)
      ? meta.avgOcrConfidence
      : null;
    const recognitionQuality=ocrConfidence==null
      ? avgMatchConfidence
      : (avgMatchConfidence*.60)+(ocrConfidence*.40);

    const scoreCoverageQuality=S.clamp(coverage/.50,0,1);
    const evidenceQuality=S.clamp(evidenceCoverage,0,1);
    const sampleQuality=S.clamp(scorable.length/8,0,1);

    // When OCR metadata exists, OCR quality has a visible effect on reliability.
    // For manual/saved ingredient lists, the unused OCR weight is redistributed.
    const confidenceBase=ocrConfidence==null
      ? 100*(
          evidenceQuality*.35 +
          scoreCoverageQuality*.25 +
          avgMatchConfidence*.25 +
          sampleQuality*.15
        )
      : 100*(
          evidenceQuality*.25 +
          scoreCoverageQuality*.15 +
          avgMatchConfidence*.15 +
          ocrConfidence*.30 +
          sampleQuality*.15
        );
    let readinessFactor=scorable.length<3?.45:scorable.length<5?.75:1;
    const approximationPenalty=found.length?Math.round((approximateCount/found.length)*18):0;
    if(coverage<.08)readinessFactor*=.75;
    const confidenceScore=S.clamp(Math.round((confidenceBase*readinessFactor)-approximationPenalty),0,95);

    const confidenceLabel=
      confidenceScore>=80?'高い':
      confidenceScore>=60?'中程度':
      confidenceScore>=40?'低め':'データ不足';

    // Hide the matching score when its supporting information is insufficient.
    // Do not punish the match score itself for missing data.
    const enoughData=inputScope==='active_only'
      ? scorable.length>=1 && confidenceScore>=45
      : scorable.length>=3 && (coverage>=0.10 || scorable.length>=6) && confidenceScore>=50;

    // Calibrated matching score:
    // - typical usable products should often land around 55–70
    // - strong purpose alignment can reach the 80s
    // - weak alignment can fall into the 30s/40s
    // - evidence/coverage quality does NOT reduce the score; it affects confidence instead
    let score=null;
    if(profile&&enoughData){
      const coreMatch=(allAvg*.58)+(topAvg*.42);
      const strongSupport=useful.filter(x=>x.res.fit>=65).length;
      const supportBonus=Math.min(8,strongSupport*1.5);
      const raw=25+(coreMatch*.65)+supportBonus-riskPenalty;
      score=S.clamp(Math.round(raw),25,92);
    }

    const allergy=I.allergyMatches(found,profile);
    const allergyNames=new Set(allergy.hits.map(x=>x.ing.name));
    const concerns=[];
    const positives=[];

    scorable.forEach(x=>{
      const att=I.attention(x.ing,profile);
      const weight=I.weight(x.ing)||{};
      const reasons=[];
      if(allergyNames.has(x.ing.name))reasons.push('登録した反応歴と一致');
      if(att.kind==='caution')reasons.push('敏感傾向では確認したい');
      if(att.kind==='history')reasons.push('過去の反応歴を確認したい');
      if((weight.sensRisk||0)>0 && (profile?.scores?.sens||0)>=55)reasons.push('敏感傾向では刺激感を確認');
      if(x.res.fit<30 && (x.ing.goals||[]).length)reasons.push('今の優先目的との一致は低め');

      if(reasons.length){
        concerns.push({...x,reasons:[...new Set(reasons)]});
      }else if(x.res.fit>=55){
        positives.push({...x,reasons:['今の優先目的との一致が比較的高い']});
      }
    });

    positives.sort((a,b)=>b.res.fit-a.res.fit);
    concerns.sort((a,b)=>{
      const aa=allergyNames.has(a.ing.name)?1:0;
      const bb=allergyNames.has(b.ing.name)?1:0;
      return bb-aa || (b.res.risk||0)-(a.res.risk||0) || a.res.fit-b.res.fit;
    });

    const categories={};
    found.forEach(x=>{
      const c=I.broadCategory(x);
      categories[c]=(categories[c]||0)+1;
    });

    return {
      score,
      confidenceScore,confidenceLabel,
      scorable,useful,top,risks,categories,
      coverage,evidenceCoverage,avgMatchConfidence,ocrConfidence,recognitionQuality,enoughData,
      excludedFromScore,evidenceConfirmed,
      positives:positives.slice(0,6),
      concerns:concerns.slice(0,8),
      allergy
    };
  };

  I.recommendationBand = (analysis) => {
    const a=analysis||{};
    if(a.score==null)return {
      key:'hold',label:'おすすめ判定は保留',short:'データ不足',
      detail:'おすすめ目安を出せるだけの判定材料がまだ十分ではありません。撮り直しや成分の手動確認を優先してください。'
    };
    if((a.allergy?.hits||[]).length)return {
      key:'caution',label:'点数より反応歴を優先',short:'要確認',
      detail:'登録した反応歴と一致する情報があります。おすすめ判定より先に、その成分と商品表示を確認してください。'
    };
    if((a.confidenceScore||0)<60)return {
      key:'hold',label:'おすすめ判定は保留',short:'信頼度を確認',
      detail:'おすすめ目安は参考にできますが、判定の信頼度が低めです。成分表示を確認・修正すると判断しやすくなります。'
    };
    if(a.score>=80)return {
      key:'strong',label:'かなりおすすめ候補',short:'★★★★★',
      detail:'今の肌目的との一致がかなり高い範囲です。使用感・価格・反応歴も合わせて候補にできます。'
    };
    if(a.score>=65)return {
      key:'recommend',label:'おすすめ候補',short:'★★★★☆',
      detail:'SEIBUN眼鏡では、信頼度60%以上かつ星4以上を「おすすめ候補」の目安にします。'
    };
    if(a.score>=50)return {
      key:'compare',label:'比較しながら選びたい',short:'★★★☆☆',
      detail:'合っている要素はありますが、今の肌目的により合う商品がないか比較するのがおすすめです。'
    };
    return {
      key:'low',label:'別の候補も見てみたい',short:'★〜★★☆☆☆',
      detail:'悪い商品という意味ではありません。今の肌目的との一致が低めなので、別の成分構成も比較すると選びやすくなります。'
    };
  };

  I.recommendationIngredients = (found,profile=S.getProfile(),limit=4) => {
    if(!profile)return [];
    const present=new Set((found||[]).map(x=>x.name));
    const axisLabels=S.skin?.axisLabels||{
      dry:'乾燥',oil:'皮脂',sens:'敏感傾向',pore:'毛穴',tone:'シミ・くすみ',firm:'ハリ',rough:'肌荒れ'
    };
    const prioritizedAxes=Object.entries(profile.scores||{})
      .filter(([axis,value])=>value>=40&&axis!=='sens')
      .sort((a,b)=>b[1]-a[1])
      .slice(0,5);
    const usefulRoles=new Set(['humectant','emollient','peptide','brightening_active','botanical_extract','vitamin_c','exfoliant']);

    const candidates=INGREDIENTS.map(ing=>{
      if(!ing||present.has(ing.name)||ing.scanOnly)return null;
      if(I.evidenceInfo(ing).level<2)return null;
      const weight=I.weight(ing);if(!weight)return null;
      const role=I.roleCode(ing);
      if(!(ing.goals||[]).length&&!usefulRoles.has(role))return null;
      const att=I.attention(ing,profile);
      if(att.kind==='caution'||att.kind==='history')return null;
      if(I.allergyMatches([ing],profile).hits.length)return null;
      const res=I.fit(ing,profile);if(!res||res.fit<55)return null;

      const axisMatches=prioritizedAxes
        .filter(([axis])=>(weight[axis]||0)>0)
        .map(([axis,value])=>({axis,value,weight:weight[axis],impact:value*weight[axis]}))
        .sort((a,b)=>b.impact-a.impact);
      if(!axisMatches.length)return null;
      const main=axisMatches[0];
      const guide=I.roleGuide(ing);
      const roleText=(guide?.label||ing.category||'整肌成分').replace(/・/g,' / ');
      return {
        ing,res,axis:main.axis,axisLabel:axisLabels[main.axis]||main.axis,
        roleText,
        rankScore:res.fit+(main.value*.18)+(I.evidenceInfo(ing).level*3)
      };
    }).filter(Boolean).sort((a,b)=>b.rankScore-a.rankScore);

    const selected=[],axisCount={};
    for(const item of candidates){
      if(selected.length>=limit)break;
      if((axisCount[item.axis]||0)>=2)continue;
      selected.push(item);
      axisCount[item.axis]=(axisCount[item.axis]||0)+1;
    }
    return selected;
  };

  I.recommendationDisplayName = ing => {
    const fact=I.factsForIngredient?.(ing.name)?.[0];
    return fact?.displayName||ing.name;
  };

  I.recommendationIngredientsHtml = (items=[]) => items.map(item=>`
    <button class="next-ingredient-card" onclick="showIngredient('${S.escape(item.ing.name)}')">
      <span class="next-ingredient-icon">＋</span>
      <span class="next-ingredient-copy">
        <small>${S.escape(item.axisLabel)}を意識する候補</small>
        <strong>${S.escape(I.recommendationDisplayName(item.ing))}</strong>
        <p>${S.escape(item.roleText)} / タップして成分辞典へ</p>
      </span>
      <b>›</b>
    </button>`).join('');

  I.everydayTags = (ing) => {
    const tags=[];
    const goals=(ing?.goals||[]);
    if(goals.includes('乾燥'))tags.push('保湿');
    if(goals.includes('美白')||goals.includes('くすみ'))tags.push('透明感');
    if(goals.includes('ハリ'))tags.push('ハリ');
    if(goals.includes('毛穴')||goals.includes('角質'))tags.push('毛穴');
    if(goals.includes('肌荒れ'))tags.push('肌荒れ');
    if(/ビタミンC/.test(`${ing?.name||''} ${ing?.category||''}`)&&!tags.includes('透明感'))tags.push('ビタミンC系');
    if(/セラミド|ヒアルロン酸|グリセリン|スクワラン|ワセリン/.test(ing?.name||'')&&!tags.includes('保湿'))tags.push('保湿');
    return tags.slice(0,3);
  };
  I.everydayTagsHtml = (ing) => I.everydayTags(ing).map(x=>S.tag(x,'mint')).join('');

  // Public rating is intentionally simpler than the internal 100-point model.
  // If only a small amount of scorable information exists, show a provisional star guide
  // rather than exposing an expert-facing "confidence / hold" state.
  I.displayRating = (analysis) => {
    const a=analysis||{};
    if(a.score!=null)return {score:a.score,provisional:false,hasRating:true};
    if((a.scorable||[]).length){
      const avg=Math.round(a.scorable.reduce((sum,x)=>sum+(x.res?.fit||0),0)/a.scorable.length);
      return {score:S.clamp(avg,35,79),provisional:true,hasRating:true};
    }
    return {score:null,provisional:false,hasRating:false};
  };

  I.publicBand = (score,provisional=false,allergyHits=[]) => {
    if(allergyHits?.length)return {key:'caution',label:'成分表示を先に確認',detail:'登録した反応歴と重なる成分があります。星より先に、その成分と商品表示を確認してください。'};
    if(score==null)return {key:'hold',label:'もう一度撮ると結果が出しやすい',detail:'成分表の読み取りが少ないため、全体が入るように撮り直すか、テキスト入力を使ってください。'};
    const prefix=provisional?'暫定：':'';
    if(score>=80)return {key:'strong',label:`${prefix}かなりおすすめ候補`,detail:provisional?'読み取れた成分の一部からみた暫定目安です。全成分が読めるとより詳しく確認できます。':'今の悩みとの方向性がかなり合いやすい範囲です。使用感や商品表示も合わせて判断してください。'};
    if(score>=65)return {key:'recommend',label:`${prefix}おすすめ候補`,detail:provisional?'読み取れた成分の一部からみた暫定目安です。':'今の悩みとの方向性が比較的合いやすい範囲です。'};
    if(score>=50)return {key:'compare',label:`${prefix}比較しながら選ぶ`,detail:'合っている要素はあります。気になる点と次に見たい成分を一緒に比較してください。'};
    return {key:'low',label:`${prefix}別候補も比較`,detail:'悪い商品という意味ではありません。今の悩みでは、別の成分構成も比べると選びやすくなります。'};
  };

  I.categoryBars = (categories) => {
    const entries=Object.entries(categories).sort((a,b)=>b[1]-a[1]);
    const max=Math.max(1,...entries.map(x=>x[1]));
    return `<div class="category-bars">${entries.map(([name,count])=>`
      <div class="category-line"><div><strong>${name}</strong><small>${count}</small></div><span><i style="width:${Math.round(count/max*100)}%"></i></span></div>
    `).join('')}</div>`;
  };

  I.shortRole = (ing) => {
    const specific=INGREDIENT_DETAIL_OVERRIDES?.[ing.name];
    const guide=I.roleGuide(ing);
    const text=specific?.role||guide?.role||ing.summary||'化粧品の処方を支える成分です。';
    return text.split('。')[0]+'。';
  };

  I.showDetail = (name) => {
    const ing=I.records.find(x=>x.name===name);
    if(!ing)return;
    S.state.selectedIngredient=ing.name;
    S.render('ingredientDetail');
  };

  S.views.ingredientDetail = () => {
    const name=S.state.selectedIngredient;
    const ing=I.records.find(x=>x.name===name);
    if(!ing)return S.empty('成分が見つかりません','成分辞典からもう一度選んでください。','<button class="primary" onclick="SEIBUN.render(\'ingredients\')">成分辞典へ</button>');
    const profile=S.getProfile();
    const fit=I.fit(ing,profile);
    const att=I.attention(ing,profile);
    const role=I.roleGuide(ing);
    const broad=I.broadCategory(ing);
    const generic=CATEGORY_INGREDIENT_GUIDES?.[broad]||CATEGORY_INGREDIENT_GUIDES?.その他||{};
    const specific=INGREDIENT_DETAIL_OVERRIDES?.[ing.name]||{};
    const sources=ing.sources||[];

    return `<section class="ingredient-detail-min-v21">
      <button class="text-button back-inline-v21" onclick="SEIBUN.render('ingredients')">‹ 成分辞典</button>
      <div class="ingredient-detail-top-v21"><span class="eyebrow">INGREDIENT</span><h1>${S.escape(ing.name)}</h1><div class="pills">${I.everydayTagsHtml(ing)}</div><p>${S.escape(I.shortRole(ing))}</p>${fit?`<div class="ingredient-fit-min-v21"><small>今の悩みとの関連</small>${S.starsInline(fit.fit)}</div>`:''}</div>
      <details class="details-v3"><summary>もう少し詳しく</summary><div class="details-body-v3"><h3>どんな役割？</h3><p>${specific.role||role?.role||generic.role||ing.summary}</p><h3>気をつけること</h3><p>${specific.irritation||role?.irritation||generic.irritation||ing.caution}</p></div></details>
      <details class="details-v3"><summary>名称・根拠情報</summary><div class="details-body-v3"><dl class="meta"><dt>INCI / 別名</dt><dd>${S.escape([ing.inci,...(ing.aliases||[])].filter(Boolean).join(' / ')||'確認中')}</dd><dt>分類</dt><dd>${S.escape(ing.category||broad)}</dd></dl>${sources.length?`<div class="sources">${sources.map(src=>`<a href="${src.url}" target="_blank" rel="noopener">${S.escape(src.label)}</a>`).join('')}</div>`:''}</div></details>
      <button class="primary wide main-action-v21" onclick="SEIBUN.render('scan')">商品をチェックする →</button>
    </section>`;
  };

  I.showCompanyFact = (id) => {
    const fact=I.companyFacts.find(x=>x.id===id);if(!fact)return;
    S.openDialog(`<div class="company-fact-detail">
      <span class="sticker mint">OFFICIAL SOURCE</span>
      <h2>${S.escape(fact.displayName)}</h2>
      <div class="company-fact-meta"><span>${S.escape(fact.company)}</span><span>${S.escape(fact.relation)}</span><span>${S.escape(fact.type)}</span></div>
      <p class="company-fact-summary">${S.escape(fact.summary)}</p>
      <dl class="meta">
        <dt>実成分 / 構成</dt><dd>${S.escape(fact.actual)}</dd>
        <dt>関連成分</dt><dd>${S.escape((fact.ingredientNames||[]).join('、'))}</dd>
      </dl>
      <div class="official-source-box">
        <strong>確認した一次情報</strong>
        <a href="${fact.source.url}" target="_blank" rel="noopener">${S.escape(fact.source.label)} ↗</a>
        <small>メーカー公式ページに書かれている範囲だけを掲載しています。</small>
      </div>
      <div class="note">メーカー独自の複合名・技術名は、化粧品の全成分表示にそのまま載る「1成分」とは限りません。構成成分が公式に明示されている場合は分けて表示します。</div>
    </div>`);
  };

  I.factCards = (query='') => {
    const q=query.toLowerCase().trim();
    const facts=I.companyFacts.filter(f=>{
      const text=`${f.displayName} ${f.company} ${f.relation} ${f.type} ${f.actual} ${(f.ingredientNames||[]).join(' ')}`.toLowerCase();
      return !q||text.includes(q);
    });
    return facts.length?facts.map(f=>`<button class="company-fact-row" onclick="SEIBUN.ingredients.showCompanyFact('${f.id}')">
      <span class="company-logo-dot">${S.escape(f.company.slice(0,1))}</span>
      <span><small>${S.escape(f.company)} ・ ${S.escape(f.relation)}</small><strong>${S.escape(f.displayName)}</strong><p>${S.escape(f.type)} / ${S.escape(f.actual)}</p></span>
      <b>›</b>
    </button>`).join(''):`<div class="muted-small">検索条件に一致するメーカー公式情報はありません。</div>`;
  };

  window.showIngredient = (name) => I.showDetail(name);

  I.listLimit=60;
  I.listHtml = (items,query='') => {
    const limit=query.trim()?Math.max(80,I.listLimit):I.listLimit;
    const shown=items.slice(0,limit);
    const more=items.length>shown.length
      ? `<button class="load-more" onclick="SEIBUN.ingredients.loadMore()">さらに表示（残り${items.length-shown.length}）</button>`
      : '';
    return I.cards(shown)+more;
  };
  I.loadMore = () => {
    I.listLimit+=60;
    I.refreshList();
  };

  S.views.ingredients = () => {
    const q='';
    const filters=['すべて','乾燥','肌荒れ','毛穴','くすみ','ハリ','角質'];
    return `<section class="ingredients-min-v21">
      <div class="simple-page-title-v21"><span class="eyebrow">DICTIONARY</span><h1>成分辞典</h1><p>名前か目的で検索できます。</p></div>
      <div class="search-wrap search-min-v21"><input id="ingredientSearch" placeholder="成分名・保湿・毛穴など" oninput="SEIBUN.ingredients.refreshList()"></div>
      <div class="chips chips-min-v21">${filters.map(x=>`<button class="${S.state.currentFilter===x?'active':''}" onclick="SEIBUN.state.currentFilter='${x}';SEIBUN.ingredients.listLimit=60;SEIBUN.ingredients.refreshList()">${x}</button>`).join('')}</div>
      <div id="ingredientList" class="ingredient-list ingredient-list-v2">${I.listHtml(I.filter(q),q)}</div>
      <details class="details-v3 official-facts-section"><summary>メーカー公式情報</summary><div class="details-body-v3"><div id="companyFactList" class="company-fact-list">${I.factCards(q)}</div></div></details>
    </section>`;
  };

  I.filter = (query='') => {
    const q=query.toLowerCase().trim();
    return INGREDIENTS.filter(x=>{
      const role=I.roleGuide(x)?.label||'';
      const text=`${x.name} ${(x.aliases||[]).join(' ')} ${x.category} ${(x.goals||[]).join(' ')} ${role}`.toLowerCase();
      const qok=!q||text.includes(q);
      const fok=S.state.currentFilter==='すべて'||(x.goals||[]).includes(S.state.currentFilter);
      return qok&&fok;
    });
  };

  I.cards = (items) => items.length?items.map(x=>`<button class="ingredient-row ingredient-row-min-v21 reveal" onclick="showIngredient('${S.escape(x.name)}')">
      <span><strong>${S.escape(x.name)}</strong><small>${S.escape(I.shortRole(x))}</small></span><b>›</b>
    </button>`).join(''):S.empty('見つかりませんでした','別のキーワードで試してみてください。');

  I.refreshList = () => {
    const q=S.$('ingredientSearch')?.value||'';
    const items=I.filter(q);
    S.$('ingredientList').innerHTML=I.listHtml(items,q);
    if(S.$('companyFactList'))S.$('companyFactList').innerHTML=I.factCards(q);
    requestAnimationFrame(S.animate);
  };

  S.views.checker = () => `<div class="page-head"><div><span class="kicker">INGREDIENT CHECK</span><h1>成分を貼ってチェック</h1><p>全成分を貼り付ければ、今選んでいる悩みと照らして整理します。</p></div></div>
    <section class="panel">
      <textarea id="checkText" rows="8" placeholder="水、グリセリン、保湿成分A、整肌成分B…">${S.escape(S.state.checkerDraft||'')}</textarea>
      <div class="actions"><button class="primary" onclick="SEIBUN.ingredients.runManualCheck()">結果を見る</button><button class="secondary" onclick="SEIBUN.render('scan')">画像から読む</button></div>
    </section><div id="checkResult"></div>`;

  I.analysisHtml = (found,unknown=[],source='manual',meta={}) => {
    const profile=S.getProfile();
    const a=I.productAnalysis(found,profile,meta);
    const allergy=a.allergy||I.allergyMatches(found,profile);
    const rating=I.displayRating(a);
    const band=I.publicBand(rating.score,rating.provisional,allergy.hits);
    const nextIngredients=rating.score!=null&&rating.score<65&&!(allergy.hits||[]).length ? I.recommendationIngredients(found,profile,4):[];
    const c=S.getConcern()?S.skin.concernMeta(S.getConcern()):null;

    const positivesHtml=a.positives?.length
      ? a.positives.map(x=>`<button class="ingredient-verdict-v3 good" onclick="showIngredient('${S.escape(x.ing.name)}')"><span class="verdict-icon-v3">✓</span><span><strong>${S.escape(x.ing.name)}</strong><small>${S.escape(x.reasons.join(' / '))}</small></span><b>›</b></button>`).join('')
      : `<div class="verdict-empty-v3"><strong>特に強いおすすめ成分は少なめ</strong><p>悪い商品という意味ではありません。</p></div>`;
    const concernsHtml=a.concerns?.length
      ? a.concerns.map(x=>`<button class="ingredient-verdict-v3 concern" onclick="showIngredient('${S.escape(x.ing.name)}')"><span class="verdict-icon-v3">!</span><span><strong>${S.escape(x.ing.name)}</strong><small>${S.escape(x.reasons.join(' / '))}</small></span><b>›</b></button>`).join('')
      : `<div class="verdict-empty-v3"><strong>強く確認したい成分は見つかっていません</strong><p>実際の使用感も合わせて確認してください。</p></div>`;

    return `<section class="result-min-v21">
      <div class="result-top-v21 ${band.key}"><span class="eyebrow">RESULT</span>${S.starsSummary(rating.score,'おすすめ目安',rating.provisional)}<h1>${band.label}</h1><p>${band.detail}</p></div>
      ${c?`<button class="result-concern-v21" onclick="SEIBUN.ocr.concernGate('result')"><span>${c.icon}</span><small>現在の悩み</small><strong>${c.label}</strong><b>変更</b></button>`:''}
      ${!rating.hasRating?`<section class="recovery-card-v2"><h3>もう一度撮ると結果が出しやすいです</h3><div class="actions"><button class="primary" onclick="SEIBUN.ocr.tryAnother()">撮り直す</button><button class="secondary" onclick="SEIBUN.ocr.manual(SEIBUN.state.ocrRaw)">手入力</button></div></section>`:''}
      ${allergy.hits.length?`<div class="notice-card-v3 caution"><span>!</span><div><strong>先に確認したい成分があります</strong><p>${allergy.hits.slice(0,6).map(x=>S.escape(x.ing.name)).join('、')}</p></div></div>`:''}
      <button class="primary wide result-again-v21" onclick="SEIBUN.ocr.tryAnother()">ほかの商品も試す →</button>
      <details class="details-v3 result-reason-v21"><summary>結果の理由を見る</summary><div class="details-body-v3">
        ${nextIngredients.length?`<section class="result-next-ingredients-min-v21"><h3>次の商品で見てみたい成分</h3><div class="next-ingredient-list">${I.recommendationIngredientsHtml(nextIngredients)}</div></section>`:''}
        <section class="megane-good-check-v3"><article class="megane-good-v3"><div class="result-panel-title-v3"><span>✓</span><div><h3>良いところ</h3></div><b>${a.positives?.length||0}</b></div><div class="verdict-list-v3">${positivesHtml}</div></article><article class="megane-check-v3"><div class="result-panel-title-v3"><span>!</span><div><h3>確認したいところ</h3></div><b>${a.concerns?.length||0}</b></div><div class="verdict-list-v3">${concernsHtml}</div></article></section>
      </div></details>
      <details class="details-v3"><summary>読み取った成分 <small>${found.length}件</small></summary><div class="details-body-v3"><div class="ingredient-proof-list">${found.map(x=>`<button onclick="showIngredient('${S.escape(x.name)}')"><span><strong>${S.escape(x.name)}</strong><small>${I.everydayTags(x).join(' / ')||I.broadCategory(x)}</small></span><b>›</b></button>`).join('')}</div></div></details>
      <details class="details-v3"><summary>もっと自分向けにする</summary><div class="details-body-v3"><p>じっくり肌診断をすると、季節や生活リズムも含めて結果を見直せます。</p><button class="secondary" onclick="SEIBUN.ocr.startDeepDiagnosis()">じっくり肌診断</button>${S.isPersistenceEnabled()?'<button class="secondary" onclick="SEIBUN.render(\'history\')">履歴を見る</button>':'<button class="secondary" onclick="SEIBUN.ocr.persistResult()">この端末に保存</button>'}</div></details>
      <details class="details-v3"><summary>この評価について</summary><div class="details-body-v3">${S.legal.scoreNote()}</div></details>
    </section>`;
  };

  I.runManualCheck = () => {
    const raw=S.$('checkText')?.value.trim()||'';
    if(!raw){S.$('checkResult').innerHTML='<div class="note">成分表示を入力してください。</div>';return}
    if(!S.getProfile()){
      S.state.checkerDraft=raw;
      S.$('checkResult').innerHTML=`<div class="note"><strong>先に悩みを1つ選んでください</strong><p>1タップでOKです。</p></div>${S.skin.concernPickerHtml('checker',true)}`;
      return;
    }
    const parsed=I.parse(raw);
    const a=I.productAnalysis(parsed.found,S.getProfile(),parsed);
    const rating=I.displayRating(a);
    S.addHistory({date:new Date().toLocaleString('ja-JP'),found:parsed.found.map(x=>x.name),score:a.score,displayScore:rating.score,provisional:rating.provisional,concern:S.getConcern(),source:'text'});
    S.$('checkResult').innerHTML=I.analysisHtml(parsed.found,parsed.unknown,'manual',parsed);
    requestAnimationFrame(S.animate);
  };
})();
