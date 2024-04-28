import { PageWrapper } from '@/components/page-wrapper'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/dependent/auth-card'
import { FormLocationField } from '@/pages/auth/components/independent/form-location-field'
import { FormSubmitButton } from '@/pages/auth/components/independent/form-submit-button'
import { FormTextField } from '@/pages/auth/components/independent/form-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    location: z.string(),
    field: z.string().min(2),
})
type FormSchemaType = z.infer<typeof formSchema>

type RegisterProvidePageProps = unknown
export const RegisterProvidePage: React.FC<RegisterProvidePageProps> = memo(() => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            field: '',
        },
    })

    const onSubmit = useCallback(async (values: FormSchemaType) => {
        // TODO: implement
        console.log(values)
    }, [])

    return (
        <PageWrapper
            breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.provide]}
            className="flex items-center justify-center"
        >
            <AuthCard title="Реєстрація" description="Потрібна допомога">
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
                        <FormSubmitButton type="submit" isLoading={false}>
                            Завершити реєстрацію
                        </FormSubmitButton>
                    </form>
                </Form>
            </AuthCard>
        </PageWrapper>
    )
})
RegisterProvidePage.displayName = 'RegisterProvidePage'
