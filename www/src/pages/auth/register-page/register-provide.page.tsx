import { UserTypeEnum } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { FormLocationField } from '@/pages/auth/components/form-location-field'
import { FormSubmitButton } from '@/pages/auth/components/form-submit-button'
import { FormTextField } from '@/pages/auth/components/form-text-field'
import { useFinishRegistration } from '@/pages/auth/hooks/user-finish-registration'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    location: z.string(),
    field: z.string().min(2),
})
type FormSchemaType = z.infer<typeof formSchema>

type RegisterProvidePageProps = unknown
export const RegisterProvidePage: React.FC<RegisterProvidePageProps> = memo(() => {
    const { finishRegistration, updateProfileMutationData } = useFinishRegistration()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            field: '',
        },
    })

    const onSubmit = useCallback(
        async (values: FormSchemaType) => {
            try {
                finishRegistration(urlConfig.pages.provide.url, {
                    userType: UserTypeEnum.Provider,
                    provider: values,
                })
            } catch (error) {
                toast('Помилка реєстрації, спробуйте пізніше')
            }
        },
        [finishRegistration],
    )

    return (
        <PageWrapper
            breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.provide]}
            className="flex items-center justify-center"
        >
            <AuthCard>
                <CardHeader>
                    <CardTitle>Реєстрація</CardTitle>
                    <CardDescription>Хочу допомогти</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormTextField
                                control={form.control}
                                name="field"
                                title="Сфера володінь"
                                description="Область, у якій ви маєте експертизу або досвід і готові надавати допомогу."
                                placeholder="Право"
                            />
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
RegisterProvidePage.displayName = 'RegisterProvidePage'
