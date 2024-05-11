import { PageWrapper } from '@/components/page-wrapper'
import { UrlConfig } from '@/config/url.config'
import { memo } from 'react'

type AppPageProps = unknown
export const AppPage: React.FC<AppPageProps> = memo(() => {
    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.home, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]}
            container={false}
            className="space-y-3"
        >
            App page
        </PageWrapper>
    )
})
AppPage.displayName = 'AppPage'
