import { cn } from '@/utils/cn'
import { memo } from 'react'

type OrContinueWithDividerProps = React.ComponentProps<'div'>
export const OrContinueWithDivider: React.FC<OrContinueWithDividerProps> = memo(({ className, ...props }) => {
    return (
        <div className={cn('relative', className)} {...props}>
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Або продовжити з</span>
            </div>
        </div>
    )
})
OrContinueWithDivider.displayName = 'OrContinueWithDivider'
