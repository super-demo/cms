import type { Metadata } from "next"

import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Super Office | CMS",
  description: "A CMS for Super Office"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
