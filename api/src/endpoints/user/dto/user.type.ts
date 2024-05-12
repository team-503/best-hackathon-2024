import { UserTypeEnum } from '@/endpoints/user/dto/user.enum'
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class UserInput {
    @Field(() => UserTypeEnum)
    @IsEnum(UserTypeEnum)
    type: UserTypeEnum

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    email: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    password: string
}

@ObjectType()
export class UserType extends OmitType(UserInput, ['password'] as const, ObjectType) {
    @Field(() => String)
    id: string

    // internal
    password: string
}
