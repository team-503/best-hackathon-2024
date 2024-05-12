import { DirectionEnum } from '@/__generated__/graphql'

export const getDirectionString = (direction: DirectionEnum): string => {
    switch (direction) {
        case DirectionEnum.Avdiivka:
            return 'Авдіївка'
        case DirectionEnum.Bakhmut:
            return 'Бахмут'
        case DirectionEnum.Kherson:
            return 'Херсон'
        case DirectionEnum.Kupiansk:
            return "Куп'янськ"
        case DirectionEnum.Mariinka:
            return "Мар'їнка"
        default:
            console.error(`Unknown direction: ${direction}`)
            return ''
    }
}
