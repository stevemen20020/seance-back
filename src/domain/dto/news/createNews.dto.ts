import { z } from 'zod'

export const createNewsSchema = z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1).optional(),
    content: z.string().min(1),
    image: z.string().min(1)
})

export type CreateNewsDto = z.infer<typeof createNewsSchema>