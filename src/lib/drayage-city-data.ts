// Drayage location data types and database for drayage city landing pages

export interface DrayageRailyard {
  name: string
  distance: number // Miles from Elk Grove Village
  driveTime: number // Minutes from Elk Grove Village
  description: string
}

export interface DrayageCityData {
  name: string
  slug: string
  state: string
  stateAbbr: string
  distance: number // Miles from Elk Grove Village HQ
  drivingTime: number // Minutes from Elk Grove Village HQ
  population: string
  zipCodes: string[]
  majorIndustries: string[]
  nearestRailyard: string // Name of closest railyard
  railyardDistance: number // Distance to nearest railyard in miles
  seoTitle: string
  seoDescription: string
  targetKeywords: string[]
}

// Major Chicagoland railyards served by CR Express
export const railyards: DrayageRailyard[] = [
  {
    name: 'CP Bensenville',
    distance: 8,
    driveTime: 12,
    description: 'Canadian Pacific Bensenville - Northwest rail access with direct Canadian market connectivity'
  },
  {
    name: 'NS Chicago Rails',
    distance: 22,
    driveTime: 30,
    description: 'Norfolk Southern 79th Street - Chicago rail terminal for eastern corridor freight'
  },
  {
    name: 'CN Harvey Rails',
    distance: 28,
    driveTime: 35,
    description: 'Canadian National Harvey Yard - South suburban rail hub for Canadian and midwest freight'
  },
  {
    name: 'BNSF Elwood/Joliet',
    distance: 35,
    driveTime: 45,
    description: 'BNSF Logistics Park Chicago - Major intermodal facility serving transcontinental rail'
  }
]

// Database of all 26 drayage cities for drayage services
export const drayageCitiesData: DrayageCityData[] = [
  {
    name: 'Chicago',
    slug: 'chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 18,
    drivingTime: 25,
    population: '2,746,388',
    zipCodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60609', '60610'],
    majorIndustries: ['Manufacturing', 'Distribution', 'E-commerce', 'Food & Beverage', 'Retail'],
    nearestRailyard: 'NS Chicago Rails',
    railyardDistance: 22,
    seoTitle: 'Chicago Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Chicago, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. Access to all major railyards. Get quote today.',
    targetKeywords: [
      'drayage services chicago',
      'drayage companies chicago',
      'intermodal drayage chicago',
      'container drayage chicago',
      'rail drayage chicago',
      'drayage trucking chicago',
      'drayage companies near me chicago',
      'chicago drayage services'
    ]
  },
  {
    name: 'Elk Grove Village',
    slug: 'elk-grove-village',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 0,
    drivingTime: 0,
    population: '33,127',
    zipCodes: ['60007'],
    majorIndustries: ['Logistics', 'Manufacturing', 'Distribution', 'Industrial', 'E-commerce'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 8,
    seoTitle: 'Elk Grove Village Drayage | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Elk Grove Village, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 8 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services elk grove village',
      'drayage companies elk grove village',
      'intermodal drayage elk grove village',
      'container drayage elk grove village',
      'rail drayage elk grove village',
      'drayage trucking elk grove village',
      'drayage companies near me elk grove village',
      'elk grove village drayage services'
    ]
  },
  {
    name: 'Schaumburg',
    slug: 'schaumburg',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 8,
    drivingTime: 12,
    population: '78,723',
    zipCodes: ['60159', '60168', '60173', '60193', '60194', '60195', '60196'],
    majorIndustries: ['Corporate Headquarters', 'Distribution', 'Technology', 'Healthcare', 'Retail'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 12,
    seoTitle: 'Schaumburg Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Schaumburg, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 12 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services schaumburg',
      'drayage companies schaumburg',
      'intermodal drayage schaumburg',
      'container drayage schaumburg',
      'rail drayage schaumburg',
      'drayage trucking schaumburg',
      'drayage companies near me schaumburg',
      'schaumburg drayage services'
    ]
  },
  {
    name: 'Des Plaines',
    slug: 'des-plaines',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 6,
    drivingTime: 9,
    population: '58,720',
    zipCodes: ['60016', '60017', '60018', '60019'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Healthcare', 'Logistics', 'Industrial'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 10,
    seoTitle: 'Des Plaines Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Des Plaines, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 10 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services des plaines',
      'drayage companies des plaines',
      'intermodal drayage des plaines',
      'container drayage des plaines',
      'rail drayage des plaines',
      'drayage trucking des plaines',
      'drayage companies near me des plaines',
      'des plaines drayage services'
    ]
  },
  {
    name: 'Arlington Heights',
    slug: 'arlington-heights',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 7,
    drivingTime: 10,
    population: '77,676',
    zipCodes: ['60004', '60005', '60006'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Healthcare', 'Distribution', 'Technology'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 11,
    seoTitle: 'Arlington Heights Drayage | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Arlington Heights, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 11 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services arlington heights',
      'drayage companies arlington heights',
      'intermodal drayage arlington heights',
      'container drayage arlington heights',
      'rail drayage arlington heights',
      'drayage trucking arlington heights',
      'drayage companies near me arlington heights',
      'arlington heights drayage services'
    ]
  },
  {
    name: 'Rosemont',
    slug: 'rosemont',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 4,
    drivingTime: 7,
    population: '4,202',
    zipCodes: ['60018'],
    majorIndustries: ['Hospitality', 'Entertainment', 'Convention', 'Logistics', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 9,
    seoTitle: 'Rosemont Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Rosemont, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 9 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services rosemont',
      'drayage companies rosemont',
      'intermodal drayage rosemont',
      'container drayage rosemont',
      'rail drayage rosemont',
      'drayage trucking rosemont',
      'rosemont drayage services'
    ]
  },
  {
    name: 'Bensenville',
    slug: 'bensenville',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 8,
    drivingTime: 12,
    population: '18,352',
    zipCodes: ['60106'],
    majorIndustries: ['Rail', 'Logistics', 'Manufacturing', 'Distribution', 'Industrial'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 2,
    seoTitle: 'Bensenville Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Bensenville, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. Just 2 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services bensenville',
      'drayage companies bensenville',
      'intermodal drayage bensenville',
      'container drayage bensenville',
      'rail drayage bensenville',
      'drayage trucking bensenville',
      'bensenville drayage services'
    ]
  },
  {
    name: 'Wood Dale',
    slug: 'wood-dale',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 4,
    drivingTime: 7,
    population: '13,770',
    zipCodes: ['60191'],
    majorIndustries: ['Manufacturing', 'Logistics', 'Distribution', 'Industrial', 'Aviation'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 7,
    seoTitle: 'Wood Dale Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Wood Dale, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 7 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services wood dale',
      'drayage companies wood dale',
      'intermodal drayage wood dale',
      'container drayage wood dale',
      'rail drayage wood dale',
      'drayage trucking wood dale',
      'wood dale drayage services'
    ]
  },
  {
    name: 'Itasca',
    slug: 'itasca',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 6,
    drivingTime: 9,
    population: '9,496',
    zipCodes: ['60143'],
    majorIndustries: ['Corporate Headquarters', 'Distribution', 'Technology', 'Healthcare', 'Manufacturing'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 8,
    seoTitle: 'Itasca Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Itasca, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 8 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services itasca',
      'drayage companies itasca',
      'intermodal drayage itasca',
      'container drayage itasca',
      'rail drayage itasca',
      'drayage trucking itasca',
      'itasca drayage services'
    ]
  },
  {
    name: 'Addison',
    slug: 'addison',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 9,
    drivingTime: 13,
    population: '37,385',
    zipCodes: ['60101'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Logistics', 'Industrial', 'Automotive'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 6,
    seoTitle: 'Addison Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Addison, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 6 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services addison',
      'drayage companies addison',
      'intermodal drayage addison',
      'container drayage addison',
      'rail drayage addison',
      'drayage trucking addison',
      'addison drayage services'
    ]
  },
  {
    name: 'Hoffman Estates',
    slug: 'hoffman-estates',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 10,
    drivingTime: 14,
    population: '52,530',
    zipCodes: ['60169', '60179', '60192', '60195'],
    majorIndustries: ['Corporate Headquarters', 'Technology', 'Healthcare', 'Retail', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 14,
    seoTitle: 'Hoffman Estates Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Hoffman Estates, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 14 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services hoffman estates',
      'drayage companies hoffman estates',
      'intermodal drayage hoffman estates',
      'container drayage hoffman estates',
      'rail drayage hoffman estates',
      'drayage trucking hoffman estates',
      'hoffman estates drayage services'
    ]
  },
  {
    name: 'Palatine',
    slug: 'palatine',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 11,
    drivingTime: 15,
    population: '68,557',
    zipCodes: ['60055', '60067', '60074', '60078'],
    majorIndustries: ['Manufacturing', 'Technology', 'Healthcare', 'Distribution', 'Retail'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 15,
    seoTitle: 'Palatine Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Palatine, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 15 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services palatine',
      'drayage companies palatine',
      'intermodal drayage palatine',
      'container drayage palatine',
      'rail drayage palatine',
      'drayage trucking palatine',
      'palatine drayage services'
    ]
  },
  {
    name: 'Wheeling',
    slug: 'wheeling',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 12,
    drivingTime: 16,
    population: '38,719',
    zipCodes: ['60090'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Hospitality', 'Industrial', 'Logistics'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 16,
    seoTitle: 'Wheeling Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Wheeling, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 16 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services wheeling',
      'drayage companies wheeling',
      'intermodal drayage wheeling',
      'container drayage wheeling',
      'rail drayage wheeling',
      'drayage trucking wheeling',
      'wheeling drayage services'
    ]
  },
  {
    name: 'Northbrook',
    slug: 'northbrook',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 14,
    drivingTime: 18,
    population: '33,887',
    zipCodes: ['60062', '60065'],
    majorIndustries: ['Corporate Headquarters', 'Manufacturing', 'Technology', 'Healthcare', 'Retail'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 18,
    seoTitle: 'Northbrook Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Northbrook, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 18 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services northbrook',
      'drayage companies northbrook',
      'intermodal drayage northbrook',
      'container drayage northbrook',
      'rail drayage northbrook',
      'drayage trucking northbrook',
      'northbrook drayage services'
    ]
  },
  {
    name: 'Glenview',
    slug: 'glenview',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 13,
    drivingTime: 17,
    population: '47,523',
    zipCodes: ['60025', '60026'],
    majorIndustries: ['Corporate', 'Technology', 'Healthcare', 'Manufacturing', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 17,
    seoTitle: 'Glenview Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Glenview, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 17 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services glenview',
      'drayage companies glenview',
      'intermodal drayage glenview',
      'container drayage glenview',
      'rail drayage glenview',
      'drayage trucking glenview',
      'glenview drayage services'
    ]
  },
  {
    name: 'Skokie',
    slug: 'skokie',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 15,
    drivingTime: 19,
    population: '67,824',
    zipCodes: ['60076', '60077'],
    majorIndustries: ['Manufacturing', 'Healthcare', 'Technology', 'Distribution', 'Retail'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 19,
    seoTitle: 'Skokie Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Skokie, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 19 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services skokie',
      'drayage companies skokie',
      'intermodal drayage skokie',
      'container drayage skokie',
      'rail drayage skokie',
      'drayage trucking skokie',
      'skokie drayage services'
    ]
  },
  {
    name: 'Evanston',
    slug: 'evanston',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 17,
    drivingTime: 21,
    population: '78,110',
    zipCodes: ['60201', '60202', '60203', '60204'],
    majorIndustries: ['Education', 'Healthcare', 'Technology', 'Manufacturing', 'Retail'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 21,
    seoTitle: 'Evanston Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Evanston, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 21 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services evanston',
      'drayage companies evanston',
      'intermodal drayage evanston',
      'container drayage evanston',
      'rail drayage evanston',
      'drayage trucking evanston',
      'evanston drayage services'
    ]
  },
  {
    name: 'Elmhurst',
    slug: 'elmhurst',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 12,
    drivingTime: 16,
    population: '47,684',
    zipCodes: ['60126'],
    majorIndustries: ['Healthcare', 'Education', 'Retail', 'Technology', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 10,
    seoTitle: 'Elmhurst Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Elmhurst, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 10 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services elmhurst',
      'drayage companies elmhurst',
      'intermodal drayage elmhurst',
      'container drayage elmhurst',
      'rail drayage elmhurst',
      'drayage trucking elmhurst',
      'elmhurst drayage services'
    ]
  },
  {
    name: 'Lombard',
    slug: 'lombard',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 14,
    drivingTime: 18,
    population: '43,907',
    zipCodes: ['60148'],
    majorIndustries: ['Corporate', 'Technology', 'Healthcare', 'Distribution', 'Manufacturing'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 12,
    seoTitle: 'Lombard Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Lombard, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 12 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services lombard',
      'drayage companies lombard',
      'intermodal drayage lombard',
      'container drayage lombard',
      'rail drayage lombard',
      'drayage trucking lombard',
      'lombard drayage services'
    ]
  },
  {
    name: 'Carol Stream',
    slug: 'carol-stream',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 13,
    drivingTime: 17,
    population: '40,379',
    zipCodes: ['60116', '60188'],
    majorIndustries: ['Distribution', 'Logistics', 'Manufacturing', 'E-commerce', 'Industrial'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 11,
    seoTitle: 'Carol Stream Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Carol Stream, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 11 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services carol stream',
      'drayage companies carol stream',
      'intermodal drayage carol stream',
      'container drayage carol stream',
      'rail drayage carol stream',
      'drayage trucking carol stream',
      'carol stream drayage services'
    ]
  },
  {
    name: 'Downers Grove',
    slug: 'downers-grove',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 18,
    drivingTime: 22,
    population: '50,247',
    zipCodes: ['60515', '60516'],
    majorIndustries: ['Technology', 'Healthcare', 'Corporate', 'Retail', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 16,
    seoTitle: 'Downers Grove Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Downers Grove, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 16 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services downers grove',
      'drayage companies downers grove',
      'intermodal drayage downers grove',
      'container drayage downers grove',
      'rail drayage downers grove',
      'drayage trucking downers grove',
      'downers grove drayage services'
    ]
  },
  {
    name: 'Oak Brook',
    slug: 'oak-brook',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 16,
    drivingTime: 20,
    population: '8,163',
    zipCodes: ['60523'],
    majorIndustries: ['Corporate Headquarters', 'Retail', 'Technology', 'Healthcare', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 14,
    seoTitle: 'Oak Brook Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Oak Brook, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 14 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services oak brook',
      'drayage companies oak brook',
      'intermodal drayage oak brook',
      'container drayage oak brook',
      'rail drayage oak brook',
      'drayage trucking oak brook',
      'oak brook drayage services'
    ]
  },
  {
    name: 'Naperville',
    slug: 'naperville',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 25,
    drivingTime: 30,
    population: '149,540',
    zipCodes: ['60540', '60563', '60564', '60565'],
    majorIndustries: ['Technology', 'Healthcare', 'Corporate', 'Manufacturing', 'Distribution'],
    nearestRailyard: 'CP Bensenville',
    railyardDistance: 23,
    seoTitle: 'Naperville Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Naperville, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 23 miles from CP Bensenville railyard. Get quote today.',
    targetKeywords: [
      'drayage services naperville',
      'drayage companies naperville',
      'intermodal drayage naperville',
      'container drayage naperville',
      'rail drayage naperville',
      'drayage trucking naperville',
      'naperville drayage services'
    ]
  },
  {
    name: 'Aurora',
    slug: 'aurora',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 30,
    drivingTime: 35,
    population: '180,542',
    zipCodes: ['60502', '60503', '60504', '60505', '60506', '60507'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Healthcare', 'Technology', 'Logistics'],
    nearestRailyard: 'BNSF Elwood/Joliet',
    railyardDistance: 28,
    seoTitle: 'Aurora Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Aurora, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 28 miles from BNSF Elwood railyard. Get quote today.',
    targetKeywords: [
      'drayage services aurora',
      'drayage companies aurora',
      'intermodal drayage aurora',
      'container drayage aurora',
      'rail drayage aurora',
      'drayage trucking aurora',
      'aurora drayage services'
    ]
  },
  {
    name: 'Bolingbrook',
    slug: 'bolingbrook',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 28,
    drivingTime: 33,
    population: '73,922',
    zipCodes: ['60440', '60490'],
    majorIndustries: ['Distribution', 'Logistics', 'E-commerce', 'Manufacturing', 'Retail'],
    nearestRailyard: 'BNSF Elwood/Joliet',
    railyardDistance: 22,
    seoTitle: 'Bolingbrook Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Bolingbrook, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. 22 miles from BNSF Elwood railyard. Get quote today.',
    targetKeywords: [
      'drayage services bolingbrook',
      'drayage companies bolingbrook',
      'intermodal drayage bolingbrook',
      'container drayage bolingbrook',
      'rail drayage bolingbrook',
      'drayage trucking bolingbrook',
      'bolingbrook drayage services'
    ]
  },
  {
    name: 'Joliet',
    slug: 'joliet',
    state: 'Illinois',
    stateAbbr: 'IL',
    distance: 40,
    drivingTime: 45,
    population: '150,362',
    zipCodes: ['60431', '60432', '60433', '60435'],
    majorIndustries: ['Logistics', 'Distribution', 'Manufacturing', 'Rail', 'E-commerce'],
    nearestRailyard: 'BNSF Elwood/Joliet',
    railyardDistance: 8,
    seoTitle: 'Joliet Drayage Services | Intermodal Transport',
    seoDescription: 'Professional intermodal drayage services in Joliet, IL. Same-day rail pickup, 7-day operation, privately-owned chassis. Just 8 miles from BNSF Elwood railyard. Get quote today.',
    targetKeywords: [
      'drayage services joliet',
      'drayage companies joliet',
      'intermodal drayage joliet',
      'container drayage joliet',
      'rail drayage joliet',
      'drayage trucking joliet',
      'joliet drayage services'
    ]
  }
]

// Helper function to get drayage city data by slug
export function getDrayageCityBySlug(slug: string): DrayageCityData | undefined {
  return drayageCitiesData.find((city) => city.slug === slug)
}

// Helper function to get all drayage city slugs for static generation
export function getAllDrayageCitySlugs(): string[] {
  return drayageCitiesData.map((city) => city.slug)
}

// Helper function to get nearby drayage cities (excluding current city)
export function getNearbyDrayageCities(currentSlug: string, limit: number = 5): DrayageCityData[] {
  return drayageCitiesData
    .filter((city) => city.slug !== currentSlug)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

// Helper function to get railyard by name
export function getRailyardByName(name: string): DrayageRailyard | undefined {
  return railyards.find((railyard) => railyard.name === name)
}
