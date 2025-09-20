import { z } from 'zod'

export const updateNewsSchema = z.object({
    title: z.string().min(1).optional(),
    subtitle: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    image: z.string().min(1).optional()
})

export type UpdateNewsDto = z.infer<typeof updateNewsSchema>