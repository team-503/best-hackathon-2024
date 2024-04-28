export const urlConfig = {
    api: {
        graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
    },

    pages: {
        main: {
            label: 'Головна',
            url: '/',
        },
        error: {
            label: 'Помилка',
            url: '/error',
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
                label: 'Профіль користувача',
                url: '/app/profile/:id',
                getDynamicUrl: (id: string) => `/app/profile/${id}`,
            },
        },
        post: {
            label: 'Пост',
            url: '/app/post/:id',
            getDynamicUrl: (id: string) => `/app/post/${id}`,
        },
        createPost: {
            label: 'Створення посту пост',
            url: '/app/create-post',
        },

        // auth
        login: {
            label: 'Вхід',
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
    },
} as const
