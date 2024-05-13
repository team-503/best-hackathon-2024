import { EventStatusEnum, useEventByIdQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { Show } from '@/components/show-when'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AddLostPeopleModalForm } from '@/pages/app/addLostPeopleModalForm'
import { PersonCard } from '@/pages/app/components/person-card'
import { getEventStatusTypeString } from '@/utils/get-event-status-type-string'
import moment from 'moment'
import { useParams } from 'react-router-dom'

export const EventPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data } = useEventByIdQuery({
        variables: {
            eventId: id || '-1',
        },
    })

    return (
        <PageWrapper className="my-auto flex flex-col items-center justify-center">
            <Card className="mt-6 w-[55%] min-w-[350px] cursor-pointer transition-colors">
                <CardHeader>
                    <CardTitle className="font-ukraineBold">Інформаційна картка</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
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
                        <p>Широта: {data?.event.latitude}</p>
                        <p>Довгота: {data?.event.longitude}</p>
                        <p>Дата: {moment(data?.event.date).format('L')}</p>
                        <p>Кількість зниклих безвісти: {data?.event.disappearedQty}</p>
                        <p>Напрям: {data?.event.direction}</p>

                        <div className="py-1" />
                        <Separator />
                        <div className="py-1" />

                        {data?.event.persons.map((person, index) => <PersonCard key={index} person={person} />)}

                        <AddLostPeopleModalForm event={data?.event} />
                    </div>
                </CardContent>
            </Card>
        </PageWrapper>
    )
}
