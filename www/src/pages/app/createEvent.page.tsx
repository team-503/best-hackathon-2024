import { PageWrapper } from '@/components/page-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UrlConfig } from '@/config/url.config'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { z } from 'zod'

type CreateEventPageProps = unknown
export const CreateEventPage: React.FC<CreateEventPageProps> = memo(() => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    const [direction, setDirection] = useState<'Авдіївський' | "Куп'янський" | 'Херсонський' | 'Бахмутський' | "Мар'їнський">()
    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<Date>()
    const [hour, setHour] = useState<number>()
    const [number, setNumber] = useState<number>()
    // const formSchema = z.object({
    //     username: z.string().min(2, {
    //       message: "Username must be at least 2 characters.",
    //     }),
    //   })
    useEffect(() => {
        console.log()
    }, [date])
    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.home, UrlConfig.app, { ...UrlConfig.app, label: 'All photos' }]}
            container={false}
            className="space-y-3"
        >
            <div className="flex h-full w-full items-center justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Створіть нову інформаційну картку</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <Form {...form} > */}
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">Напрям</Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder="Обиріть напрям" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="Авдіївський">Авдіївський</SelectItem>
                                                <SelectItem value="Куп'янський">Куп'янський</SelectItem>
                                                <SelectItem value="Херсонський">Херсонський</SelectItem>
                                                <SelectItem value="Бахмутський">Бахмутський</SelectItem>
                                                <SelectItem value="Мар'їнський">Мар'їнський</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Населений пункт</Label>
                                        <Input
                                            id="name"
                                            autoComplete="off"
                                            value={name}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                setName(event.target.value)
                                            }}
                                            placeholder="Назва населеного пункту"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="date">Дата</Label>
                                        <Input
                                            id="date"
                                            value={date}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                setDate(event.target.value)
                                            }}
                                            autoComplete="off"
                                            placeholder="День бойової операції"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="hour">Година виїзду</Label>
                                        <Input
                                            id="hour"
                                            autoComplete="off"
                                            value={hour}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                setHour(Number(event.target.value))
                                            }}
                                            placeholder="Година виїзду"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="number">Чисельний склад військової групи</Label>
                                        <Input
                                            id="number"
                                            value={number}
                                            type="number"
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                setNumber(Number(event.target.value))
                                            }}
                                            autoComplete="off"
                                            placeholder="К-сть військового складу"
                                        />
                                    </div>
                                </div>
                            </form>
                        {/* </Form> */}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className="w-full">Створити</Button>
                    </CardFooter>
                </Card>
            </div>
        </PageWrapper>
    )
})
CreateEventPage.displayName = 'AppPage'
