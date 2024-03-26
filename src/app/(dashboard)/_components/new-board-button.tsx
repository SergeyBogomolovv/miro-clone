'use client'

import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { api } from '../../../../convex/_generated/api'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { toast } from 'sonner'

interface Props {
  orgId: string
  disabled?: boolean
}
export default function NewBoardButton({ orgId, disabled }: Props) {
  const { mutate, pending } = useApiMutations(api.board.create)
  const onClick = () => {
    mutate({ title: 'Untitled', orgId })
      .then(() => toast.success('Board created'))
      .catch(() => toast.error('Something went wrong'))
  }
  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (pending || disabled) &&
          'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm font-light text-white'>New board</p>
    </button>
  )
}
