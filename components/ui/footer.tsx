'use client'

import { siteConfig } from '@/config/site'
import { Icons } from '../icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: Icons.gitHub
  }
]

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className='mx-auto flex-1 border-t bg-background p-8'>
      <div className='mx-auto flex flex-col items-center justify-center px-6 lg:px-8'>
        <p className='text-center text-xs leading-5 text-foreground/80'>
          Created by{' '}
          <Link
            href='/'
            className='font-medium text-primary hover:text-primary/80'
          >
            Cornfed Studio
          </Link>{' '}
          as FOSS.
        </p>
        <div className='mt-4 space-x-6 text-sm'>
          <Link
            href='/start'
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/start')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Get Started
          </Link>
          <Link
            href='/contact'
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/contact')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Contact Us
          </Link>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            className={cn(
              'text-foreground/60 transition-colors hover:text-foreground/80'
            )}
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
