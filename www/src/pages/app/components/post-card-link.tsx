import { PostType } from '@/__generated__/graphql'
import { Muted } from '@/components/typography/muted'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { urlConfig } from '@/config/url.config'
import moment from 'moment'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type PostCardLinkProps = {
    post: PostType
}
export const PostCardLink: React.FC<PostCardLinkProps> = memo(({ post }) => {
    if (!post) {
        return null
    }

    return (
        <Link to={urlConfig.pages.post.getDynamicUrl(post.id)}>
            <Card>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.content.slice(0, 100)}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                    <Muted>{moment(post?.createdAt).format('L')}</Muted>
                </CardFooter>
            </Card>
        </Link>
    )
})
PostCardLink.displayName = 'PostCardLink'
