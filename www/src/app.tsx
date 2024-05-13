import { Toaster } from '@/components/ui/sonner'
import { ThemeUpdater } from '@/modules/theme/components/theme-updater'
import { ErrorPage } from '@/pages/error.page'
import { AnimatePresence } from 'framer-motion'
import { memo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'
import { Routes } from './routes'

type AppProps = unknown
export const App: React.FC<AppProps> = memo(() => {
    const location = useLocation()

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname} />
            </AnimatePresence>
            <ThemeUpdater />
            <Toaster />
            {/* <TailwindIndicator /> */}
        </ErrorBoundary>
    )
})
App.displayName = 'App'
