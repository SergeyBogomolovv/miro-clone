'use client'
import { FaPlus } from 'react-icons/fa6'
import { CreateOrganization } from '@clerk/nextjs'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Hint from '@/components/hint'

export default function NewButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='aspect-square '>
          <Hint
            label='Create organization'
            align='center'
            side='right'
            sideOffset={18}
          >
            <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <FaPlus className='text-white' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 bg-transparent border-none'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}
