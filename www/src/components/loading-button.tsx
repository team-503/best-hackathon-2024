import { Show } from '@/components/show-when'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { memo } from 'react'

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
    isLoading?: boolean
}
export const LoadingButton: React.FC<LoadingButtonProps> = memo(({ isLoading = false, children, ...props }) => {
    return (
        <Button disabled={isLoading} {...props}>
            <Show>
                <Show.When isTrue={isLoading}>
                    <Loader2 className="animate-spin" />
                </Show.When>
            </Show>
            {children}
        </Button>
    )
})
LoadingButton.displayName = 'LoadingButton'
