import { registerEnumType } from '@nestjs/graphql'

export enum EventStatusEnum {
    UNDEFINED = 'UNDEFINED',
    DEFINED = 'DEFINED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

registerEnumType(EventStatusEnum, {
    name: 'EventStatusEnum',
})
