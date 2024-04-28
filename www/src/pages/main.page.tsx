import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { urlConfig } from '@/config/url.config'

type MainPageProps = unknown
export const MainPage: React.FC<MainPageProps> = memo(() => {
    return (
        <div className="flex w-auto justify-center pb-8">
            <div className="mt-24 flex flex-col justify-center gap-3 md:flex-row">
                <div className="flex flex-col justify-center gap-y-14 md:w-[45%]">
                    <h1 className="text-balance text-center text-5xl  font-bold leading-[110%] tracking-[-1.2%] text-black md:text-left">
                        МИ ПОРУЧ - ПЛАТФОРМА ДОПОМОГИ ДЛЯ КОЖНОГО, ХТО ЇЇ ПРОПОНУЄ
                    </h1>
                    <img src="./images/photo1.svg" alt="photo" />
                </div>
                <div className="flex flex-col justify-center gap-y-3 md:w-[35%]">
                    <img src="./images/photo2.svg" alt="photo" />
                    <Button asChild variant="outline" className="h-40 w-auto rounded-[12px] bg-[#00102E] text-3xl text-white">
                        <Link to={urlConfig.pages.app.url}>Перейти в застосунок</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
})
MainPage.displayName = 'MainPage'
