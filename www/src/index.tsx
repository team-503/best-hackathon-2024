import { App } from '@/app'
import { apolloClient } from '@/config/apollo.config'
import { authStore } from '@/config/auth.config'
import { queryClient } from '@/config/tanstack.config'
import { ApolloProvider } from '@apollo/client'
import { QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from 'react-auth-kit/AuthProvider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './font.css'
import './styles.css'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(
    <AuthProvider store={authStore}>
        <ApolloProvider client={apolloClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </ApolloProvider>
    </AuthProvider>,
)
