import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
export class IdArgs {
    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number
}
