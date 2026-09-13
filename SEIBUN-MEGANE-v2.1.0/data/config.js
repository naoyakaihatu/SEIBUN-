// SEIBUNメガネ v2.0.0 — central application configuration.
const APP_CONFIG = {
  version: '2.1.0',
  brand: {
    name: 'SEIBUNメガネ',
    shortName: 'SEIBUNメガネ',
    tagline: '成分を見ると、コスメが選びやすくなる。',
    betaLabel: ''
  },
  storage: {
    skinProfile: 'seibunMeganeSkinProfileV200',
    skinConcern: 'seibunMeganeConcernV200',
    history: 'seibunMeganeHistoryV200',
    persistOptIn: 'seibunMeganePersistOptInV200'
  },
  contact: {
    method: 'mailto',
    email: '',
    subjectPrefix: '',
    allowBugReport: true,
    allowCorrectionRequest: true,
    allowBusinessInquiry: true
  },
  legal: {
    businessModel: 'affiliate_media',
    publicDisplayName: 'SEIBUNメガネ',
    legalOperatorName: '',
    contactEmail: '',
    lastUpdated: '2026-09-08',
    affiliateEnabled: false,
    paidPlanEnabled: false,
    cloudStorageEnabled: false
  }
};
