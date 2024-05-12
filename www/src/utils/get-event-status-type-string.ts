import { EventStatusEnum } from '@/__generated__/graphql'

export const getEventStatusTypeString = (status: EventStatusEnum): string => {
    switch (status) {
        case EventStatusEnum.Undefined:
            return 'Не визначено'
        case EventStatusEnum.Defined:
            return 'Визначено'
        case EventStatusEnum.InProgress:
            return 'В процесі'
        case EventStatusEnum.Completed:
            return 'Завершено'
        default:
            console.error(`Unknown event status: ${status}`)
            return ''
    }
}
