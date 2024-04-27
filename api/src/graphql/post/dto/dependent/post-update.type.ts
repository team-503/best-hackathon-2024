import { UUID, UUIDObjectType } from '@/common/uuid'
import { PostInput } from '@/graphql/post/dto/independent/post.type'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class PostUpdateInput extends PartialType(PostInput, InputType) {
    @Field(() => UUIDObjectType)
    id: UUID
}
