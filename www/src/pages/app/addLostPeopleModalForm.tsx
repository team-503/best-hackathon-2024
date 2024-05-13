import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import { EventByIdDocument, EventType, PersonType, useUpdateEventMutation } from '@/__generated__/graphql'

const formSchema = z.object({
    name: z.string().min(2, { message: "Ім'я є обов'язковим" }),
    surname: z.string().min(2, { message: "Прізвище є обов'язковим" }),
    secondName: z.string().min(2, { message: "Поле є обов'язковим" }),
})
type FormSchemaType = z.infer<typeof formSchema>

import { memo } from 'react'

type AddLostPeopleModalFormProps = {
    event: EventType
}
export const AddLostPeopleModalForm: React.FC<AddLostPeopleModalFormProps> = memo(({ event }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [updateEvent] = useUpdateEventMutation()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            surname: '',
            name: '',
            secondName: '',
        },
    })

    const onSubmit = useCallback(
        (values: FormSchemaType) => {
            setIsOpen(false)
            form.reset()
            updateEvent({
                variables: {
                    event: {
                        id: event?.id || '-1',
                        persons: [
                            ...event.persons.map(person => ({
                                name: person.name,
                                secondName: person.secondName,
                                surname: person.surname,
                                imageUrl: person.imageUrl,
                            })),
                            {
                                name: values.name,
                                secondName: values.secondName,
                                surname: values.surname,
                                imageUrl: 'https://via.placeholder.com/150',
                            },
                        ],
                    },
                },
                refetchQueries: [
                    {
                        query: EventByIdDocument,
                        variables: {
                            eventId: event?.id || '-1',
                        },
                    },
                ],
            })
        },
        [event, form, updateEvent],
    )

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Додати зниклих безвісти</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавити</DialogTitle>
                    <DialogDescription>Всі поля є обов'язкові для заповнення</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ім'я</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ім'я" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Прізвище</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Прізвище" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="secondName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Побатькові</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Побатькові" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormSubmitButton>Добавити</FormSubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
AddLostPeopleModalForm.displayName = 'AddLostPeopleModalForm'
