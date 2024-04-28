import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class ReceiverInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    location: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string
}

@ObjectType()
export class ReceiverType extends ReceiverInput {}
