window.SEIBUN = {
  state:{view:'home',nav:[],simpleAnswers:{},deepAnswers:{},deepIndex:0,simpleIndex:0,demographics:{age:'',gender:''},profile:null,simpleResult:null,scanFile:null,lastScan:null,cameraStream:null,cameraTimer:null,brightnessState:{dark:0,bright:0},dictionaryQuery:'',dictionaryOffset:60}
};

(()=>{
  const S=SEIBUN, keys=APP_CONFIG.storage;
  S.$=id=>document.getElementById(id);
  S.escape=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  S.norm=(v='')=>String(v).normalize('NFKC').trim();
  S.canonical=(v='')=>S.norm(v).toLowerCase().replace(/[‐‑‒–—―ーｰ]/g,'-').replace(/[／/]/g,'/').replace(/[（）()\[\]{}・:：;；,.，、\s]/g,'');
  S.clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  S.unique=a=>[...new Set((a||[]).filter(Boolean))];
  S.today=()=>new Date().toISOString().slice(0,10);
  S.currentSeason=()=>{const m=new Date().getMonth()+1;return m>=3&&m<=5?'spring':m>=6&&m<=8?'summer':m>=9&&m<=11?'autumn':'winter'};
  S.seasonLabel=s=>({spring:'春',summer:'夏',autumn:'秋',winter:'冬'}[s]||'今の季節');

  const jsonGet=(store,key,fallback)=>{try{const raw=store.getItem(key);return raw==null?fallback:JSON.parse(raw)}catch{return fallback}};
  const jsonSet=(store,key,val)=>store.setItem(key,JSON.stringify(val));
  S.persistEnabled=()=>localStorage.getItem(keys.persist)==='1';
  S.loadData=()=>{
    if(S.persistEnabled()){
      [keys.profile,keys.simple,keys.history].forEach(k=>{const v=localStorage.getItem(k);if(v!=null)sessionStorage.setItem(k,v)});
    }
    S.state.profile=jsonGet(sessionStorage,keys.profile,null);
    S.state.simpleResult=jsonGet(sessionStorage,keys.simple,null);
  };
  S.saveProfile=p=>{S.state.profile=p;jsonSet(sessionStorage,keys.profile,p);if(S.persistEnabled())jsonSet(localStorage,keys.profile,p)};
  S.saveSimple=p=>{S.state.simpleResult=p;jsonSet(sessionStorage,keys.simple,p);if(S.persistEnabled())jsonSet(localStorage,keys.simple,p)};
  S.history=()=>jsonGet(sessionStorage,keys.history,[]);
  S.addHistory=item=>{const list=[item,...S.history()].slice(0,30);jsonSet(sessionStorage,keys.history,list);if(S.persistEnabled())jsonSet(localStorage,keys.history,list)};
  S.clearHistory=()=>{jsonSet(sessionStorage,keys.history,[]);if(S.persistEnabled())jsonSet(localStorage,keys.history,[]);S.render('history')};
  S.enablePersist=()=>{localStorage.setItem(keys.persist,'1');[keys.profile,keys.simple,keys.history].forEach(k=>{const v=sessionStorage.getItem(k);if(v!=null)localStorage.setItem(k,v)});S.toast('この端末に保存しました')};
  S.disablePersist=()=>{localStorage.removeItem(keys.persist);[keys.profile,keys.simple,keys.history].forEach(k=>localStorage.removeItem(k));S.toast('端末保存を解除しました')};
  S.resetAll=()=>{[keys.profile,keys.simple,keys.history].forEach(k=>{sessionStorage.removeItem(k);localStorage.removeItem(k)});localStorage.removeItem(keys.persist);Object.assign(S.state,{profile:null,simpleResult:null,simpleAnswers:{},deepAnswers:{},simpleIndex:0,deepIndex:0,lastScan:null});S.toast('保存データをリセットしました');S.render('home',{replace:true})};

  S.toast=msg=>{let el=S.$('toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.appendChild(el)}el.textContent=msg;el.classList.add('show');clearTimeout(S._toast);S._toast=setTimeout(()=>el.classList.remove('show'),2200)};
  S.openDialog=html=>{S.$('dialogContent').innerHTML=html;S.$('detailDialog').showModal()};
  S.closeDialog=()=>S.$('detailDialog')?.close();

  S.scoreToStars=score=>{if(score==null||Number.isNaN(Number(score)))return null;const n=Number(score);if(n>=82)return 5;if(n>=68)return 4;if(n>=42)return 3;if(n>=34)return 2;return 1};
  S.stars=n=>`<span class="stars" aria-label="5段階中${n||0}">${[1,2,3,4,5].map(i=>`<b class="${i<=(n||0)?'on':''}">★</b>`).join('')}</span>`;
  S.starWord=n=>({5:'かなりおすすめ候補',4:'おすすめ候補',3:'比較しながら選ぶ',2:'別候補も比較',1:'別候補を優先'}[n]||'もう少し情報が必要');

  S.render=(view='home',opts={})=>{
    const current=S.state.view;
    if(!opts.fromBack&&!opts.replace&&current&&current!==view)S.state.nav.push(current);
    if(opts.replace)S.state.nav=[];
    S.state.view=view;
    const fn=S.views?.[view]||S.views.home;
    S.$('app').innerHTML=fn();
    document.body.dataset.view=view;
    const back=S.$('backBtn'); if(back)back.hidden=view==='home'||S.state.nav.length===0;
    document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===view||(view==='ingredientDetail'&&b.dataset.nav==='ingredients')));
    window.scrollTo({top:0,behavior:opts.instant?'auto':'smooth'});
    requestAnimationFrame(()=>S.afterRender?.(view));
  };
  S.back=()=>{SEIBUN.ocr?.stopCamera?.();const v=S.state.nav.pop();S.render(v||'home',{fromBack:true,instant:true})};
})();
