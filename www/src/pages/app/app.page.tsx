import { DirectionEnum, EventStatusEnum, UserTypeEnum, useEventConnectionQuery, useMeQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { Show } from '@/components/show-when'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QUERY_LIMIT } from '@/config/apollo.config'
import { UrlConfig } from '@/config/url.config'
import { EventCard } from '@/pages/app/components/event-card'
import { getDirectionString } from '@/utils/get-direction-string'
import { getEventStatusTypeString } from '@/utils/get-event-status-type-string'
import { memo, useMemo, useState } from 'react'

type StatusFilterValues = 'ALL' | EventStatusEnum
type DirectionFilterValues = 'ALL' | DirectionEnum

type AppPageProps = unknown
export const AppPage: React.FC<AppPageProps> = memo(() => {
    const [statusFilter, setStatusFilter] = useState<StatusFilterValues>('ALL')
    const [directionFilter, setDirectionFilter] = useState<DirectionFilterValues>('ALL')
    const { data: me } = useMeQuery()
    const { data: events } = useEventConnectionQuery({
        variables: {
            limit: QUERY_LIMIT,
        },
    })

    const filteredEvents = useMemo(() => {
        if (me?.me.type === 'VOLUNTEER') {
            return (
                events?.eventConnection.nodes.filter(event =>
                    [EventStatusEnum.InProgress, EventStatusEnum.Completed].includes(event.status),
                ) || []
            )
        }
        return (
            events?.eventConnection.nodes.filter(event => {
                if (statusFilter === 'ALL') {
                    return true
                }
                if (directionFilter === 'ALL') {
                    return true
                }
                return event.status === statusFilter && event.direction.includes(directionFilter)
            }) || []
        )
    }, [directionFilter, events?.eventConnection.nodes, statusFilter, me?.me.type])

    return (
        <PageWrapper breadcrumbs={[UrlConfig.main, UrlConfig.app]} className="container space-y-5">
            <div className="flex-end flex w-full gap-2">
                <Select
                    onValueChange={(value: DirectionFilterValues) => {
                        setDirectionFilter(value)
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Напрям" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Всі</SelectItem>
                        {Object.values(DirectionEnum).map(direction => (
                            <SelectItem key={direction} value={direction}>
                                {getDirectionString(direction)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Show>
                    <Show.When isTrue={me?.me.type === UserTypeEnum.Rescuer}>
                        <Select
                            onValueChange={(value: StatusFilterValues) => {
                                setStatusFilter(value)
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">Всі</SelectItem>
                                {Object.values(EventStatusEnum).map(status => {
                                    if (
                                        me?.me.type === UserTypeEnum.Volunteer &&
                                        [EventStatusEnum.Undefined, EventStatusEnum.Defined].includes(status)
                                    ) {
                                        return null
                                    }
                                    return (
                                        <SelectItem key={status} value={status}>
                                            {getEventStatusTypeString(status)}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </Show.When>
                </Show>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents?.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        </PageWrapper>
    )
})
AppPage.displayName = 'AppPage'
