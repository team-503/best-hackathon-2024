import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

export type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'>
