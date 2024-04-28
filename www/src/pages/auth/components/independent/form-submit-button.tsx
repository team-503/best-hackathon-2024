import { Icons } from '@/components/icons'
import { Show } from '@/components/show-when'
import { Button } from '@/components/ui/button'
import { memo } from 'react'

type FormSubmitButtonProps = React.ComponentProps<typeof Button> & {
    isLoading?: boolean
}
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = memo(({ isLoading = false, children, ...props }) => {
    return (
        <Button type="submit" disabled={isLoading} {...props}>
            <Show>
                <Show.When isTrue={isLoading}>
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                </Show.When>
            </Show>
            {children}
        </Button>
    )
})
FormSubmitButton.displayName = 'FormSubmitButton'
