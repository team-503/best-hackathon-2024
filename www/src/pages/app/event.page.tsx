import { useEventByIdQuery } from '@/__generated__/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NotFoundPage } from '@/pages/not-found.page'
import moment from 'moment'
import { useParams } from 'react-router-dom'

type EventPageProps = unknown
export const EventPage: React.FC<EventPageProps> = () => {
    const { id } = useParams<{ id: string }>()
    const { data } = useEventByIdQuery({
        variables: {
            eventId: id || '',
        },
    })
    if (!data?.event) {
        return <NotFoundPage />
    }

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
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
