import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'
import { Providers } from '@/components/providers'
import Footer from '@/components/ui/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cornfed Studio',
  description: 'A hearty web3 studio'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'mx-auto')}>
        <Providers
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex-col'>
            <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
              <div className='container mx-auto flex h-14 max-w-5xl items-center'>
                <MainNav />
                <MobileNav />
                <div className='flex flex-1 items-center justify-end space-x-2'>
                  <nav className='flex items-center'>
                    <Link
                      href={siteConfig.links.github}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div
                        className={cn(
                          buttonVariants({
                            variant: 'ghost'
                          }),
                          'w-9 px-0'
                        )}
                      >
                        <Icons.gitHub className='h-4 w-4' />
                        <span className='sr-only'>GitHub</span>
                      </div>
                    </Link>
                    <ModeToggle />
                  </nav>
                </div>
              </div>
            </header>
            <div className='mx-auto max-w-5xl flex-1 space-y-4 p-8 pt-6'>
              <main className='flex min-h-screen flex-col items-center'>
                {children}
              </main>
            </div>
          </div>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
