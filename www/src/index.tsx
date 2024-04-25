import { App } from '@/app'
import { apolloClient } from '@/config/apollo.config'
import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(
    <ApolloProvider client={apolloClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
)
