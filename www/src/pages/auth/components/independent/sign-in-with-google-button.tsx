import { Icons } from '@/components/icons'
import { Show } from '@/components/show-when'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { memo } from 'react'

type SignInWithGoogleButtonProps = React.ComponentProps<typeof Button> & {
    isLoading?: boolean
}
export const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = memo(
    ({ isLoading = false, className, ...props }) => {
        return (
            <Button variant="outline" disabled={isLoading} className={cn('w-full', className)} {...props}>
                <Show>
                    <Show.When isTrue={isLoading}>
                        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                    </Show.When>
                    <Show.Else>
                        <Icons.Google className="mr-2 h-4 w-4" />
                    </Show.Else>
                </Show>
                Google
            </Button>
        )
    },
)
SignInWithGoogleButton.displayName = 'SignInWithGoogleButton'
