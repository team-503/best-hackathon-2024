import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import moment from 'moment'

interface IEventCardProps {
    status: boolean
    direction: string
    location: string
    date: Date
    checkOutTime: string
    lostPeople: number
    additionalInfo?: string
}

export const EventCard: React.FC<IEventCardProps> = ({ status, direction, location, date, checkOutTime, lostPeople }) => {
    return (
        <Card className="w-[350px] cursor-pointer transition-colors hover:bg-secondary">
            <CardHeader>
                <CardTitle className="font-ukraineBold">Інформаційна картка</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <p>
                        Статус:{' '}
                        <span className={status ? 'text-green-500' : 'text-red-500'}>{status ? 'Завершена' : 'Незавершена'}</span>
                    </p>
                    <p>Напрям: {direction}</p>
                    <p>Локація: {location}</p>
                    <p>Дата: {moment(date).format('L')}</p>
                    <p>Година виїзду: {checkOutTime}</p>
                    <p>Кількість пропавших безвісті: {lostPeople}</p>
                </div>
            </CardContent>
        </Card>
    )
}
