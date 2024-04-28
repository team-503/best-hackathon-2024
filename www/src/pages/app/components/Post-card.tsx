import { Button } from '@/components/ui/button'
import { memo } from 'react'

type PostCardProps = {
    title: string
    disc: string
    date: string
    imageUrl: string
}
export const PostCard: React.FC<PostCardProps> = memo(({ date, title, disc, imageUrl }) => {
    return (
        <div className="mb-14 mt-5 md:w-[48%]">
            <img src={imageUrl} className="mb-1 rounded-lg" />
            <p className="text-1xl font-semibold text-[#5F5F5F]">Створено / {date}</p>
            <h2 className="mt-1 text-3xl font-bold text-[#0F172A]">{title}</h2>
            <p className="mt-5 text-left text-lg font-medium text-[#5F5F5F]">{disc}</p>
            <Button variant="default" className="mt-4 h-16 w-full text-xl font-bold uppercase" disabled>
                Детальніше
            </Button>
        </div>
    )
})
PostCard.displayName = 'PostCard'
