import { PageWrapper } from '@/components/page-wrapper'
import { Form } from '@/components/ui/form'
import { urlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/dependent/auth-card'
import { FormLocationField } from '@/pages/auth/components/independent/form-location-field'
import { FormPhoneField } from '@/pages/auth/components/independent/form-phone.field'
import { FormSubmitButton } from '@/pages/auth/components/independent/form-submit-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
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
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            phone: '',
        },
    })

    const onSubmit = useCallback(async (values: FormSchemaType) => {
        // TODO: implement
        console.log(values)
    }, [])

    return (
        <PageWrapper
            breadcrumbs={[urlConfig.pages.main, urlConfig.pages.register, urlConfig.pages.register.receive]}
            className="flex items-center justify-center"
        >
            <AuthCard title="Реєстрація" description="Потрібна допомога">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                        <FormPhoneField control={form.control} name="phone" />
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
RegisterReceivePage.displayName = 'RegisterReceivePage'
