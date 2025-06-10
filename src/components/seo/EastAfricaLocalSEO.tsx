import React from 'react'
import { MultiCityLocalBusinessSchema } from '@/components/shared/StructuredData'

// East African cities data for local SEO
const EAST_AFRICAN_CITIES = [
  {
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Nairobi County',
    coordinates: { latitude: -1.286389, longitude: 36.817223 },
    serviceArea: ['Nairobi', 'Central Kenya', 'Eastern Kenya', 'Coast Province'],
    courses: [
      'Film and Television Production Diploma',
      'Animation & Motion Graphics Diploma',
      'Graphic Design Diploma',
      'Music Production Diploma',
      'Sound Engineering Diploma'
    ]
  },
  {
    city: 'Kampala',
    country: 'Uganda',
    region: 'Central Region',
    coordinates: { latitude: 0.3476, longitude: 32.5825 },
    serviceArea: ['Kampala', 'Central Uganda', 'Western Uganda', 'Eastern Uganda'],
    courses: [
      'Film and Television Production Diploma',
      'Animation & Motion Graphics Diploma',
      'Graphic Design Diploma',
      'Music Production Diploma',
      'Digital Content Creation Certificate'
    ]
  },
  {
    city: 'Dar es Salaam',
    country: 'Tanzania',
    region: 'Dar es Salaam',
    coordinates: { latitude: -6.7924, longitude: 39.2083 },
    serviceArea: ['Dar es Salaam', 'Coast Region', 'Dodoma', 'Arusha'],
    courses: [
      'Film and Television Production Diploma',
      'Animation & Motion Graphics Diploma',
      'Graphic Design Diploma',
      'Video Production Certificate',
      'Photography Certificate'
    ]
  },
  {
    city: 'Kigali',
    country: 'Rwanda',
    region: 'Kigali Province',
    coordinates: { latitude: -1.9441, longitude: 30.0619 },
    serviceArea: ['Kigali', 'Northern Province', 'Southern Province', 'Eastern Province'],
    courses: [
      'Digital Content Creation Certificate',
      'Animation & Motion Graphics Diploma',
      'Graphic Design Certificate',
      'Video Production Certificate',
      'Digital Marketing Certificate'
    ]
  },
  {
    city: 'Addis Ababa',
    country: 'Ethiopia',
    region: 'Addis Ababa',
    coordinates: { latitude: 9.032, longitude: 38.7469 },
    serviceArea: ['Addis Ababa', 'Amhara Region', 'Oromia Region', 'Tigray Region'],
    courses: [
      'Digital Content Creation Certificate',
      'Graphic Design Certificate',
      'Animation & Motion Graphics Diploma',
      'Photography Certificate',
      'Music Production and Sound Engineering Certificate'
    ]
  }
]

interface EastAfricaLocalSEOProps {
  targetCity?: string
  showAll?: boolean
}

export function EastAfricaLocalSEO({ targetCity, showAll = false }: EastAfricaLocalSEOProps) {
  const citiesToRender = targetCity
    ? EAST_AFRICAN_CITIES.filter((city) => city.city.toLowerCase() === targetCity.toLowerCase())
    : showAll
      ? EAST_AFRICAN_CITIES
      : EAST_AFRICAN_CITIES.slice(0, 1) // Default to Nairobi only

  return (
    <>
      {citiesToRender.map((cityData) => (
        <MultiCityLocalBusinessSchema
          key={cityData.city}
          city={cityData.city}
          country={cityData.country}
          region={cityData.region}
          coordinates={cityData.coordinates}
          serviceArea={cityData.serviceArea}
          courses={cityData.courses}
        />
      ))}
    </>
  )
}

export { EAST_AFRICAN_CITIES }
