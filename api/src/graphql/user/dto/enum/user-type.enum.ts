import { registerEnumType } from '@nestjs/graphql'

export enum UserTypeEnum {
    RECEIVER = 'RECEIVER',
    PROVIDER = 'PROVIDER',
}

registerEnumType(UserTypeEnum, {
    name: 'UserTypeEnum',
})
