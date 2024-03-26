import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
const font = Poppins({ weight: ['600'], subsets: ['latin'] })

export default function EmptyFavorites() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
        src='/empty-favorites.svg'
        alt='empty-favorites'
        width={140}
        height={140}
      />
      <h2 className={cn('text-3xl mt-6', font.className)}>
        No favorite boards
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Add something to favorites
      </p>
    </div>
  )
}
