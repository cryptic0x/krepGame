import React from 'react'
import { NextSeo } from 'next-seo'

type SeoProps = {
  title?: string
  description?: string
  name?: string
  url?: string
  image?: string
  imageName?: string
  imageType?: string
  imageWidth?: number
  imageHeight?: number
  theme?: string
  noindex?: boolean
  nofollow?: boolean
}

const DEFAULT_TITLE = 'TAOSHI | Gamehub'
const DEFAULT_DESCRIPTION =
  'Join the TAOSHI memecoin revolution and compete in our mini-games! Earn, play, and climb the leaderboard with TAOSHI – the fun way to crypto!'
const DEFAULT_NAME = 'TAOSHI'
const DEFAULT_URL = 'https://gamehub.taoshi.ai'
const DEFAULT_IMAGE = 'https://gamehub.taoshi.ai/share.png'
const DEFAULT_IMAGE_NAME = 'Share image'
const DEFAULT_IMAGE_TYPE = 'image/png'
const DEFAULT_IMAGE_WIDTH = 859
const DEFAULT_IMAGE_HEIGHT = 474
const DEFAULT_THEME = '#ffffff'
const DEFAULT_NOINDEX = false
const DEFAULT_NOFOLLOW = false

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  name = DEFAULT_NAME,
  url = DEFAULT_URL,
  image = DEFAULT_IMAGE,
  imageName = DEFAULT_IMAGE_NAME,
  imageType = DEFAULT_IMAGE_TYPE,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  theme = DEFAULT_THEME,
  noindex = DEFAULT_NOINDEX,
  nofollow = DEFAULT_NOFOLLOW,
}: SeoProps) => (
  <NextSeo
    title={title}
    description={description}
    additionalLinkTags={[
      {
        rel: 'icon',
        href: '/favicon/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'manifest',
        href: '/favicon/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ]}
    themeColor={theme}
    noindex={noindex}
    nofollow={nofollow}
    openGraph={{
      type: 'website',
      locale: 'en_EN',
      url: url,
      title: title,
      site_name: title,
      description: description,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageName,
          type: imageType,
        },
      ],
    }}
    additionalMetaTags={[
      {
        name: 'viewport',
        content: 'initial-scale=1.0, width=device-width',
      },
      {
        name: 'application-name',
        content: name,
      },
      {
        httpEquiv: 'x-ua-compatible',
        content: 'IE=edge; chrome=1',
      },
    ]}
  />
)

export default Seo
