import { PageWrapper } from '@/components/page-wrapper'
import { urlConfig } from '@/config/url.config'
import { memo } from 'react'

type AuthRegisterProvidePageProps = unknown
export const AuthRegisterProvidePage: React.FC<AuthRegisterProvidePageProps> = memo(() => {
    return <PageWrapper breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.provide]}>
        register provider
    </PageWrapper>
})
AuthRegisterProvidePage.displayName = 'AuthRegisterProvidePage'
