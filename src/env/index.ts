import { error } from "console";
import { z } from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
    DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('Invalid environment! ❌', _env.error.format())
    throw new Error('Invalid environment! ❌')
}

export const env = _env.data