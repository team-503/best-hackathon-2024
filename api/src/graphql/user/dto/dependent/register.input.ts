import { UserInput } from '@/graphql/user/dto/independent/user.type'
import { InputType, PickType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class RegisterInput extends PickType(UserInput, [
    'email',
    'fullName',
    'gender',
    'age',
    'bio',
    'imgUrl',
    'location',
    'interests',
    'socials',
]) {
    @IsString()
    password: string
}
