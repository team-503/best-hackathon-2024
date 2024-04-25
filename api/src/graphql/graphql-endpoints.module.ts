import { UserModule } from '@/graphql/user/user.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [UserModule],
})
export class GraphQLEndpointsModule {}
