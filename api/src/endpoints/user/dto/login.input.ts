import { UserInput } from '@/endpoints/user/dto/user.type'
import { InputType, PickType } from '@nestjs/graphql'

@InputType()
export class LoginInput extends PickType(UserInput, ['email', 'password'] as const, InputType) {}
