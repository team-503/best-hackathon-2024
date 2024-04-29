import { X } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

interface ITag {
    tag: string
    setTags?: Dispatch<SetStateAction<string[]>>
    readonly?: boolean
}

export const Tag: FC<ITag> = ({ tag, setTags, readonly }: ITag) => {
    const deleteTag = () => {
        if (setTags) setTags(prev => prev.filter(currentTag => tag !== currentTag))
    }

    return (
        <div className="group max-w-[280px]">
            <div className="flex items-center justify-center gap-1 rounded-2xl border border-border px-2 py-1">
                {!readonly && setTags && (
                    <div className="cursor-pointer" onClick={deleteTag}>
                        <X size={12} className="text-foreground" strokeWidth={1.5} />
                    </div>
                )}
                <p className="overflow-hidden text-ellipsis text-foreground">{tag}</p>
            </div>
        </div>
    )
}
