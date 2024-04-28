import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfoType {
    @Field(() => Int)
    limit: number

    @Field(() => Boolean)
    hasNextPage: boolean

    @Field(() => Boolean)
    hasPrevPage: boolean

    @Field(() => Int, { nullable: true })
    prevPageCursor?: number

    @Field(() => Int, { nullable: true })
    nextPageCursor?: number
}
