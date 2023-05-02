import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
	config({ path: '.env.test' })
} else {
	config()
}

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
	PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	const msgError = 'Invalid environment variables!'

	console.error(`❌${msgError}`, _env.error.format())
	throw new Error(msgError)
}

export const env = _env.data
