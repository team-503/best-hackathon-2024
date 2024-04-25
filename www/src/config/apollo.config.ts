import { NODE_ENV_DEV } from '@/utils/NODE_ENV'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_ENDPOINT}`,
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth')
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
