// Economic data API integration system for location pages
import type { EconomicData } from './location-data'

// Cache duration: 24 hours in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000

interface CachedEconomicData {
  data: Record<string, EconomicData>
  lastUpdated: number
}

// In-memory cache (in production, use Redis or similar)
let economicDataCache: CachedEconomicData | null = null

/**
 * Fetch economic data for a specific city
 * This function will fetch from APIs and cache the results
 */
export async function getEconomicData(cityName: string): Promise<EconomicData> {
  // Check if we have cached data that's still valid
  if (economicDataCache && Date.now() - economicDataCache.lastUpdated < CACHE_DURATION) {
    if (economicDataCache.data[cityName]) {
      return economicDataCache.data[cityName]
    }
  }

  // If no cache or expired, fetch fresh data
  try {
    const data = await fetchLiveEconomicData(cityName)

    // Update cache
    if (!economicDataCache) {
      economicDataCache = {
        data: {},
        lastUpdated: Date.now()
      }
    }

    economicDataCache.data[cityName] = data
    economicDataCache.lastUpdated = Date.now()

    return data
  } catch (error) {
    console.error(`Error fetching economic data for ${cityName}:`, error)
    // Return fallback data if API fails
    return getFallbackEconomicData(cityName)
  }
}

/**
 * Fetch live economic data from various APIs
 * In production, this would call real APIs (Census Bureau, BLS, etc.)
 */
async function fetchLiveEconomicData(cityName: string): Promise<EconomicData> {
  // TODO: Implement actual API calls to:
  // 1. U.S. Census Bureau Trade Data API
  // 2. Bureau of Labor Statistics (BLS) API
  // 3. FAA Cargo Statistics API
  // 4. Custom calculations for warehouse demand

  // For now, return realistic static data
  // This will be replaced with actual API integration

  return getFallbackEconomicData(cityName)
}

/**
 * Get fallback/static economic data
 * Used when APIs are unavailable or for initial development
 */
export function getFallbackEconomicData(cityName: string): EconomicData {
  // City-specific data with realistic variations
  const baseData: Record<string, Partial<EconomicData>> = {
    'Chicago': {
      importGrowth: '+12.4%',
      manufacturingJobs: '142,300',
      warehouseDemand: '156',
      airCargo: '1.87M tons',
    },
    'Schaumburg': {
      importGrowth: '+8.2%',
      manufacturingJobs: '12,400',
      warehouseDemand: '142',
      airCargo: '1.87M tons',
    },
    'Arlington Heights': {
      importGrowth: '+7.8%',
      manufacturingJobs: '11,200',
      warehouseDemand: '138',
      airCargo: '1.87M tons',
    },
    'Palatine': {
      importGrowth: '+9.1%',
      manufacturingJobs: '9,800',
      warehouseDemand: '145',
      airCargo: '1.87M tons',
    },
    'Des Plaines': {
      importGrowth: '+8.5%',
      manufacturingJobs: '8,900',
      warehouseDemand: '148',
      airCargo: '1.87M tons',
    },
  }

  const cityData = baseData[cityName] || {
    importGrowth: '+7.5%',
    manufacturingJobs: '8,500',
    warehouseDemand: '135',
    airCargo: '1.87M tons',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    importGrowth: cityData.importGrowth!,
    manufacturingJobs: cityData.manufacturingJobs!,
    warehouseDemand: cityData.warehouseDemand!,
    airCargo: cityData.airCargo!,
    containerVolumeTrend: {
      rate: '+8.2%',
      arrow: '↗',
      class: 'positive',
      description: 'vs. last quarter'
    },
    dutyRates: [
      { category: 'Automotive Parts', rate: '2.5-6.8%' },
      { category: 'Electronics', rate: '0-14%' },
      { category: 'Machinery', rate: '0-8.5%' },
      { category: 'Textiles', rate: '8-32%' },
      { category: 'Pharmaceuticals', rate: '0%' },
    ],
    seasonalPeak: {
      q4Peak: '+25%',
      q1Status: 'Optimal setup time'
    },
    lastUpdated: today
  }
}

/**
 * Manually trigger cache refresh
 * Can be called via API route or cron job
 */
export async function refreshEconomicDataCache(): Promise<void> {
  economicDataCache = null
  console.log('Economic data cache cleared. Will refresh on next request.')
}

/**
 * Get last cache update time
 */
export function getCacheStatus(): { lastUpdated: string | null; isValid: boolean } {
  if (!economicDataCache) {
    return {
      lastUpdated: null,
      isValid: false
    }
  }

  const isValid = Date.now() - economicDataCache.lastUpdated < CACHE_DURATION
  const lastUpdated = new Date(economicDataCache.lastUpdated).toISOString()

  return {
    lastUpdated,
    isValid
  }
}
