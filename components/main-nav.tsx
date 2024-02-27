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
        <img
          src='/cornfed.svg'
          alt='Cornfed Studio'
          className='h-8 w-8 rounded-lg bg-[color:hsl(222.2,84%,4.9%)] dark:bg-none'
        />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      <nav className='flex items-center gap-6 text-sm'>
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
      </nav>
    </div>
  )
}
