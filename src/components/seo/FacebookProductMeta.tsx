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
 * This component renders meta tags directly (not using Head component for SSR compatibility).
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
      <meta property="og:type" content="product" key="og:type" />
      <meta property="og:title" content={title} key="og:title-product" />
      <meta property="og:description" content={description} key="og:description-product" />
      <meta property="og:url" content={url} key="og:url-product" />
      {image && <meta property="og:image" content={image} key="og:image-product" />}

      {/* Facebook Catalog Required Fields - Using exact property names */}
      <meta property="og:id" content={id} key="og:id" />
      <meta property="product:retailer_item_id" content={id} key="product:retailer_item_id" />
      <meta property="product:item_group_id" content={id} key="product:item_group_id" />
      <meta property="product:price:amount" content={price.toString()} key="product:price:amount" />
      <meta property="product:price:currency" content={currency} key="product:price:currency" />
      <meta property="product:availability" content={availability} key="product:availability" />

      {/* Alternative format that Facebook also reads - CRITICAL for catalog */}
      <meta name="id" content={id} key="meta-id" />
      <meta name="price" content={priceWithCurrency} key="meta-price" />
      <meta name="availability" content={availability} key="meta-availability" />

      {/* Additional product information */}
      <meta property="product:brand" content={brand} key="product:brand" />
      {category && <meta property="product:category" content={category} key="product:category" />}
      <meta property="product:condition" content="new" key="product:condition" />

      {/* Site information */}
      <meta property="og:site_name" content="Africa Digital Media Institute" key="og:site_name-product" />
      <meta property="og:locale" content="en_US" key="og:locale-product" />
    </Head>
  )
}
