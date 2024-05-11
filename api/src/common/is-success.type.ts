import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class IsSuccessType {
    @Field(() => Boolean)
    isSuccess: boolean

    @Field(() => String, { nullable: true, defaultValue: null })
    error?: string
}
