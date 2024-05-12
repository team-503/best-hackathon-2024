import { UserType } from '@/endpoints/user/dto/user.type'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthResponseType {
    @Field(() => String)
    token: string

    @Field(() => UserType)
    user: UserType
}
