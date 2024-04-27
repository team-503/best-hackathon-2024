import { DbService } from '@/db/db.service'
import { PostResolver } from '@/graphql/post/post.resolver'
import { PostService } from '@/graphql/post/post.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [PostResolver, PostService, DbService],
})
export class PostModule {}
