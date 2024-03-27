'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Edit, Edit2, Link2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '../../convex/_generated/api'
import ConfirmModal from './confirmation-modal'
import { Button } from './ui/button'
import EditBoardTitleModal from '@/app/(dashboard)/_components/board-card/edit-board-title-modal'

interface Props {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export const Actions = ({ children, side, sideOffset, id, title }: Props) => {
  const { mutate, pending } = useApiMutations(api.board.remove)
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Failed to copy link'))
  }
  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete the board'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className='w-60'
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={onCopyLink} className='p-3 cursor-pointer'>
          <Link2 className='w-4 h-4 mr-2' />
          Copy board link
        </DropdownMenuItem>
        <EditBoardTitleModal initialTitle={title} id={id}>
          <Button
            variant={'ghost'}
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
          >
            <Edit2 className='w-4 h-4 mr-2' />
            Edit title
          </Button>
        </EditBoardTitleModal>
        <ConfirmModal
          onConfirm={onDelete}
          header='Delete this board?'
          description='Make shure that you want to delete this board'
        >
          <Button
            variant={'ghost'}
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
