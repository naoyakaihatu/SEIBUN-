const SOURCE_REGISTRY_V06 = {
  "jcia_names": {
    "label": "日本化粧品工業会 化粧品の成分表示名称リスト",
    "url": "https://www.jcia.org/user/business/ingredients/namelist",
    "purpose": "日本の化粧品表示名称・INCI名・定義の確認"
  },
  "mhlw_order": {
    "label": "厚生労働省 化粧品の全成分表示の表示方法等について",
    "url": "https://www.mhlw.go.jp/web/t_doc?dataId=00ta7768&dataType=1&pageNo=1",
    "purpose": "全成分表示の記載順序・表示ルールの確認"
  },
  "cosing": {
    "label": "European Commission CosIng",
    "url": "https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database_en",
    "purpose": "INCI・化粧品での機能分類等の補助確認"
  },
  "cir": {
    "label": "Cosmetic Ingredient Review",
    "url": "https://www.cir-safety.org/",
    "purpose": "成分安全性レビューを探すための補助資料"
  }
};

const DETAILED_INGREDIENT_ADDITIONS_V06 = [
  {
    "name": "ペンチレングリコール",
    "aliases": [
      "Pentylene Glycol"
    ],
    "category": "保湿・溶剤",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿・溶剤・感触調整に使われる多価アルコール。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ヘキシレングリコール",
    "aliases": [
      "Hexylene Glycol"
    ],
    "category": "保湿・溶剤",
    "goals": [
      "乾燥"
    ],
    "summary": "溶剤・保湿・感触調整などに使われる成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "solvent",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ソルビトール",
    "aliases": [
      "Sorbitol"
    ],
    "category": "保湿",
    "goals": [
      "乾燥"
    ],
    "summary": "糖アルコール系の保湿剤として水分保持を補助します。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ベタイン",
    "aliases": [
      "Betaine"
    ],
    "category": "保湿・整肌",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿・感触調整・整肌目的で使われる成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ヒドロキシエチルウレア",
    "aliases": [
      "Hydroxyethyl Urea"
    ],
    "category": "保湿",
    "goals": [
      "乾燥"
    ],
    "summary": "水分保持を補助する保湿成分として使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "メチルグルセス-10",
    "aliases": [
      "Methyl Gluceth-10"
    ],
    "category": "保湿",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿と感触調整に使われる成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "メチルグルセス-20",
    "aliases": [
      "Methyl Gluceth-20"
    ],
    "category": "保湿",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿と感触調整に使われる成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "トレハロース",
    "aliases": [
      "Trehalose"
    ],
    "category": "保湿",
    "goals": [
      "乾燥"
    ],
    "summary": "糖由来の保湿成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ポリクオタニウム-51",
    "aliases": [
      "Polyquaternium-51"
    ],
    "category": "保湿・皮膜",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿感や皮膜形成を補助する高分子成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "film_humectant",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ミネラルオイル",
    "aliases": [
      "Mineral Oil",
      "Liquid Paraffin"
    ],
    "category": "油性・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "油性基剤として肌表面をなめらかにし、水分蒸散を抑える方向に働きます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "オリーブ果実油",
    "aliases": [
      "Olea Europaea Fruit Oil"
    ],
    "category": "油性・植物油",
    "goals": [
      "乾燥"
    ],
    "summary": "植物油由来のエモリエントとして使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient_botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "アルガニアスピノサ核油",
    "aliases": [
      "Argania Spinosa Kernel Oil"
    ],
    "category": "油性・植物油",
    "goals": [
      "乾燥"
    ],
    "summary": "植物油由来のエモリエントとして使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient_botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "マカデミア種子油",
    "aliases": [
      "Macadamia Integrifolia Seed Oil"
    ],
    "category": "油性・植物油",
    "goals": [
      "乾燥"
    ],
    "summary": "油性エモリエントとして柔軟性・感触を整える目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient_botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ヒマワリ種子油",
    "aliases": [
      "Helianthus Annuus Seed Oil"
    ],
    "category": "油性・植物油",
    "goals": [
      "乾燥"
    ],
    "summary": "植物油由来のエモリエントとして使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient_botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "メドウフォーム油",
    "aliases": [
      "Limnanthes Alba Seed Oil"
    ],
    "category": "油性・植物油",
    "goals": [
      "乾燥"
    ],
    "summary": "安定性の高い油性エモリエントとして使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient_botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "トリエチルヘキサノイン",
    "aliases": [
      "Triethylhexanoin"
    ],
    "category": "油性・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "軽い感触を作る油性エモリエントとして使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "トリ（カプリル酸／カプリン酸）グリセリル",
    "aliases": [
      "Caprylic/Capric Triglyceride"
    ],
    "category": "油性・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "油性基剤・感触調整・エモリエント目的で広く使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "パルミチン酸エチルヘキシル",
    "aliases": [
      "Ethylhexyl Palmitate"
    ],
    "category": "油性・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "油性エモリエント・感触調整として使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emollient",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ジメチコン",
    "aliases": [
      "Dimethicone"
    ],
    "category": "シリコーン・皮膜",
    "goals": [
      "乾燥"
    ],
    "summary": "皮膜形成・感触調整・摩擦低減などに使われるシリコーン。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "silicone",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "シクロペンタシロキサン",
    "aliases": [
      "Cyclopentasiloxane"
    ],
    "category": "シリコーン・揮発性",
    "goals": [],
    "summary": "軽い伸びとさらっとした感触を作る揮発性シリコーン。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "silicone_volatile",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "シクロヘキサシロキサン",
    "aliases": [
      "Cyclohexasiloxane"
    ],
    "category": "シリコーン・揮発性",
    "goals": [],
    "summary": "伸びや感触を整える揮発性シリコーン。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "silicone_volatile",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "メチルトリメチコン",
    "aliases": [
      "Methyl Trimethicone"
    ],
    "category": "シリコーン・揮発性",
    "goals": [],
    "summary": "速乾性・軽い感触・均一な塗布を補助するシリコーン。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "silicone_volatile",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "トリメチルシロキシケイ酸",
    "aliases": [
      "Trimethylsiloxysilicate"
    ],
    "category": "シリコーン・皮膜",
    "goals": [],
    "summary": "耐水性や持続性を支える皮膜形成成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "film",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "フェニルトリメチコン",
    "aliases": [
      "Phenyl Trimethicone"
    ],
    "category": "シリコーン・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "光沢・感触・エモリエント性を整えるシリコーン。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "silicone",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "PEG-60水添ヒマシ油",
    "aliases": [
      "PEG-60 Hydrogenated Castor Oil"
    ],
    "category": "乳化・可溶化",
    "goals": [],
    "summary": "油性成分や香料などを水系に分散・可溶化する目的で使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "solubilizer",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "PEG-40水添ヒマシ油",
    "aliases": [
      "PEG-40 Hydrogenated Castor Oil"
    ],
    "category": "乳化・可溶化",
    "goals": [],
    "summary": "可溶化・乳化補助として使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "solubilizer",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ポリソルベート20",
    "aliases": [
      "Polysorbate 20"
    ],
    "category": "乳化・可溶化",
    "goals": [],
    "summary": "香料や油性成分を水系に可溶化・分散する目的で使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "solubilizer",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ポリソルベート60",
    "aliases": [
      "Polysorbate 60"
    ],
    "category": "乳化・界面活性",
    "goals": [],
    "summary": "乳化や製品安定化に使われる非イオン界面活性成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ポリソルベート80",
    "aliases": [
      "Polysorbate 80"
    ],
    "category": "乳化・界面活性",
    "goals": [],
    "summary": "乳化・可溶化・分散補助に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ステアリン酸グリセリル",
    "aliases": [
      "Glyceryl Stearate"
    ],
    "category": "乳化・エモリエント",
    "goals": [
      "乾燥"
    ],
    "summary": "乳化を支えながら感触を整える脂肪酸エステル。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier_emollient",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ステアリン酸グリセリル（SE）",
    "aliases": [
      "Glyceryl Stearate SE"
    ],
    "category": "乳化",
    "goals": [],
    "summary": "自己乳化型の乳化成分としてクリーム等の安定化に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ステアリン酸ソルビタン",
    "aliases": [
      "Sorbitan Stearate"
    ],
    "category": "乳化",
    "goals": [],
    "summary": "乳化・製品安定化を支える非イオン界面活性成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "水添レシチン",
    "aliases": [
      "Hydrogenated Lecithin"
    ],
    "category": "乳化・整肌",
    "goals": [
      "乾燥"
    ],
    "summary": "乳化・リポソーム等の処方補助・エモリエントに使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier_lipid",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "レシチン",
    "aliases": [
      "Lecithin"
    ],
    "category": "乳化・整肌",
    "goals": [
      "乾燥"
    ],
    "summary": "リン脂質系の乳化・処方補助・エモリエント成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "emulsifier_lipid",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "カルボマー",
    "aliases": [
      "Carbomer"
    ],
    "category": "増粘・ゲル化",
    "goals": [],
    "summary": "水系製品の粘度やゲル構造を作る高分子増粘剤。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "thickener",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "セルロースガム",
    "aliases": [
      "Cellulose Gum"
    ],
    "category": "増粘・安定化",
    "goals": [],
    "summary": "粘度調整・分散安定化を支えるセルロース系高分子。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "thickener",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ヒドロキシエチルセルロース",
    "aliases": [
      "Hydroxyethylcellulose"
    ],
    "category": "増粘・安定化",
    "goals": [],
    "summary": "水系処方の粘度調整・安定化に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "thickener",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "アクリレーツコポリマー",
    "aliases": [
      "Acrylates Copolymer"
    ],
    "category": "皮膜・安定化",
    "goals": [],
    "summary": "皮膜形成、粘度調整、製品安定化などに使われる高分子。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "film_stabilizer",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "メチルパラベン",
    "aliases": [
      "Methylparaben"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "微生物増殖を抑えて製品品質を保つ防腐成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "エチルパラベン",
    "aliases": [
      "Ethylparaben"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "製品の防腐・品質保持に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "プロピルパラベン",
    "aliases": [
      "Propylparaben"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "製品の防腐・品質保持に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ブチルパラベン",
    "aliases": [
      "Butylparaben"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "製品の防腐・品質保持に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "安息香酸Na",
    "aliases": [
      "Sodium Benzoate"
    ],
    "category": "防腐・製品安定化",
    "goals": [],
    "summary": "防腐目的などで使われます。製品pH等によって機能が変わります。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ソルビン酸K",
    "aliases": [
      "Potassium Sorbate"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "微生物増殖を抑える目的で使われる防腐成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "クロルフェネシン",
    "aliases": [
      "Chlorphenesin"
    ],
    "category": "防腐",
    "goals": [],
    "summary": "防腐・製品品質保持に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "preservative",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "カプリリルグリコール",
    "aliases": [
      "Caprylyl Glycol"
    ],
    "category": "保湿・防腐補助",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿と防腐補助・感触調整に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant_preservative_booster",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "エチルヘキシルグリセリン",
    "aliases": [
      "Ethylhexylglycerin"
    ],
    "category": "保湿・防腐補助",
    "goals": [
      "乾燥"
    ],
    "summary": "保湿・感触調整・防腐補助に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "humectant_preservative_booster",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "水酸化Na",
    "aliases": [
      "Sodium Hydroxide"
    ],
    "category": "pH調整",
    "goals": [],
    "summary": "製品のpHを調整するために少量使用されることがあります。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ph_adjuster",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "水酸化K",
    "aliases": [
      "Potassium Hydroxide"
    ],
    "category": "pH調整",
    "goals": [],
    "summary": "製品のpHを調整する目的で使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ph_adjuster",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "トロメタミン",
    "aliases": [
      "Tromethamine"
    ],
    "category": "pH調整・緩衝",
    "goals": [],
    "summary": "pH調整や処方安定化に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ph_adjuster",
      "attention": "処方依存",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "EDTA-2Na",
    "aliases": [
      "Disodium EDTA"
    ],
    "category": "キレート・安定化",
    "goals": [],
    "summary": "金属イオンを捕捉し、製品の安定性を補助するキレート成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "chelating",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "セラミドAP",
    "aliases": [
      "Ceramide AP",
      "セラミド6II"
    ],
    "category": "保湿・エモリエント",
    "goals": [
      "乾燥",
      "バリア機能"
    ],
    "summary": "セラミド系の保湿・バリア構成を支える成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ceramide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "セラミドEOP",
    "aliases": [
      "Ceramide EOP",
      "セラミド1"
    ],
    "category": "保湿・エモリエント",
    "goals": [
      "乾燥",
      "バリア機能"
    ],
    "summary": "セラミド系の保湿・バリア構成を支える成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ceramide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "セラミドNG",
    "aliases": [
      "Ceramide NG",
      "セラミド2"
    ],
    "category": "保湿・エモリエント",
    "goals": [
      "乾燥",
      "バリア機能"
    ],
    "summary": "セラミド系の保湿・バリア構成を支える成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "ceramide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "フィトスフィンゴシン",
    "aliases": [
      "Phytosphingosine"
    ],
    "category": "整肌・脂質関連",
    "goals": [
      "乾燥",
      "バリア機能"
    ],
    "summary": "角層脂質に関連する整肌・処方成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "lipid_related",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "コレステロール",
    "aliases": [
      "Cholesterol"
    ],
    "category": "エモリエント・脂質関連",
    "goals": [
      "乾燥",
      "バリア機能"
    ],
    "summary": "角層脂質に関連する油性・エモリエント成分。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "lipid_related",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "リン酸アスコルビルMg",
    "aliases": [
      "Magnesium Ascorbyl Phosphate"
    ],
    "category": "ビタミンC誘導体・整肌",
    "goals": [
      "くすみ",
      "キメ"
    ],
    "summary": "ビタミンC誘導体として整肌目的等で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "vitamin_c",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "リン酸アスコルビルNa",
    "aliases": [
      "Sodium Ascorbyl Phosphate"
    ],
    "category": "ビタミンC誘導体・整肌",
    "goals": [
      "くすみ",
      "キメ"
    ],
    "summary": "水溶性ビタミンC誘導体として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "vitamin_c",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "アスコルビルグルコシド",
    "aliases": [
      "Ascorbyl Glucoside"
    ],
    "category": "ビタミンC誘導体・整肌",
    "goals": [
      "くすみ",
      "キメ"
    ],
    "summary": "ビタミンC誘導体として整肌目的等で使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "vitamin_c",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "3-O-エチルアスコルビン酸",
    "aliases": [
      "3-O-Ethyl Ascorbic Acid"
    ],
    "category": "ビタミンC誘導体・整肌",
    "goals": [
      "くすみ",
      "キメ"
    ],
    "summary": "ビタミンC誘導体として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "vitamin_c",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "テトラヘキシルデカン酸アスコルビル",
    "aliases": [
      "Tetrahexyldecyl Ascorbate"
    ],
    "category": "ビタミンC誘導体・油溶性",
    "goals": [
      "くすみ",
      "キメ"
    ],
    "summary": "油溶性のビタミンC誘導体として使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "vitamin_c",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "パルミチン酸レチノール",
    "aliases": [
      "Retinyl Palmitate"
    ],
    "category": "ビタミンA誘導体・整肌",
    "goals": [
      "ハリ",
      "キメ"
    ],
    "summary": "ビタミンA誘導体として整肌目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "retinoid",
      "attention": "刺激注意",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "酢酸レチノール",
    "aliases": [
      "Retinyl Acetate"
    ],
    "category": "ビタミンA誘導体・整肌",
    "goals": [
      "ハリ",
      "キメ"
    ],
    "summary": "ビタミンA誘導体として整肌目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "retinoid",
      "attention": "刺激注意",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "マンデル酸",
    "aliases": [
      "Mandelic Acid"
    ],
    "category": "AHA・角質ケア",
    "goals": [
      "角質",
      "毛穴"
    ],
    "summary": "AHAの一種として角質ケア目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "exfoliant",
      "attention": "刺激注意",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "グルコノラクトン",
    "aliases": [
      "Gluconolactone"
    ],
    "category": "PHA・保湿/角質ケア",
    "goals": [
      "乾燥",
      "角質"
    ],
    "summary": "PHAとして保湿感と角質ケアを意識した製品に使われます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "exfoliant",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ラクトビオン酸",
    "aliases": [
      "Lactobionic Acid"
    ],
    "category": "PHA・保湿/角質ケア",
    "goals": [
      "乾燥",
      "角質"
    ],
    "summary": "PHAの一種として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "exfoliant",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "アセチルヘキサペプチド-8",
    "aliases": [
      "Acetyl Hexapeptide-8"
    ],
    "category": "ペプチド・整肌",
    "goals": [
      "ハリ"
    ],
    "summary": "ペプチド系の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "peptide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "パルミトイルトリペプチド-1",
    "aliases": [
      "Palmitoyl Tripeptide-1"
    ],
    "category": "ペプチド・整肌",
    "goals": [
      "ハリ"
    ],
    "summary": "ペプチド系の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "peptide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "パルミトイルテトラペプチド-7",
    "aliases": [
      "Palmitoyl Tetrapeptide-7"
    ],
    "category": "ペプチド・整肌",
    "goals": [
      "ハリ"
    ],
    "summary": "ペプチド系の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "peptide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "パルミトイルペンタペプチド-4",
    "aliases": [
      "Palmitoyl Pentapeptide-4"
    ],
    "category": "ペプチド・整肌",
    "goals": [
      "ハリ"
    ],
    "summary": "ペプチド系の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "peptide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "銅トリペプチド-1",
    "aliases": [
      "Copper Tripeptide-1"
    ],
    "category": "ペプチド・整肌",
    "goals": [
      "ハリ",
      "肌荒れ"
    ],
    "summary": "銅を含むペプチド系の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "peptide",
      "attention": "通常",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "チャ葉エキス",
    "aliases": [
      "Camellia Sinensis Leaf Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "キメ"
    ],
    "summary": "茶葉由来の植物エキスとして整肌・製品保護等の目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "アロエベラ葉エキス",
    "aliases": [
      "Aloe Barbadensis Leaf Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "乾燥",
      "肌荒れ"
    ],
    "summary": "アロエ由来の植物エキスとして保湿・整肌目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ドクダミエキス",
    "aliases": [
      "Houttuynia Cordata Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "肌荒れ"
    ],
    "summary": "植物由来の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "カミツレ花エキス",
    "aliases": [
      "Chamomilla Recutita Flower Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "肌荒れ"
    ],
    "summary": "カミツレ由来の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ハマメリス葉エキス",
    "aliases": [
      "Hamamelis Virginiana Leaf Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "キメ"
    ],
    "summary": "植物由来の整肌成分として使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "カンゾウ根エキス",
    "aliases": [
      "Glycyrrhiza Glabra Root Extract"
    ],
    "category": "植物エキス・整肌",
    "goals": [
      "肌荒れ"
    ],
    "summary": "甘草由来の植物エキスとして整肌目的で使用されます。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "botanical",
      "attention": "個人差",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ラベンダー油",
    "aliases": [
      "Lavandula Angustifolia Oil"
    ],
    "category": "精油・香料",
    "goals": [],
    "summary": "香り付け等に使われる精油。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "fragrance_oil",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ローズマリー葉油",
    "aliases": [
      "Rosmarinus Officinalis Leaf Oil"
    ],
    "category": "精油・香料",
    "goals": [],
    "summary": "香り付け等に使われる精油。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "fragrance_oil",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  },
  {
    "name": "ティーツリー葉油",
    "aliases": [
      "Melaleuca Alternifolia Leaf Oil"
    ],
    "category": "精油・香料",
    "goals": [],
    "summary": "香り付け・整肌目的等で使用される精油。",
    "caution": "成分単体ではなく、配合量・処方・使用部位・肌状態と合わせて評価します。",
    "v06": {
      "roleCode": "fragrance_oil",
      "attention": "反応歴確認",
      "detailLevel": 2,
      "sourceKeys": [
        "jcia_names",
        "cosing",
        "cir"
      ]
    }
  }
];


for (const item of DETAILED_INGREDIENT_ADDITIONS_V06) {
  if (!INGREDIENTS.some(x => x.name === item.name)) INGREDIENTS.push(item);
}
const INGREDIENT_DATA_META_V06 = {
  version: '0.6',
  reviewedDetailLevel: 2,
  levelLabels: {
    0:'名称認識のみ',
    1:'基本分類',
    2:'処方機能・注意情報レビュー済み',
    3:'個別一次資料まで確認済み'
  }
};
