import { UserInput } from '@/graphql/user/dto/independent/user.type'
import { InputType, PickType } from '@nestjs/graphql'

@InputType()
export class LoginInput extends PickType(UserInput, ['email', 'password'] as const, InputType) {}
