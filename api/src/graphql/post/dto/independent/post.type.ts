import { UUID, UUIDObjectType } from '@/common/uuid'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class PostInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    title: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    content: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imageUrl: string

    @Field(() => [String])
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    tags: string[]
}

@ObjectType()
export class PostType extends PostInput {
    @Field(() => UUIDObjectType)
    id: UUID

    @Field(() => UUIDObjectType)
    authorId: UUID

    @Field(() => String)
    createdAt: string
}
