import { PageWrapper } from '@/components/page-wrapper'
import { H2 } from '@/components/typography/h2'
import { ThemeUpdater } from '@/modules/theme/components/theme-updater'
import { memo } from 'react'

type NotFoundPageProps = unknown
export const NotFoundPage: React.FC<NotFoundPageProps> = memo(() => {
    return (
        <>
            <ThemeUpdater />
            <PageWrapper className="my-auto flex items-center justify-center divide-x-4 divide-foreground">
                <H2 className="pr-5">404</H2>
                <H2 className="pl-5">Page not found</H2>
            </PageWrapper>
        </>
    )
})
NotFoundPage.displayName = 'NotFoundPage'
