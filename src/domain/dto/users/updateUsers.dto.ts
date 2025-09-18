import { z } from 'zod'

export const updateUserSchema = z.object({
    password: z.string().min(3).optional(),
    email: z.string().email().optional()
})

export type UpdateUserDto = z.infer<typeof updateUserSchema>