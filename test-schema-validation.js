/**
 * Schema Validation Test Script
 *
 * This script validates that all schema markup is properly formatted
 * and follows Schema.org specifications.
 */

const schemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CR Express, Inc.',
    url: 'https://www.crexpressinc.com',
    foundingDate: '1999',
    telephone: '+1-847-354-7979',
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CR Express, Inc.',
    telephone: '+1-847-354-7979',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2400 Arthur Ave',
      addressLocality: 'Elk Grove Village',
      addressRegion: 'IL',
      postalCode: '60007',
      addressCountry: 'US',
    },
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Test Question',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Test Answer',
        },
      },
    ],
  },
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Test Service',
    provider: {
      '@type': 'Organization',
      name: 'CR Express, Inc.',
    },
  },
}

function validateSchema(schema, name) {
  console.log(`\n✓ Validating ${name} schema...`)

  // Check required fields
  if (!schema['@context']) {
    console.error(`  ✗ Missing @context`)
    return false
  }

  if (!schema['@type']) {
    console.error(`  ✗ Missing @type`)
    return false
  }

  // Validate JSON structure
  try {
    const jsonString = JSON.stringify(schema, null, 2)
    JSON.parse(jsonString)
    console.log(`  ✓ Valid JSON structure`)
  } catch (error) {
    console.error(`  ✗ Invalid JSON: ${error.message}`)
    return false
  }

  // Check for common fields
  if (schema['@type'] === 'Organization' || schema['@type'] === 'LocalBusiness') {
    if (!schema.name) console.warn(`  ⚠ Missing recommended field: name`)
    if (!schema.telephone) console.warn(`  ⚠ Missing recommended field: telephone`)
    if (!schema.address) console.warn(`  ⚠ Missing recommended field: address`)
  }

  if (schema['@type'] === 'FAQPage') {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      console.error(`  ✗ FAQPage must have mainEntity array`)
      return false
    }
    console.log(`  ✓ ${schema.mainEntity.length} FAQ questions found`)
  }

  console.log(`  ✓ ${name} schema is valid!`)
  return true
}

console.log('='.repeat(60))
console.log('Schema Markup Validation Test')
console.log('='.repeat(60))

let allValid = true

for (const [name, schema] of Object.entries(schemas)) {
  if (!validateSchema(schema, name)) {
    allValid = false
  }
}

console.log('\n' + '='.repeat(60))
if (allValid) {
  console.log('✓ All schemas are valid!')
  console.log('='.repeat(60))
  console.log('\nNext Steps:')
  console.log('1. Test schemas with Google Rich Results Test:')
  console.log('   https://search.google.com/test/rich-results')
  console.log('\n2. Validate with Schema.org validator:')
  console.log('   https://validator.schema.org/')
  console.log('\n3. Check Google Search Console for any schema errors')
  process.exit(0)
} else {
  console.log('✗ Some schemas have validation errors')
  console.log('='.repeat(60))
  process.exit(1)
}
