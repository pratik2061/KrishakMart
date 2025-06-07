import {z} from 'zod'

export const userAuthSchema = z.object({
    name: z.string().min(4),
    email:z.string().email("invalid email"),
    password: z.string().min(8,"password must be atleast 8 characters. "),
    address : z.string(),
    contact : z.string(),
    image : z.string().optional(),
})