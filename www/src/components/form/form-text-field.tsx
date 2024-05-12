import { Show } from '@/components/show-when'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from '@/components/form/form-field-props.type'
import { FieldPath, FieldValues } from 'react-hook-form'

export const FormTextField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    title,
    description,
    placeholder,
    ...props
}: FormFieldProps<TFieldValues, TName> &
    Pick<React.ComponentProps<typeof Input>, 'placeholder'> & {
        title: string
        description?: string
    }) => {
    return (
        <FormField
            {...props}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Input {...field} type="text" placeholder={placeholder} />
                    </FormControl>
                    <Show>
                        <Show.When isTrue={description != null}>
                            <FormDescription className="text-wrap break-words">{description}</FormDescription>
                        </Show.When>
                    </Show>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FormTextField.displayName = 'FormTextField'
