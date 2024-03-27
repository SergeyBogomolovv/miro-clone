import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
]

export const create = mutation({
  args: { orgId: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity()
    if (!author) throw new Error('Unauthorized')
    const randowImg = images[Math.floor(Math.random() * images.length)]
    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: author.subject,
      author: author.name!,
      imageUrl: randowImg,
    })
    return board
  },
})

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity()
    if (!author) throw new Error('Unauthorized')
    const board = await ctx.db.get(args.id)
    if (board?.authorId !== author.subject) throw new Error('No acces')
    //Later implement favorite check
    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: { id: v.id('boards'), newTitle: v.string() },
  handler: async (ctx, args) => {
    const title = args.newTitle.trim()
    if (!title || title.length > 60) throw new Error('Bad title')
    const author = await ctx.auth.getUserIdentity()
    if (!author) throw new Error('Unauthorized')
    const board = await ctx.db.get(args.id)
    if (board?.authorId !== author.subject) throw new Error('No acces')
    await ctx.db.patch(args.id, { title })
  },
})
