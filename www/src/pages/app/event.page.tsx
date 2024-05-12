import { PersonType, useEventByIdQuery } from '@/__generated__/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import moment from 'moment'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DialogDemo } from './addLostPeopleModalForm'

export const EventPage = () => {
    const { id } = useParams<{ id: string }>()
    const [lostPeople, setLostPeople] = useState<PersonType[]>([])

    const { data } = useEventByIdQuery({
        variables: {
            eventId: id || '-1',
        },
    })

    console.log('lostPeople', lostPeople)
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-6 text-center text-3xl ">Інформаційна карточка, деталі</h1>
            <Card className="mt-6 w-[55%] min-w-[350px] cursor-pointer transition-colors">
                <CardHeader>
                    <CardTitle className="font-ukraineBold">Інформаційна картка</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p>
                            Статус:{' '}
                            <span className={data?.event.status ? 'text-green-500' : 'text-red-500'}>
                                {data?.event.status ? 'Завершена' : 'Незавершена'}
                            </span>
                        </p>
                        <p>Напрям: {data?.event.direction}</p>
                        <p>Широта: {data?.event.latitude}</p>
                        <p>Довгота: {data?.event.longitude}</p>
                        <p>Дата: {moment(data?.event.date).format('L')}</p>
                        <p>Кількість пропавших безвісті: {data?.event.disappearedQty}</p>
                        <p>Напрям: {data?.event.direction}</p>

                        <DialogDemo setLostPeople={setLostPeople} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
