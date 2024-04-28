import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import { ThemeUpdater } from '@/modules/theme/components/theme-updater'
import { ErrorPage } from '@/pages/error.page'
import { memo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes } from './routes'
import { NODE_ENV_DEV } from '@/utils/NODE_ENV'

type AppProps = unknown
export const App: React.FC<AppProps> = memo(() => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Routes />
            <ThemeUpdater />
            <Toaster />
            <TailwindIndicator />
        </ErrorBoundary>
    )
})
App.displayName = 'App'
