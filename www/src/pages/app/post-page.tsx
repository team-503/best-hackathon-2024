import { usePostByIdQuery, useProfileQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { P } from '@/components/typography/p'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { urlConfig } from '@/config/url.config'
import { Tag } from '@/pages/app/components/tag'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import moment from 'moment'
import { FC, memo, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Post = { title: string; content: string; imageUrl: string; tags: string[]; id: string; authorId: string; createdAt: string }
type Author = { fullName: string; id: string }

type PostPageProps = unknown
export const PostPage: FC<PostPageProps> = memo(() => {
    const [tagAnimation] = useAutoAnimate<HTMLDivElement>()
    let { id } = useParams()
    const { data } = usePostByIdQuery({ variables: { postByIdId: id } })
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
        <PageWrapper
            breadcrumbs={[
                urlConfig.pages.main,
                urlConfig.pages.app,
                {
                    ...urlConfig.pages.post,
                    url: window.location.pathname,
                },
            ]}
            className="flex items-center justify-center"
        >
            <div className="flex h-full w-full items-center justify-center">
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle className="w-full text-center uppercase">{post?.title}</CardTitle>
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
                                        <div ref={tagAnimation} className="flex flex-wrap gap-2">
                                            {post?.tags.map(tag => {
                                                return <Tag key={tag} readonly tag={tag} />
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <span>
                                            Автор:{' '}
                                            <Link
                                                className="transition-colors duration-300 hover:text-muted"
                                                to={`/app/profile/${author?.id}`}
                                            >
                                                {author?.fullName}
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <P>Створено: {moment(post?.createdAt).format('L')}</P>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    )
})
PostPage.displayName = 'PostPage'
