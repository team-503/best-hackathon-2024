import { DirectionEnum, EventConnectionDocument, EventStatusEnum, useCreateEventMutation } from '@/__generated__/graphql'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { FormTextField } from '@/components/form/form-text-field'
import { PageWrapper } from '@/components/page-wrapper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { QUERY_LIMIT } from '@/config/apollo.config'
import { UrlConfig } from '@/config/url.config'
import { cn } from '@/utils/cn'
import { getDirectionString } from '@/utils/get-direction-string'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    status: z.nativeEnum(EventStatusEnum),
    direction: z.string().min(2),
    date: z.date(),
    latitude: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: 'Latitude must be a number' })
        .refine(value => Number(value) >= -90 && Number(value) <= 90, { message: 'Latitude must be between -90 and 90' }),
    longitude: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: 'Longitude must be a number' })
        .refine(value => Number(value) >= -180 && Number(value) <= 180, { message: 'Longitude must be between -180 and 180' }),
})
type FormSchemaType = z.infer<typeof formSchema>

type CreateEventPageProps = unknown
export const CreateEventPage: React.FC<CreateEventPageProps> = memo(() => {
    const [createEvent, { loading }] = useCreateEventMutation()
    const navigate = useNavigate()

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: EventStatusEnum.Undefined,
            latitude: '',
            longitude: '',
            direction: '',
        },
    })

    const onSubmit = (values: FormSchemaType) => {
        createEvent({
            variables: {
                event: {
                    ...values,
                    latitude: Number(values.latitude),
                    longitude: Number(values.longitude),
                    date: values.date.toISOString(),
                    persons: [],
                },
            },
            refetchQueries: [
                {
                    query: EventConnectionDocument,
                    variables: {
                        limit: QUERY_LIMIT,
                    },
                },
            ],
        })
        form.reset()
        toast.success('Подію створено')
        navigate(UrlConfig.app.url)
    }

    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.main, UrlConfig.app, UrlConfig.createEvent]}
            className="my-auto flex items-center justify-center"
        >
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Створити подію</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="direction"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Напрямок</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue="">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Напрямок..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(DirectionEnum).map(direction => (
                                                    <SelectItem key={direction} value={direction}>
                                                        {getDirectionString(direction)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Дата</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, 'PPP') : <span>Виберіть дату</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={date => date > new Date() || date < new Date('1900-01-01')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3">
                                <FormTextField control={form.control} name="latitude" title="Широта" placeholder="0" />
                                <FormTextField control={form.control} name="longitude" title="Довгота" placeholder="0" />
                            </div>

                            <FormSubmitButton isLoading={loading}>Створити</FormSubmitButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </PageWrapper>
    )
})
CreateEventPage.displayName = 'CreateEventPage'
