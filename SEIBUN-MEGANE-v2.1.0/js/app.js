// SEIBUNメガネ v2.1.0 — bootstrap.
(() => {
  const S=SEIBUN;

  S.restorePersistentData();
  S.state.sessionProfile=S.getSavedProfile();
  S.state.concern=S.getConcern();

  const brand=S.brand();
  const brandName=S.brandName();
  const brandNameEl=document.getElementById('brandName');
  const footerBrandEl=document.getElementById('footerBrandName');
  const markEl=document.getElementById('brandMark');
  const betaEl=document.getElementById('brandBeta');
  if(brandNameEl)brandNameEl.textContent=brandName;
  if(footerBrandEl)footerBrandEl.textContent=brandName;
  if(markEl)markEl.textContent=S.brandMark();
  if(betaEl){betaEl.textContent=brand.betaLabel||'';betaEl.classList.toggle('hidden',!brand.betaLabel)}
  document.title=`${brandName}｜化粧品成分チェック`;

  try{
    const manifest={
      name:`${brandName} — 化粧品成分チェック`,short_name:S.brandShort(),start_url:'./',display:'standalone',
      background_color:'#f7f7f3',theme_color:'#4d745b',lang:'ja'
    };
    const blob=new Blob([JSON.stringify(manifest)],{type:'application/manifest+json'});
    const url=URL.createObjectURL(blob);
    const link=document.getElementById('manifestLink');
    if(link)link.href=url;
  }catch{}

  document.querySelectorAll('[data-view]').forEach(el=>{
    el.addEventListener('click',()=>S.render(el.dataset.view));
  });

  const dialog=document.getElementById('detailDialog');
  dialog?.addEventListener('click',e=>{
    if(e.target.id==='detailDialog')S.closeDialog();
  });
  dialog?.addEventListener('close',()=>S.ocr?.stopCamera?.());

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    S.state.installPrompt=e;
    document.getElementById('installBtn')?.classList.remove('hidden');
  });
  document.getElementById('installBtn')?.addEventListener('click',async()=>{
    if(!S.state.installPrompt)return;
    S.state.installPrompt.prompt();
    await S.state.installPrompt.userChoice;
    S.state.installPrompt=null;
    document.getElementById('installBtn')?.classList.add('hidden');
  });

  if(location.protocol.startsWith('http')&&'serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  S.render('home',{replace:true,instant:true});
})();
