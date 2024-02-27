import Link from 'next/link'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <div className='mx-auto my-12 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0'>
      <Link
        className='group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-primary bg-background px-7 py-2 backdrop-blur transition-all hover:border-primary/60'
        href='/onboarding'
      >
        <p className='text-sm font-semibold text-primary [text-wrap:balance]'>
          Submit new client proposal
        </p>
        <div className='group relative flex items-center'>
          <svg
            className='absolute -ml-1 h-3.5 w-3.5 transition-all group-hover:translate-x-1 group-hover:opacity-0'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 16 16'
            width='16'
            height='16'
          >
            <path
              fillRule='evenodd'
              d='M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z'
            ></path>
          </svg>
          <svg
            className='absolute -ml-1 h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 16 16'
            width='16'
            height='16'
          >
            <path
              fillRule='evenodd'
              d='M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z'
            ></path>
          </svg>
        </div>
      </Link>
      <h1 className='font-display mt-5 text-4xl font-extrabold leading-[1.15] text-primary sm:text-6xl sm:leading-[1.15]'>
        Your Trusted
        <br />
        <span className='bg-gradient-to-r from-[#020816] via-[#8EE21C] to-[#F9D516] bg-clip-text text-transparent dark:from-[#FFFFFF] dark:via-[#8EE21C] dark:to-[#F9D516]'>
          Web3 Partner
        </span>
      </h1>
      <h2 className='mt-5 text-muted-foreground sm:text-xl'>
        Full-stack studio for everything web3.
      </h2>
      <div className='mx-auto mt-5 flex max-w-fit space-x-4'>
        <Link href='/onboarding'>
          <Button>Get Started</Button>
        </Link>
        <Link href='/contact'>
          <Button variant='outline'>Contact Us</Button>
        </Link>
      </div>
    </div>
  )
}
