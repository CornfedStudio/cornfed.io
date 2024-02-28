'use client'

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/pages/not-found-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
   return (
      <AlertDialog open defaultOpen>
         <AlertDialogContent forceMount className='bg-background/100 h-screen z-[9999] min-w-full border-none flex flex-col justify-center items-center data-[state=open]:animate-none [state=open]:zoom-in-0 data-[state=closed]:animate-none data-[state=open]:slide-in-none data-[state=open]:slide-in-none transition-none duration-0'>
            <AlertDialogHeader>
               <div className='flex justify-center'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     alt='Cornfed Logo'
                     loading='lazy'
                     width='300'
                     height='300'
                     decoding='async'
                     className='h-7 w-7 blur-0 grayscale'
                     src='/cornfed.svg'
                     style={{ color: 'transparent' }}
                  />
               </div>
               <AlertDialogTitle className='text-center text-3xl'>Error</AlertDialogTitle>
               <AlertDialogDescription className='text-foreground/80 text-xl'>
                  Something happened...
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <Link href='/'>
                  <Button>Go Home</Button>
               </Link>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
