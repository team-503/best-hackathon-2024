import { UserTypeEnum, usePostConnectionLazyQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { urlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { PostCardLink } from '@/pages/app/components/post-card-link'
import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'

type ReceivePageProps = unknown
export const ReceivePage: React.FC<ReceivePageProps> = memo(() => {
    const user = useUserStore(state => state.user)
    const [postConnectionQuery] = usePostConnectionLazyQuery({
        variables: {
            limit: 10,
        },
    })
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['post-connection-receive'],
        queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
            const res = await postConnectionQuery({
                variables: {
                    nextPageCursor: pageParam,
                },
            })
            return res?.data?.postConnection
        },
        initialPageParam: 0,
        getNextPageParam: lastPage => {
            if (!lastPage?.pageInfo?.hasNextPage) {
                return undefined
            }
            return lastPage?.pageInfo?.nextPageCursor
        },
    })
    const triggerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetchingNextPage) {
                fetchNextPage()
            }
        }, {})
        if (triggerRef.current) {
            observer.observe(triggerRef.current)
        }
        const cleanup = triggerRef.current
        return () => {
            if (cleanup) {
                observer.unobserve(cleanup)
            }
        }
    }, [fetchNextPage, isFetchingNextPage])

    if (user?.userType !== UserTypeEnum.Receiver) {
        return <Navigate to={urlConfig.pages.app.url} />
    }

    return (
        <PageWrapper breadcrumbs={[urlConfig.pages.main, urlConfig.pages.app, urlConfig.pages.receive]}>
            <div className="container flex flex-col gap-5">
                {data?.pages.map(page => page?.nodes.map(post => <PostCardLink key={post.id} post={post} />))}

                <div ref={triggerRef} className="py-5" />
            </div>
        </PageWrapper>
    )
})
ReceivePage.displayName = 'ReceivePage'
