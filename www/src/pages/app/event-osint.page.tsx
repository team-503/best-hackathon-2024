import { EventStatusEnum, useEventByIdQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { Show } from '@/components/show-when'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UrlConfig } from '@/config/url.config'
import { PersonCard } from '@/pages/app/components/person-card'
import { getEventStatusTypeString } from '@/utils/get-event-status-type-string'
import moment from 'moment'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

type EventOsintPageProps = unknown
export const EventOsintPage: React.FC<EventOsintPageProps> = memo(() => {
    const { id } = useParams<{ id: string }>()
    const { data } = useEventByIdQuery({
        variables: {
            eventId: id || '-1',
        },
    })

    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.main, UrlConfig.app, UrlConfig.createEvent]}
            className="my-auto flex items-center justify-center"
        >
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>{moment(data?.event.date).format('L')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 font-ukraineThin">
                    <p>
                        Статус:{' '}
                        <Show>
                            <Show.When isTrue={data?.event.status === EventStatusEnum.Undefined}>
                                <span className="text-red-500">{getEventStatusTypeString(EventStatusEnum.Undefined)}</span>
                            </Show.When>
                            <Show.When isTrue={data?.event.status === EventStatusEnum.Defined}>
                                <span className="text-gray-500">{getEventStatusTypeString(EventStatusEnum.Defined)}</span>
                            </Show.When>
                            <Show.When isTrue={data?.event.status === EventStatusEnum.InProgress}>
                                <span className="text-blue-500">{getEventStatusTypeString(EventStatusEnum.InProgress)}</span>
                            </Show.When>
                            <Show.When isTrue={data?.event.status === EventStatusEnum.Completed}>
                                <span className="text-green-500">{getEventStatusTypeString(EventStatusEnum.Completed)}</span>
                            </Show.When>
                        </Show>
                    </p>
                    <p>Напрям: {data?.event.direction}</p>
                    <p>Зниклих безвісти: {data?.event.status === EventStatusEnum.Undefined ? '?' : data?.event.disappearedQty}</p>

                    <div className="py-2" />
                    <Separator />
                    <div className="py-2" />

                    {data?.event.persons.map(person => <PersonCard person={person} />)}
                </CardContent>
            </Card>
        </PageWrapper>
    )
})
EventOsintPage.displayName = 'EventOsintPage'
