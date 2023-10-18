
import './globals.css'


export const metadata = {
  title: 'Happy Halloween!',
  description: 'Just few days missing for Halloween 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
