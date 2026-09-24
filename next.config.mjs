import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/app/_i18n/request.ts')

let r2Hostname = ''
if (process.env.CLOUDFLARE_PUBLIC_URL) {
  try {
    r2Hostname = new URL(process.env.CLOUDFLARE_PUBLIC_URL).hostname
  } catch (error) {
    console.warn(
      'The variable CLOUDFLARE_PUBLIC_URL is invalid or missing. Please check your environment variables: ',
      error,
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

if (r2Hostname) {
  nextConfig.images.remotePatterns.push({
    protocol: 'https',
    hostname: r2Hostname,
    port: '',
    pathname: '/**',
  })
}

export default withNextIntl(nextConfig)
