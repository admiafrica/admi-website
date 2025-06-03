// Africa-focused SEO configuration for ADMI
export const AFRICAN_COUNTRIES = [
  // East Africa
  { name: 'Kenya', code: 'KE', region: 'East Africa', languages: ['en', 'sw'] },
  { name: 'Tanzania', code: 'TZ', region: 'East Africa', languages: ['en', 'sw'] },
  { name: 'Uganda', code: 'UG', region: 'East Africa', languages: ['en'] },
  { name: 'Rwanda', code: 'RW', region: 'East Africa', languages: ['en', 'fr'] },
  { name: 'Ethiopia', code: 'ET', region: 'East Africa', languages: ['en'] },
  
  // West Africa
  { name: 'Nigeria', code: 'NG', region: 'West Africa', languages: ['en'] },
  { name: 'Ghana', code: 'GH', region: 'West Africa', languages: ['en'] },
  { name: 'Senegal', code: 'SN', region: 'West Africa', languages: ['fr'] },
  { name: 'Cameroon', code: 'CM', region: 'West Africa', languages: ['en', 'fr'] },
  { name: 'Ivory Coast', code: 'CI', region: 'West Africa', languages: ['fr'] },
  
  // Southern Africa
  { name: 'South Africa', code: 'ZA', region: 'Southern Africa', languages: ['en'] },
  { name: 'Botswana', code: 'BW', region: 'Southern Africa', languages: ['en'] },
  { name: 'Namibia', code: 'NA', region: 'Southern Africa', languages: ['en'] },
  { name: 'Zimbabwe', code: 'ZW', region: 'Southern Africa', languages: ['en'] },
  
  // North Africa
  { name: 'Egypt', code: 'EG', region: 'North Africa', languages: ['ar', 'en'] },
  { name: 'Morocco', code: 'MA', region: 'North Africa', languages: ['ar', 'fr'] },
  { name: 'Tunisia', code: 'TN', region: 'North Africa', languages: ['ar', 'fr'] },
  
  // Central Africa
  { name: 'Democratic Republic of Congo', code: 'CD', region: 'Central Africa', languages: ['fr'] },
  { name: 'Angola', code: 'AO', region: 'Central Africa', languages: ['pt'] },
]

export const AFRICAN_REGIONS = [
  'East Africa',
  'West Africa', 
  'Southern Africa',
  'North Africa',
  'Central Africa'
]

export const AFRICAN_LANGUAGES = {
  'en': 'English',
  'sw': 'Swahili', 
  'fr': 'French',
  'ar': 'Arabic',
  'pt': 'Portuguese'
}

export const AFRICAN_SEO_KEYWORDS = [
  // General Africa terms
  'Africa', 'African', 'pan-African', 'sub-Saharan Africa',

  // Regional terms
  'East Africa', 'West Africa', 'Southern Africa', 'North Africa', 'Central Africa',

  // Country-specific terms
  'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Nigeria', 'Ghana', 'South Africa',
  'Ethiopia', 'Cameroon', 'Senegal', 'Egypt', 'Morocco', 'Angola',

  // City terms
  'Nairobi', 'Lagos', 'Accra', 'Cape Town', 'Johannesburg', 'Dar es Salaam',
  'Kampala', 'Kigali', 'Addis Ababa', 'Cairo', 'Casablanca', 'Dakar',

  // Education terms
  'African education', 'creative media Africa', 'technology training Africa', 'digital media Africa', 'creative education Africa',
  'online learning Africa', 'distance learning Africa', 'African students',
  'African universities', 'higher education Africa', 'creative institution Africa',

  // Industry terms
  'African creative industry', 'creative media training', 'technology education Africa', 'Nollywood', 'African film', 'African animation',
  'African digital transformation', 'African tech education', 'African media',
  'creative professionals Africa', 'digital skills Africa', 'media technology Africa'
]

export const generateAfricanHreflangTags = (currentPath: string = '/') => {
  return Object.keys(AFRICAN_LANGUAGES).map(lang => ({
    hreflang: lang,
    href: lang === 'en' ? currentPath : `/${lang}${currentPath}`
  }))
}

export const getAfricanCountryKeywords = (countryCode?: string) => {
  if (!countryCode) return AFRICAN_SEO_KEYWORDS
  
  const country = AFRICAN_COUNTRIES.find(c => c.code === countryCode)
  if (!country) return AFRICAN_SEO_KEYWORDS
  
  const regionCountries = AFRICAN_COUNTRIES
    .filter(c => c.region === country.region)
    .map(c => c.name)
  
  return [
    ...AFRICAN_SEO_KEYWORDS,
    country.name,
    country.region,
    ...regionCountries,
    `digital media ${country.name}`,
    `creative education ${country.name}`,
    `online learning ${country.name}`
  ]
}

export const generateAfricanStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Africa Digital Media Institute',
  alternateName: 'ADMI',
  description: 'Leading Creative Media and Technology Training Institution serving students across Africa',
  url: 'https://admi.africa',
  areaServed: AFRICAN_COUNTRIES.map(country => ({
    '@type': 'Country',
    name: country.name,
    identifier: country.code
  })),
  availableLanguage: Object.entries(AFRICAN_LANGUAGES).map(([code, name]) => ({
    '@type': 'Language',
    name,
    alternateName: code
  })),
  serviceArea: {
    '@type': 'GeoShape',
    name: 'Africa',
    description: 'Continental Africa coverage for digital media education'
  }
})
