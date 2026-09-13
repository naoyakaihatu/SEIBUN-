// SEIBUN NAVI — seasonal skin questions and anonymous research schema.
// Demographics are optional and are NOT used in the current matching score.

const SKIN_RESEARCH = {
  ageBands: [
    ['','回答しない'],
    ['teens','10代'],
    ['20s','20代'],
    ['30s','30代'],
    ['40s','40代'],
    ['50s','50代'],
    ['60plus','60代以上']
  ],
  genders: [
    ['','回答しない'],
    ['female','女性'],
    ['male','男性'],
    ['other','その他']
  ],
  seasons: [
    ['spring','春'],
    ['summer','夏'],
    ['autumn','秋'],
    ['winter','冬']
  ],
  currentSeason(){
    const m=new Date().getMonth()+1;
    if(m>=3&&m<=5)return 'spring';
    if(m>=6&&m<=8)return 'summer';
    if(m>=9&&m<=11)return 'autumn';
    return 'winter';
  },
  seasonLabel(id){
    return this.seasons.find(x=>x[0]===id)?.[1]||'季節';
  },
  seasonalQuestions: {
    spring: [
      {id:'season_spring_sens',q:'この春、花粉や風の強い日に肌がいつもより不安定だと感じますか？',axis:'sens',seasonal:true,opts:[['よく感じる',3],['ときどき',2],['少し',1],['感じない',0]]},
      {id:'season_spring_dry',q:'この春、頬や口元の乾燥・つっぱりが気になりますか？',axis:'dry',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
      {id:'season_spring_uv',q:'春になって屋外で過ごす時間や日差しが増えましたか？',axis:'uv',seasonal:true,opts:[['かなり増えた',3],['少し増えた',2],['あまり変わらない',1],['ほぼ屋内',0]]}
    ],
    summer: [
      {id:'season_summer_oil',q:'この夏、汗や皮脂によるベタつき・テカリが気になりますか？',axis:'oil',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
      {id:'season_summer_uv',q:'この夏、日中に屋外で過ごす時間は長いですか？',axis:'uv',seasonal:true,opts:[['かなり長い',3],['やや長い',2],['短い',1],['ほぼ屋内',0]]},
      {id:'season_summer_dry',q:'冷房の効いた室内で乾燥感を感じることがありますか？',axis:'dry',seasonal:true,opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]}
    ],
    autumn: [
      {id:'season_autumn_dry',q:'この秋、夏より乾燥感が増えたと感じますか？',axis:'dry',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['感じない',0]]},
      {id:'season_autumn_rough',q:'この秋、肌のごわつき・ざらつきが気になりますか？',axis:'rough',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
      {id:'season_autumn_tone',q:'夏の終わり以降、シミ・くすみ・色ムラが気になりますか？',axis:'tone',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]}
    ],
    winter: [
      {id:'season_winter_dry',q:'この冬、暖房のある室内や外気で乾燥を強く感じますか？',axis:'dry',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['感じない',0]]},
      {id:'season_winter_sens',q:'寒さや乾燥でヒリつき・赤みなどを感じやすくなっていますか？',axis:'sens',seasonal:true,opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
      {id:'season_winter_rough',q:'この冬、粉ふき・ごわつきなど肌表面の変化が気になりますか？',axis:'rough',seasonal:true,opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]}
    ]
  },
  survey: {
    primaryConcern: [
      ['dry','乾燥・つっぱり'],
      ['pore','毛穴・皮脂'],
      ['sens','敏感・赤み'],
      ['tone','シミ・くすみ'],
      ['firm','ハリ不足'],
      ['rough','肌荒れ・ざらつき'],
      ['none','特に決まっていない']
    ],
    productNeed: [
      ['toner','化粧水'],
      ['serum','美容液'],
      ['emulsion','乳液'],
      ['cream','クリーム'],
      ['cleanser','洗顔・クレンジング'],
      ['sunscreen','日焼け止め'],
      ['none','まだ決めていない']
    ],
    decisionNeed: [
      ['fit','自分に合いそうか知りたい'],
      ['ingredients','成分の役割を知りたい'],
      ['irritation','刺激が気になる成分を確認したい'],
      ['routine','今のケアの不足を知りたい'],
      ['compare','商品を比較したい']
    ]
  }
};
