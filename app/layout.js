
import './globals.css'

import Head from 'next/head'


export const metadata = {
  title: 'Happy Halloween!',
  description: 'Just few days missing for Halloween 2023',
}

export default function RootLayout({ children }) {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Head>
    <html lang="en">
      <body>{children}</body>
    </html>
    </>
  )
}
