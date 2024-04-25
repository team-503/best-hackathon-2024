import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
@InputType({ isAbstract: true })
export class UserType {
    @Field(() => String)
    id: string

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field(() => String)
    @IsNotEmpty()
    fullName: string

    // hidden

    @IsString()
    @IsNotEmpty()
    password: string
}

@InputType()
export class UserInput extends UserType {}
