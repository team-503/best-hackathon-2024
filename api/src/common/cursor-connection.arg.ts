import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator'

@ArgsType()
export class CursorConnectionArg {
    @Field(() => Int, { nullable: true, defaultValue: 10 })
    @IsNumber()
    @IsInt()
    @Min(0)
    limit: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsInt()
    @Min(0)
    prevPageCursor?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsInt()
    @Min(0)
    nextPageCursor?: number
}
