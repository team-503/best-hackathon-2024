import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType({ isAbstract: true })
export class ReceiverInput {
    @Field(() => String)
    field: string
}

@ObjectType()
export class ReceiverType extends ReceiverInput {}
