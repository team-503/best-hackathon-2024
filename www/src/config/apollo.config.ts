import { NODE_ENV_DEV } from '@/utils/NODE_ENV'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { AUTH_TOKEN_KEY } from '@/config/auth.config'

const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_URL}/graphql`,
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    return {
        headers: {
            ...headers,
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: NODE_ENV_DEV,
})
