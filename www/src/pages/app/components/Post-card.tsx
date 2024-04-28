import { Button } from '@/components/ui/button'
import { memo } from 'react'

type PostCardProps = {
    title: string
    disc: string
    date: string
}
export const PostCard: React.FC<PostCardProps> = memo(({ date, title, disc }) => {
    return (
        <div className="mt-5 md:w-[48%]">
            <h3 className="text-2xl font-semibold text-[#5F5F5F]">Створено / {date}</h3>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">{title}</h2>
            <p className="mt-5 text-left text-lg font-medium text-[#5F5F5F]">{disc}</p>
            <Button variant="default" className="mt-10 h-16 w-full text-xl font-bold uppercase">
                Звʼязатись
            </Button>
        </div>
    )
})
PostCard.displayName = 'PostCard'
