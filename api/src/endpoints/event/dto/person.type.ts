import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class PersonInput {
    @Field(() => String)
    @IsString()
    surname: string

    @Field(() => String)
    @IsString()
    name: string

    @Field(() => String)
    @IsString()
    secondName: string

    @Field(() => String)
    @IsString()
    imageUrl: string
}

@ObjectType()
export class PersonType extends PersonInput {}
