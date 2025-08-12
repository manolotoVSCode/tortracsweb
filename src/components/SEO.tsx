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
  lang = 'es-MX',
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

  const siteName = 'TORTRACS'
  const ogLocale = (lang || 'es-MX').replace('-', '_')
  const hreflangLinks = canonicalUrl
    ? [
        { lang: 'es-MX', href: canonicalUrl },
        { lang: 'es', href: canonicalUrl },
        { lang: 'x-default', href: canonicalUrl },
      ]
    : []

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="bingbot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta httpEquiv="content-language" content={lang} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {hreflangLinks.map((l, idx) => (
        <link key={`alt-${idx}`} rel="alternate" hrefLang={l.lang} href={l.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:secure_url" content={imageUrl} />}
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:image:alt" content={title} />

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
