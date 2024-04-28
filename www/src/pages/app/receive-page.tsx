import { useEffect, useState } from 'react'
import moment from 'moment'
import { PostType, usePostConnectionLazyQuery } from '@/__generated__/graphql'
import { PostCard } from './components/post-card'

export const ReceivePage = () => {
    const [gerMorePosts, { data }] = usePostConnectionLazyQuery({
        variables: {
            limit: 100,
        },
    })
    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(() => {
        gerMorePosts()
    }, [gerMorePosts])

    useEffect(() => {
        if (data) {
            setPosts(prev => [...prev, ...data.postConnection.nodes])
        }
    }, [data])

    return (
        <div className="container mb-12 flex flex-col items-center pb-8	pl-8 pr-8 pt-8">
            {data &&
                posts.map(post => (
                    <PostCard
                        title={post.title}
                        disc={post.content}
                        date={moment(post.createdAt).format('L')}
                        imageUrl={post.imageUrl}
                    />
                ))}
        </div>
    )
}
