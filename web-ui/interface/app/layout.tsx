import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ISToresumido',
  description: 'Regulations of ISTécnico summarized',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link to favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
