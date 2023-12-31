import './globals.css'

import type { Metadata } from 'next'

import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

import { ModalProvider } from "@/components/providers/modal-provider";

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Fullstack Discord Clone: Next.js 13, React, Socket.io, Prisma, Tailwind, MySQL | Full Course 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={cn(openSans.className, "bg-white dark:bg-[#313338]")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    storageKey="discord-theme"
                >
                    <ModalProvider />
                    {children}
                </ThemeProvider>
            </body>
          </html>
      </ClerkProvider>
  )
}
