import { DEFAULT_LIMIT } from '@/common/constants'
import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator'

@ArgsType()
export class CursorConnectionArgs {
    @Field(() => Int, { nullable: true, defaultValue: DEFAULT_LIMIT })
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = DEFAULT_LIMIT

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsInt()
    @Min(0)
    nextPageCursor?: number
}
