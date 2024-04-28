import { App } from '@/app'
import { apolloClient } from '@/config/apollo.config'
import { authStore } from '@/config/auth.config'
import { ApolloProvider } from '@apollo/client'
import AuthProvider from 'react-auth-kit/AuthProvider'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(
    <AuthProvider store={authStore}>
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </AuthProvider>,
)
