import { X } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

interface ITag {
    tag: string
    setTags: Dispatch<SetStateAction<string[]>>
}

export const Tag: FC<ITag> = ({ tag, setTags }: ITag) => {
    const deleteTag = () => {
        setTags(prev => prev.filter(currentTag => tag !== currentTag))
    }

    return (
        <div className="group max-w-[280px]">
            <div className="flex items-center justify-center gap-1 rounded-2xl border border-border px-2 py-1">
                <div className="cursor-pointer" onClick={deleteTag}>
                    <X size={12} className="text-foreground" strokeWidth={1.5} />
                </div>
                <p className="overflow-hidden text-ellipsis text-foreground">{tag}</p>
            </div>
        </div>
    )
}
