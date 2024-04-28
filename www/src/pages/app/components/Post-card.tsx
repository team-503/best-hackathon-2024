import { Button } from '@/components/ui/button'

function PostCard({ date, title, disc }) {
    return (
        <div className="mt-5 md:w-[48%]">
            <h3 className="text-2xl font-semibold text-[#5F5F5F]">Створено / {date}</h3>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">{title}</h2>
            <p className="mt-5 text-left text-lg font-medium text-[#5F5F5F]">{disc}</p>
            <Button variant="outline" className="mt-10 h-16 w-full rounded-[36px] bg-[#0F172A] text-xl font-bold text-white">
                ЗВ'ЯЗАТИСЯ
            </Button>
        </div>
    )
}

export default PostCard
