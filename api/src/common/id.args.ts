import { ArgsType, Field } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

@ArgsType()
export class IdArgs {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    id: string
}
