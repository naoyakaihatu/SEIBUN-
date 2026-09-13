const INGREDIENTS = [
  {name:'セラミドNP',aliases:['Ceramide NP','セラミド3'],category:'保湿・エモリエント',goals:['乾燥','バリア機能'],summary:'角層のうるおいを保つために使われるセラミド系成分の一つ。',caution:'製品全体の処方や配合量で使用感は変わります。'},
  {name:'グリセリン',aliases:['Glycerin','濃グリセリン'],category:'保湿',goals:['乾燥'],summary:'水分を抱え込み、肌のうるおいを保つ目的で広く使われる保湿成分。',caution:'高配合では使用感にべたつきを感じることがあります。'},
  {name:'ヒアルロン酸Na',aliases:['Sodium Hyaluronate'],category:'保湿',goals:['乾燥'],summary:'水分を保持する目的で使われる代表的な保湿成分。',caution:'分子量や処方によって感触が異なります。'},
  {name:'ナイアシンアミド',aliases:['Niacinamide','ニコチン酸アミド'],category:'多機能・有効成分になる場合あり',goals:['乾燥','ハリ','美白','肌荒れ'],summary:'化粧品や医薬部外品で幅広く使われるビタミンB群由来成分。',caution:'製品ごとに配合目的が異なるため表示を確認してください。'},
  {name:'レチノール',aliases:['Retinol'],category:'整肌',goals:['ハリ','キメ'],summary:'ビタミンAの一種で、エイジングケア目的の製品などに使われます。',caution:'刺激や乾燥を感じる場合があるため、製品の使用方法に従ってください。'},
  {name:'アスコルビン酸',aliases:['Vitamin C','ビタミンC'],category:'整肌・抗酸化',goals:['くすみ','皮脂','キメ'],summary:'ビタミンCそのもの。化粧品では安定性や処方の工夫が重要です。',caution:'処方や濃度により刺激感が異なることがあります。'},
  {name:'トラネキサム酸',aliases:['Tranexamic Acid'],category:'有効成分になる場合あり',goals:['美白','肌荒れ'],summary:'医薬部外品では承認された目的で有効成分として使われることがあります。',caution:'化粧品・医薬部外品で位置づけが異なるため商品表示を確認してください。'},
  {name:'グリチルリチン酸2K',aliases:['Dipotassium Glycyrrhizate'],category:'肌荒れ防止・有効成分になる場合あり',goals:['肌荒れ'],summary:'甘草由来成分で、肌荒れを防ぐ目的の製品に用いられます。',caution:'有効成分かどうかは医薬部外品表示を確認してください。'},
  {name:'アラントイン',aliases:['Allantoin'],category:'整肌・有効成分になる場合あり',goals:['肌荒れ'],summary:'肌をすこやかに保つ目的で使われる成分。',caution:'配合目的は製品区分・表示を確認してください。'},
  {name:'サリチル酸',aliases:['Salicylic Acid','BHA'],category:'角質ケア',goals:['角質','毛穴'],summary:'角質ケア目的の製品などで使われる成分。',caution:'刺激を感じる場合があるため、製品の用法に従ってください。'},
  {name:'スクワラン',aliases:['Squalane'],category:'エモリエント',goals:['乾燥'],summary:'肌表面の水分蒸散を抑える目的で使われる油性成分。',caution:'使用感の好みには個人差があります。'},
  {name:'ワセリン',aliases:['Petrolatum'],category:'保護・エモリエント',goals:['乾燥'],summary:'肌表面を覆い、水分蒸散を防ぐ目的で使われる成分。',caution:'油性感を感じやすい場合があります。'},
  {name:'BG',aliases:['Butylene Glycol','1,3-ブチレングリコール'],category:'保湿・溶剤',goals:['乾燥'],summary:'保湿や溶剤として幅広く使われる多価アルコール。',caution:'処方全体で使用感が決まります。'},
  {name:'DPG',aliases:['Dipropylene Glycol'],category:'保湿・溶剤',goals:['乾燥'],summary:'保湿や溶剤として使われる成分。',caution:'配合量や処方により使用感が異なります。'},
  {name:'PCA-Na',aliases:['Sodium PCA'],category:'保湿',goals:['乾燥'],summary:'天然保湿因子に関連する保湿成分として使われます。',caution:'製品全体の処方を踏まえて評価します。'},
  {name:'乳酸Na',aliases:['Sodium Lactate'],category:'保湿',goals:['乾燥'],summary:'保湿目的で使用される成分。',caution:'処方により役割が異なる場合があります。'},
  {name:'尿素',aliases:['Urea'],category:'保湿・角質ケア',goals:['乾燥','角質'],summary:'保湿や角質をやわらげる目的で使われることがあります。',caution:'濃度や使用部位により刺激感が異なるため製品表示に従ってください。'},
  {name:'ホホバ種子油',aliases:['Jojoba Seed Oil','Simmondsia Chinensis Seed Oil'],category:'エモリエント',goals:['乾燥'],summary:'油性のエモリエント成分として使用されます。',caution:'植物由来であっても刺激の有無を断定はできません。'},
  {name:'シア脂',aliases:['Shea Butter','Butyrospermum Parkii Butter'],category:'エモリエント',goals:['乾燥'],summary:'肌を保護し、なめらかに整える目的で使われる油性成分。',caution:'重めの使用感を感じる場合があります。'},
  {name:'パンテノール',aliases:['Panthenol','プロビタミンB5'],category:'保湿・整肌',goals:['乾燥','肌荒れ'],summary:'保湿や整肌を目的に使われる成分。',caution:'製品によって配合目的は異なります。'},
  {name:'ツボクサエキス',aliases:['Centella Asiatica Extract','CICA'],category:'整肌',goals:['肌荒れ'],summary:'整肌目的の化粧品に使われる植物由来成分。',caution:'CICAという呼称は製品ごとに構成が異なるため全成分を確認します。'},
  {name:'酢酸トコフェロール',aliases:['Tocopheryl Acetate','ビタミンE誘導体'],category:'整肌・酸化防止',goals:['キメ'],summary:'ビタミンE誘導体として化粧品に使用されます。',caution:'配合目的は製品によって異なります。'},
  {name:'トコフェロール',aliases:['Tocopherol','ビタミンE'],category:'酸化防止・整肌',goals:['キメ'],summary:'製品中の油性成分の酸化防止や整肌目的などで使われます。',caution:'配合量や目的は処方に依存します。'},
  {name:'アルブチン',aliases:['Arbutin'],category:'有効成分になる場合あり',goals:['美白'],summary:'医薬部外品で美白有効成分として使われる場合があります。',caution:'商品区分と有効成分表示を確認してください。'},
  {name:'4MSK',aliases:['4-メトキシサリチル酸カリウム塩'],category:'有効成分になる場合あり',goals:['美白'],summary:'一部の医薬部外品で美白有効成分として使われます。',caution:'有効成分としての表示と承認された効能の範囲を確認します。'},
  {name:'コウジ酸',aliases:['Kojic Acid'],category:'有効成分になる場合あり',goals:['美白'],summary:'医薬部外品で美白有効成分として使われる場合があります。',caution:'商品区分・表示を確認してください。'},
  {name:'アゼライン酸',aliases:['Azelaic Acid'],category:'整肌',goals:['皮脂','毛穴','キメ'],summary:'海外を含むスキンケア製品で使われる成分。',caution:'日本での製品区分や配合濃度、使用方法を確認してください。'},
  {name:'乳酸',aliases:['Lactic Acid','AHA'],category:'角質ケア・pH調整',goals:['角質','キメ'],summary:'AHAの一種で、角質ケアやpH調整などに使用されます。',caution:'濃度やpHで刺激性が大きく変わります。'},
  {name:'グリコール酸',aliases:['Glycolic Acid','AHA'],category:'角質ケア',goals:['角質','キメ'],summary:'AHAの一種で、角質ケア製品などに使われます。',caution:'濃度やpHによって刺激感が異なるため使用方法を守ります。'},
  {name:'ペプチド',aliases:['Peptide'],category:'整肌',goals:['ハリ'],summary:'複数種類があり、化粧品では整肌・ハリ感を意識した処方などに使われます。',caution:'「ペプチド」は総称なので具体的な成分名を確認する必要があります。'}
];


// 商品裏面スキャン用の追加成分辞書。
// OCRで拾いやすい表示名称を補い、詳細説明は段階的に精査する。
const SCAN_EXTRA_INGREDIENTS = [
  {name:'水',aliases:['Water','Aqua'],category:'基剤',goals:[],summary:'化粧品の基剤として広く使用される成分。',caution:'商品全体の評価は処方全体で行います。'},
  {name:'サッカロミセス／コメ発酵液',aliases:['サッカロミセス/コメ発酵液'],category:'発酵・整肌',goals:['乾燥','キメ'],summary:'酵母と米由来の発酵液として化粧品に配合される成分。',caution:'製品ごとの配合目的を確認します。'},
  {name:'プロパンジオール',aliases:['Propanediol','1,3-プロパンジオール'],category:'保湿・溶剤',goals:['乾燥'],summary:'保湿や溶剤目的で使用される多価アルコール。',caution:'処方全体で使用感が決まります。'},
  {name:'ジグリセリン',aliases:['Diglycerin'],category:'保湿',goals:['乾燥'],summary:'保湿目的で使用される成分。',caution:'配合量や処方で感触は変わります。'},
  {name:'オレイン酸ポリグリセリル-10',aliases:['Polyglyceryl-10 Oleate'],category:'乳化・界面活性',goals:[],summary:'油性成分と水性成分をなじませる目的などで使用される成分。',caution:'製品全体の処方で評価します。'},
  {name:'ミリスチル3-グリセリルアスコルビン酸',aliases:['ミリスチル3グリセリルアスコルビン酸'],category:'ビタミンC誘導体・整肌',goals:['くすみ','キメ'],summary:'ビタミンC誘導体の一種として化粧品に配合される成分。',caution:'配合目的や濃度は製品ごとに異なります。'},
  {name:'オクタペプチド-47',aliases:['Octapeptide-47'],category:'ペプチド・整肌',goals:['ハリ','キメ'],summary:'ペプチド系の整肌成分として使用される成分。',caution:'商品全体の処方と配合目的を確認します。'},
  {name:'オリゴペプチド-34',aliases:['Oligopeptide-34'],category:'ペプチド・整肌',goals:['ハリ','キメ'],summary:'ペプチド系の整肌成分として使用される成分。',caution:'商品全体の処方と配合目的を確認します。'},
  {name:'テトラカルボキシメチルヘキサノイルジペプチド-12-5Na',aliases:['テトラカルボキシメチルヘキサノイルジペプチド125Na','テトラカルボキシメチルヘキサノイルジペプチド-12-5Na'],category:'ペプチド・整肌',goals:['ハリ','キメ'],summary:'ペプチド系の整肌成分として使用される成分。',caution:'長い表示名称はOCRで誤認識しやすいため、スキャン時は確認を推奨します。'},
  {name:'ポリリジン',aliases:['Polylysine','ε-ポリリジン'],category:'整肌・製品安定化',goals:[],summary:'化粧品処方で使用される高分子系成分。',caution:'製品ごとの配合目的を確認します。'},
  {name:'ガラクトミセス／オリーブ葉発酵エキス',aliases:['ガラクトミセス/オリーブ葉発酵エキス'],category:'発酵・植物由来整肌',goals:['キメ'],summary:'発酵由来の整肌成分として使用される成分。',caution:'植物・発酵由来であることだけで刺激性を断定できません。'},
  {name:'セイヨウネズ果実エキス',aliases:['Juniperus Communis Fruit Extract'],category:'植物エキス・整肌',goals:['キメ'],summary:'植物由来の整肌成分として使用される成分。',caution:'植物由来成分でも個人差があります。'},
  {name:'3-ラウリルグリセリルアスコルビン酸',aliases:['3ラウリルグリセリルアスコルビン酸'],category:'ビタミンC誘導体・整肌',goals:['くすみ','キメ'],summary:'ビタミンC誘導体の一種として使用される成分。',caution:'製品の配合目的・処方を確認します。'},
  {name:'シロキクラゲ多糖体',aliases:['Tremella Fuciformis Polysaccharide'],category:'保湿',goals:['乾燥'],summary:'多糖体の保湿成分として使用される成分。',caution:'使用感は処方により異なります。'},
  {name:'スフィンゴ糖脂質',aliases:['Glycosphingolipids','スフィンゴ糖脂質'],category:'保湿・エモリエント',goals:['乾燥','バリア機能'],summary:'スフィンゴ脂質関連の保湿・整肌目的で使用される成分。',caution:'製品ごとの配合目的を確認します。'},
  {name:'グルタチオン',aliases:['Glutathione'],category:'整肌・抗酸化',goals:['くすみ','キメ'],summary:'整肌目的などで化粧品に使用される成分。',caution:'化粧品で期待できる範囲と医薬品の作用は区別します。'},
  {name:'フラーレン',aliases:['Fullerene'],category:'整肌・抗酸化',goals:['キメ','ハリ'],summary:'整肌目的などで化粧品に使用される炭素系成分。',caution:'配合量・処方全体で評価します。'},
  {name:'マデカッソシド',aliases:['Madecassoside'],category:'整肌',goals:['肌荒れ'],summary:'ツボクサ由来成分の一つとして整肌目的で使用されます。',caution:'植物由来であっても刺激の有無は個人差があります。'},
  {name:'アシアチコシド',aliases:['Asiaticoside'],category:'整肌',goals:['肌荒れ'],summary:'ツボクサ由来成分の一つとして整肌目的で使用されます。',caution:'植物由来であっても刺激の有無は個人差があります。'},
  {name:'キハダ樹皮エキス',aliases:['Phellodendron Amurense Bark Extract'],category:'植物エキス・整肌',goals:['肌荒れ'],summary:'植物由来の整肌成分として使用される成分。',caution:'植物由来成分でも個人差があります。'},
  {name:'1,2-ヘキサンジオール',aliases:['1,2-Hexanediol','12-ヘキサンジオール'],category:'保湿・製品安定化',goals:['乾燥'],summary:'保湿や製品安定化目的で使用される多価アルコール。',caution:'処方全体で評価します。'},
  {name:'（アクリル酸Na／アクリロイルジメチルタウリンNa）コポリマー',aliases:['(アクリル酸Na/アクリロイルジメチルタウリンNa)コポリマー','アクリル酸Na/アクリロイルジメチルタウリンNaコポリマー'],category:'増粘・安定化',goals:[],summary:'粘度調整や製品安定化目的で使用される高分子成分。',caution:'製品の感触や安定性を支える処方成分です。'},
  {name:'（C15-19）アルカン',aliases:['(C15-19)アルカン','C15-19アルカン'],category:'エモリエント・溶剤',goals:['乾燥'],summary:'油性の感触調整やエモリエント目的で使用される成分。',caution:'使用感は処方により異なります。'},
  {name:'ラウリン酸ポリグリセリル-6',aliases:['Polyglyceryl-6 Laurate'],category:'乳化・界面活性',goals:[],summary:'乳化や可溶化などの目的で使用される成分。',caution:'製品全体の処方で評価します。'},
  {name:'ポリグリセリン-6',aliases:['Polyglycerin-6'],category:'保湿・処方補助',goals:['乾燥'],summary:'保湿や処方補助目的で使用される成分。',caution:'製品ごとの配合目的を確認します。'},
  {name:'ベルガモット果実油',aliases:['Citrus Aurantium Bergamia Fruit Oil','Bergamot Fruit Oil'],category:'精油・香料',goals:[],summary:'ベルガモット由来の精油成分。香り付けなどで使用されます。',caution:'香料・精油に刺激を感じやすい人は製品の使用感を確認してください。',sensitivityFlag:true},
  {name:'ニュウコウジュ油',aliases:['Boswellia Carterii Oil','Frankincense Oil'],category:'精油・香料',goals:[],summary:'ニュウコウジュ由来の精油成分。香り付けなどで使用されます。',caution:'香料・精油に刺激を感じやすい人は製品の使用感を確認してください。',sensitivityFlag:true},
  {name:'レモン果皮油',aliases:['Citrus Limon Peel Oil','Lemon Peel Oil'],category:'精油・香料',goals:[],summary:'レモン果皮由来の精油成分。香り付けなどで使用されます。',caution:'香料・精油に刺激を感じやすい人は製品の使用感を確認してください。',sensitivityFlag:true},
  {name:'ポリアクリレートクロスポリマー-6',aliases:['Polyacrylate Crosspolymer-6'],category:'増粘・安定化',goals:[],summary:'粘度調整や製品安定化目的で使用される高分子成分。',caution:'製品の物性を支える処方成分です。'},
  {name:'キサンタンガム',aliases:['Xanthan Gum'],category:'増粘・安定化',goals:[],summary:'粘度調整や安定化目的で広く使用される多糖体。',caution:'製品全体の処方で評価します。'},
  {name:'アラビアゴム',aliases:['Acacia Senegal Gum','Gum Arabic'],category:'増粘・皮膜形成',goals:[],summary:'増粘や皮膜形成などに使用される天然由来高分子。',caution:'製品ごとの配合目的を確認します。'},
  {name:'ココイルグルタミン酸Na',aliases:['Sodium Cocoyl Glutamate'],category:'界面活性・洗浄補助',goals:[],summary:'アミノ酸系の界面活性成分として使用される成分。',caution:'配合目的は製品カテゴリーによって異なります。'},
  {name:'PVP',aliases:['Polyvinylpyrrolidone','ポリビニルピロリドン'],category:'皮膜形成・安定化',goals:[],summary:'皮膜形成や製品安定化などに使用される高分子。',caution:'製品ごとの配合目的を確認します。'},
  {name:'フェノキシエタノール',aliases:['Phenoxyethanol'],category:'防腐',goals:[],summary:'化粧品の品質を保つために使用される防腐成分。',caution:'防腐剤という理由だけで安全性・刺激性を一律に断定しません。'},
  {name:'クエン酸',aliases:['Citric Acid'],category:'pH調整',goals:[],summary:'pH調整などに使用される成分。',caution:'配合量や製品pHにより役割が異なります。'},
  {name:'クエン酸Na',aliases:['Sodium Citrate'],category:'pH調整',goals:[],summary:'pH調整や製品安定化などに使用される成分。',caution:'配合目的は処方によって異なります。'}
];
INGREDIENTS.push(...SCAN_EXTRA_INGREDIENTS);

const KNOWLEDGE = [
  {title:'化粧水と乳液の違い',cat:'スキンケア基礎',body:'化粧水は水分や水溶性の保湿成分を与える役割、乳液は油分を含み水分蒸散を抑える役割を担うことが一般的です。'},
  {title:'肌質と肌悩みは別もの',cat:'肌について',body:'乾燥肌・脂性肌などの肌質と、毛穴・くすみ・ニキビなどの肌悩みは分けて考えると商品を選びやすくなります。'},
  {title:'成分表示の順番',cat:'成分表示',body:'化粧品の全成分表示は原則として配合量の多い順ですが、一定量以下の成分などには例外があります。'},
  {title:'化粧品と医薬部外品の違い',cat:'成分表示',body:'医薬部外品では、承認された有効成分と効能の範囲が設定されています。商品区分を確認して読み分けることが重要です。'},
  {title:'SPFとPAの見方',cat:'紫外線',body:'SPFは主にUVB、PAは主にUVAへの防御指標です。生活場面に応じて選びます。'},
  {title:'無添加＝絶対に低刺激ではない',cat:'美容のウソ・ホント',body:'「無添加」という言葉だけで刺激性や安全性を断定することはできません。何を無添加としているのか確認が必要です。'},
  {title:'美容液は必ず必要？',cat:'スキンケア基礎',body:'美容液は特定の目的に合わせて取り入れる選択肢の一つで、全員に必須とは限りません。'},
  {title:'朝と夜のスキンケア',cat:'スキンケア基礎',body:'朝は紫外線対策、夜は洗浄後の保湿など、生活場面に応じて役割が変わります。'},
  {title:'乾燥肌とは',cat:'肌について',body:'皮脂量だけでなく角層の水分保持やバリア機能など複数の要素から乾燥感が生じます。'},
  {title:'脂性肌とは',cat:'肌について',body:'皮脂が多い傾向と水分不足が同時に起こることもあるため、単純に保湿を省くとは限りません。'},
  {title:'混合肌とは',cat:'肌について',body:'部位によって皮脂や乾燥の状態が異なる肌状態を一般に混合肌と呼びます。'},
  {title:'敏感肌とは',cat:'肌について',body:'刺激を感じやすい状態を指す一般的な表現で、医療上の診断名とは限りません。'},
  {title:'肌のバリア機能',cat:'肌について',body:'角層は外部刺激から守り、水分の過剰な蒸散を防ぐ重要な役割を担います。'},
  {title:'毛穴が目立つ理由',cat:'肌悩み',body:'皮脂、角栓、乾燥、たるみなど複数の要因が関係するため、見た目だけで原因を断定しないことが重要です。'},
  {title:'ニキビが気になるときの化粧品選び',cat:'肌悩み',body:'化粧品は治療ではありません。刺激を避け、必要に応じて医療機関の受診も検討します。'},
  {title:'シミが気になるときの考え方',cat:'肌悩み',body:'紫外線対策を基本に、医薬部外品では承認された美白有効成分を選ぶ方法があります。ここでいう「美白」は、承認された範囲でメラニンの生成を抑え、しみ・そばかすを防ぐこと等を指し、できているしみを消す意味ではありません。'},
  {title:'くすみは1種類ではない',cat:'肌悩み',body:'乾燥、角質、血色などさまざまな要因が関係するため、原因に応じたケアが必要です。'},
  {title:'日焼け止めの選び方',cat:'紫外線',body:'SPF・PAだけでなく、使用場面、塗り直しやすさ、使用感を含めて選びます。'},
  {title:'有効成分とは',cat:'成分表示',body:'医薬部外品では、承認された効能に対応する有効成分が表示されます。'},
  {title:'全成分表示をどう読む？',cat:'成分表示',body:'単一成分だけで商品全体の性能や刺激性を断定せず、配合目的と処方全体を見ることが重要です。'},
  {title:'パラベンは避けるべき？',cat:'美容のウソ・ホント',body:'防腐剤の一種という理由だけで危険と断定することはできません。製品は処方全体で評価します。'},
  {title:'オーガニック＝安全？',cat:'美容のウソ・ホント',body:'植物由来やオーガニックであることだけで、刺激性やアレルギーの可能性がゼロになるわけではありません。'},
  {title:'高い化粧品ほど効果が高い？',cat:'美容のウソ・ホント',body:'価格には原料以外のコストも含まれるため、価格だけで自分への適合性を判断できません。'},
  {title:'毛穴は開閉する？',cat:'美容のウソ・ホント',body:'毛穴を扉のように自由に開閉させるという説明は単純化しすぎです。見え方は皮脂や角栓などに左右されます。'},
  {title:'化粧水は多いほどいい？',cat:'美容のウソ・ホント',body:'必要量は製品の設計や肌状態で異なり、多量に使えば比例して効果が高まるとは限りません。'}
];

const DIAGNOSIS = [
  {id:'dry1',q:'洗顔後、肌がつっぱりやすいですか？',axis:'dry',opts:[['よくある',3],['ときどき',2],['あまりない',1],['ない',0]]},
  {id:'dry2',q:'午後になると頬や口元の乾燥が気になりますか？',axis:'dry',opts:[['よくある',3],['ときどき',2],['あまりない',1],['ない',0]]},
  {id:'oil1',q:'Tゾーンのテカリが気になりますか？',axis:'oil',opts:[['かなり気になる',3],['少し気になる',2],['あまり気にならない',1],['気にならない',0]]},
  {id:'sens1',q:'新しい化粧品で刺激感が出ることがありますか？',axis:'sens',opts:[['よくある',3],['ときどき',2],['あまりない',1],['ない',0]]},
  {id:'pore1',q:'毛穴の目立ちが気になりますか？',axis:'pore',opts:[['かなり気になる',3],['少し気になる',2],['あまり気にならない',1],['気にならない',0]]},
  {id:'tone1',q:'シミ・くすみが気になりますか？',axis:'tone',opts:[['かなり気になる',3],['少し気になる',2],['あまり気にならない',1],['気にならない',0]]},
  {id:'firm1',q:'ハリ不足が気になりますか？',axis:'firm',opts:[['かなり気になる',3],['少し気になる',2],['あまり気にならない',1],['気にならない',0]]},
  {id:'rough1',q:'肌荒れ・赤みが気になることがありますか？',axis:'rough',opts:[['よくある',3],['ときどき',2],['あまりない',1],['ない',0]]}
];


const SIMPLE_DIAGNOSIS = [
  {id:'simple_skin_type',q:'今の肌タイプに近いものは？',axis:'quick',opts:[['乾燥しやすい','dry'],['テカリやすい','oily'],['部分で違う（混合肌寄り）','combination'],['刺激を感じやすい','sensitive']]},
  {id:'simple_primary_concern',q:'今いちばん気になることは？',axis:'quick',opts:[['乾燥・つっぱり','dry'],['テカリ・毛穴','pore'],['シミ・くすみ','tone'],['ハリ不足','firm'],['肌荒れ・赤み','rough'],['刺激・しみやすさ','sens']]}
];

const DEEP_DIAGNOSIS = [
  {id:'d_dry1',q:'洗顔後10分ほど何もつけないと、つっぱりを感じますか？',axis:'dry',opts:[['強く感じる',3],['少し感じる',2],['ほぼ感じない',1],['感じない',0]]},
  {id:'d_dry2',q:'頬・口元・目元に粉ふきや乾燥を感じることがありますか？',axis:'dry',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_dry3',q:'保湿しても数時間後に乾燥感が戻りますか？',axis:'dry',opts:[['よくある',3],['ときどき',2],['あまりない',1],['ない',0]]},
  {id:'d_oil1',q:'Tゾーンは日中テカリやすいですか？',axis:'oil',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_oil2',q:'頬まで皮脂やベタつきを感じますか？',axis:'oil',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_oil3',q:'朝起きた時に顔全体の皮脂が気になりますか？',axis:'oil',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_sens1',q:'新しい化粧品でヒリつき・赤みなどの刺激感を経験することがありますか？',axis:'sens',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_sens2',q:'季節の変わり目に肌が不安定になりやすいですか？',axis:'sens',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_sens3',q:'摩擦・マスク・髭剃りなどで刺激を感じやすいですか？',axis:'sens',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_sens4',q:'香料やアルコール配合製品を避けることがありますか？',axis:'sens',opts:[['頻繁に避ける',3],['ときどき避ける',2],['あまり避けない',1],['気にしない',0]]},
  {id:'d_pore1',q:'鼻・頬の毛穴の目立ちが気になりますか？',axis:'pore',opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
  {id:'d_pore2',q:'角栓やざらつきが気になることがありますか？',axis:'pore',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_tone1',q:'シミ・そばかす・色ムラが気になりますか？',axis:'tone',opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
  {id:'d_tone2',q:'乾燥や疲れた時に顔色のくすみが気になりますか？',axis:'tone',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_firm1',q:'肌のハリ・弾力不足が気になりますか？',axis:'firm',opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
  {id:'d_firm2',q:'目元や口元の乾燥による細かな線が気になりますか？',axis:'firm',opts:[['かなり',3],['やや',2],['少し',1],['気にならない',0]]},
  {id:'d_rough1',q:'赤み・肌荒れ・ごわつきが出ることがありますか？',axis:'rough',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_rough2',q:'寝不足や体調変化の時に肌が荒れやすいと感じますか？',axis:'rough',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_rough3',q:'現在、肌がいつもより不安定だと感じますか？',axis:'rough',opts:[['かなり',3],['やや',2],['少し',1],['安定している',0]]},
  {id:'d_stress1',q:'ここ1〜2週間、日常的なストレスを強く感じていますか？',axis:'stress',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_stress2',q:'忙しい時期ほどスキンケアが乱れやすいですか？',axis:'stress',opts:[['かなり',3],['やや',2],['少し',1],['ほぼない',0]]},
  {id:'d_sleep1',q:'睡眠時間や睡眠リズムが不規則ですか？',axis:'sleep',opts:[['かなり',3],['やや',2],['少し',1],['安定している',0]]},
  {id:'d_sleep2',q:'睡眠不足の翌日に乾燥・くすみ・皮脂などの変化を感じますか？',axis:'sleep',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_uv1',q:'日中に屋外で過ごす時間は長いですか？',axis:'uv',opts:[['かなり長い',3],['やや長い',2],['短い',1],['ほぼ屋内',0]]},
  {id:'d_uv2',q:'日焼け止めを塗り直す習慣がありますか？',axis:'uv',invert:true,opts:[['ほぼしない',3],['時々する',2],['外出時はする',1],['習慣化している',0]]},
  {id:'d_routine1',q:'一度に複数の美容液・角質ケア製品を重ねることがありますか？',axis:'routine',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]},
  {id:'d_routine2',q:'肌の調子が悪い時でも新しい化粧品を試すことがありますか？',axis:'routine',opts:[['よくある',3],['ときどき',2],['まれにある',1],['ない',0]]}
];

// v0.3: 成分マスタの共通メタデータ。公開前に各成分の個別一次確認を行う。
const MASTER_META = {
  verifiedAt: '2026-08-20',
  sources: [
    {label:'日本化粧品工業会 化粧品の成分表示名称リスト', url:'https://jcia.org/user/business/ingredients/namelist', role:'日本の化粧品表示名称・INCI名の一次確認'},
    {label:'EU Commission CosIng', url:'https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database_en', role:'INCI・機能情報の補助確認'}
  ]
};

const INCI_MAP = {
  'セラミドNP':'CERAMIDE NP','グリセリン':'GLYCERIN','ヒアルロン酸Na':'SODIUM HYALURONATE',
  'ナイアシンアミド':'NIACINAMIDE','レチノール':'RETINOL','アスコルビン酸':'ASCORBIC ACID',
  'トラネキサム酸':'TRANEXAMIC ACID','グリチルリチン酸2K':'DIPOTASSIUM GLYCYRRHIZATE','アラントイン':'ALLANTOIN',
  'サリチル酸':'SALICYLIC ACID','スクワラン':'SQUALANE','ワセリン':'PETROLATUM','BG':'BUTYLENE GLYCOL',
  'DPG':'DIPROPYLENE GLYCOL','PCA-Na':'SODIUM PCA','乳酸Na':'SODIUM LACTATE','尿素':'UREA',
  'ホホバ種子油':'SIMMONDSIA CHINENSIS (JOJOBA) SEED OIL','シア脂':'BUTYROSPERMUM PARKII (SHEA) BUTTER',
  'パンテノール':'PANTHENOL','ツボクサエキス':'CENTELLA ASIATICA EXTRACT','酢酸トコフェロール':'TOCOPHERYL ACETATE',
  'トコフェロール':'TOCOPHEROL','アルブチン':'ARBUTIN','4MSK':'POTASSIUM METHOXYSALICYLATE','コウジ酸':'KOJIC ACID',
  'アゼライン酸':'AZELAIC ACID','乳酸':'LACTIC ACID','グリコール酸':'GLYCOLIC ACID','ペプチド':'PEPTIDE (総称)'
};

INGREDIENTS.forEach(x=>{
  x.inci = INCI_MAP[x.name] || '';
  x.status = '一次情報確認対象';
  x.verifiedAt = MASTER_META.verifiedAt;
  x.sources = MASTER_META.sources;
});
