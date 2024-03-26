import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { CreateOrganization } from '@clerk/nextjs'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
const font = Poppins({ weight: ['600'], subsets: ['latin'] })
export default function EmptyOrg() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src={'/elements.svg'} alt='Elements' width={200} height={200} />
      <h2 className={cn('text-3xl mt-6', font.className)}>Weclome to Miro</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Create an organization to get started
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'lg'} variant={'outline'}>
              Create an organization
            </Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
