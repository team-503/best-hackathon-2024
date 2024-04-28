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
        provide: {
            label: 'Хочу допомогти',
            url: '/app/provide',
        },
        receive: {
            label: 'Потрібна допомога',
            url: '/app/receive',
        },
        profile: {
            me: {
                label: 'Мій профіль',
                url: '/app/profile/me',
            },
            id: {
                label: 'Профіль',
                url: '/app/profile/:id',
                getDynamicUrl: (id: string) => `/profile/${id}`,
            },
        },
        post: {
            label: 'Пост',
            url: '/app/post/:id',
            getDynamicUrl: (id: string) => `/post/${id}`,
        },

        // auth
        login: {
            label: 'Логін',
            url: '/auth/login',
        },
        register: {
            label: 'Реєстрація',
            url: '/auth/register',
            choice: {
                label: 'Тип реєстрації',
                url: '/auth/register/choice',
            },
            receive: {
                label: 'Потбірна допомога',
                url: '/auth/register/receive',
            },
            provide: {
                label: 'Хочу допомогти',
                url: '/auth/register/provide',
            },
        },
        createPost: {
            label: 'Створення посту пост',
            url: '/new-recieval',
        },
    },
} as const
