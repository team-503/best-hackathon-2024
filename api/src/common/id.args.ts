import { ArgsType, Field } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
export class IdArgs {
    @Field(() => String)
    @IsInt()
    @Min(0)
    id: string
}
