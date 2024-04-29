import { PageWrapper } from '@/components/page-wrapper'
import { Muted } from '@/components/typography/muted'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { FormEmailField } from '@/pages/auth/components/form-email-field'
import { FormPasswordField } from '@/pages/auth/components/form-password-field'
import { FormSubmitButton } from '@/pages/auth/components/form-submit-button'
import { OrContinueWithDivider } from '@/pages/auth/components/or-continue-with-divider'
import { SignInWithGoogleButton } from '@/pages/auth/components/sign-in-with-google-button'
import { useLogin } from '@/pages/auth/hooks/use-login'
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
})
type FormSchemaType = z.infer<typeof formSchema>

type LoginPageProps = unknown
export const LoginPage: React.FC<LoginPageProps> = memo(() => {
    const { login, loginMutatoinData } = useLogin()
    const signInWithGoogle = useSignInWithGoogle()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = useCallback(
        async (values: FormSchemaType) => {
            try {
                login(urlConfig.pages.app.url, {
                    email: values.email,
                    password: values.password,
                })
            } catch (error) {
                toast('Помилка входу, спробуйте пізніше')
            }
        },
        [login],
    )

    const onSignInWithGoogle = useCallback(async () => {
        try {
            const [data] = await signInWithGoogle()
            login(urlConfig.pages.app.url, {
                email: data.email,
                password: data.uid,
            })
        } catch (error) {
            toast('Помилка входу через Google, спробуйте пізніше')
        }
    }, [login, signInWithGoogle])

    return (
        <PageWrapper breadcrumbs={[urlConfig.pages.main, urlConfig.pages.login]} className="flex items-center justify-center">
            <AuthCard>
                <CardHeader>
                    <CardTitle>Логін</CardTitle>
                    <CardDescription>Вхід в обліковий запис</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormEmailField control={form.control} name="email" />
                            <FormPasswordField control={form.control} name="password" />
                            <FormSubmitButton type="submit" isLoading={loginMutatoinData.loading}>
                                Увійти
                            </FormSubmitButton>
                        </form>
                    </Form>
                    <OrContinueWithDivider className="my-5" />
                    <SignInWithGoogleButton onClick={onSignInWithGoogle} isLoading={loginMutatoinData.loading} />
                </CardContent>
                <CardFooter>
                    <Muted>
                        Немає акаунту?{' '}
                        <Link to={urlConfig.pages.register.url} className="underline">
                            Зареєструватись
                        </Link>
                    </Muted>
                </CardFooter>
            </AuthCard>
        </PageWrapper>
    )
})
LoginPage.displayName = 'LoginPage'
