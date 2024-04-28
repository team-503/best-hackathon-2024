import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from '@/pages/auth/types/form-field-props.type'
import { FieldPath, FieldValues } from 'react-hook-form'

export const FormPasswordField = <
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                        <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FormPasswordField.displayName = 'FormPasswordField'
