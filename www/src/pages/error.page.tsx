import { PageWrapper } from '@/components/page-wrapper'
import { H2 } from '@/components/typography/h2'
import { ThemeUpdater } from '@/modules/theme/components/theme-updater'
import { memo } from 'react'

type ErrorPageProps = unknown
export const ErrorPage: React.FC<ErrorPageProps> = memo(() => {
    return (
        <>
            <ThemeUpdater />
            <PageWrapper className="my-auto flex min-h-screen items-center justify-center divide-x-4 divide-foreground">
                <H2 className="pr-5">503</H2>
                <H2 className="pl-5">Unknown error occured</H2>
            </PageWrapper>
        </>
    )
})
ErrorPage.displayName = 'ErrorPage'
