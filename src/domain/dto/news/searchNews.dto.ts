import { z } from 'zod'

export const searchNewsQueryParamsSchema = z.object({
    title: z.string().min(1).optional(),
    subTitle: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    page: z.string().min(1).optional().default('1'),
    limit: z.string().min(1).optional().default('10')
})

export type SearchNewsQueryParamsDto = z.infer<typeof searchNewsQueryParamsSchema>