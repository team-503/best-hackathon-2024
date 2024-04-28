import { useCreatePostMutation } from '@/__generated__/graphql'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AddTag } from '@/pages/create-post-page/components/add-tag'
import { Tag } from '@/pages/create-post-page/components/tag'
import { uploadImageToStorage } from '@/utils/firebase-utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CirclePlus, X } from 'lucide-react'
import { FC, memo, useState } from 'react'
import { toast } from 'sonner'

type CreatePostPageProps = unknown
export const CreatePostPage: FC<CreatePostPageProps> = memo(() => {
    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tagAnimation] = useAutoAnimate<HTMLDivElement>()
    const [file, setFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [createPostMutation] = useCreatePostMutation()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            const url = URL.createObjectURL(selectedFile)
            setImageUrl(url)
            setFile(selectedFile)
        }
    }

    const createPost = async () => {
        if (tags && description && tags.length > 0 && file) {
            const imageUrl = await uploadImageToStorage(file, file.name)
            createPostMutation({ variables: { post: { title: title, content: description, tags: tags, imageUrl: imageUrl } } })
        } else {
            toast.error('Заповність усі поля')
        }
    }
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle className="w-full text-center">Створіть новий пост</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-full w-full">
                        <div className="group w-1/2">
                            {imageUrl ? (
                                <div className="relative h-auto w-5/6">
                                    <img className="rounded-md" src={imageUrl} alt="Фото поста" />
                                    <div
                                        className="absolute right-1 top-1 cursor-pointer"
                                        onClick={() => {
                                            setImageUrl(null)
                                        }}
                                    >
                                        <X size={12} className=" text-background" strokeWidth={1.5} />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="fileInput">
                                        <div className="flex h-56 w-5/6 cursor-pointer items-center justify-center rounded-md border border-border">
                                            <CirclePlus color="hsl(var(--border))" strokeWidth={1.75} />
                                        </div>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}
                        </div>
                        <form className="w-1/2">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Назва поста</Label>
                                    <Input
                                        id="name"
                                        value={title}
                                        onChange={e => {
                                            const text = e.target.value
                                            setTitle(text)
                                        }}
                                        placeholder="Введіть назву вашого поста"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Додайте теги для посту</Label>
                                    <div ref={tagAnimation} className="flex flex-wrap gap-2 pt-2">
                                        {tags.map(tag => {
                                            return <Tag key={tag} tag={tag} setTags={setTags} />
                                        })}
                                        <AddTag tags={tags} setTags={setTags} />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="description">Назва поста</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={e => {
                                            const text = e.target.value
                                            setDescription(text)
                                        }}
                                        className="max-h-56"
                                        placeholder="Введіть опис вашого поста"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Назад</Button>
                    <Button onClick={createPost}>Створити</Button>
                </CardFooter>
            </Card>
        </div>
    )
})
CreatePostPage.displayName = 'CreatePostPage'
