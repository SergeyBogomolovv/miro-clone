'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useApiMutations } from '@/hooks/use-api-mutations'
import React, { FormEventHandler, useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
interface Props {
  children: React.ReactNode
  id: string
  initialTitle: string
}

export default function EditBoardTitleModal({
  id,
  children,
  initialTitle,
}: Props) {
  const { mutate, pending } = useApiMutations(api.board.update)
  const [title, setTitle] = useState(initialTitle)
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    mutate({ id, newTitle: title })
      .then(() => toast.success('Board title updated!'))
      .catch(() => toast.error('Failed to update board title'))
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant={'outline'}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type='submit'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
