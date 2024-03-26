'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { toast } from 'sonner'

const font = Poppins({ weight: ['600'], subsets: ['latin'] })

export default function EmptyBoards() {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutations(api.board.create)
  const onclick = () => {
    if (!organization) return
    mutate({ title: 'Title', orgId: organization?.id })
      .then(() => toast.success('Board created'))
      .catch(() => toast.error('Something went wrong'))
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' alt='Note' width={140} height={140} />
      <h2 className={cn('text-3xl mt-6', font.className)}>
        Create your first board
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating board for your organization
      </p>
      <div className='mt-6'>
        <Button disabled={pending} onClick={onclick} size={'lg'}>
          Create board
        </Button>
      </div>
    </div>
  )
}
