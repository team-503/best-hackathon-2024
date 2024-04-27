export const urlConfig = {
    api: {
        graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
    },
    pages: {
        main: {
            label: 'Головна',
            url: '/',
        },
        app: {
            label: 'Додаток',
            url: '/app',
        },

        // auth
        login: {
            label: 'Логін',
            url: '/auth/login',
        },
        register: {
            label: 'Реєстрація',
            url: '/auth/register',
            receive: {
                label: 'Потбірна допомога',
                url: '/auth/register/receive',
            },
            provide: {
                label: 'Хочу допомогти',
                url: '/auth/register/provide',
            }
        },

        // other
        post: {
            label: 'Пост',
            url: '/post/:id',
            getDynamicUrl: (id: string) => `/post/${id}`,
        },
    },
} as const
