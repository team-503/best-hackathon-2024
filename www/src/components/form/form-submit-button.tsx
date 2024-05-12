import { LoadingButton } from '@/components/loading-button'
import { memo } from 'react'

type FormSubmitButtonProps = React.ComponentProps<typeof LoadingButton>
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = memo(({ ...props }) => {
    return <LoadingButton type="submit" {...props} />
})
FormSubmitButton.displayName = 'FormSubmitButton'
