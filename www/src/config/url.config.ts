export const urlConfig = {
    api: {
        graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
    },
    pages: {
        main: {
            label: 'Головна',
            url: '/',
        },

        // auth
        auth: {
            label: 'Авторизація',
            url: '/auth',
        },
        login: {
            label: 'Логін',
            url: '/auth/login',
        },
        registerRecieve: {
            label: 'Реєстрація',
            url: '/auth/register/receive',
        },
        registerProvide: {
            label: 'Реєстрація',
            url: '/auth/register/provide',
        },

        // other
        post: {
            label: 'Пост',
            url: '/post/:id',
            getDynamicUrl: (id: string) => `/post/${id}`,
        },
    },
} as const
