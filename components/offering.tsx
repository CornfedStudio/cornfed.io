import OfferingCard from './offering-card'

const strategyOffering = [
  'Experience Strategy',
  'Technology Strategy',
  'Creative Direction',
  'Discovery',
  'Research'
]

const creativeOffering = [
  'UX/UI Design',
  'Brand Design',
  'Logo Design',
  'Typography',
  'Theming'
]

const developmentOffering = [
  'Front-end Development',
  'Back-end Development',
  'CMS Integrations',
  'API Integrations',
  'Databases'
]

const web3Offering = [
  'Smart Contract Development',
  'Blockchain Integration',
  'NFT Development',
  'DAO Development',
  'Token Issuance'
]

/* eslint-disable @next/next/no-img-element */
export default function Offering() {
  return (
    <div className='mx-auto w-full max-w-screen-xl px-2.5 py-20 lg:px-20'>
      <div className='mx-auto max-w-md text-center sm:max-w-xl'>
        <h2 className='font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl sm:leading-tight'>
          Your Project,
          <br />
          <span className='text-primary'>
            Our <span className='underline'>Expertise</span>
          </span>
        </h2>
        <p className='mt-5 text-foreground/80 sm:text-lg'>
          One-stop shop for all your project needs.
        </p>
      </div>
      <div className='mx-auto grid w-full grid-cols-1 justify-center gap-6 pt-8 sm:grid-cols-2'>
        {/* <ul className='group relative row-span-2 break-inside-avoid rounded-3xl border border-gray-300 bg-black bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,255,255,0.25)] backdrop-blur-lg transition-all hover:shadow-lg'> */}
        <OfferingCard title='Strategy' offeringArray={strategyOffering} />
        <OfferingCard title='Creative' offeringArray={creativeOffering} />
        <OfferingCard title='Development' offeringArray={developmentOffering} />
        <OfferingCard title='Web3' offeringArray={web3Offering} />
      </div>
    </div>
  )
}
