import { PostType, usePostConnectionLazyQuery } from '@/__generated__/graphql'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment'
export const Receive = () => {
    localStorage.setItem(
        'auth',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWWVRNWmJKTm1Zc29RSllLdDE4dSIsImlhdCI6MTcxNDMyMDc3NiwiZXhwIjoxNzE2MTM1MTc2fQ.O1BvCy6PQEjw-03bHB7sxdBPJbl9eGReWqbhGLqj8gw',
    )
    const [gerMorePosts, { data }] = usePostConnectionLazyQuery({
        variables: {
            limit: 10,
        },
    })
    const [posts, setPosts] = useState<PostType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [nextPage, setNextPage] = useState(0)
    console.log('hasMore', hasMore)

    useEffect(() => {
        gerMorePosts()
    }, [])

    useEffect(() => {
        if (data) {
            setNextPage(data.postConnection.pageInfo.nextPageCursor)
            setPosts(prev => [...prev, ...data.postConnection.nodes])

            setHasMore(nextPage > 0 ? false : true)
        }
    }, [data])

    const fetchData = () => {
        gerMorePosts({
            variables: {
                nextPageCursor: nextPage,
            },
        })
    }
    console.log('posts', posts)

    return (
        <div className="pl-8 pr-8 pt-8">
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>You have seen it all</b>
                    </p>
                }
            >
                {data &&
                    posts.map(post => (
                        <div
                            key={post.id}
                            className="container mb-4 flex flex-col justify-center rounded-lg border-2 border-border bg-background pb-2 pt-2"
                        >
                            <div>
                                <p className="text-foregraund	leading-5">Створено / {moment(post.createdAt).format('L')}</p>
                                <h3 className="text-foregraund text-xl font-semibold	">{post.title}</h3>
                            </div>
                            <p className="text-foregraund	leading-5">{post.content}</p>
                        </div>
                    ))}
            </InfiniteScroll>
        </div>
    )
}
