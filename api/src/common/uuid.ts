import { ArgsType, Field } from '@nestjs/graphql'

export type UUID = string
export const UUIDObjectType = String

@ArgsType()
export class UUIDArg {
    @Field(() => UUIDObjectType)
    id: UUID
}
