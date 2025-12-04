import React from 'react'
import Head from 'next/head'

interface FacebookProductMetaProps {
  id: string
  title: string
  description: string
  url: string
  image?: string
  price: number
  currency: string
  availability?: 'in stock' | 'out of stock' | 'preorder' | 'available for order'
  brand?: string
  category?: string
}

/**
 * Facebook Product Meta Tags for Catalog Integration
 *
 * Facebook's catalog scraper looks for OpenGraph product tags, not just JSON-LD.
 * This component adds all required Facebook product meta tags.
 *
 * @see https://developers.facebook.com/docs/marketing-api/catalog/guides/product-feed
 */
export function FacebookProductMeta({
  id,
  title,
  description,
  url,
  image,
  price,
  currency,
  availability = 'in stock',
  brand = 'ADMI',
  category
}: FacebookProductMetaProps) {
  // Format price with currency for Facebook (e.g., "450000 KES")
  const priceWithCurrency = `${price} ${currency}`

  return (
    <Head>
      {/* OpenGraph Base Tags */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Facebook Catalog Required Fields - Using exact property names */}
      <meta property="og:id" content={id} />
      <meta property="product:retailer_item_id" content={id} />
      <meta property="product:item_group_id" content={id} />
      <meta property="product:price:amount" content={price.toString()} />
      <meta property="product:price:currency" content={currency} />
      <meta property="product:availability" content={availability} />

      {/* Alternative format that Facebook also reads - CRITICAL for catalog */}
      <meta name="id" content={id} />
      <meta name="price" content={priceWithCurrency} />
      <meta name="availability" content={availability} />

      {/* Additional product information */}
      <meta property="product:brand" content={brand} />
      {category && <meta property="product:category" content={category} />}
      <meta property="product:condition" content="new" />

      {/* Site information */}
      <meta property="og:site_name" content="Africa Digital Media Institute" />
      <meta property="og:locale" content="en_US" />
    </Head>
  )
}
