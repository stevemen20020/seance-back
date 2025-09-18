import { z } from 'zod'

export const loginUserSchema = z.object({
    password: z.string().min(3),
    email: z.string().email()
})

export type LoginUserDto = z.infer<typeof loginUserSchema>