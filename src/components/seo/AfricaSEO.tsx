import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { AFRICAN_COUNTRIES, AFRICAN_SEO_KEYWORDS, generateAfricanStructuredData } from '@/utils/africa-seo-config'

interface AfricaSEOProps {
  title?: string
  description?: string
  targetCountries?: string[]
  targetRegions?: string[]
  additionalKeywords?: string[]
}

export function AfricaSEO({
  title = 'Digital Media Education Across Africa',
  description = 'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. From Kenya to Nigeria, Ghana to South Africa - empowering African creative professionals with world-class education.',
  targetCountries = [],
  targetRegions = [],
  additionalKeywords = []
}: AfricaSEOProps) {
  
  // Generate country-specific keywords
  const countryKeywords = targetCountries.length > 0 
    ? AFRICAN_COUNTRIES
        .filter(country => targetCountries.includes(country.code))
        .flatMap(country => [
          country.name,
          `digital media ${country.name}`,
          `creative education ${country.name}`,
          `online learning ${country.name}`,
          `ADMI ${country.name}`
        ])
    : []

  // Generate region-specific keywords
  const regionKeywords = targetRegions.length > 0
    ? targetRegions.flatMap(region => [
        region,
        `digital media ${region}`,
        `creative education ${region}`,
        `online learning ${region}`,
        `ADMI ${region}`
      ])
    : []

  const allKeywords = [
    ...AFRICAN_SEO_KEYWORDS,
    ...countryKeywords,
    ...regionKeywords,
    ...additionalKeywords
  ].join(', ')

  const structuredData = generateAfricanStructuredData()

  return (
    <>
      <Head>
        <title>{`ADMI - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={allKeywords} />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="AF" />
        <meta name="geo.placename" content="Africa" />
        <meta name="coverage" content="Africa" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        
        {/* Language alternatives */}
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="sw" href="/sw" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="pt" href="/pt" />
        <link rel="alternate" hrefLang="x-default" href="/" />
        
        {/* Open Graph for African markets */}
        <meta property="og:title" content={`ADMI - ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="sw_KE" />
        <meta property="og:locale:alternate" content="fr_SN" />
        <meta property="og:locale:alternate" content="ar_EG" />
        <meta property="og:locale:alternate" content="pt_AO" />
        
        {/* Twitter for African markets */}
        <meta name="twitter:title" content={`ADMI - ${title}`} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional African market meta tags */}
        <meta name="audience" content="African students, creative professionals" />
        <meta name="subject" content="Digital media education, creative training, online learning" />
        <meta name="classification" content="Education, Training, Digital Media" />
      </Head>
      
      {/* African market structured data */}
      <Script
        id="africa-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}

// Specific components for different African regions
export function EastAfricaSEO() {
  return (
    <AfricaSEO
      title="Digital Media Education in East Africa"
      description="Leading digital media institute serving Kenya, Tanzania, Uganda, Rwanda and Ethiopia. World-class creative education for East African students."
      targetCountries={['KE', 'TZ', 'UG', 'RW', 'ET']}
      targetRegions={['East Africa']}
      additionalKeywords={[
        'East African students', 'Swahili education', 'Nairobi campus',
        'Dar es Salaam', 'Kampala', 'Kigali', 'Addis Ababa'
      ]}
    />
  )
}

export function WestAfricaSEO() {
  return (
    <AfricaSEO
      title="Digital Media Education in West Africa"
      description="Empowering creative professionals in Nigeria, Ghana, Senegal, Cameroon and across West Africa with industry-relevant digital media education."
      targetCountries={['NG', 'GH', 'SN', 'CM']}
      targetRegions={['West Africa']}
      additionalKeywords={[
        'West African students', 'Nollywood', 'Lagos', 'Accra',
        'Dakar', 'Douala', 'French education', 'Anglophone Africa'
      ]}
    />
  )
}

export function SouthernAfricaSEO() {
  return (
    <AfricaSEO
      title="Digital Media Education in Southern Africa"
      description="Quality digital media and creative education for students in South Africa, Botswana, Namibia, Zimbabwe and across Southern Africa."
      targetCountries={['ZA', 'BW', 'NA', 'ZW']}
      targetRegions={['Southern Africa']}
      additionalKeywords={[
        'Southern African students', 'Cape Town', 'Johannesburg',
        'Gaborone', 'Windhoek', 'Harare', 'SADC region'
      ]}
    />
  )
}
