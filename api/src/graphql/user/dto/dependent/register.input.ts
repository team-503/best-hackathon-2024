import { UserInput } from '@/graphql/user/dto/independent/user.type'
import { InputType } from '@nestjs/graphql'

@InputType()
export class RegisterInput extends UserInput {}
