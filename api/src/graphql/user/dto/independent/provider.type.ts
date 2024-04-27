import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType({ isAbstract: true })
export class ProviderInput {
    @Field(() => String)
    field: string
}

@ObjectType()
export class ProviderType extends ProviderInput {}
