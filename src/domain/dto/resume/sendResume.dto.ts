import { z } from 'zod'

export const sendResumeSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(10).max(10),
    resume: z.string().min(1)
})

export type SendResumeDto = z.infer<typeof sendResumeSchema>