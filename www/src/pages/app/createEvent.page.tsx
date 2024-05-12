import { PageWrapper } from '@/components/page-wrapper'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UrlConfig } from '@/config/url.config'
import { formSchema } from '@/utils/scheme/scheme'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { EventStatusEnum, useCreateEventMutation } from '@/__generated__/graphql'

type CreateEventPageProps = unknown
export const CreateEventPage: React.FC<CreateEventPageProps> = memo(() => {
    const [createEvent] = useCreateEventMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: EventStatusEnum.Undefined,
            latitude: '',
            longitude: '',
            direction: '',
        },
    })

    const { handleSubmit } = form

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createEvent({
            variables: {
                event: {
                    ...values,
                    date: values.date.toISOString(),
                    persons: [],
                    latitude: Number(values.latitude),
                    longitude: Number(values.longitude),
                },
            },
        })
    }

    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.home, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]}
            container={false}
            className="space-y-3"
        >
            <div className="container max-w-[560px]">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="direction"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Напрям</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Напрям" {...field} />
                                    </FormControl>
                                    <FormMessage />
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

                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="longitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Широта</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Широта" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="latitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Довгота</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Довгота" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">Створити</Button>
                    </form>
                </Form>
            </div>
        </PageWrapper>
    )
})
CreateEventPage.displayName = 'AppPage'
