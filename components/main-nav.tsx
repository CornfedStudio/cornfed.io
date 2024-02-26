'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface Props {
  className?: string
}

export function MainNav({ className }: Props) {
  const pathname = usePathname()

  return (
    <div className={cn('mr-4 hidden md:flex', className)}>
      <Link
        href='/'
        className='mr-6 flex items-center justify-center space-x-2'
      >
        {/* <Icons.logo className="h-6 w-6" /> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/cornfed.svg' alt='Cornfed Studio' className='h-8 w-8' />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      <nav className='flex items-center gap-6 text-sm'>
        <Link
          href='/docs'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Docs
        </Link>
        <Link
          href='/docs/components'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Components
        </Link>
        <Link
          href='/themes'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/themes')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Themes
        </Link>
        <Link
          href='/examples'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/examples')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Examples
        </Link>
        <Link
          href={siteConfig.links.github}
          className={cn(
            'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block'
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  )
}
