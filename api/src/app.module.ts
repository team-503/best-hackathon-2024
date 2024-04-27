import { AuthModule } from '@/auth/auth.module'
import { GraphQLEndpointsModule } from '@/graphql/graphql-endpoints.module'
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
            introspection: true, // TODO: disable introspection in actual production
            plugins: [
                ENV.isProd()
                    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
                    : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
            ],
            includeStacktraceInErrorResponses: !ENV.isProd(),
        }),
        AuthModule,
        GraphQLEndpointsModule,
    ],
})
export class AppModule {}
