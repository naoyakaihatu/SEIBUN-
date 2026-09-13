// SEIBUN NAVI v1.1.0
// Only facts confirmed on official manufacturer pages are included here.
// Marketing complex names are kept separate from ingredient-list names.

const VERIFIED_INGREDIENT_ADDITIONS_V110 = [
  {
    name:'4-n-ブチルレゾルシン',
    aliases:['4－n－ブチルレゾルシン','4-n-Butylresorcinol','ルシノール','ルシノール®'],
    category:'医薬部外品有効成分',
    goals:['美白'],
    summary:'ポーラ公式で「ルシノール」として確認できる美白有効成分の表示名。',
    caution:'医薬部外品で有効成分として表示されている製品について、承認された範囲で確認します。',
    v06:{roleCode:'brightening_active',attention:'処方依存',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'デクスパンテノールW',
    aliases:['PCE-DP','PCE－DP','PCE-DP®','Dexpanthenol W'],
    category:'医薬部外品有効成分',
    goals:['美白','肌荒れ'],
    summary:'ポーラ公式でPCE-DPとして確認できる医薬部外品有効成分。',
    caution:'商品が医薬部外品で、実際の有効成分表示に記載されているかを確認します。',
    v06:{roleCode:'brightening_active',attention:'処方依存',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'三フッ化イソプロピルオキソプロピルアミノカルボニルピロリジンカルボニルメチルプロピルアミノカルボニルベンゾイルアミノ酢酸Na',
    aliases:['ニールワン','ニールワン®'],
    category:'医薬部外品有効成分',
    goals:['ハリ'],
    summary:'ポーラ公式で「ニールワン」として確認できるシワ改善の医薬部外品有効成分。',
    caution:'シワ改善の有効成分としての扱いは、医薬部外品の有効成分表示がある製品に限って確認します。',
    v06:{roleCode:'peptide',attention:'処方依存',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'カモミラET',
    aliases:['Chamomilla ET'],
    category:'医薬部外品有効成分',
    goals:['美白'],
    summary:'花王公式でカミツレ由来の植物エキスとして説明される美白有効成分。',
    caution:'医薬部外品の有効成分として表示されている製品で、承認された効能の範囲を確認します。',
    v06:{roleCode:'brightening_active',attention:'処方依存',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'ヘキサデシロキシPGヒドロキシエチルヘキサデカナミド',
    aliases:['Hexadecyloxy PG Hydroxyethyl Hexadecanamide'],
    category:'保湿・エモリエント',
    goals:['乾燥','バリア機能'],
    summary:'花王公式で「セラミド機能成分」として示されている保湿成分の一つ。',
    caution:'皮膚にもともと存在するセラミドそのものと同一という意味ではありません。',
    v06:{roleCode:'emollient',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'セチルPGヒドロキシエチルパルミタミド',
    aliases:['Cetyl-PG Hydroxyethyl Palmitamide'],
    category:'保湿・エモリエント',
    goals:['乾燥','バリア機能'],
    summary:'花王公式製品情報で「セラミド機能成分」として示されている保湿成分。',
    caution:'皮膚にもともと存在するセラミドそのものと同一という意味ではありません。',
    v06:{roleCode:'emollient',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'エクトイン',
    aliases:['Ectoin'],
    category:'保湿・整肌',
    goals:['乾燥'],
    summary:'花王公式の独自複合保湿成分「エクトビオシス」の構成成分として確認できる成分。',
    caution:'複合成分名と単独成分の働きを同一視せず、実際の全成分表示を優先します。',
    v06:{roleCode:'humectant',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'コハク酸ジグリコールグアニジン',
    aliases:['Diglycol Guanidine Succinate'],
    category:'保湿・整肌',
    goals:['乾燥'],
    summary:'花王公式の独自複合保湿成分「エクトビオシス」の構成成分として確認できる成分。',
    caution:'複合成分としての説明と、単独成分の評価は分けて扱います。',
    v06:{roleCode:'humectant',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'コハク酸2-(2-ヒドロキシエトキシ)エチルグアニジン',
    aliases:['コハク酸2－（2－ヒドロキシエトキシ）エチルグアニジン'],
    category:'保湿・整肌',
    goals:['乾燥'],
    summary:'カネボウ化粧品公式の独自開発複合成分の構成成分として確認できる成分。',
    caution:'メーカー複合成分の構成要素としての事実と、単独成分の効果を分けて表示します。',
    v06:{roleCode:'humectant',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'アセチルグルコサミン',
    aliases:['Acetyl Glucosamine','N-Acetyl Glucosamine','酢酸キトサミン'],
    category:'保湿・整肌',
    goals:['乾燥','キメ'],
    summary:'カネボウ化粧品公式の独自開発複合成分の構成成分として確認できる成分。',
    caution:'実際の配合目的は製品表示・メーカー説明を確認します。',
    v06:{roleCode:'humectant',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'メチルセリン',
    aliases:['N-メチル-L-セリン','N-Methyl-L-Serine'],
    category:'保湿・整肌',
    goals:['乾燥'],
    summary:'カネボウ化粧品公式の独自開発複合成分の構成成分として確認できる成分。',
    caution:'複合成分の構成要素としての掲載であり、単独で同じ説明を保証するものではありません。',
    v06:{roleCode:'humectant',attention:'通常',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'ワレモコウエキス',
    aliases:['Sanguisorba Officinalis Root Extract'],
    category:'植物エキス・整肌',
    goals:['キメ'],
    summary:'カネボウ化粧品公式の独自開発複合成分の構成成分として確認できる植物由来成分。',
    caution:'植物由来であることだけで刺激性・安全性を断定しません。',
    v06:{roleCode:'botanical_extract',attention:'反応歴確認',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'セイヨウニワトコエキス',
    aliases:['Sambucus Nigra Extract','Elder Extract'],
    category:'植物エキス・整肌',
    goals:['キメ'],
    summary:'カネボウ化粧品公式の独自開発複合保湿成分の構成成分として確認できる植物由来成分。',
    caution:'植物由来であることだけで刺激性・安全性を断定しません。',
    v06:{roleCode:'botanical_extract',attention:'反応歴確認',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'チョウジ抽出液',
    aliases:['チョウジエキス','Clove Extract'],
    category:'植物エキス・整肌',
    goals:['キメ'],
    summary:'花王・カネボウ化粧品の公式情報で複合保湿成分の構成要素として確認できる成分。',
    caution:'植物由来成分のため、過去の反応歴がある場合は商品全体で確認します。',
    v06:{roleCode:'botanical_extract',attention:'反応歴確認',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'海藻エキス-1',
    aliases:['海藻エキス－1','Algae Extract-1'],
    category:'植物・海藻由来整肌',
    goals:['乾燥','キメ'],
    summary:'カネボウ化粧品公式の独自開発複合保湿成分の構成成分として確認できる成分。',
    caution:'複合成分の構成要素としての掲載です。',
    v06:{roleCode:'botanical_extract',attention:'反応歴確認',detailLevel:3,sourceKeys:[]}
  },
  {
    name:'米エキスNo.11',
    aliases:['ライスパワーNo.11','ライスパワー®No.11','Rice Power No.11'],
    category:'医薬部外品有効成分',
    goals:['乾燥','バリア機能'],
    summary:'コーセー公式ページで「肌の水分保持能改善」が認められた有効成分として説明される米由来成分。',
    caution:'コーセー独自開発成分という意味ではありません。商品が医薬部外品で実際の有効成分表示に記載されているか確認します。',
    v06:{roleCode:'humectant',attention:'処方依存',detailLevel:3,sourceKeys:[]}
  }
];


const VERIFIED_COMMON_GROUPS_V110 = [
  {
    names:['精製水','海水','温泉水'],
    category:'基剤',goals:[],roleCode:'solvent',
    summary:'化粧品の基剤として用いられる水系成分。製品の剤型や他成分を溶かす土台になります。',
    caution:'この成分だけで製品の保湿力や刺激性を判断しません。'
  },
  {
    names:['エタノール','変性アルコール','PG'],
    category:'溶剤・基剤',goals:[],roleCode:'solvent',
    summary:'溶剤や感触調整など、処方を組み立てる目的で使われる成分。',
    caution:'配合量・製品カテゴリー・肌状態によって使用感や刺激感は変わります。'
  },
  {
    names:['PEG-8','PEG-32','PEG-75','キシリトール','マルチトール','マンニトール','グルコース','スクロース','イノシトール'],
    category:'保湿・処方補助',goals:['乾燥'],roleCode:'humectant',
    summary:'水分を保持する保湿や、処方の感触・安定性を補助する目的で使われる成分。',
    caution:'単独成分の量は全成分表示だけでは分からないため、製品全体で見ます。'
  },
  {
    names:['PEG-150'],
    category:'増粘・処方補助',goals:[],roleCode:'thickener',
    summary:'粘度調整や処方安定化などに使われる高分子系成分。',
    caution:'美容効果を目的とした成分とは限らず、製品の物性を支える役割が中心です。'
  },
  {
    names:['加水分解ヒアルロン酸','アセチルヒアルロン酸Na','ヒアルロン酸クロスポリマーNa','β-グルカン','ポリクオタニウム-61','グリコシルトレハロース','加水分解水添デンプン'],
    category:'保湿・皮膜',goals:['乾燥'],roleCode:'humectant',
    summary:'保湿や皮膜形成などを通じて、化粧品のうるおい感を支える目的で使われる成分。',
    caution:'分子量・配合量・組み合わせで使用感は変わります。'
  },
  {
    names:['スクワレン','流動パラフィン','ミツロウ','水添ポリイソブテン','水添ポリデセン','エチルヘキサン酸セチル','イソノナン酸イソノニル','オクチルドデカノール','セタノール','ステアリルアルコール','ベヘニルアルコール','セテアリルアルコール','イソドデカン'],
    category:'油性・エモリエント',goals:['乾燥'],roleCode:'emollient',
    summary:'肌表面をなめらかに整える、油性感や伸びを調整するなどの目的で使われる油性・エモリエント成分。',
    caution:'重さ・さらさら感などの使用感は成分単体ではなく処方全体で決まります。'
  },
  {
    names:['アモジメチコン','ジメチコノール','PEG-10ジメチコン','PEG-9ポリジメチルシロキシエチルジメチコン','（ジメチコン／ビニルジメチコン）クロスポリマー'],
    category:'シリコーン・皮膜・感触調整',goals:[],roleCode:'silicone',
    summary:'滑り、皮膜、感触、乳化補助など製品の使い心地や仕上がりを調整するシリコーン系成分。',
    caution:'シリコーンという分類だけで毛穴詰まりや安全性を一律に判断しません。'
  },
  {
    names:['オレイン酸ソルビタン','イソステアリン酸ソルビタン','ラウリン酸ポリグリセリル-10','ジイソステアリン酸ポリグリセリル-2','リゾレシチン'],
    category:'乳化・界面活性',goals:[],roleCode:'emulsifier',
    summary:'水と油をなじませる乳化・分散など、処方を安定させる目的で使われる成分。',
    caution:'界面活性剤という分類だけで刺激性を一律に判断しません。'
  },
  {
    names:['ココイルグルタミン酸TEA','ラウロイルメチルアラニンNa','ココイルメチルタウリンNa','コカミドプロピルベタイン','デシルグルコシド'],
    category:'洗浄・界面活性',goals:[],roleCode:'surfactant',
    summary:'洗顔料やクレンジングなどで汚れを落とす、または処方をなじませる目的で使われる界面活性成分。',
    caution:'洗浄力や刺激感は単一成分だけでなく、濃度・組み合わせ・製品pHなどで変わります。'
  },
  {
    names:['ヒドロキシプロピルメチルセルロース','アルギン酸Na','カラギーナン','ジェランガム','プルラン','シリカ','ベントナイト'],
    category:'増粘・安定化',goals:[],roleCode:'thickener',
    summary:'粘度、ゲル形成、分散、皮膜など製品の物性や安定性を支える目的で使われる成分。',
    caution:'美容効果を直接示す成分とは限らず、処方上の役割が中心です。'
  },
  {
    names:['リンゴ酸','コハク酸'],
    category:'pH調整・処方補助',goals:[],roleCode:'ph_adjuster',
    summary:'pH調整や処方補助などに使われる有機酸。',
    caution:'角質ケア効果を目的とするかどうかは濃度や製品設計によるため、成分名だけでは断定しません。'
  }
];

for(const group of VERIFIED_COMMON_GROUPS_V110){
  for(const name of group.names){
    const item={
      name,
      aliases:[],
      category:group.category,
      goals:[...group.goals],
      summary:group.summary,
      caution:group.caution,
      v06:{
        roleCode:group.roleCode,
        attention:'通常',
        detailLevel:2,
        sourceKeys:['jcia_names','cosing']
      },
      sources:[
        {label:SOURCE_REGISTRY_V06.jcia_names.label,url:SOURCE_REGISTRY_V06.jcia_names.url,role:'表示名称確認'},
        {label:SOURCE_REGISTRY_V06.cosing.label,url:SOURCE_REGISTRY_V06.cosing.url,role:'化粧品機能分類の補助確認'}
      ],
      verifiedAt:'2026-08-24',
      status:'表示名称・機能分類確認済み'
    };
    const current=INGREDIENTS.find(x=>x.name===name);
    if(current) Object.assign(current,{...item,aliases:current.aliases?.length?current.aliases:item.aliases});
    else INGREDIENTS.push(item);
  }
}

for(const item of VERIFIED_INGREDIENT_ADDITIONS_V110){
  const current=INGREDIENTS.find(x=>x.name===item.name);
  if(current) Object.assign(current,item);
  else INGREDIENTS.push(item);
}

const OFFICIAL_COMPANY_FACTS_V110 = [
  {
    id:'shiseido-4msk',
    displayName:'4MSK',
    company:'資生堂',
    relation:'薬事開発・公式解説',
    type:'美白有効成分',
    ingredientNames:['4MSK','4-メトキシサリチル酸カリウム塩'],
    actual:'4-メトキシサリチル酸カリウム塩',
    summary:'資生堂公式で美白有効成分として説明される成分。メラニンの生成を抑え、シミ・そばかすを防ぐ範囲で扱います。',
    source:{label:'資生堂オンラインストア 美白有効成分5選',url:'https://www.shiseido.co.jp/sw/onlinestore/servicegarden/beautytopics/20240827/article01.html'}
  },
  {
    id:'shiseido-mtxa',
    displayName:'m-トラネキサム酸',
    company:'資生堂',
    relation:'公式呼称・公式解説',
    type:'美白有効成分',
    ingredientNames:['トラネキサム酸'],
    actual:'トラネキサム酸',
    summary:'資生堂公式で美白有効成分として説明されるトラネキサム酸の呼称。商品上の実際の有効成分表示を優先します。',
    source:{label:'資生堂 HAKU 成分の進化',url:'https://www.shiseido.co.jp/sp/haku/laboratory/ingredient.html'}
  },
  {
    id:'pola-neilone',
    displayName:'ニールワン®',
    company:'ポーラ',
    relation:'独自開発',
    type:'シワ改善有効成分',
    ingredientNames:['三フッ化イソプロピルオキソプロピルアミノカルボニルピロリジンカルボニルメチルプロピルアミノカルボニルベンゾイルアミノ酢酸Na'],
    actual:'三フッ化イソプロピルオキソプロピルアミノカルボニルピロリジンカルボニルメチルプロピルアミノカルボニルベンゾイルアミノ酢酸Na',
    summary:'ポーラ公式で独自開発のシワ改善有効成分として説明される成分。',
    source:{label:'ポーラ リンクルショット 商品ラインナップ',url:'https://www.pola.co.jp/brand/wrinkle/products/index.html'}
  },
  {
    id:'pola-rucinol',
    displayName:'ルシノール®',
    company:'ポーラ',
    relation:'承認取得・公式解説',
    type:'美白有効成分',
    ingredientNames:['4-n-ブチルレゾルシン'],
    actual:'4-n-ブチルレゾルシン',
    summary:'ポーラ公式で1998年に承認を得た美白有効成分として説明される成分。',
    source:{label:'ポーラ ホワイトショット サイエンス',url:'https://www.pola.co.jp/brand/whiteshot/science/index.html'}
  },
  {
    id:'pola-pcedp',
    displayName:'PCE-DP®',
    company:'ポーラ',
    relation:'公式解説',
    type:'美白・肌荒れ防止有効成分',
    ingredientNames:['デクスパンテノールW'],
    actual:'デクスパンテノールW',
    summary:'ポーラ公式でPCE-DPとして説明される医薬部外品有効成分。メラニンの蓄積を抑えシミ・そばかすを防ぐ効能と肌荒れ防止の効能が説明されています。',
    source:{label:'ポーラ ホワイトショット サイエンス',url:'https://www.pola.co.jp/brand/whiteshot/science/index.html'}
  },
  {
    id:'kao-chamomilla',
    displayName:'カモミラET',
    company:'花王',
    relation:'研究・公式解説',
    type:'美白有効成分',
    ingredientNames:['カモミラET'],
    actual:'カモミラET',
    summary:'花王公式でカミツレから抽出した植物由来の有効成分として説明される成分。',
    source:{label:'花王 機能性素材の開発',url:'https://www.kao.com/jp/innovation/research-development/fundamental/biological-science/functional-material/'}
  },
  {
    id:'kao-ceramide-functional',
    displayName:'セラミド機能成分',
    company:'花王',
    relation:'公式呼称',
    type:'保湿成分',
    ingredientNames:['ヘキサデシロキシPGヒドロキシエチルヘキサデカナミド','セチルPGヒドロキシエチルパルミタミド'],
    actual:'製品により表示成分が異なるため全成分表示を確認',
    summary:'花王公式で「セラミド機能成分」と呼ばれる保湿成分群。皮膚のセラミドそのものと同一という意味ではありません。',
    source:{label:'花王 微細乳化技術とスキンケア製品への応用',url:'https://www.kao.com/jp/innovation/research-development/fundamental/production-technology/micromixer/'}
  },
  {
    id:'kao-ectobiosis',
    displayName:'エクトビオシス',
    company:'花王 est',
    relation:'独自開発複合成分',
    type:'保湿複合成分',
    ingredientNames:['エクトイン','コハク酸ジグリコールグアニジン','トレハロース','グリセリン'],
    actual:'エクトイン＋コハク酸ジグリコールグアニジン＋トレハロース＋グリセリン',
    summary:'花王公式で独自開発の保湿複合成分として構成が明示されています。',
    source:{label:'花王 est 新・砂漠スキンケア ニュースリリース',url:'https://www.kao.com/jp/newsroom/news/release/2025/20250807-001/'}
  },
  {
    id:'kanebo-bounce-light',
    displayName:'バウンスライトディフュージョン',
    company:'カネボウ化粧品 DEW',
    relation:'独自開発複合成分',
    type:'保湿複合成分',
    ingredientNames:['コハク酸2-(2-ヒドロキシエトキシ)エチルグアニジン','DPG','アセチルグルコサミン','メチルセリン','ワレモコウエキス'],
    actual:'公式ページに構成成分が明記',
    summary:'カネボウ化粧品公式で独自開発成分として構成が明示されている保湿複合成分。',
    source:{label:'DEW ブライトバウンスミルク',url:'https://www.kanebo-cosmetics.jp/dew/products/holic/bright_bounce/'}
  },
  {
    id:'kanebo-balance-clear-c',
    displayName:'バランスクリアC',
    company:'カネボウ化粧品 DEW',
    relation:'独自開発複合成分',
    type:'保湿複合成分',
    ingredientNames:['セイヨウニワトコエキス','チョウジ抽出液','海藻エキス-1'],
    actual:'セイヨウニワトコエキス＋チョウジ抽出液＋海藻エキス-1',
    summary:'カネボウ化粧品公式で独自開発成分として構成が明示されている保湿複合成分。',
    source:{label:'DEW ブライトニングUVデイエッセンス',url:'https://www.kanebo-cosmetics.jp/dew/products/brightening/uv_day_essence/'}
  },
  {
    id:'kose-kojic',
    displayName:'コウジ酸',
    company:'コーセー',
    relation:'長期研究・公式解説',
    type:'美白有効成分',
    ingredientNames:['コウジ酸'],
    actual:'コウジ酸',
    summary:'コーセー公式で1988年に美白有効成分として認可された成分として説明されています。',
    source:{label:'Maison KOSÉ コウジ酸',url:'https://maison.kose.co.jp/site/p/kojicacid.aspx'}
  },
  {
    id:'kose-ricepower11',
    displayName:'ライスパワー® No.11',
    company:'コーセー ONE BY KOSÉ',
    relation:'公式採用・解説',
    type:'水分保持能改善有効成分',
    ingredientNames:['米エキスNo.11'],
    actual:'米エキスNo.11',
    summary:'コーセー公式で「肌の水分保持能改善」が認められた有効成分として説明されています。コーセー独自開発という意味ではありません。',
    source:{label:'ONE BY KOSÉ 発酵サイエンス',url:'https://maison.kose.co.jp/site/p/onebykose-hakkoscience.aspx'}
  }
];


for(const fact of OFFICIAL_COMPANY_FACTS_V110){
  for(const name of fact.ingredientNames||[]){
    const ing=INGREDIENTS.find(x=>x.name===name);
    if(!ing)continue;
    const officialSource={label:`${fact.company}公式：${fact.displayName}`,url:fact.source.url,role:'メーカー公式情報'};
    ing.sources=[officialSource,...(ing.sources||[]).filter(x=>x.url!==officialSource.url)];
    ing.verifiedAt='2026-08-24';
    ing.status='メーカー公式情報確認済み';
  }
}


// Matching weights are SEIBUN NAVI's own purpose-mapping rules, not manufacturer efficacy scores.
const INGREDIENT_WEIGHTS_V110 = {
  '4-n-ブチルレゾルシン':{tone:.95},
  'デクスパンテノールW':{tone:.8,rough:.45},
  '三フッ化イソプロピルオキソプロピルアミノカルボニルピロリジンカルボニルメチルプロピルアミノカルボニルベンゾイルアミノ酢酸Na':{firm:.95},
  'カモミラET':{tone:.9},
  'ヘキサデシロキシPGヒドロキシエチルヘキサデカナミド':{dry:.75},
  'セチルPGヒドロキシエチルパルミタミド':{dry:.75},
  'エクトイン':{dry:.45},
  '米エキスNo.11':{dry:.9,rough:.25}
};
