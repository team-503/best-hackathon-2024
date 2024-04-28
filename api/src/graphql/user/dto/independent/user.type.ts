import { ProviderInput, ProviderType } from '@/graphql/user/dto/independent/provider.type'
import { ReceiverInput, ReceiverType } from '@/graphql/user/dto/independent/receiver.type'
import { UserTypeEnum } from '@/graphql/user/dto/enum/user-type.enum'
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { UUID, UUIDObjectType } from '@/common/uuid'

@InputType()
@ObjectType({ isAbstract: true })
export class UserInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    password: string

    @Field(() => UserTypeEnum)
    userType: UserTypeEnum

    @Field(() => String)
    @IsNotEmpty()
    fullName: string

    @Field(() => ReceiverInput, { nullable: true })
    receiver?: ReceiverInput

    @Field(() => ProviderInput, { nullable: true })
    provider?: ProviderInput
}

@InputType()
export class UserPartialInput extends PartialType(UserInput, InputType) {}

@ObjectType()
export class UserType extends OmitType(UserInput, ['password'] as const, ObjectType) {
    @Exclude()
    password: string

    @Field(() => UUIDObjectType)
    id: UUID

    @Field(() => ReceiverType, { nullable: true })
    receiver?: ReceiverType

    @Field(() => ProviderType, { nullable: true })
    provider?: ProviderType
}
