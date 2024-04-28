import { registerEnumType } from '@nestjs/graphql'

export enum UserTypeEnum {
    UNKNOWN = 'UNKNOWN',
    RECEIVER = 'RECEIVER',
    PROVIDER = 'PROVIDER',
}

registerEnumType(UserTypeEnum, {
    name: 'UserTypeEnum',
})
