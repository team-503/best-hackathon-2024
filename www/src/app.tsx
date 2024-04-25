import { Toaster } from '@/components/ui/sonner'
import { ErrorPage } from '@/pages/error.page'
import { memo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes } from './routes'

type AppProps = unknown
export const App: React.FC<AppProps> = memo(() => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Routes />
            <Toaster />
            {/* <TailwindIndicator  /> */}
        </ErrorBoundary>
    )
})
App.displayName = 'App'
