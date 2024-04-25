import { memo } from 'react'

type NotFoundPageProps = unknown
export const NotFoundPage: React.FC<NotFoundPageProps> = memo(() => {
    return <>404</>
})
NotFoundPage.displayName = 'NotFoundPage'
