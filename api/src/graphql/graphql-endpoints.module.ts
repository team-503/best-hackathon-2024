import { PostModule } from '@/graphql/post/post.module'
import { UserModule } from '@/graphql/user/user.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [UserModule, PostModule],
})
export class GraphQLEndpointsModule {}
