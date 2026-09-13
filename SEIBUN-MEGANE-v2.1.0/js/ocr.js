// SEIBUNメガネ v2.1.0 — OCR, camera assist and recovery flow.
(() => {
  const S=SEIBUN;
  const O={};
  S.ocr=O;

  O.learningTips=[
    'セラミドには、複数の表示名称があります。',
    'ナイアシンアミドは、商品によって配合目的が異なります。',
    'ビタミンC系は、誘導体ごとに表示名が変わります。',
    '同じ成分でも、組み合わせや剤型で使用感は変わります。',
    '光沢のある容器は、少し角度を変えると文字を読みやすくできます。',
    '成分名をタップすると、成分辞典で役割を確認できます。'
  ];

  O.errorText=err=>String(err?.message||err?.reason||err||'原因不明').replace(/https?:\/\/\S+/g,'外部OCRリソース');

  O.loadDrawable=async file=>{
    if('createImageBitmap' in window){
      try{
        const bmp=await createImageBitmap(file);
        return {source:bmp,width:bmp.width,height:bmp.height,cleanup:()=>{try{bmp.close()}catch{}}};
      }catch{}
    }
    const url=URL.createObjectURL(file);
    const img=new Image();
    await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('画像を開けませんでした'));img.src=url;});
    return {source:img,width:img.naturalWidth,height:img.naturalHeight,cleanup:()=>URL.revokeObjectURL(url)};
  };

  O.crops={full:{x:0,y:0,w:1,h:1},ingredient:{x:.18,y:.06,w:.66,h:.62},center:{x:.12,y:.05,w:.76,h:.76}};

  O.preprocess=async(file,{crop='full',mode='contrast'}={})=>{
    const loaded=await O.loadDrawable(file);
    try{
      const p=O.crops[crop]||O.crops.full;
      const sx=Math.round(loaded.width*p.x),sy=Math.round(loaded.height*p.y);
      const sw=Math.min(loaded.width-sx,Math.round(loaded.width*p.w));
      const sh=Math.min(loaded.height-sy,Math.round(loaded.height*p.h));
      if(sw<40||sh<40)throw new Error('画像の切り出し範囲が小さすぎます');
      const targetW=Math.min(2200,Math.max(1500,sw*2.5));
      let w=Math.round(targetW),h=Math.round(sh*(targetW/sw));
      const maxPixels=7_000_000;
      if(w*h>maxPixels){const ratio=Math.sqrt(maxPixels/(w*h));w=Math.round(w*ratio);h=Math.round(h*ratio);}
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      if(!ctx)throw new Error('画像処理を開始できませんでした');
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(loaded.source,sx,sy,sw,sh,0,0,w,h);
      if(mode!=='original'){
        const img=ctx.getImageData(0,0,w,h),d=img.data;
        for(let i=0;i<d.length;i+=4){
          let g=.299*d[i]+.587*d[i+1]+.114*d[i+2];
          if(mode==='contrast')g=(g-128)*1.7+148;
          if(mode==='binary')g=g>164?255:Math.max(0,(g-88)*1.8);
          g=S.clamp(g,0,255);d[i]=d[i+1]=d[i+2]=g;
        }
        ctx.putImageData(img,0,0);
      }
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.95));
      return blob||canvas.toDataURL('image/jpeg',.95);
    }finally{loaded.cleanup()}
  };

  O.createWorker=async logger=>{
    if(typeof Tesseract==='undefined')throw new Error('OCRライブラリを読み込めませんでした');
    const worker=await Tesseract.createWorker(['jpn','eng'],1,{
      logger,
      workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js',
      corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.0.0',
      langPath:'https://tessdata.projectnaptha.com/4.0.0'
    });
    try{await worker.setParameters({tessedit_pageseg_mode:6})}catch{}
    return worker;
  };

  O.merge=passes=>{
    const map=new Map(),unknown=[],unknownSeen=new Set();
    passes.forEach((r,passIndex)=>{
      r.found.forEach((ing,index)=>{
        const prev=map.get(ing.name),candidate={...ing,_pass:passIndex,_order:index};
        if(!prev||(candidate._confidence??0)>(prev._confidence??0))map.set(ing.name,candidate);
      });
      r.unknown.forEach(x=>{if(!unknownSeen.has(x)){unknownSeen.add(x);unknown.push(x)}});
    });
    const found=[...map.values()];
    const avgConfidence=found.length?found.reduce((a,x)=>a+(x._confidence??1),0)/found.length:0;
    const ocrValues=passes.map(x=>x.ocrConfidence).filter(x=>Number.isFinite(x));
    const avgOcrConfidence=ocrValues.length?ocrValues.reduce((a,x)=>a+x,0)/ocrValues.length:null;
    const matchStats={
      exact:found.filter(x=>x._matchType==='exact').length,
      alias:found.filter(x=>x._matchType==='alias'||x._matchType==='inci').length,
      normalized:found.filter(x=>x._matchType==='normalized').length,
      fuzzy:found.filter(x=>x._matchType==='fuzzy').length,
      rejectedAmbiguous:Math.max(0,...passes.map(x=>x.rejectedAmbiguous||0))
    };
    return {found,unknown,avgConfidence,avgOcrConfidence,matchStats};
  };

  O.quality=merged=>{
    const n=merged.found.length,dict=merged.avgConfidence||0,ocr=merged.avgOcrConfidence;
    if(n>=20&&dict>=.95&&(ocr==null||ocr>=.70))return {label:'十分読み取れています',tone:'good'};
    if(n>=8&&dict>=.90&&(ocr==null||ocr>=.50))return {label:'大部分を読み取れています',tone:'mid'};
    if(n>=4)return {label:'一部を読み取れています',tone:'low'};
    return {label:'読み取りが少なめです',tone:'low'};
  };

  O.concernGate=(mode='camera')=>{
    S.openDialog(`<section class="camera-concern-gate-v2">
      <span class="eyebrow">1 TAP</span><h2>先に1つだけ教えてください</h2><p>今いちばん気になることを選ぶと、そのまま撮影へ進みます。</p>
      <div class="concern-chips-v2 compact">${S.skin.concerns.map(c=>`<button class="concern-chip-v2" onclick="SEIBUN.ocr.selectConcernAndContinue('${c.id}','${mode}')"><span>${c.icon}</span><strong>${c.label}</strong></button>`).join('')}</div>
    </section>`);
  };

  O.selectConcernAndContinue=(concern,mode)=>{
    S.skin.selectConcern(concern,null);
    S.closeDialog();
    setTimeout(()=>{
      if(mode==='camera')O.openCamera();
      else if(mode==='file'&&S.state.scanFile)O.showPreview(S.state.scanFile);
      else if(mode==='manual')O.manual(O.pendingManualRaw||'');
      else if(mode==='pending')O.showPendingResult();
      else if(mode==='stay')S.render('scan',{replace:true,instant:true});
      else if(mode==='result'&&S.state.lastScanPackage){const p=S.state.lastScanPackage;O.result(p.merged,p.passes,p.errors,{recordHistory:false});}
    },80);
  };

  S.views.scan=()=>{
    const concern=S.getConcern();
    const meta=concern?S.skin.concernMeta(concern):null;
    return `<section class="scan-min-v21">
      <div class="simple-page-title-v21"><span class="eyebrow">SCAN</span><h1>成分表を撮る</h1><p>商品の裏面にある「全成分」を写してください。</p></div>
      ${meta?`<button class="scan-concern-v21" onclick="SEIBUN.ocr.concernGate('stay')"><span>${meta.icon}</span><small>今の悩み</small><strong>${meta.label}</strong><b>変更</b></button>`:''}
      <button class="scan-main-btn-v21" onclick="SEIBUN.ocr.openCamera()"><span>◉</span><strong>カメラで撮る</strong><small>成分欄全体が入るように</small></button>
      <label class="scan-file-btn-v21">写真から選ぶ<input id="scanInput" type="file" accept="image/*" onchange="SEIBUN.ocr.preview(event)"></label>
      <details class="details-v3 scan-help-v21"><summary>うまく撮れないとき</summary><div class="details-body-v3"><p>明るい場所で、成分欄をまっすぐ大きく写してください。反射がある場合は少し角度を変えると読みやすくなります。</p><div class="actions"><button class="secondary" onclick="SEIBUN.ocr.manual('')">手入力</button><button class="secondary" onclick="SEIBUN.render('checker')">テキストを貼る</button></div></div></details>
      <div id="scanPreview" class="scan-preview-v3"></div><div id="ocrArea"></div>
    </section>`;
  };

  O.openCamera=async()=>{
    if(!S.getProfile()){O.concernGate('camera');return;}
    if(!navigator.mediaDevices?.getUserMedia){S.$('scanInput')?.click();return;}
    S.openDialog(`<section class="camera-shell-v2">
      <div class="camera-head-v2"><span class="eyebrow">CAMERA ASSIST</span><h2>枠に成分欄を合わせる</h2><p>暗さだけリアルタイムで確認します。文字が読める距離で撮影してください。</p></div>
      <div class="camera-stage-v2"><video id="cameraVideo" autoplay playsinline muted></video><div class="camera-overlay-v2"><div class="camera-target-v2"><span>全成分をこの枠へ</span></div></div></div>
      <div id="cameraAssist" class="camera-assist-v2"><span>…</span><div><strong>カメラを準備中</strong><small>明るさを確認します</small></div></div>
      <div class="camera-actions-v2"><button id="cameraShot" class="primary" onclick="SEIBUN.ocr.captureCamera()" disabled>● 撮影</button><button class="secondary" onclick="SEIBUN.ocr.closeCameraAndChooseFile()">写真から選ぶ</button></div>
    </section>`);
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
      S.state.cameraStream=stream;
      const video=S.$('cameraVideo');
      if(!video)return;
      video.srcObject=stream;
      await video.play();
      const shot=S.$('cameraShot');if(shot)shot.disabled=false;
      O.updateCameraAssist();
      S.state.cameraTimer=setInterval(O.updateCameraAssist,650);
    }catch(err){
      O.stopCamera();
      const assist=S.$('cameraAssist');
      if(assist)assist.innerHTML='<span>!</span><div><strong>カメラを開けませんでした</strong><small>写真選択に切り替えられます。</small></div>';
      const shot=S.$('cameraShot');if(shot)shot.disabled=true;
    }
  };

  O.updateCameraAssist=()=>{
    const video=S.$('cameraVideo'),assist=S.$('cameraAssist');
    if(!video||!assist||video.readyState<2)return;
    try{
      const canvas=document.createElement('canvas');canvas.width=120;canvas.height=80;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(video,0,0,120,80);
      const d=ctx.getImageData(0,0,120,80).data;
      let sum=0;for(let i=0;i<d.length;i+=16)sum+=(d[i]+d[i+1]+d[i+2])/3;
      const avg=sum/(d.length/16);S.state.cameraBrightness=avg;
      if(avg<72)assist.innerHTML='<span>☾</span><div><strong>少し暗いです</strong><small>明るい場所へ移動すると読み取りやすくなります</small></div>';
      else if(avg>218)assist.innerHTML='<span>!</span><div><strong>反射が強いかも</strong><small>少し角度を変えて光を逃がしてください</small></div>';
      else assist.innerHTML='<span>✓</span><div><strong>明るさOK</strong><small>成分欄全体が枠に入ったら撮影</small></div>';
    }catch{}
  };

  O.captureCamera=async()=>{
    const video=S.$('cameraVideo');if(!video||!video.videoWidth)return;
    const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;
    canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.95));
    if(!blob)return;
    const file=new File([blob],`seibun-megane-${Date.now()}.jpg`,{type:'image/jpeg'});
    S.state.scanFile=file;
    O.stopCamera();S.$('detailDialog')?.close();
    setTimeout(()=>O.showPreview(file),60);
  };

  O.stopCamera=()=>{
    if(S.state.cameraTimer){clearInterval(S.state.cameraTimer);S.state.cameraTimer=null;}
    try{S.state.cameraStream?.getTracks()?.forEach(t=>t.stop())}catch{}
    S.state.cameraStream=null;
  };
  O.closeCameraAndChooseFile=()=>{O.stopCamera();S.$('detailDialog')?.close();setTimeout(()=>S.$('scanInput')?.click(),60)};

  O.preview=e=>{
    const file=e.target.files?.[0];if(!file)return;
    S.state.scanFile=file;
    if(!S.getProfile()){O.concernGate('file');return;}
    O.showPreview(file);
  };

  O.showPreview=file=>{
    S.state.scanFile=file;S.state.ocrRaw='';S.state.detected=[];
    const url=URL.createObjectURL(file);
    const preview=S.$('scanPreview'),area=S.$('ocrArea');
    if(preview)preview.innerHTML=`<section class="photo-confirm-min-v21"><img src="${url}" alt="選択した成分表示"><small>この写真で読み取ります</small></section>`;
    if(area)area.innerHTML='<div class="scan-confirm-min-v21"><button class="primary next-flow-button" onclick="SEIBUN.ocr.run(false)">読み取る →</button><button class="text-button" onclick="SEIBUN.ocr.reset()">写真を選び直す</button></div>';
    area?.scrollIntoView({behavior:'smooth',block:'center'});
  };

  O.startTipRotation=()=>{
    O.stopTipRotation();
    let i=Math.floor(Math.random()*O.learningTips.length);
    const update=()=>{const el=S.$('ocrKnowledge');if(el)el.textContent=O.learningTips[i++%O.learningTips.length]};
    update();O.tipTimer=setInterval(update,5000);
  };
  O.stopTipRotation=()=>{if(O.tipTimer){clearInterval(O.tipTimer);O.tipTimer=null}};
  O.setStage=(text,detail='')=>{const s=S.$('ocrStatus'),d=S.$('ocrStageDetail');if(s)s.textContent=text;if(d)d.textContent=detail};

  O.run=async(precision=false)=>{
    if(!S.state.scanFile)return;
    const area=S.$('ocrArea');
    if(area)area.innerHTML=`<section class="ocr-wait-min-v21"><span class="eyebrow">READING</span><h2 id="ocrStatus">成分を読み取っています</h2><p id="ocrStageDetail">少しだけお待ちください</p><div class="ocr-progress"><div><i id="ocrBar"></i></div></div><div class="ocr-knowledge-min-v21"><small>成分ミニ知識</small><strong id="ocrKnowledge"></strong></div></section>`;
    O.startTipRotation();
    const errors=[],passes=[];let worker=null,passIndex=0;
    const labels=['画像の文字を読み取り中','成分欄を大きくして確認中','見落としがないか再確認中'];
    const logger=m=>{
      const bar=S.$('ocrBar');
      if(typeof m?.progress==='number'&&bar){const pct=Math.round(((passIndex+Math.max(0,m.progress))/3)*100);bar.style.width=Math.max(4,pct)+'%'}
    };
    const runPass=async(sourceFactory)=>{
      O.setStage(labels[passIndex]||'成分を確認中','成分辞典と照らし合わせる準備をしています');
      try{
        const source=await sourceFactory();
        const result=worker?await worker.recognize(source):await Tesseract.recognize(source,'jpn+eng',{
          workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js',corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.0.0',langPath:'https://tessdata.projectnaptha.com/4.0.0'
        });
        const raw=result?.data?.text||'';
        const ocrConfidence=Number.isFinite(result?.data?.confidence)?result.data.confidence/100:null;
        O.setStage('成分辞典と照らし合わせています','表記ゆれや別名も確認しています');
        passes.push({...SEIBUN.ingredients.parse(raw),raw,ocrConfidence});
      }catch(err){errors.push(`読み取り${passIndex+1}: ${O.errorText(err)}`)}
      passIndex++;
    };

    try{
      try{worker=await O.createWorker(logger)}catch(err){errors.push(`OCR起動: ${O.errorText(err)}`)}
      await runPass(async()=>S.state.scanFile);
      await runPass(()=>O.preprocess(S.state.scanFile,{crop:'ingredient',mode:'contrast'}));
      let merged=O.merge(passes);
      if(precision||merged.found.length<20){await runPass(()=>O.preprocess(S.state.scanFile,{crop:'center',mode:'binary'}));merged=O.merge(passes)}
      try{await worker?.terminate()}catch{}
      O.setStage('結果をまとめています','あなたの悩みと照らし合わせています');
      const bar=S.$('ocrBar');if(bar)bar.style.width='100%';
      S.state.ocrRaw=passes.map((x,i)=>`--- OCR ${i+1} ---\n${x.raw}`).join('\n\n');
      S.state.detected=merged.found;
      O.stopTipRotation();
      if(!passes.length){O.failure(errors);return}
      if(!merged.found.length){O.noMatch(merged,passes,errors);return}
      O.result(merged,passes,errors);
    }catch(err){
      try{await worker?.terminate()}catch{}
      O.stopTipRotation();errors.push(`全体処理: ${O.errorText(err)}`);O.failure(errors);
    }
  };

  O.debug=errors=>errors.length?`<details class="details-v3"><summary>エラー詳細</summary><div class="details-body-v3"><ul>${errors.map(x=>`<li>${S.escape(x)}</li>`).join('')}</ul></div></details>`:'';
  O.failure=errors=>{
    const area=S.$('ocrArea');if(!area)return;
    area.innerHTML=`<section class="recovery-card-v2"><span class="eyebrow">RECOVERY</span><h2>うまく読み取れませんでした</h2><p>ここで終了しなくて大丈夫です。別の方法にすぐ切り替えられます。</p><div class="recovery-grid-v2"><button class="primary" onclick="SEIBUN.ocr.openCamera()">◉ もう一度撮る</button><button class="secondary" onclick="SEIBUN.ocr.manual('')">手入力する</button><button class="secondary" onclick="SEIBUN.render('checker')">テキストを貼る</button></div></section>${O.debug(errors)}`;
  };
  O.noMatch=(merged,passes,errors)=>{
    const area=S.$('ocrArea');if(!area)return;
    area.innerHTML=`<section class="recovery-card-v2"><span class="eyebrow">RECOVERY</span><h2>文字は見えましたが、成分を確定できませんでした</h2><p>反射や湾曲で文字が崩れている可能性があります。</p><div class="recovery-grid-v2"><button class="primary" onclick="SEIBUN.ocr.openCamera()">◉ 撮り直す</button><button class="secondary" onclick="SEIBUN.ocr.manual(SEIBUN.state.ocrRaw)">読み取った文字を修正</button><button class="secondary" onclick="SEIBUN.render('checker')">テキストを貼る</button></div></section>${O.debug(errors)}`;
  };

  O.result=(merged,passes,errors,{recordHistory=true}={})=>{
    if(!S.getProfile()){
      S.state.pendingScanResult={merged,passes,errors};
      const area=S.$('ocrArea');
      if(area)area.innerHTML=`<section class="scan-gate-v2"><span class="eyebrow">あと1タップ</span><h2>${merged.found.length}成分を読み取れました</h2><p>今いちばん気になることを選ぶと、すぐ結果を表示します。</p>${S.skin.concernPickerHtml('scan',true)}</section>`;
      return;
    }
    S.state.lastScanPackage={merged,passes,errors};
    const a=SEIBUN.ingredients.productAnalysis(merged.found,S.getProfile(),merged);
    const rating=SEIBUN.ingredients.displayRating(a);
    if(recordHistory)S.addHistory({
      date:new Date().toLocaleString('ja-JP'),found:merged.found.map(x=>x.name),score:a.score,displayScore:rating.score,
      provisional:rating.provisional,concern:S.getConcern(),source:'ocr',foundCount:merged.found.length
    });
    const q=O.quality(merged),stats=merged.matchStats||{};
    const area=S.$('ocrArea');if(!area)return;
    area.innerHTML=`${SEIBUN.ingredients.analysisHtml(merged.found,merged.unknown,'scan',merged)}
      <details class="details-v3 reading-detail-v2"><summary>読み取り状況</summary><div class="details-body-v3"><p>${merged.found.length}成分を確認。${stats.rejectedAmbiguous||0}件は曖昧なため除外しました。</p>${O.debug(errors)}</div></details>`;
    area.scrollIntoView({behavior:'smooth',block:'start'});
    requestAnimationFrame(S.animate);
  };

  O.tryAnother=()=>{
    S.state.scanFile=null;S.state.ocrRaw='';S.state.detected=[];S.state.pendingScanResult=null;S.state.lastScanPackage=null;
    S.render('scan',{replace:true,instant:true});
  };
  O.startDeepDiagnosis=()=>S.skin.startDeepForScan(S.state.lastScanPackage);
  O.persistResult=()=>{
    S.persistGuestData();
    alert('この端末に保存しました。次回から肌設定と履歴を引き継げます。');
  };

  O.showPendingResult=()=>{
    const pending=S.state.pendingScanResult;
    if(!pending){S.render('scan');return;}
    S.state.pendingScanResult=null;
    S.render('scan',{fromBack:true,instant:true});
    requestAnimationFrame(()=>O.result(pending.merged,pending.passes,pending.errors));
  };

  O.manual=raw=>{
    if(!S.getProfile()){O.pendingManualRaw=raw;O.concernGate('manual');return;}
    const chunks=String(raw||'').split(/--- OCR \d+ ---/).map(x=>x.trim()).filter(Boolean);
    let best=chunks[0]||raw||'',bestN=-1;
    chunks.forEach(x=>{const n=SEIBUN.ingredients.parse(x).found.length;if(n>bestN){bestN=n;best=x}});
    const area=S.$('ocrArea');if(!area){S.render('scan');requestAnimationFrame(()=>O.manual(raw));return}
    area.innerHTML=`<section class="panel"><h2>成分を手入力 / 修正</h2><p class="muted">全成分を貼り付けてもOKです。</p><textarea id="manualOcrText" rows="9">${S.escape(SEIBUN.ingredients.extractRegion(best))}</textarea><div class="actions"><button class="primary" onclick="SEIBUN.ocr.applyManual()">この内容で結果を見る</button><button class="secondary" onclick="SEIBUN.ocr.openCamera()">カメラに戻る</button></div></section>`;
    area.scrollIntoView({behavior:'smooth',block:'center'});
  };
  O.applyManual=()=>{
    const raw=S.$('manualOcrText')?.value||'',parsed=SEIBUN.ingredients.parse(raw);
    if(!parsed.found.length){S.$('ocrArea')?.insertAdjacentHTML('beforeend','<div class="note">成分を確認できませんでした。文字をもう少し修正してください。</div>');return}
    S.state.ocrRaw=raw;S.state.detected=parsed.found;
    O.result({...parsed,avgOcrConfidence:null,matchStats:{exact:parsed.found.length,alias:0,normalized:0,fuzzy:0,rejectedAmbiguous:0}},[{...parsed,raw,ocrConfidence:null}],[]);
  };
  O.reset=()=>{S.state.scanFile=null;S.state.ocrRaw='';S.state.detected=[];S.render('scan',{replace:true,instant:true})};
})();
