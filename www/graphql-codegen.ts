import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

const dotenvConfig = ['.env', '.env.development'].forEach(env =>
    dotenv.config({
        path: env,
    }),
)

const config: CodegenConfig = {
    schema: process.env.VITE_GRAPHQL_ENDPOINT,
    documents: ['**/*.gql'],
    ignoreNoDocuments: true,
    overwrite: true,
    generates: {
        './src/__generated__/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
        },
    },
}

export default config
