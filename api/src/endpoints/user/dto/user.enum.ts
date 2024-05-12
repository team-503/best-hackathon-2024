import { registerEnumType } from '@nestjs/graphql'

export enum UserTypeEnum {
    RESCUER = 'RESCUER',
    VOLUNTEER = 'VOLUNTEER',
}

registerEnumType(UserTypeEnum, {
    name: 'UserTypeEnum',
})
