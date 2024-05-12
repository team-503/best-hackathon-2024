import { UserInput } from '@/endpoints/user/dto/user.type'
import { InputType } from '@nestjs/graphql'

@InputType()
export class RegisterInput extends UserInput {}
