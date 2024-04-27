import { PageWrapper } from '@/components/page-wrapper'
import { urlConfig } from '@/config/url.config'
import { memo } from 'react'

type AuthRegisterReceivePageProps = unknown
export const AuthRegisterReceivePage: React.FC<AuthRegisterReceivePageProps> = memo(() => {
    return (
        <PageWrapper breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.receive]} className='container'>
            register receiver
        </PageWrapper>
    )
})
AuthRegisterReceivePage.displayName = 'AuthRegisterReceivePage'
