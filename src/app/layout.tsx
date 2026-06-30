import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Optimus Family Hub — Interactive Prototype',
  description: 'Product Case Study · Senior PM Assignment · Piyush Dinde',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
