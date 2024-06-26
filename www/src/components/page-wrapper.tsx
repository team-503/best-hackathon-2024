import { Show } from '@/components/show-when'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { cn } from '@/utils/cn'
import { Fragment, memo } from 'react'

type PageWrapperProps = React.ComponentProps<'div'> & {
    container?: boolean
    breadcrumbs?: Array<{
        label: string
        url: string
    }>
}
export const PageWrapper: React.FC<PageWrapperProps> = memo(({ breadcrumbs, container = true, className, ...props }) => {
    return (
        <main className="flex h-full w-full flex-1 flex-col px-8">
            <Show>
                <Show.When isTrue={breadcrumbs != null}>
                    <Breadcrumb className={cn('py-5', container && 'container')}>
                        <BreadcrumbList>
                            {breadcrumbs?.map((item, index, arr) => (
                                <Fragment key={item.label}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item.url}>{item.label}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <Show>
                                        <Show.When isTrue={index !== arr.length - 1}>
                                            <BreadcrumbSeparator />
                                        </Show.When>
                                    </Show>
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </Show.When>
            </Show>
            <div className={cn('h-full w-full', className)} {...props} />
        </main>
    )
})
PageWrapper.displayName = 'PageWrapper'
