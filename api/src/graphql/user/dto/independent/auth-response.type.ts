import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class AuthResponseType {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    token: string
}
