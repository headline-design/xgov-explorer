import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: '/private/',
      },
    ],
    sitemap: 'https://xgov.app/sitemap.xml',
  }
}