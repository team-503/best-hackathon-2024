import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/config/url.config'

type MainPageProps = unknown
export const MainPage: React.FC<MainPageProps> = memo(() => {
    return (
        <div className="flex h-full w-full items-center justify-center pb-8">
            <div className="flex h-[650px] flex-col justify-center gap-3 md:flex-row">
                <div className="flex h-full flex-col justify-between md:w-[45%]">
                    <h1 className="text-balance text-center text-5xl font-bold uppercase leading-tight tracking-tight md:text-left">
                        Ми поруч - платформа допомоги для кожного, хто її потребує
                    </h1>
                    <img src="./images/photo1.svg" alt="photo" />
                </div>
                <div className="flex h-full flex-col justify-between md:w-[35%]">
                    <img src="./images/photo2.svg" alt="photo" />
                    <Button asChild variant="default" className="w-full rounded-3xl py-10 text-3xl font-bold">
                        <Link to={urlConfig.pages.app.url}>Перейти в застосунок</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
})
MainPage.displayName = 'MainPage'
