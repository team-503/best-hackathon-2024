import { useEffect, useState } from 'react'
import moment from 'moment'
import { PostType, usePostConnectionLazyQuery } from '@/__generated__/graphql'
import { PostCard } from '../app/components/Post-card'

export const ReceivePage = () => {
    localStorage.setItem(
        '_auth',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWWVRNWmJKTm1Zc29RSllLdDE4dSIsImlhdCI6MTcxNDMyMDc3NiwiZXhwIjoxNzE2MTM1MTc2fQ.O1BvCy6PQEjw-03bHB7sxdBPJbl9eGReWqbhGLqj8gw',
    )
    const [gerMorePosts, { data }] = usePostConnectionLazyQuery({
        variables: {
            limit: 100,
        },
    })
    const [posts, setPosts] = useState<PostType[]>([])

    useEffect(() => {
        gerMorePosts()
    }, [])

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
