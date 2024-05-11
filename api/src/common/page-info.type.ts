import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfoType {
    @Field(() => Int)
    limit: number

    @Field(() => Int, { nullable: true })
    nextPageCursor?: number | null
}
