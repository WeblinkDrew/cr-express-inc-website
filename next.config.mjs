import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crexpressinc.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.seobotai.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // FORM REDIRECTS - Ensure old form URLs remain functional
      {
        source: '/form/carrier-onboarding',
        destination: '/form/client-onboarding',
        permanent: true,
      },
      // CRITICAL PAGE REDIRECTS - Old site URLs to new structure
      {
        source: '/about-page',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-page/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/logistics-careers',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/logistics-careers/',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/contact-us-page',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact-us-page/',
        destination: '/contact',
        permanent: true,
      },
      // CRITICAL SERVICE PAGE REDIRECTS - Old URLs to New /services/ structure
      {
        source: '/warehousing',
        destination: '/services/warehousing',
        permanent: true,
      },
      {
        source: '/air-cargo',
        destination: '/services/air-cargo',
        permanent: true,
      },
      {
        source: '/drayage',
        destination: '/services/drayage',
        permanent: true,
      },
      {
        source: '/over-the-road',
        destination: '/services/over-the-road',
        permanent: true,
      },
      {
        source: '/local-pd',
        destination: '/services/local-pd',
        permanent: true,
      },
      // SEO-FRIENDLY VANITY REDIRECTS
      {
        source: '/bonded-warehouse',
        destination: '/services/warehousing',
        permanent: true,
      },
      {
        source: '/trucking',
        destination: '/services/over-the-road',
        permanent: true,
      },
      {
        source: '/freight',
        destination: '/services/over-the-road',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/services/over-the-road',
        permanent: true,
      },
      {
        source: '/logistics',
        destination: '/',
        permanent: true,
      },
      {
        source: '/quote',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/request-a-quote',
        destination: '/contact',
        permanent: true,
      },
      // BLOG POST REDIRECTS - Old permalinks to new /blog/ structure
      {
        source: '/test-post-2',
        destination: '/blog/cr-express-elevates-safety-efficiency-and-sustainability-with-samsara',
        permanent: true,
      },
      {
        source: '/2023/09/test-post-2',
        destination: '/blog/cr-express-elevates-safety-efficiency-and-sustainability-with-samsara',
        permanent: true,
      },
      {
        source: '/post-3-sss',
        destination: '/blog/cr-express-adheres-to-gdp-standards-ensuring-quality-and-compliance-in-pharmaceutical-transportation',
        permanent: true,
      },
      {
        source: '/2023/09/post-3-sss',
        destination: '/blog/cr-express-adheres-to-gdp-standards-ensuring-quality-and-compliance-in-pharmaceutical-transportation',
        permanent: true,
      },
      {
        source: '/cr-express-supports-boys-and-girls-club-of-america-through-sponsorship-and-collaboration',
        destination: '/blog/cr-express-supports-boys-and-girls-club-of-america',
        permanent: true,
      },
      {
        source: '/2023/09/cr-express-supports-boys-and-girls-club-of-america-through-sponsorship-and-collaboration',
        destination: '/blog/cr-express-supports-boys-and-girls-club-of-america',
        permanent: true,
      },
      {
        source: '/cdl-driver-employment',
        destination: '/blog/over-the-road-cdl-a-driver-2-years-experience',
        permanent: true,
      },
      {
        source: '/2025/08/cdl-driver-employment',
        destination: '/blog/over-the-road-cdl-a-driver-2-years-experience',
        permanent: true,
      },
      // LOCATION PAGE REDIRECTS - Old bonded warehouse URLs to new /locations/ structure
      {
        source: '/bonded-warehouse-chicago-illinois',
        destination: '/locations/chicago',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-chicago-illinois/',
        destination: '/locations/chicago',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-schaumburg-illinois',
        destination: '/locations/schaumburg',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-schaumburg-illinois/',
        destination: '/locations/schaumburg',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-arlington-heights-illinois',
        destination: '/locations/arlington-heights',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-arlington-heights-illinois/',
        destination: '/locations/arlington-heights',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-palatine-illinois',
        destination: '/locations/palatine',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-palatine-illinois/',
        destination: '/locations/palatine',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-des-plaines-illinois',
        destination: '/locations/des-plaines',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-des-plaines-illinois/',
        destination: '/locations/des-plaines',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-mount-prospect-illinois',
        destination: '/locations/mount-prospect',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-mount-prospect-illinois/',
        destination: '/locations/mount-prospect',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-hoffman-estates-illinois',
        destination: '/locations/hoffman-estates',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-hoffman-estates-illinois/',
        destination: '/locations/hoffman-estates',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-rosemont-illinois',
        destination: '/locations/rosemont',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-rosemont-illinois/',
        destination: '/locations/rosemont',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-wood-dale-illinois',
        destination: '/locations/wood-dale',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-wood-dale-illinois/',
        destination: '/locations/wood-dale',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bensenville-illinois',
        destination: '/locations/bensenville',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bensenville-illinois/',
        destination: '/locations/bensenville',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-addison-illinois',
        destination: '/locations/addison',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-addison-illinois/',
        destination: '/locations/addison',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-roselle-illinois',
        destination: '/locations/roselle',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-roselle-illinois/',
        destination: '/locations/roselle',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-carol-stream-illinois',
        destination: '/locations/carol-stream',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-carol-stream-illinois/',
        destination: '/locations/carol-stream',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bloomingdale-illinois',
        destination: '/locations/bloomingdale',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bloomingdale-illinois/',
        destination: '/locations/bloomingdale',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-glendale-heights-illinois',
        destination: '/locations/glendale-heights',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-glendale-heights-illinois/',
        destination: '/locations/glendale-heights',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-villa-park-illinois',
        destination: '/locations/villa-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-villa-park-illinois/',
        destination: '/locations/villa-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-wheeling-illinois',
        destination: '/locations/wheeling',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-wheeling-illinois/',
        destination: '/locations/wheeling',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-buffalo-grove-illinois',
        destination: '/locations/buffalo-grove',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-buffalo-grove-illinois/',
        destination: '/locations/buffalo-grove',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-northbrook-illinois',
        destination: '/locations/northbrook',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-northbrook-illinois/',
        destination: '/locations/northbrook',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-park-ridge-illinois',
        destination: '/locations/park-ridge',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-park-ridge-illinois/',
        destination: '/locations/park-ridge',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-niles-illinois',
        destination: '/locations/niles',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-niles-illinois/',
        destination: '/locations/niles',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-franklin-park-illinois',
        destination: '/locations/franklin-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-franklin-park-illinois/',
        destination: '/locations/franklin-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bartlett-illinois',
        destination: '/locations/bartlett',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-bartlett-illinois/',
        destination: '/locations/bartlett',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-hanover-park-illinois',
        destination: '/locations/hanover-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-hanover-park-illinois/',
        destination: '/locations/hanover-park',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-streamwood-illinois',
        destination: '/locations/streamwood',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-streamwood-illinois/',
        destination: '/locations/streamwood',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-rolling-meadows-illinois',
        destination: '/locations/rolling-meadows',
        permanent: true,
      },
      {
        source: '/bonded-warehouse-rolling-meadows-illinois/',
        destination: '/locations/rolling-meadows',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|mov)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    })
    return config
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        rehypeUnwrapImages,
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        [
          unifiedConditional,
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
            [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
            [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/services'))}`),
            [[remarkMDXLayout, '@/app/services/wrapper', 'service']],
          ],
        ],
      ],
    },
  })

  return withMDX(nextConfig)
}
