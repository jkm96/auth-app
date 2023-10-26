import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {UIProvider} from "@/app/providers/UiProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'Auth App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UIProvider>{children}</UIProvider>
      </body>
    </html>
  )
}
