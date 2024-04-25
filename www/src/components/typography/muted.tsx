import { cn } from '@/utils/cn'
import { memo } from 'react'

type MutedProps = React.ComponentProps<'p'>
export const Muted: React.FC<MutedProps> = memo(({ className, ...props }) => {
    return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
})
Muted.displayName = 'Muted'
