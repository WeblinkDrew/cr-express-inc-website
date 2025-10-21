// Location data types and database for programmatic SEO location pages

export interface CityData {
  name: string
  slug: string
  state: string
  distance: number // Miles from Elk Grove Village
  drivingTime: number // Minutes from Elk Grove Village
  population: string
  zipCodes: string[]
  majorIndustries: string[]
  seoTitle: string
  seoDescription: string
  targetKeywords: string[]
}

export interface EconomicData {
  importGrowth: string
  manufacturingJobs: string
  warehouseDemand: string
  airCargo: string
  containerVolumeTrend: {
    rate: string
    arrow: string
    class: 'positive' | 'negative' | 'neutral'
    description: string
  }
  dutyRates: {
    category: string
    rate: string
  }[]
  seasonalPeak: {
    q4Peak: string
    q1Status: string
  }
  lastUpdated: string
}

// Database of all 26 cities within 50 miles of Elk Grove Village
export const citiesData: CityData[] = [
  {
    name: 'Chicago',
    slug: 'chicago',
    state: 'IL',
    distance: 25,
    drivingTime: 35,
    population: '2,746,388',
    zipCodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607'],
    majorIndustries: ['Finance', 'Manufacturing', 'Technology', 'Healthcare', 'Transportation'],
    seoTitle: 'Bonded Warehouse Chicago IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Chicago, IL. CBW Class 3 certified, customs compliance, duty-free storage. 25 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse chicago',
      'customs warehouse chicago',
      'CBW class 3 chicago',
      'duty free storage chicago',
      'bonded storage near chicago',
      'customs bonded warehouse near chicago',
      'Custom Bonded Warehouse in chicago'
    ]
  },
  {
    name: 'Schaumburg',
    slug: 'schaumburg',
    state: 'IL',
    distance: 8,
    drivingTime: 12,
    population: '78,723',
    zipCodes: ['60159', '60168', '60173', '60193', '60194', '60195', '60196'],
    majorIndustries: ['Corporate Headquarters', 'Retail', 'Technology', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Schaumburg IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Schaumburg, IL. CBW Class 3 certified, customs compliance, duty-free storage. 8 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse schaumburg',
      'customs warehouse schaumburg',
      'CBW class 3 schaumburg',
      'duty free storage schaumburg',
      'bonded storage near schaumburg',
      'customs bonded warehouse near schaumburg',
      'Custom Bonded Warehouse in schaumburg'
    ]
  },
  {
    name: 'Arlington Heights',
    slug: 'arlington-heights',
    state: 'IL',
    distance: 7,
    drivingTime: 10,
    population: '77,676',
    zipCodes: ['60004', '60005', '60006'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Healthcare', 'Retail'],
    seoTitle: 'Bonded Warehouse Arlington Heights IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Arlington Heights, IL. CBW Class 3 certified, customs compliance, duty-free storage. 7 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse arlington heights',
      'customs warehouse arlington heights',
      'CBW class 3 arlington heights',
      'duty free storage arlington heights',
      'bonded storage near arlington heights',
      'customs bonded warehouse near arlington heights',
      'Custom Bonded Warehouse in arlington heights'
    ]
  },
  {
    name: 'Palatine',
    slug: 'palatine',
    state: 'IL',
    distance: 9,
    drivingTime: 13,
    population: '68,610',
    zipCodes: ['60038', '60055', '60067', '60074', '60078', '60095'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Technology', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Palatine IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Palatine, IL. CBW Class 3 certified, customs compliance, duty-free storage. 9 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse palatine',
      'customs warehouse palatine',
      'CBW class 3 palatine',
      'duty free storage palatine',
      'bonded storage near palatine',
      'customs bonded warehouse near palatine',
      'Custom Bonded Warehouse in palatine'
    ]
  },
  {
    name: 'Des Plaines',
    slug: 'des-plaines',
    state: 'IL',
    distance: 6,
    drivingTime: 9,
    population: '58,720',
    zipCodes: ['60016', '60017', '60018', '60019'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Healthcare', 'Retail'],
    seoTitle: 'Bonded Warehouse Des Plaines IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Des Plaines, IL. CBW Class 3 certified, customs compliance, duty-free storage. 6 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse des plaines',
      'customs warehouse des plaines',
      'CBW class 3 des plaines',
      'duty free storage des plaines',
      'bonded storage near des plaines',
      'customs bonded warehouse near des plaines',
      'Custom Bonded Warehouse in des plaines'
    ]
  },
  {
    name: 'Mount Prospect',
    slug: 'mount-prospect',
    state: 'IL',
    distance: 6,
    drivingTime: 9,
    population: '56,265',
    zipCodes: ['60056'],
    majorIndustries: ['Manufacturing', 'Technology', 'Healthcare', 'Corporate'],
    seoTitle: 'Bonded Warehouse Mount Prospect IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Mount Prospect, IL. CBW Class 3 certified, customs compliance, duty-free storage. 6 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse mount prospect',
      'customs warehouse mount prospect',
      'CBW class 3 mount prospect',
      'duty free storage mount prospect',
      'bonded storage near mount prospect',
      'customs bonded warehouse near mount prospect',
      'Custom Bonded Warehouse in mount prospect'
    ]
  },
  {
    name: 'Hoffman Estates',
    slug: 'hoffman-estates',
    state: 'IL',
    distance: 8,
    drivingTime: 12,
    population: '52,530',
    zipCodes: ['60169', '60179', '60192', '60195'],
    majorIndustries: ['Corporate Headquarters', 'Manufacturing', 'Technology', 'Retail'],
    seoTitle: 'Bonded Warehouse Hoffman Estates IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Hoffman Estates, IL. CBW Class 3 certified, customs compliance, duty-free storage. 8 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse hoffman estates',
      'customs warehouse hoffman estates',
      'CBW class 3 hoffman estates',
      'duty free storage hoffman estates',
      'bonded storage near hoffman estates',
      'customs bonded warehouse near hoffman estates',
      'Custom Bonded Warehouse in hoffman estates'
    ]
  },
  {
    name: 'Buffalo Grove',
    slug: 'buffalo-grove',
    state: 'IL',
    distance: 10,
    drivingTime: 14,
    population: '41,778',
    zipCodes: ['60089'],
    majorIndustries: ['Corporate', 'Technology', 'Healthcare', 'Retail'],
    seoTitle: 'Bonded Warehouse Buffalo Grove IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Buffalo Grove, IL. CBW Class 3 certified, customs compliance, duty-free storage. 10 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse buffalo grove',
      'customs warehouse buffalo grove',
      'CBW class 3 buffalo grove',
      'duty free storage buffalo grove',
      'bonded storage near buffalo grove',
      'customs bonded warehouse near buffalo grove',
      'Custom Bonded Warehouse in buffalo grove'
    ]
  },
  {
    name: 'Rosemont',
    slug: 'rosemont',
    state: 'IL',
    distance: 4,
    drivingTime: 6,
    population: '4,202',
    zipCodes: ['60018'],
    majorIndustries: ['Hospitality', 'Entertainment', 'Convention', 'Transportation'],
    seoTitle: 'Bonded Warehouse Rosemont IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Rosemont, IL. CBW Class 3 certified, customs compliance, duty-free storage. 4 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse rosemont',
      'customs warehouse rosemont',
      'CBW class 3 rosemont',
      'duty free storage rosemont',
      'bonded storage near rosemont',
      'customs bonded warehouse near rosemont',
      'Custom Bonded Warehouse in rosemont'
    ]
  },
  {
    name: 'Wood Dale',
    slug: 'wood-dale',
    state: 'IL',
    distance: 3,
    drivingTime: 5,
    population: '13,847',
    zipCodes: ['60191'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Logistics', 'Industrial'],
    seoTitle: 'Bonded Warehouse Wood Dale IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Wood Dale, IL. CBW Class 3 certified, customs compliance, duty-free storage. 3 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse wood dale',
      'customs warehouse wood dale',
      'CBW class 3 wood dale',
      'duty free storage wood dale',
      'bonded storage near wood dale',
      'customs bonded warehouse near wood dale',
      'Custom Bonded Warehouse in wood dale'
    ]
  },
  {
    name: 'Bensenville',
    slug: 'bensenville',
    state: 'IL',
    distance: 2,
    drivingTime: 4,
    population: '18,352',
    zipCodes: ['60106'],
    majorIndustries: ['Logistics', 'Manufacturing', 'Distribution', 'Industrial'],
    seoTitle: 'Bonded Warehouse Bensenville IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Bensenville, IL. CBW Class 3 certified, customs compliance, duty-free storage. 2 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse bensenville',
      'customs warehouse bensenville',
      'CBW class 3 bensenville',
      'duty free storage bensenville',
      'bonded storage near bensenville',
      'customs bonded warehouse near bensenville',
      'Custom Bonded Warehouse in bensenville'
    ]
  },
  {
    name: 'Addison',
    slug: 'addison',
    state: 'IL',
    distance: 5,
    drivingTime: 8,
    population: '36,942',
    zipCodes: ['60101'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Industrial', 'Logistics'],
    seoTitle: 'Bonded Warehouse Addison IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Addison, IL. CBW Class 3 certified, customs compliance, duty-free storage. 5 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse addison',
      'customs warehouse addison',
      'CBW class 3 addison',
      'duty free storage addison',
      'bonded storage near addison',
      'customs bonded warehouse near addison',
      'Custom Bonded Warehouse in addison'
    ]
  },
  {
    name: 'Roselle',
    slug: 'roselle',
    state: 'IL',
    distance: 7,
    drivingTime: 10,
    population: '22,763',
    zipCodes: ['60172'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Retail', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Roselle IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Roselle, IL. CBW Class 3 certified, customs compliance, duty-free storage. 7 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse roselle',
      'customs warehouse roselle',
      'CBW class 3 roselle',
      'duty free storage roselle',
      'bonded storage near roselle',
      'customs bonded warehouse near roselle',
      'Custom Bonded Warehouse in roselle'
    ]
  },
  {
    name: 'Carol Stream',
    slug: 'carol-stream',
    state: 'IL',
    distance: 10,
    drivingTime: 14,
    population: '40,379',
    zipCodes: ['60116', '60128', '60188', '60197', '60199'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Technology', 'Retail'],
    seoTitle: 'Bonded Warehouse Carol Stream IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Carol Stream, IL. CBW Class 3 certified, customs compliance, duty-free storage. 10 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse carol stream',
      'customs warehouse carol stream',
      'CBW class 3 carol stream',
      'duty free storage carol stream',
      'bonded storage near carol stream',
      'customs bonded warehouse near carol stream',
      'Custom Bonded Warehouse in carol stream'
    ]
  },
  {
    name: 'Bloomingdale',
    slug: 'bloomingdale',
    state: 'IL',
    distance: 9,
    drivingTime: 13,
    population: '22,018',
    zipCodes: ['60108'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Distribution', 'Retail'],
    seoTitle: 'Bonded Warehouse Bloomingdale IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Bloomingdale, IL. CBW Class 3 certified, customs compliance, duty-free storage. 9 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse bloomingdale',
      'customs warehouse bloomingdale',
      'CBW class 3 bloomingdale',
      'duty free storage bloomingdale',
      'bonded storage near bloomingdale',
      'customs bonded warehouse near bloomingdale',
      'Custom Bonded Warehouse in bloomingdale'
    ]
  },
  {
    name: 'Glendale Heights',
    slug: 'glendale-heights',
    state: 'IL',
    distance: 11,
    drivingTime: 15,
    population: '34,208',
    zipCodes: ['60139'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Retail', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Glendale Heights IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Glendale Heights, IL. CBW Class 3 certified, customs compliance, duty-free storage. 11 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse glendale heights',
      'customs warehouse glendale heights',
      'CBW class 3 glendale heights',
      'duty free storage glendale heights',
      'bonded storage near glendale heights',
      'customs bonded warehouse near glendale heights',
      'Custom Bonded Warehouse in glendale heights'
    ]
  },
  {
    name: 'Villa Park',
    slug: 'villa-park',
    state: 'IL',
    distance: 12,
    drivingTime: 16,
    population: '21,904',
    zipCodes: ['60181'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Retail', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Villa Park IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Villa Park, IL. CBW Class 3 certified, customs compliance, duty-free storage. 12 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse villa park',
      'customs warehouse villa park',
      'CBW class 3 villa park',
      'duty free storage villa park',
      'bonded storage near villa park',
      'customs bonded warehouse near villa park',
      'Custom Bonded Warehouse in villa park'
    ]
  },
  {
    name: 'Wheeling',
    slug: 'wheeling',
    state: 'IL',
    distance: 11,
    drivingTime: 15,
    population: '38,713',
    zipCodes: ['60090'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Industrial', 'Corporate'],
    seoTitle: 'Bonded Warehouse Wheeling IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Wheeling, IL. CBW Class 3 certified, customs compliance, duty-free storage. 11 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse wheeling',
      'customs warehouse wheeling',
      'CBW class 3 wheeling',
      'duty free storage wheeling',
      'bonded storage near wheeling',
      'customs bonded warehouse near wheeling',
      'Custom Bonded Warehouse in wheeling'
    ]
  },
  {
    name: 'Northbrook',
    slug: 'northbrook',
    state: 'IL',
    distance: 13,
    drivingTime: 17,
    population: '33,170',
    zipCodes: ['60062', '60065'],
    majorIndustries: ['Corporate', 'Technology', 'Healthcare', 'Retail'],
    seoTitle: 'Bonded Warehouse Northbrook IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Northbrook, IL. CBW Class 3 certified, customs compliance, duty-free storage. 13 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse northbrook',
      'customs warehouse northbrook',
      'CBW class 3 northbrook',
      'duty free storage northbrook',
      'bonded storage near northbrook',
      'customs bonded warehouse near northbrook',
      'Custom Bonded Warehouse in northbrook'
    ]
  },
  {
    name: 'Park Ridge',
    slug: 'park-ridge',
    state: 'IL',
    distance: 9,
    drivingTime: 13,
    population: '39,656',
    zipCodes: ['60068'],
    majorIndustries: ['Healthcare', 'Corporate', 'Retail', 'Technology'],
    seoTitle: 'Bonded Warehouse Park Ridge IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Park Ridge, IL. CBW Class 3 certified, customs compliance, duty-free storage. 9 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse park ridge',
      'customs warehouse park ridge',
      'CBW class 3 park ridge',
      'duty free storage park ridge',
      'bonded storage near park ridge',
      'customs bonded warehouse near park ridge',
      'Custom Bonded Warehouse in park ridge'
    ]
  },
  {
    name: 'Niles',
    slug: 'niles',
    state: 'IL',
    distance: 8,
    drivingTime: 12,
    population: '29,803',
    zipCodes: ['60714'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Retail', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Niles IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Niles, IL. CBW Class 3 certified, customs compliance, duty-free storage. 8 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse niles',
      'customs warehouse niles',
      'CBW class 3 niles',
      'duty free storage niles',
      'bonded storage near niles',
      'customs bonded warehouse near niles',
      'Custom Bonded Warehouse in niles'
    ]
  },
  {
    name: 'Franklin Park',
    slug: 'franklin-park',
    state: 'IL',
    distance: 3,
    drivingTime: 5,
    population: '18,467',
    zipCodes: ['60131'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Industrial', 'Logistics'],
    seoTitle: 'Bonded Warehouse Franklin Park IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Franklin Park, IL. CBW Class 3 certified, customs compliance, duty-free storage. 3 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse franklin park',
      'customs warehouse franklin park',
      'CBW class 3 franklin park',
      'duty free storage franklin park',
      'bonded storage near franklin park',
      'customs bonded warehouse near franklin park',
      'Custom Bonded Warehouse in franklin park'
    ]
  },
  {
    name: 'Bartlett',
    slug: 'bartlett',
    state: 'IL',
    distance: 14,
    drivingTime: 18,
    population: '41,208',
    zipCodes: ['60103'],
    majorIndustries: ['Manufacturing', 'Corporate', 'Retail', 'Technology'],
    seoTitle: 'Bonded Warehouse Bartlett IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Bartlett, IL. CBW Class 3 certified, customs compliance, duty-free storage. 14 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse bartlett',
      'customs warehouse bartlett',
      'CBW class 3 bartlett',
      'duty free storage bartlett',
      'bonded storage near bartlett',
      'customs bonded warehouse near bartlett',
      'Custom Bonded Warehouse in bartlett'
    ]
  },
  {
    name: 'Hanover Park',
    slug: 'hanover-park',
    state: 'IL',
    distance: 11,
    drivingTime: 15,
    population: '37,973',
    zipCodes: ['60103', '60133'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Retail', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Hanover Park IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Hanover Park, IL. CBW Class 3 certified, customs compliance, duty-free storage. 11 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse hanover park',
      'customs warehouse hanover park',
      'CBW class 3 hanover park',
      'duty free storage hanover park',
      'bonded storage near hanover park',
      'customs bonded warehouse near hanover park',
      'Custom Bonded Warehouse in hanover park'
    ]
  },
  {
    name: 'Streamwood',
    slug: 'streamwood',
    state: 'IL',
    distance: 10,
    drivingTime: 14,
    population: '39,858',
    zipCodes: ['60107'],
    majorIndustries: ['Manufacturing', 'Distribution', 'Retail', 'Corporate'],
    seoTitle: 'Bonded Warehouse Streamwood IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Streamwood, IL. CBW Class 3 certified, customs compliance, duty-free storage. 10 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse streamwood',
      'customs warehouse streamwood',
      'CBW class 3 streamwood',
      'duty free storage streamwood',
      'bonded storage near streamwood',
      'customs bonded warehouse near streamwood',
      'Custom Bonded Warehouse in streamwood'
    ]
  },
  {
    name: 'Rolling Meadows',
    slug: 'rolling-meadows',
    state: 'IL',
    distance: 7,
    drivingTime: 10,
    population: '24,099',
    zipCodes: ['60008'],
    majorIndustries: ['Corporate', 'Technology', 'Manufacturing', 'Healthcare'],
    seoTitle: 'Bonded Warehouse Rolling Meadows IL | CBW Class 3 | CR Express',
    seoDescription: 'Professional bonded warehouse services in Rolling Meadows, IL. CBW Class 3 certified, customs compliance, duty-free storage. 7 miles from facility. Get quote today.',
    targetKeywords: [
      'bonded warehouse rolling meadows',
      'customs warehouse rolling meadows',
      'CBW class 3 rolling meadows',
      'duty free storage rolling meadows',
      'bonded storage near rolling meadows',
      'customs bonded warehouse near rolling meadows',
      'Custom Bonded Warehouse in rolling meadows'
    ]
  },
]

// Helper function to get city data by slug
export function getCityBySlug(slug: string): CityData | undefined {
  return citiesData.find((city) => city.slug === slug)
}

// Helper function to get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return citiesData.map((city) => city.slug)
}

// Helper function to get nearby cities (excluding current city)
export function getNearbyCities(currentSlug: string, limit: number = 6): CityData[] {
  return citiesData
    .filter((city) => city.slug !== currentSlug)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}
