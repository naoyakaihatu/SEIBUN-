// SEIBUNメガネ v2.1.0 — shared state, storage and UI helpers.
window.SEIBUN = {
  views: {},
  state: {
    view: 'home',
    currentFilter: 'すべて',
    sessionProfile: null,
    concern: null,
    scanFile: null,
    ocrRaw: '',
    detected: [],
    pendingScanResult: null,
    lastScanPackage: null,
    selectedIngredient: null,
    installPrompt: null,
    navStack: [],
    cameraStream: null,
    cameraTimer: null,
    cameraBrightness: null
  }
};

(() => {
  const S=SEIBUN;
  const storage=APP_CONFIG.storage;

  S.$ = id => document.getElementById(id);
  S.escape = (value='') => String(value).replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  S.norm = (value='') => String(value).normalize('NFKC').trim();
  S.canonical = (value='') => S.norm(value)
    .toLowerCase()
    .replace(/[‐‑‒–—―ーｰ]/g,'-')
    .replace(/[／/]/g,'/')
    .replace(/[（）()\[\]{}・:：;；,.，、\s]/g,'');
  S.unique = (arr=[]) => [...new Set(arr.filter(Boolean))];
  S.clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  S.today = () => new Date().toISOString().slice(0,10);

  S.brand = () => APP_CONFIG.brand||{name:'SEIBUNメガネ',shortName:'SEIBUNメガネ',tagline:'',betaLabel:''};
  S.brandName = () => S.brand().name||'SEIBUNメガネ';
  S.brandShort = () => S.brand().shortName||S.brandName();
  S.brandMark = () => 'S';

  S.sessionKeys=[storage.skinProfile,storage.skinConcern,storage.history];
  S.isPersistenceEnabled = () => localStorage.getItem(storage.persistOptIn)==='1';

  S.restorePersistentData = () => {
    if(!S.isPersistenceEnabled())return;
    S.sessionKeys.forEach(key=>{
      const v=localStorage.getItem(key);
      if(v!=null)sessionStorage.setItem(key,v);
    });
  };

  S.loadJSON = (key,fallback) => {
    try{
      const raw=sessionStorage.getItem(key);
      if(raw==null)return fallback;
      const parsed=JSON.parse(raw);
      return parsed??fallback;
    }catch{return fallback}
  };
  S.saveJSON = (key,value) => {
    const raw=JSON.stringify(value);
    sessionStorage.setItem(key,raw);
    if(S.isPersistenceEnabled()&&S.sessionKeys.includes(key))localStorage.setItem(key,raw);
  };
  S.loadText = (key,fallback='') => sessionStorage.getItem(key)??fallback;
  S.saveText = (key,value) => {
    sessionStorage.setItem(key,String(value));
    if(S.isPersistenceEnabled()&&S.sessionKeys.includes(key))localStorage.setItem(key,String(value));
  };
  S.removeStored = (key,{persistent=false}={}) => {
    sessionStorage.removeItem(key);
    if(persistent)localStorage.removeItem(key);
  };

  S.persistGuestData = () => {
    localStorage.setItem(storage.persistOptIn,'1');
    S.sessionKeys.forEach(key=>{
      const v=sessionStorage.getItem(key);
      if(v!=null)localStorage.setItem(key,v);
    });
    return true;
  };

  S.stopPersistentSave = () => {
    localStorage.removeItem(storage.persistOptIn);
    S.sessionKeys.forEach(key=>localStorage.removeItem(key));
  };

  S.resetAllData = () => {
    S.sessionKeys.forEach(key=>{
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    });
    localStorage.removeItem(storage.persistOptIn);
    S.state.sessionProfile=null;
    S.state.concern=null;
    S.state.pendingScanResult=null;
    S.state.lastScanPackage=null;
    S.state.scanFile=null;
    S.state.ocrRaw='';
    S.state.detected=[];
  };

  S.getConcern = () => S.state.concern||S.loadText(storage.skinConcern,'')||'';
  S.setConcern = value => {
    S.state.concern=value||'';
    if(value)S.saveText(storage.skinConcern,value);
    else S.removeStored(storage.skinConcern);
  };

  S.getSavedProfile = () => {
    const p=S.loadJSON(storage.skinProfile,null);
    return p?.scores?p:null;
  };
  S.getProfile = () => S.state.sessionProfile||S.getSavedProfile();
  S.saveProfile = profile => {
    S.state.sessionProfile=profile;
    S.saveJSON(storage.skinProfile,profile);
  };

  S.getHistory = () => S.loadJSON(storage.history,[]);
  S.addHistory = entry => {
    const list=[entry,...S.getHistory()].slice(0,30);
    S.saveJSON(storage.history,list);
  };
  S.clearHistory = () => S.saveJSON(storage.history,[]);

  S.getEntryFlow = () => 'ingredient';
  S.setEntryFlow = () => {};
  S.chooseGoal = () => S.render('scan');
  S.startFromTutorial = () => S.render('scan');
  S.goHome = () => S.render('home');
  S.isGuest = () => true;

  S.persistenceLabel = () => S.isPersistenceEnabled()?'この端末に保存中':'保存しない限り、タブを閉じると消えます';
  S.guestNotice = () => `<div class="guest-notice ${S.isPersistenceEnabled()?'saved':''}">
    <strong>${S.isPersistenceEnabled()?'端末保存 ON':'ゲスト利用'}</strong>
    <span>${S.isPersistenceEnabled()?'肌設定と解析履歴を、このブラウザに保存しています。':'肌設定と解析履歴は一時保存です。必要なら「この端末に保存」を押してください。'}</span>
  </div>`;

  S.journey = (step=1) => {
    const steps=[
      {icon:'1',label:'悩みを1つ選ぶ'},
      {icon:'2',label:'成分表を撮る'},
      {icon:'3',label:'結果を見る'}
    ];
    return `<div class="visual-journey" aria-label="使い方">
      ${steps.map((x,i)=>{
        const n=i+1;
        const cls=n<step?'done':n===step?'current':'';
        return `<div class="journey-step ${cls}">
          ${n===step?'<b class="journey-now">NOW</b>':''}
          <span>${n<step?'✓':x.icon}</span><small>${x.label}</small>
        </div>${i<steps.length-1?'<i>›</i>':''}`;
      }).join('')}
    </div>`;
  };

  S.scoreToStars = score => {
    if(score==null||Number.isNaN(Number(score)))return null;
    const s=Number(score);
    if(s>=80)return 5;
    if(s>=65)return 4;
    if(s>=50)return 3;
    if(s>=35)return 2;
    return 1;
  };
  S.starsInline = score => {
    const n=S.scoreToStars(score);
    if(n==null)return `<span class="stars-inline neutral" aria-label="評価なし">☆☆☆☆☆</span>`;
    return `<span class="stars-inline" aria-label="5段階中${n}">${[1,2,3,4,5].map(i=>`<b class="${i<=n?'on':''}">★</b>`).join('')}</span>`;
  };
  S.starsSummary = (score,label='おすすめ目安',provisional=false) => {
    const n=S.scoreToStars(score);
    if(n==null)return `<div class="stars-summary neutral"><small>${label}</small><div>${S.starsInline(null)}</div><strong>もう少し成分が必要</strong></div>`;
    return `<div class="stars-summary ${provisional?'provisional':''}"><small>${label}${provisional?'（暫定）':''}</small><div>${S.starsInline(score)}</div><strong>${n}.0 / 5</strong></div>`;
  };
  S.scoreBars = score => {
    const n=S.scoreToStars(score)||0;
    return `<div class="signal" aria-label="5段階中${n}">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`;
  };
  S.scoreWord = score => {
    const n=S.scoreToStars(score);
    return n===5?'かなり合いそう':n===4?'合いそう':n===3?'比較しながら選ぶ':n===2?'別候補も比較':n===1?'別候補を優先':'情報を追加すると分かります';
  };
  S.confidenceWord = score => score>=80?'十分':score>=60?'大部分':score>=40?'一部':'少なめ';
  S.scoreStamp = (score,label='参考') => S.starsSummary(score,label);

  S.tag = (text,tone='mint') => `<span class="pill ${tone}">${S.escape(text)}</span>`;
  S.empty = (title,text,actionHtml='') => `<div class="empty-state"><span class="empty-blob">＋</span><h3>${title}</h3><p>${text}</p>${actionHtml}</div>`;
  S.screenGuide = (title,text,icon='→') => `<div class="screen-guide"><span>${icon}</span><div><strong>${title}</strong><small>${text}</small></div></div>`;

  S.openDialog = html => {
    const c=S.$('dialogContent');
    if(c)c.innerHTML=html;
    S.$('detailDialog')?.showModal();
    requestAnimationFrame(S.animate);
  };
  S.closeDialog = () => {
    S.ocr?.stopCamera?.();
    S.$('detailDialog')?.close();
  };

  S.animate = () => {
    document.querySelectorAll('.signal').forEach(el=>{
      el.classList.remove('go');
      requestAnimationFrame(()=>el.classList.add('go'));
    });
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('shown'));
  };

  S.updateNavigationUI = view => {
    document.body.dataset.view=view;
    document.body.classList.toggle('entry-mode',view==='tutorial');
    const back=S.$('backBtn');
    if(back)back.classList.toggle('hidden',S.state.navStack.length===0||view==='home');
    document.querySelectorAll('.bottom-nav button').forEach(btn=>{
      const active=btn.dataset.view===view
        || (view==='ingredientDetail'&&btn.dataset.view==='ingredients')
        || ((view==='diagnosis'||view==='skinAnalysis')&&btn.dataset.view==='home');
      btn.classList.toggle('active',active);
    });
  };

  S.render = (view='home',options={}) => {
    const fn=S.views[view]||S.views.home;
    const current=S.state.view;
    if(!options.replace&&!options.fromBack&&current&&current!==view){
      const last=S.state.navStack.at(-1);
      if(last!==current)S.state.navStack.push(current);
      if(S.state.navStack.length>30)S.state.navStack.shift();
    }
    if(options.replace)S.state.navStack=[];
    S.state.view=view;
    const app=S.$('app');
    if(app)app.innerHTML=fn();
    S.updateNavigationUI(view);
    window.scrollTo({top:0,behavior:options.instant?'auto':'smooth'});
    requestAnimationFrame(S.animate);
  };

  S.back = () => {
    S.ocr?.stopCamera?.();
    const previous=S.state.navStack.pop();
    if(previous){S.render(previous,{fromBack:true,instant:true});return;}
    S.render('home',{replace:true,instant:true});
  };
})();
