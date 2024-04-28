import { Icons } from '@/components/icons'
import { Show } from '@/components/show-when'
import { Button } from '@/components/ui/button'
import { memo } from 'react'

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
    isLoading?: boolean
}
export const LoadingButton: React.FC<LoadingButtonProps> = memo(({ isLoading = false, children, ...props }) => {
    return (
        <Button disabled={isLoading} {...props}>
            <Show>
                <Show.When isTrue={isLoading}>
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                </Show.When>
            </Show>
            {children}
        </Button>
    )
})
LoadingButton.displayName = 'LoadingButton'
