import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormFieldProps } from '@/pages/auth/types/form-field-props.type'
import { FieldPath, FieldValues } from 'react-hook-form'

const regions: string[] = [
    'Вінницька область',
    'Волинська область',
    'Дніпропетровська область',
    'Донецька область',
    'Житомирська область',
    'Закарпатська область',
    'Запорізька область',
    'Івано-Франківська область',
    'Київська область',
    'Кіровоградська область',
    'Луганська область',
    'Львівська область',
    'Миколаївська область',
    'Одеська область',
    'Полтавська область',
    'Рівненська область',
    'Сумська область',
    'Тернопільська область',
    'Харківська область',
    'Херсонська область',
    'Хмельницька область',
    'Черкаська область',
    'Чернівецька область',
    'Чернігівська область',
].sort((a, b) => a.localeCompare(b))

const LocationSelectItems = regions.map(region => (
    <SelectItem key={region} value={region}>
        {region}
    </SelectItem>
))

export const FormLocationField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: FormFieldProps<TFieldValues, TName>) => {
    return (
        <FormField
            {...props}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Локація</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Оберіть область" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>{LocationSelectItems}</SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FormLocationField.displayName = 'FormLocationField'
