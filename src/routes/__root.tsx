import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Atabek Traveling | Qo‘ng‘irot Ekskursiyalari',
      },
      {
        name: 'description',
        content:
          'Qo‘ng‘irotdan ekskursiyalar uchun zamonaviy Atabek Traveling sahifasi: ekskursiyalar, narxlar, bron qilish va aloqa.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/atabek-travel-icon.svg',
        type: 'image/svg+xml',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
       
        <Scripts />
      </body>
    </html>
  )
}
