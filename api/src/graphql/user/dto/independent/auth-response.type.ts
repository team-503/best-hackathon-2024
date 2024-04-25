import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthResponseType {
    @Field(() => String)
    token: string
}
