import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { PersonType } from '@/__generated__/graphql'

const formSchema = z.object({
    firstName: z.string().min(2, { message: "Ім'я є обов'язковим" }),
    lastName: z.string().min(2, { message: "Прізвище є обов'язковим" }),
    surname: z.string().min(2, { message: "Поле є обов'язковим" }),
})
type FormSchemaType = z.infer<typeof formSchema>

export function DialogDemo({ setLostPeople }: { setLostPeople: React.Dispatch<React.SetStateAction<PersonType[]>> }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            surname: '',
        },
    })

    const onSubmit = (value: FormSchemaType) => {
        setLostPeople(prev => [...prev, value])
        setIsOpen(false)
        form.reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Добавити безвісті пропавшого</Button>
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
                            name="firstName"
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
                            name="lastName"
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
                            name="surname"
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
}
