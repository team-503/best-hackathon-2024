import { registerEnumType } from '@nestjs/graphql'

export enum DirectionEnum {
    BAKHMUT = 'BAKHMUT',
    KUPIANSK = 'KUPIANSK',
    AVDIIVKA = 'AVDIIVKA',
    KHERSON = 'KHERSON',
    MARIINKA = 'MARIINKA',
}

registerEnumType(DirectionEnum, {
    name: 'DirectionEnum',
})
