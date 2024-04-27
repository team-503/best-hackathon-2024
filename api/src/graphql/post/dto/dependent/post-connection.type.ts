import { PageInfoType } from '@/common/page-info.type'
import { PostType } from '@/graphql/post/dto/independent/post.type'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostConnection {
    @Field(() => [PostType])
    nodes: PostType[]

    @Field(() => PageInfoType)
    pageInfo: PageInfoType
}
