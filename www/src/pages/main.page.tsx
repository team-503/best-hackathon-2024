import { memo } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

type MainPageProps = unknown
export const MainPage: React.FC<MainPageProps> = memo(() => {
    return (
    <div className='w-auto flex justify-center'>
        <div className='flex mt-40 justify-center gap-5'>
            <div className='w-[40%] flex flex-col gap-7'>
                <h1 className='text-black text-5xl font-bold leading-13 text-balance text-left'>МИ ПОРУЧ - ПЛАТФОРМА ДОПОМОГИ ДЛЯ КОЖНОГО, ХТО ЇЇ ПРОПОНУЄ</h1>
                <img src="./images/photo1.svg" alt="photo" />
            </div>
            <div className='width-[40%] flex flex-col gap-2'>
                <img src="./images/photo2.svg" alt="photo" />
                <Button asChild variant="outline" className='w-full h-40 rounded-[12px] bg-[#00102E] text-white text-3xl'>
                    <Link to='/auth'>Перейти в застосунок</Link>
                </Button>
            </div>
        </div>
    </div>
    )
})
MainPage.displayName = 'MainPage'


