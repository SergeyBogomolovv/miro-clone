import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
const font = Poppins({ weight: ['600'], subsets: ['latin'] })

export default function EmptySearch() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
        src='/empty-search.svg'
        alt='empty-search'
        width={200}
        height={200}
      />
      <h2 className={cn('text-3xl mt-6', font.className)}>Nothing found</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try searching something else
      </p>
    </div>
  )
}
