import { CircleCheck, CircleMinus, CirclePlus } from 'lucide-react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

interface IAddTag {
    tags: string[]
    setTags: Dispatch<SetStateAction<string[]>>
}

export const AddTag: FC<IAddTag> = ({ tags, setTags }: IAddTag) => {
    const [tag, setTag] = useState<string>('')
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const createTag = () => {
        const item = tags.find(item => item === tag)
        if (item) {
            toast.error('Такий теж вже існує')
            return
        }
        setTags(prev => [...prev, tag])
        setIsCreating(prev => !prev)
        setTag('')
    }
    return (
        <div className="group">
            <div className="flex h-full items-center justify-center gap-1 rounded-2xl border border-border px-2 py-1">
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setIsCreating(prev => !prev)
                    }}
                >
                    {isCreating ? (
                        <CircleMinus className="text-foreground" size={20} strokeWidth={1.5} />
                    ) : (
                        <CirclePlus className="text-foreground" size={20} strokeWidth={1.5} />
                    )}
                </div>
                {isCreating && (
                    <div className="flex items-center gap-1">
                        <input
                            onChange={e => {
                                const text = e.target.value
                                setTag(text)
                            }}
                            className="border-none bg-transparent outline-0"
                        />
                        <div className="cursor-pointer" onClick={createTag}>
                            <CircleCheck size={20} className="text-foreground" strokeWidth={1.5} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
