import { Show } from '@/components/show-when'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { cn } from '@/utils/cn'
import { Fragment, memo } from 'react'

type PageWrapperProps = React.ComponentProps<'div'> & {
    breadcrumbs?: Array<{
        label: string
        url: string
    }>
}
export const PageWrapper: React.FC<PageWrapperProps> = memo(({ breadcrumbs, className, ...props }) => {
    return (
        <main className="flex flex-1 flex-col">
            <Show>
                <Show.When isTrue={breadcrumbs != null}>
                    <Breadcrumb className="container py-5">
                        <BreadcrumbList>
                            {breadcrumbs?.map((item, index, arr) => (
                                <Fragment key={item.url}>
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
            <div className={cn('h-full', className)} {...props} />
        </main>
    )
})
PageWrapper.displayName = 'PageWrapper'
