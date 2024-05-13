import { PageWrapper } from '@/components/page-wrapper'
import { H1 } from '@/components/typography/h1'
import { Muted } from '@/components/typography/muted'
import { Button } from '@/components/ui/button'
import { UrlConfig } from '@/config/url.config'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type MainPageProps = unknown
export const MainPage: React.FC<MainPageProps> = memo(() => {
    return (
        <PageWrapper className="relative my-auto flex flex-col items-center justify-center gap-10">
            <div className="absolute h-1/2 w-1/2 rounded-full bg-green-500/60 blur-[100px]" />
            <div className="z-50 flex flex-col items-center justify-center gap-2">
                <H1>Ми разом</H1>
                <Muted>By 503 team</Muted>
            </div>
            <Button asChild className="z-50">
                <Link to={UrlConfig.app.url}>Перейти в додаток</Link>
            </Button>
        </PageWrapper>
    )
})
MainPage.displayName = 'MainPage'
