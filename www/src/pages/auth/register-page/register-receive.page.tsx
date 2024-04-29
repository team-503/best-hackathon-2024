import { UserTypeEnum } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { useUserStore } from '@/modules/user/stores/user.store'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { FormLocationField } from '@/pages/auth/components/form-location-field'
import { FormPhoneField } from '@/pages/auth/components/form-phone.field'
import { FormSubmitButton } from '@/pages/auth/components/form-submit-button'
import { useFinishRegistration } from '@/pages/auth/hooks/user-finish-registration'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import validator from 'validator'
import { z } from 'zod'

const formSchema = z.object({
    location: z.string(),
    phone: z.string().refine(validator.isMobilePhone, {
        message: 'Invalid phone number',
    }),
})
type FormSchemaType = z.infer<typeof formSchema>

type RegisterReceivePageProps = unknown
export const RegisterReceivePage: React.FC<RegisterReceivePageProps> = memo(() => {
    const user = useUserStore(state => state.user)
    const { finishRegistration, updateProfileMutationData } = useFinishRegistration()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            phone: '',
        },
    })

    const onSubmit = useCallback(
        async (values: FormSchemaType) => {
            try {
                finishRegistration(urlConfig.pages.receive.url, {
                    userType: UserTypeEnum.Receiver,
                    receiver: values,
                })
            } catch (error) {
                toast('Помилка реєстрації, спробуйте пізніше')
            }
        },
        [finishRegistration],
    )

    if (user?.userType !== UserTypeEnum.Provider) {
        return <Navigate to={urlConfig.pages.app.url} />
    }

    return (
        <PageWrapper
            breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.receive]}
            className="flex items-center justify-center"
        >
            <AuthCard>
                <CardHeader>
                    <CardTitle>Реєстрація</CardTitle>
                    <CardDescription>Потрібна допомога</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormPhoneField control={form.control} name="phone" />
                            <FormLocationField control={form.control} name="location" />
                            <FormSubmitButton type="submit" isLoading={updateProfileMutationData.loading}>
                                Завершити реєстрацію
                            </FormSubmitButton>
                        </form>
                    </Form>
                </CardContent>
            </AuthCard>
        </PageWrapper>
    )
})
RegisterReceivePage.displayName = 'RegisterReceivePage'
