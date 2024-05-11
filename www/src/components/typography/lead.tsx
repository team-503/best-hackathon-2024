import { cn } from '@/utils/cn'
import { memo } from 'react'

type LeadProps = React.ComponentProps<'p'>
export const Lead: React.FC<LeadProps> = memo(({ className, ...props }) => {
    return <p className={cn('text-xl text-muted-foreground', className)} {...props} />
})
Lead.displayName = 'Lead'
