import { H2 } from '@/components/typography/h2'
import { memo } from 'react'

type NotFoundPageProps = unknown
export const NotFoundPage: React.FC<NotFoundPageProps> = memo(() => {
    return (
        <main className="flex h-screen items-center justify-center divide-x-4 divide-white">
            <H2 className="pr-5">404</H2>
            <H2 className="pl-5">Page not found</H2>
        </main>
    )
})
NotFoundPage.displayName = 'NotFoundPage'
