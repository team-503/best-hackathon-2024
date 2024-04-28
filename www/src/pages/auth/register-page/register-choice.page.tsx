import { PageWrapper } from '@/components/page-wrapper'
import { urlConfig } from '@/config/url.config'
import { AuthPersonTypeCard } from '@/pages/auth/components/independent/auth-person-type-card'
import { memo } from 'react'

type RegisterChoicePageProps = unknown
export const RegisterChoicePage: React.FC<RegisterChoicePageProps> = memo(() => {
    return (
        <PageWrapper
            breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.choice]}
            className="flex h-full w-full gap-5 p-5 pt-0"
        >
            <AuthPersonTypeCard to={urlConfig.pages.register.receive.url} className="h-full w-full bg-blue-800 text-white">
                Потрібна допомога
            </AuthPersonTypeCard>
            <AuthPersonTypeCard to={urlConfig.pages.register.provide.url} className="h-full w-full bg-green-800 text-white">
                Хочу допомогти
            </AuthPersonTypeCard>
        </PageWrapper>
    )
})
RegisterChoicePage.displayName = 'RegisterChoicePage'
