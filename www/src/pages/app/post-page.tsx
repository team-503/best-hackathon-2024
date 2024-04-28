import { usePostByIdQuery, useProfileQuery } from '@/__generated__/graphql'
import { P } from '@/components/typography/p'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag } from '@/pages/app/components/tag'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Post = { title: string; content: string; imageUrl: string; tags: string[]; id: string; authorId: string; createdAt: string }
type Author = { fullName: string; id: string }

type PostPageProps = unknown
export const PostPage: FC<PostPageProps> = memo(() => {
    const [tags, setTags] = useState<string[]>([])
    const [tagAnimation] = useAutoAnimate<HTMLDivElement>()
    const { data } = usePostByIdQuery({ variables: { postByIdId: 'mhxftDgsh8NalUVEfIv0' } })
    const [post, setPost] = useState<Post>()
    const [author, setAuthor] = useState<Author>()
    const { data: dataProfile } = useProfileQuery({ variables: { profileId: `${post?.authorId}` } })
    useEffect(() => {
        if (data) {
            setPost(data.postById)
        }
    }, [data])

    useEffect(() => {
        setAuthor(dataProfile?.profile)
    }, [dataProfile])

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle className="w-full text-center">{post?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-full w-full">
                        <div className="group w-1/2">
                            <div className="relative h-auto w-5/6">
                                <img className="rounded-md" src={post?.imageUrl} alt="Фото поста" />
                            </div>
                        </div>
                        <form className="w-1/2">
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <P>{post?.content}</P>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <div ref={tagAnimation} className="flex flex-wrap gap-2 pt-2">
                                        {post?.tags.map(tag => {
                                            return <Tag key={tag} readonly tag={tag} setTags={setTags} />
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <div ref={tagAnimation} className="flex flex-wrap gap-2 pt-2">
                                        {post?.tags.map(tag => {
                                            return <Tag key={tag} readonly tag={tag} setTags={setTags} />
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <P>Автор: {author?.fullName}</P>
                                    <Link to={`/app/profile/${author?.id}`}>Більше про автора</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
})
PostPage.displayName = 'PostPage'
