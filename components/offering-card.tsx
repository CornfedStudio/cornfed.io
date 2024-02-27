/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'

interface Props {
  title: string
  offeringArray: string[]
}

export default function OfferingCard({ title, offeringArray }: Props) {
  return (
    <div className='dark:to-bg-background/10 group relative row-span-2 h-full break-inside-avoid rounded-3xl border border-gray-300 bg-white/20 bg-gradient-to-bl from-transparent via-transparent to-accent backdrop-blur-lg transition-all hover:shadow-lg dark:border-gray-700 dark:bg-background/20 dark:shadow-white/30'>
      <img
        src='/card-dotted-grid.png'
        alt='Dotted grid background'
        className='pointer-events-none absolute right-0 top-0 dark:hidden'
      />
      <img
        src='/card-dotted-grid-dark.png'
        alt='Dotted grid background'
        className={cn(
          'pointer-events-none absolute right-0 top-0 hidden dark:block'
        )}
      />
      <div className='flex h-full flex-col justify-between p-8'>
        <div className='relative h-16 text-2xl text-primary'>{title}</div>
        <div className='space-y-5 text-primary'>
          {offeringArray.map(offering => (
            <div className='flex items-center space-x-2' key={offering}>
              <Checkbox id={offering} defaultChecked />
              <label
                htmlFor={offering}
                className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {offering}
              </label>
            </div>
          ))}
        </div>
        <div className='mt-8 flex items-center justify-between'>
          <div />
          <img
            alt='Cornfed Logo'
            loading='lazy'
            width='300'
            height='300'
            decoding='async'
            className='h-7 w-7 justify-end blur-0 grayscale'
            src='/cornfed.svg'
            style={{ color: 'transparent' }}
          />
        </div>
      </div>
    </div>
  )
}
