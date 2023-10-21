import './globals.css'

export const metadata = {
  title: 'Happy Halloween!',
  description: 'Just few days missing for Halloween 2023',
}

export default function RootLayout({ children }) {
  return (
    <>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>

    </head>
    <html lang="en">
      <body>{children}</body>
    </html>
    </>
  )
}
