(()=>{
  const S=SEIBUN, D={}; S.diagnosis=D;
  D.deepQuestions=()=>[...DEEP_BASE_QUESTIONS,...(SEASONAL_QUESTIONS[S.currentSeason()]||[])];

  D.startSimple=()=>{Object.assign(S.state,{simpleAnswers:{},simpleIndex:0});S.render('simpleDiagnosis')};
  D.answerSimple=optIndex=>{
    const q=SIMPLE_QUESTIONS[S.state.simpleIndex]; if(!q)return;
    S.state.simpleAnswers[q.id]=optIndex;
    if(S.state.simpleIndex<SIMPLE_QUESTIONS.length-1){S.state.simpleIndex++;S.render('simpleDiagnosis',{replace:true})}
    else{const result=D.computeSimple();S.saveSimple(result);S.saveProfile(result.profile);S.render('simpleResult',{replace:true})}
  };
  D.computeSimple=()=>{
    const total={dry:0,oil:0,sens:0,balance:0};
    SIMPLE_QUESTIONS.forEach(q=>{const idx=S.state.simpleAnswers[q.id]??0;const weights=q.options[idx]?.[1]||{};Object.entries(weights).forEach(([k,v])=>total[k]=(total[k]||0)+v)});
    let type='balance'; if(total.dry>=total.oil+2)type='dry'; else if(total.oil>=total.dry+2)type='oily';
    const dry=S.clamp(42+total.dry*6-total.oil*2,20,88), oil=S.clamp(38+total.oil*6-total.dry*1.5,18,88), reactive=S.clamp(30+total.sens*10,20,85);
    const profile={mode:'simple',simpleType:type,name:SIMPLE_TYPES[type].name,scores:{dry,oil,reactive,tone:35,firm:32,pore:oil},season:S.currentSeason(),createdAt:new Date().toISOString()};
    return {type,...SIMPLE_TYPES[type],totals:total,profile};
  };

  D.startDeep=()=>{Object.assign(S.state,{deepAnswers:{},deepIndex:0,demographics:{age:'',gender:''}});S.render('deepDiagnosis')};
  D.answerDeep=optIndex=>{
    const qs=D.deepQuestions(),q=qs[S.state.deepIndex];if(!q)return;
    S.state.deepAnswers[q.id]=Number(q.options[optIndex]?.[1]??0);
    if(S.state.deepIndex<qs.length-1){S.state.deepIndex++;S.render('deepDiagnosis',{replace:true})}
    else S.render('demographics',{replace:true});
  };
  D.computeDeep=(age='',gender='')=>{
    const qs=D.deepQuestions(), sums={dry:0,oil:0,reactive:0,tone:0,firm:0}, max={dry:0,oil:0,reactive:0,tone:0,firm:0};
    qs.forEach(q=>{const axis=q.axis;if(!(axis in sums))return;const val=Number(S.state.deepAnswers[q.id]??0);sums[axis]+=val;max[axis]+=Math.max(...q.options.map(o=>Number(o[1])))||3});
    const scores={};Object.keys(sums).forEach(k=>scores[k]=Math.round((sums[k]/Math.max(1,max[k]))*100));
    scores.pore=S.clamp(Math.round(scores.oil*.85+15),0,100);
    const oily=scores.oil>scores.dry;
    const stable=scores.reactive<50;
    const even=scores.tone<50;
    const maintain=scores.firm<50;
    const baseIndex=(oily?8:0)+(stable?4:0)+(even?2:0)+(maintain?1:0);
    const baseNo=baseIndex+1;
    const prefix=gender==='male'?'M':gender==='female'?'F':'N';
    const code=`${prefix}${String(baseNo).padStart(2,'0')}`;
    const name=BASE_TYPE_NAMES[baseIndex];
    const profile={mode:'deep',code,baseNo,name,gender,age,scores,season:S.currentSeason(),createdAt:new Date().toISOString()};
    profile.summary=D.summary(profile);
    return profile;
  };
  D.finishDeep=()=>{
    const age=S.$('ageSelect')?.value||'',gender=S.$('genderSelect')?.value||'';
    const profile=D.computeDeep(age,gender);S.state.demographics={age,gender};S.saveProfile(profile);S.render('deepResult',{replace:true});
  };
  D.summary=p=>{
    const s=p.scores, parts=[];
    parts.push(s.dry>=s.oil?'うるおいを守るケア':'皮脂とのバランスを取るケア');
    parts.push(s.reactive>=50?'ゆらぎやすい時の使いやすさ':'肌状態を保ちながら目的成分を選ぶこと');
    if(s.tone>=50)parts.push('透明感を意識したケア');
    if(s.firm>=50)parts.push('ハリを意識したケア');
    return `${parts.join('、')}を優先したい肌傾向です。`;
  };
  D.axisRows=p=>[
    ['うるおい',p.scores.dry>=p.scores.oil?p.scores.dry:100-p.scores.oil,p.scores.dry>=p.scores.oil?'不足しやすい':'皮脂寄り'],
    ['ゆらぎ',p.scores.reactive,p.scores.reactive>=50?'出やすい':'安定寄り'],
    ['色ムラ',p.scores.tone,p.scores.tone>=50?'ケア優先':'維持寄り'],
    ['ハリ',p.scores.firm,p.scores.firm>=50?'ケア優先':'維持寄り']
  ];
  D.demographicNote=p=>{
    if(p.gender==='male')return '男性プロフィールとして、皮脂・毛穴側の成分優先度を少しだけ補正しています。';
    if(p.gender==='female')return '女性プロフィールとして、うるおい・ハリ側の成分優先度を少しだけ補正しています。';
    return '性別は未回答のため、回答内容だけで16基本タイプを表示しています。';
  };
  D.typeAsset=p=>p?.gender==='male'||p?.gender==='female'?`assets/types/${p.code}.svg`:'';

  D.explanationHtml=()=>`<article class="explain-sheet"><span class="eyebrow">HOW IT WORKS</span><h2>肌タイプは、どう決めている？</h2><p>SEIBUNメガネの肌チェックは、回答を4つの軸に整理する独自のセルフチェックです。医療上の診断ではありません。</p><div class="four-axis"><div><b>01</b><strong>うるおい ↔ 皮脂</strong><small>洗顔後のつっぱりや日中のテカリ</small></div><div><b>02</b><strong>ゆらぎ ↔ 安定</strong><small>刺激感や季節変化への反応</small></div><div><b>03</b><strong>色ムラケア ↔ 維持</strong><small>シミ・くすみ・透明感の優先度</small></div><div><b>04</b><strong>ハリケア ↔ 維持</strong><small>ハリ・ふっくら感の優先度</small></div></div><p>4軸の組み合わせで16基本タイプを作り、任意で性別を選んだ場合は、回答結果を主役にしたまま成分優先度を小さく調整して男性16／女性16の32プロフィールとして表示します。年齢と季節も補助情報としてのみ使います。</p><div class="soft-note">多軸で肌を整理する一般的な考え方を参考にしていますが、Baumann Skin Type Questionnaireそのものではなく、質問・採点・タイプ名はSEIBUNメガネ独自です。</div></article>`;
})();
