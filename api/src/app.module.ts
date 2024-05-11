import { GraphQLEndpointsModule } from '@/endpoints/endpoints.module'
import { ENV } from '@/utils/env'
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            path: '/graphql',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: false,
            playground: false,
            introspection: true,
            plugins: [
                ENV.isProd()
                    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
                    : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
            ],
            includeStacktraceInErrorResponses: !ENV.isProd(),
        }),
        GraphQLEndpointsModule,
    ],
})
export class AppModule {}
