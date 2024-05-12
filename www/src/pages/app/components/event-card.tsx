import { EventStatusEnum, EventType } from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UrlConfig } from '@/config/url.config'
import { getEventStatusTypeString } from '@/utils/get-event-status-type-string'
import moment from 'moment'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type EventCardProps = {
    event: EventType
}
export const EventCard: React.FC<EventCardProps> = memo(({ event }) => {
    return (
        <Link to={UrlConfig.eventId.getDynamicUrl(event.id)}>
            <Card className="duration-200 hover:bg-secondary">
                <CardHeader>
                    <CardTitle className="font-ukraineBold">Інформаційна картка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 font-ukraineThin">
                    <p>
                        Статус:{' '}
                        <Show>
                            <Show.When isTrue={event.status === EventStatusEnum.Undefined}>
                                <span className="text-red-500">{getEventStatusTypeString(EventStatusEnum.Undefined)}</span>
                            </Show.When>
                            <Show.When isTrue={event.status === EventStatusEnum.Defined}>
                                <span className="text-gray-500">{getEventStatusTypeString(EventStatusEnum.Defined)}</span>
                            </Show.When>
                            <Show.When isTrue={event.status === EventStatusEnum.InProgress}>
                                <span className="text-blue-500">{getEventStatusTypeString(EventStatusEnum.InProgress)}</span>
                            </Show.When>
                            <Show.When isTrue={event.status === EventStatusEnum.Completed}>
                                <span className="text-green-500">{getEventStatusTypeString(EventStatusEnum.Completed)}</span>
                            </Show.When>
                        </Show>
                    </p>
                    <p>Напрям: {event.direction}</p>
                    <p>Дата: {moment(event.date).format('L')}</p>
                    <p>Зниклих безвісти: {event.disappearedQty}</p>
                </CardContent>
            </Card>
        </Link>
    )
})
EventCard.displayName = 'EventCard'
