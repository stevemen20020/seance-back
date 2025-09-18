import { z } from 'zod'

export const searchUsersQueryParamsSchema = z.object({
    email: z.string().min(1).optional()
})

export type SearchUserQueryParamsDto = z.infer<typeof searchUsersQueryParamsSchema>