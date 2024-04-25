import { memo } from 'react'

type ErrorPageProps = unknown
export const ErrorPage: React.FC<ErrorPageProps> = memo(() => {
    return <>503</>
})
ErrorPage.displayName = 'ErrorPage'
