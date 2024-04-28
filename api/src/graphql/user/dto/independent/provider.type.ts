import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class ProviderInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    location: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    field: string
}

@ObjectType()
export class ProviderType extends ProviderInput {}
