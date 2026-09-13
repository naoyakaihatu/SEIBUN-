(()=>{
  const S=SEIBUN,O={};S.ocr=O;
  O.tips=[];O.tipIndex=0;O.tipTimer=null;
  O.neutralProfile=()=>({mode:'none',name:'肌タイプ未設定',scores:{dry:50,oil:50,reactive:40,tone:40,firm:40,pore:45},season:S.currentSeason()});
  O.profile=()=>S.state.profile||O.neutralProfile();

  O.chooseFile=()=>S.$('scanInput')?.click();
  O.fileSelected=e=>{const file=e.target.files?.[0];if(!file)return;S.state.scanFile=file;S.render('scanConfirm')};
  O.reset=()=>{S.state.scanFile=null;S.state.lastScan=null;S.render('scan',{replace:true})};
  O.startScan=()=>{if(!S.state.scanFile)return;O.run()};

  O.openCamera=async()=>{
    if(!navigator.mediaDevices?.getUserMedia){S.toast('このブラウザではカメラを直接開けません');O.chooseFile();return}
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false});
      S.state.cameraStream=stream;S.state.brightnessState={dark:0,bright:0};
      S.openDialog(`<div class="camera-shell"><div class="camera-head"><strong>成分欄を枠の中へ</strong><button onclick="SEIBUN.ocr.stopCamera();SEIBUN.closeDialog()">×</button></div><div class="camera-stage"><video id="cameraVideo" autoplay playsinline muted></video><div class="camera-frame"><span>全成分が入るように</span></div><div id="brightnessBadge" class="brightness-badge">明るさを確認中…</div></div><div class="camera-actions"><button class="button ghost" onclick="SEIBUN.ocr.stopCamera();SEIBUN.closeDialog();SEIBUN.ocr.chooseFile()">写真から選ぶ</button><button class="camera-shot" onclick="SEIBUN.ocr.capture()" aria-label="撮影"></button></div></div>`);
      const video=S.$('cameraVideo');video.srcObject=stream;await video.play();O.startBrightnessAssist(video);
    }catch(err){console.warn(err);S.toast('カメラを開けませんでした。写真選択を使えます');O.chooseFile()}
  };
  O.stopCamera=()=>{clearInterval(S.state.cameraTimer);S.state.cameraTimer=null;(S.state.cameraStream?.getTracks?.()||[]).forEach(t=>t.stop());S.state.cameraStream=null};
  O.startBrightnessAssist=video=>{
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    clearInterval(S.state.cameraTimer);
    S.state.cameraTimer=setInterval(()=>{
      if(!video.videoWidth)return;canvas.width=96;canvas.height=72;
      const sw=video.videoWidth*.55,sh=video.videoHeight*.48,sx=(video.videoWidth-sw)/2,sy=(video.videoHeight-sh)/2;
      ctx.drawImage(video,sx,sy,sw,sh,0,0,96,72);const d=ctx.getImageData(0,0,96,72).data;let sum=0;for(let i=0;i<d.length;i+=16)sum+=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];const avg=sum/(d.length/16);
      const st=S.state.brightnessState,cfg=APP_CONFIG.camera;st.dark=avg<cfg.darkThreshold?st.dark+1:0;st.bright=avg>cfg.brightThreshold?st.bright+1:0;
      const badge=S.$('brightnessBadge');if(!badge)return;
      if(st.dark>=cfg.consecutiveWarnings){badge.textContent='少し暗いかも';badge.dataset.tone='warn'}else if(st.bright>=cfg.consecutiveWarnings){badge.textContent='反射が強いかも';badge.dataset.tone='warn'}else{badge.textContent='この明るさでOK';badge.dataset.tone='ok'}
    },APP_CONFIG.camera.sampleIntervalMs);
  };
  O.capture=()=>{
    const video=S.$('cameraVideo');if(!video?.videoWidth)return;
    const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);
    canvas.toBlob(blob=>{if(!blob)return;S.state.scanFile=new File([blob],`seibun-${Date.now()}.jpg`,{type:'image/jpeg'});O.stopCamera();S.closeDialog();S.render('scanConfirm')},'image/jpeg',.92);
  };

  O.imageUrl=()=>S.state.scanFile?URL.createObjectURL(S.state.scanFile):'';
  O.processedCanvas=async file=>{
    const bitmap=await createImageBitmap(file);const maxW=1800,scale=Math.min(1,maxW/bitmap.width);const c=document.createElement('canvas');c.width=Math.round(bitmap.width*scale);c.height=Math.round(bitmap.height*scale);const x=c.getContext('2d');x.drawImage(bitmap,0,0,c.width,c.height);const img=x.getImageData(0,0,c.width,c.height),d=img.data;for(let i=0;i<d.length;i+=4){const g=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];const v=Math.max(0,Math.min(255,(g-128)*1.45+128));d[i]=d[i+1]=d[i+2]=v}x.putImageData(img,0,0);return c;
  };
  O.startTips=()=>{
    O.tips=[...OCR_TIPS].sort(()=>Math.random()-.5);O.tipIndex=0;
    const update=()=>{const tip=O.tips[O.tipIndex++%O.tips.length],title=S.$('tipTitle'),body=S.$('tipBody');if(title){title.classList.remove('tip-pop');void title.offsetWidth;title.textContent=tip[0];body.textContent=tip[1];title.classList.add('tip-pop')}};
    update();clearInterval(O.tipTimer);O.tipTimer=setInterval(update,APP_CONFIG.ocr.tipIntervalMs);
  };
  O.stopTips=()=>{clearInterval(O.tipTimer);O.tipTimer=null};
  O.setProgress=(p,text)=>{const bar=S.$('ocrBar'),pct=S.$('ocrPercent'),status=S.$('ocrStatus');if(bar)bar.style.width=`${Math.round(p*100)}%`;if(pct)pct.textContent=`${Math.round(p*100)}%`;if(status&&text)status.textContent=text};

  O.recognize=async(source,label='成分を読み取っています')=>{
    let latest=0;
    const result=await Tesseract.recognize(source,'jpn+eng',{logger:m=>{if(m.status==='recognizing text'){latest=m.progress||0;O.setProgress(latest*.82,label)}}});
    return {raw:result?.data?.text||'',confidence:Number(result?.data?.confidence||0)/100};
  };
  O.run=async()=>{
    S.render('ocrLoading',{replace:true});O.startTips();O.setProgress(.03,'画像を整えています');
    try{
      const first=await O.recognize(S.state.scanFile,'文字を読み取っています');let parsed=S.ingredients.parse(first.raw),passes=[first];
      if(parsed.found.length<5){O.setProgress(.84,'読み取りを整えています');const canvas=await O.processedCanvas(S.state.scanFile);const second=await O.recognize(canvas,'もう一度、文字を確認しています');passes.push(second);const p2=S.ingredients.parse(second.raw);const map=new Map();[...parsed.found,...p2.found].forEach(x=>map.set(x.name,x));parsed={found:[...map.values()],unknown:S.unique([...(parsed.unknown||[]),...(p2.unknown||[])])}}
      O.setProgress(.94,'成分辞典と照らし合わせています');await new Promise(r=>setTimeout(r,380));
      O.finish(parsed,passes);
    }catch(err){console.error(err);O.stopTips();S.state.lastScan={error:true};S.render('ocrError',{replace:true})}
  };
  O.finish=(parsed,passes)=>{
    O.stopTips();O.setProgress(1,'結果を作っています');
    const profile=S.state.profile;const rating=profile?S.ingredients.rateProduct(parsed.found,profile):null;
    S.state.lastScan={found:parsed.found,unknown:parsed.unknown,passes,profile,rating,createdAt:new Date().toISOString()};
    if(parsed.found.length){S.addHistory({id:Date.now(),date:S.today(),createdAt:new Date().toISOString(),type:profile?.code||profile?.name||'未設定',typeName:profile?.name||'肌タイプ未設定',stars:rating?.stars||null,score:rating?.score||null,provisional:rating?.provisional||false,ingredients:parsed.found.slice(0,12).map(x=>x.name)})}
    S.render(parsed.found.length?'productResult':'ocrNoMatch',{replace:true});
  };
  O.applyManual=()=>{const raw=S.$('manualText')?.value||'';const parsed=S.ingredients.parse(raw);if(!parsed.found.length){S.toast('成分名を確認できませんでした');return}const profile=S.state.profile,rating=profile?S.ingredients.rateProduct(parsed.found,profile):null;S.state.lastScan={found:parsed.found,unknown:parsed.unknown,passes:[{raw,confidence:null}],profile,rating,createdAt:new Date().toISOString()};S.addHistory({id:Date.now(),date:S.today(),createdAt:new Date().toISOString(),type:profile?.code||profile?.name||'未設定',typeName:profile?.name||'肌タイプ未設定',stars:rating?.stars||null,score:rating?.score||null,provisional:rating?.provisional||false,ingredients:parsed.found.slice(0,12).map(x=>x.name)});S.render('productResult',{replace:true})};
})();
