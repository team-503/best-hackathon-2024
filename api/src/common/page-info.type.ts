import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@ObjectType()
export class PageInfoType {
    @IsNumber()
    @Field(() => Int)
    limit: number

    @IsNumber()
    @Field(() => Int, { nullable: true })
    nextPageCursor?: number
}
