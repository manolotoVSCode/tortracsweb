import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  canonical?: string
  image?: string
  jsonLd?: object | object[]
  noIndex?: boolean
  lang?: string
}

const SEO = ({
  title,
  description,
  canonical,
  image = '/hero-trucks-highway.jpg',
  jsonLd,
  noIndex = false,
  lang = 'es',
}: SEOProps) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${origin}${canonical}`
    : typeof window !== 'undefined'
      ? window.location.href
      : ''

  const imageUrl = image?.startsWith('http') ? image : `${origin}${image}`

  const robots = noIndex ? 'noindex, nofollow' : 'index, follow'

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />} 

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />} 
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Structured Data */}
      {jsonLdArray.map((obj, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEO
