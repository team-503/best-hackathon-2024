import { UserTypeEnum } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { Muted } from '@/components/typography/muted'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/dependent/auth-card'
import { FormEmailField } from '@/pages/auth/components/independent/form-email-field'
import { FormPasswordField } from '@/pages/auth/components/independent/form-password-field'
import { FormSubmitButton } from '@/pages/auth/components/independent/form-submit-button'
import { FormTextField } from '@/pages/auth/components/independent/form-text-field'
import { OrContinueWithDivider } from '@/pages/auth/components/independent/or-continue-with-divider'
import { SignInWithGoogleButton } from '@/pages/auth/components/independent/sign-in-with-google-button'
import { useRegister } from '@/pages/auth/hooks/use-register'
import { useSignInWithGoogle } from '@/pages/auth/hooks/use-sign-in-with-google'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(2),
})
type FormSchemaType = z.infer<typeof formSchema>

type RegisterPageProps = unknown
export const RegisterPage: React.FC<RegisterPageProps> = memo(() => {
    const { register, registerMutationData } = useRegister()
    const signInWithGoogle = useSignInWithGoogle()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
        },
    })

    const onSubmit = useCallback(
        async (values: FormSchemaType) => {
            try {
                register(urlConfig.pages.register.choice.url, {
                    userType: UserTypeEnum.Unknown,
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName,
                })
            } catch (error) {
                toast('Помилка реєстрації, спробуйте пізніше')
            }
        },
        [register],
    )

    const onSignInWithGoogle = useCallback(async () => {
        try {
            const [data] = await signInWithGoogle()
            register(urlConfig.pages.register.choice.url, {
                userType: UserTypeEnum.Unknown,
                email: data.email,
                password: data.uid,
                fullName: data.displayName,
            })
        } catch (error) {
            toast('Помилка реєстрації через Google, спробуйте пізніше')
        }
    }, [register, signInWithGoogle])

    return (
        <PageWrapper breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register]} className="flex items-center justify-center">
            <AuthCard>
                <CardHeader>
                    <CardTitle>Реєстрація</CardTitle>
                    <CardDescription>Створення нового облікового запису</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormEmailField control={form.control} name="email" />
                            <FormPasswordField control={form.control} name="password" />
                            <FormTextField control={form.control} name="fullName" title="Повне імʼя" placeholder="John Doe" />
                            <FormSubmitButton type="submit" isLoading={registerMutationData.loading}>
                                Зареєструватись
                            </FormSubmitButton>
                        </form>
                    </Form>
                    <OrContinueWithDivider className="my-5" />
                    <SignInWithGoogleButton onClick={onSignInWithGoogle} isLoading={registerMutationData.loading} />
                </CardContent>
                <CardFooter>
                    <Muted>
                        Вже є акаунт?{' '}
                        <Link to={urlConfig.pages.login.url} className="underline">
                            Увійти
                        </Link>
                    </Muted>
                </CardFooter>
            </AuthCard>
        </PageWrapper>
    )
})
RegisterPage.displayName = 'RegisterPage'
