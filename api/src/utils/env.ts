import { DotenvConfigOptions, DotenvParseOutput, config } from 'dotenv'
import z from 'zod'

type RawEnv = typeof process.env | DotenvParseOutput | undefined

class Env<T extends z.ZodSchema> {
    private readonly schema: T
    private readonly rawEnv: RawEnv

    public readonly env: z.infer<T>

    constructor(schema: T, rawEnv: RawEnv = process.env) {
        this.schema = schema
        this.rawEnv = rawEnv

        this.env = this.validate()
    }

    private validate(): T | never {
        const parsed = this.schema.safeParse(this.rawEnv)
        if (parsed.success) {
            return {
                ...parsed.data,
                NODE_ENV: process.env.NODE_ENV,
            }
        }
        throw new Error(`Failed to validate env: ${JSON.stringify(parsed.error, null, 4)}`)
    }

    static parse(options?: DotenvConfigOptions): DotenvParseOutput | undefined | never {
        const parsedConfig = config(options)
        if (parsedConfig.error) {
            throw new Error(`Failed to parse .env file: ${parsedConfig.error}`)
        }
        return parsedConfig.parsed
    }

    isLocal(): boolean {
        return 'LOCAL' in this.env && this.env.LOCAL === true
    }

    isTest(): boolean {
        return 'NODE_ENV' in this.env && this.env.NODE_ENV === 'test'
    }

    isDev(): boolean {
        return 'NODE_ENV' in this.env && this.env.NODE_ENV === 'development'
    }

    isProd(): boolean {
        return !this.isDev() && !this.isTest()
    }

    getNodeEnvShort(): 'dev' | 'test' | 'prod' {
        if (this.isDev()) return 'dev'
        if (this.isTest()) return 'test'
        return 'prod'
    }

    getAll(): T {
        return this.env
    }

    get(key: keyof z.infer<T>): z.infer<T>[keyof z.infer<T>] {
        return this.env[key]
    }
}

const envSchema = z.object({
    NODE_ENV: z.string().optional(),
})

// export const ENV = new Env(envSchema, Env.parse())
export const ENV = new Env(envSchema, process.env)

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
