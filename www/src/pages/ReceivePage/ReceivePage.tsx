import { useEffect, useState } from 'react'
import moment from 'moment'
import { PostType, usePostConnectionLazyQuery } from '@/__generated__/graphql'
import { PostCard } from './components/post-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PostCard } from '../app/components/Post-card'

export const ReceivePage = () => {
    localStorage.setItem(
        '_auth',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWWVRNWmJKTm1Zc29RSllLdDE4dSIsImlhdCI6MTcxNDMyMDc3NiwiZXhwIjoxNzE2MTM1MTc2fQ.O1BvCy6PQEjw-03bHB7sxdBPJbl9eGReWqbhGLqj8gw',
    )
    const [gerMorePosts, { data }] = usePostConnectionLazyQuery({
        variables: {
            limit: 3,
        },
    })
    const [posts, setPosts] = useState<PostType[]>([])
    const [page, setPage] = useState<number | null | undefined>(0)

    useEffect(() => {
        gerMorePosts()
    }, [])

    useEffect(() => {
        if (data) {
            setPosts(prev => [...prev, ...data.postConnection.nodes])
            setPage(data.postConnection.pageInfo.nextPageCursor)
        }
    }, [data])

    const fetchNextPage = () => {
        gerMorePosts({
            variables: {
                nextPageCursor: page,
            },
        })
    }

    return (
        <div className="container mb-12 flex flex-col items-center pb-8	pl-8 pr-8 pt-8">
            <InfiniteScroll dataLength={posts.length} next={fetchNextPage} hasMore={true} loader={<h4>Loading...</h4>}>
                {data &&
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            disc={post.content}
                            date={moment(post.createdAt).format('L')}
                            imageUrl={post.imageUrl}
                        />
                    ))}
            </InfiniteScroll>
        </div>
    )
}
