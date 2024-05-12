import { CodegenConfig } from '@graphql-codegen/cli'
import config from 'config'

const codegenConfig: CodegenConfig = {
    schema: `${config.get<string>('apiUrl')}/graphql`,
    documents: ['**/*.gql'],
    ignoreNoDocuments: true,
    overwrite: true,
    generates: {
        './src/__generated__/graphql.ts': {
            plugins: ['typescript', 'typescript-operations'],
        },
    },
}

export default codegenConfig
