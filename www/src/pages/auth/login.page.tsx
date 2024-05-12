import { FormEmailField } from '@/components/form/form-email-field'
import { FormPasswordField } from '@/components/form/form-password-field'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { PageWrapper } from '@/components/page-wrapper'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { UrlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { useLogin } from '@/pages/auth/hooks/use-login'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
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
                login(UrlConfig.app.url, {
                    email: values.email,
                    password: values.password,
                })
            } catch (error) {
                toast('Помилка входу, спробуйте пізніше')
            }
        },
        [login],
    )

    return (
        <PageWrapper breadcrumbs={[UrlConfig.home, UrlConfig.login]} className="flex items-center justify-center">
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
                </CardContent>
            </AuthCard>
        </PageWrapper>
    )
})
LoginPage.displayName = 'LoginPage'
