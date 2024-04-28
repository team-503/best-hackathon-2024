import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from '@/pages/auth/types/form-field-props.type'
import { FieldPath, FieldValues } from 'react-hook-form'

export const FormEmailField = <
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                        <Input {...field} type="email" placeholder="johndoe@email.com" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FormEmailField.displayName = 'FormEmailField'
