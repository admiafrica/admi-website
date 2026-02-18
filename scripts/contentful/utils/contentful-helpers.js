/**
 * Shared Contentful Migration Helpers
 *
 * Idempotent utilities for creating content types, fields, and entries.
 * Used by all page migration scripts.
 *
 * Usage:
 *   const { getEnvironment, ensureContentType, ensureEntry } = require('./utils/contentful-helpers')
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

/**
 * Validate required environment variables
 */
function validateEnv() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('Missing required environment variables:')
    if (!SPACE_ID) console.error('   - ADMI_CONTENTFUL_SPACE_ID')
    if (!MANAGEMENT_TOKEN) console.error('   - CONTENTFUL_MANAGEMENT_TOKEN')
    process.exit(1)
  }
}

/**
 * Get the Contentful environment (cached singleton)
 */
let _environment = null
async function getEnvironment() {
  if (_environment) return _environment
  validateEnv()

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  _environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log(`Connected to Contentful space=${SPACE_ID} env=${ENVIRONMENT_ID}`)
  return _environment
}

/**
 * Create or get a content type (idempotent).
 * If the content type already exists, returns it without modification.
 *
 * @param {string} contentTypeId - The content type ID
 * @param {object} definition - { name, description, displayField, fields }
 * @returns {object} The content type
 */
async function ensureContentType(contentTypeId, definition) {
  const env = await getEnvironment()

  try {
    const existing = await env.getContentType(contentTypeId)
    console.log(`Content type "${contentTypeId}" already exists, skipping creation.`)
    return existing
  } catch (error) {
    if (error.name !== 'NotFound') throw error
  }

  console.log(`Creating content type "${contentTypeId}"...`)
  const contentType = await env.createContentTypeWithId(contentTypeId, definition)
  await contentType.publish()
  console.log(`Content type "${contentTypeId}" created and published.`)
  return contentType
}

/**
 * Create or get an entry (idempotent).
 * Checks by content_type + a unique field value to prevent duplicates.
 *
 * @param {string} contentTypeId - The content type to create an entry for
 * @param {object} fields - Entry fields in Contentful format { fieldId: { 'en-US': value } }
 * @param {object} options
 * @param {string} [options.uniqueField='internalName'] - Field used to check for existing entry
 * @param {boolean} [options.publish=true] - Whether to publish the entry after creation
 * @returns {object} The entry
 */
async function ensureEntry(contentTypeId, fields, options = {}) {
  const { uniqueField = 'internalName', publish = true } = options
  const env = await getEnvironment()

  // Check if an entry with this unique field value already exists
  const uniqueValue = fields[uniqueField]?.['en-US']
  if (uniqueValue) {
    const existing = await env.getEntries({
      content_type: contentTypeId,
      [`fields.${uniqueField}`]: uniqueValue,
      limit: 1
    })

    if (existing.items.length > 0) {
      console.log(`Entry "${uniqueValue}" already exists (id=${existing.items[0].sys.id}), skipping.`)
      return existing.items[0]
    }
  }

  console.log(`Creating entry for "${contentTypeId}" (${uniqueValue || 'no unique field'})...`)
  const entry = await env.createEntry(contentTypeId, { fields })

  if (publish) {
    await entry.publish()
    console.log(`Entry created and published (id=${entry.sys.id}).`)
  } else {
    console.log(`Entry created as draft (id=${entry.sys.id}).`)
  }

  return entry
}

/**
 * Create multiple entries (idempotent).
 *
 * @param {string} contentTypeId
 * @param {Array<object>} entriesData - Array of field objects
 * @param {object} options - Same as ensureEntry options
 * @returns {Array<object>} The created/existing entries
 */
async function ensureEntries(contentTypeId, entriesData, options = {}) {
  const results = []
  for (const fields of entriesData) {
    const entry = await ensureEntry(contentTypeId, fields, options)
    results.push(entry)
  }
  return results
}

/**
 * Wrap locale around plain values.
 * Converts { key: value } to { key: { 'en-US': value } }
 */
function localize(obj, locale = 'en-US') {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = { [locale]: value }
  }
  return result
}

module.exports = {
  getEnvironment,
  ensureContentType,
  ensureEntry,
  ensureEntries,
  localize,
  validateEnv,
  SPACE_ID,
  MANAGEMENT_TOKEN,
  ENVIRONMENT_ID
}
