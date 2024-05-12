import { EventCard } from '@/components/eventCard/EventCard'
import { PageWrapper } from '@/components/page-wrapper'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UrlConfig } from '@/config/url.config'
import { memo, useEffect, useState } from 'react'
type HomePageProps = unknown
const cards = [
    { id: 1, status: true, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 2, status: false, direction: 'ABOBA2', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 3, status: true, direction: 'ABOBA2', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 4, status: false, direction: 'ABOBA2', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 5, status: true, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 6, status: false, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 7, status: true, direction: 'ABOBA2', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 8, status: false, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 9, status: true, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
    { id: 10, status: true, direction: 'ABOBA', location: 'ABOBA', checkOutTime: 'ABOBA', date: '01/10/2024' },
]
export const HomePage: React.FC<HomePageProps> = memo(() => {
    const [statusFilter, setStatusFilter] = useState<'Uncompleted' | 'Сompleted' | 'All'>('All')
    const [directionFilter, setDirectionFilter] = useState<'All' | 'ABOBA' | 'ABOBA2'>('All')
    const [filteredCards, setFilteredCards] = useState(cards)
    useEffect(() => {
        const filtered = cards.filter(card => {
            if (statusFilter === 'All' && directionFilter === 'All') {
                return true
            } else if (statusFilter === 'All' && directionFilter === card.direction) {
                return true
            } else if (directionFilter === 'All' && statusFilter === (card.status ? 'Сompleted' : 'Uncompleted')) {
                return true
            } else if (statusFilter === (card.status ? 'Сompleted' : 'Uncompleted') && directionFilter === card.direction) {
                return true
            } else {
                return false
            }
        })
        setFilteredCards(filtered)
    }, [statusFilter, directionFilter])

    useEffect(() => {
        console.log(directionFilter)
    }, [directionFilter])

    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.home, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]}
            container={false}
            className="space-y-3"
        >
            <div className="flex-end flex w-full gap-2">
                <Select
                    onValueChange={(value: 'ABOBA' | 'ABOBA2' | 'All') => {
                        setDirectionFilter(value)
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Напрям" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">Всі</SelectItem>
                        <SelectItem value="ABOBA">ABOBA</SelectItem>
                        <SelectItem value="ABOBA2">ABOBA2</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value: 'Uncompleted' | 'Сompleted' | 'All') => {
                        setStatusFilter(value)
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">Всі</SelectItem>
                        <SelectItem value="Uncompleted">Не завершена</SelectItem>
                        <SelectItem value="Сompleted">Завершена</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {filteredCards.map(item => (
                    <EventCard
                        key={item.id}
                        status={item.status}
                        direction={item.direction}
                        location={item.location}
                        date={item.date}
                        checkOutTime={item.checkOutTime}
                    />
                ))}
            </div>
        </PageWrapper>
    )
})
HomePage.displayName = 'HomePage'
