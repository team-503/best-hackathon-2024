import { UserInput } from '@/graphql/user/dto/independent/user.type'
import { InputType, PickType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class LoginInput extends PickType(UserInput, ['email']) {
    @IsString()
    password: string
}
