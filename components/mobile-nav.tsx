'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

// import { docsConfig } from "@/config/docs"
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

const mainNav = [
  {
    title: 'Get Started',
    href: '/start'
  },
  {
    title: 'Contact Us',
    href: '/contact'
  },
  {
    title: 'GitHub',
    href: 'https://github.com/cornfedstudio',
    external: true
  }
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 space-x-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/cornfed.svg'
            alt='Cornfed Studio'
            className='h-8 w-8 rounded-lg bg-[color:hsl(222.2,84%,4.9%)] dark:bg-none'
          />
          <svg
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
          >
            <path
              d='M3 5H11'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <path
              d='M3 12H16'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <path
              d='M3 19H21'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <MobileLink
          href='/'
          className='flex items-center'
          onOpenChange={setOpen}
        >
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <span className='font-bold'>{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='flex flex-col space-y-3 text-foreground/80'>
            {mainNav.map(
              item =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    external={item.external}
                    className='hover:text-foreground'
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  external?: boolean
}

function MobileLink({
  href,
  external,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        if (!external) {
          router.push(href.toString())
          onOpenChange?.(false)
        }
      }}
      target={external ? '_blank' : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
