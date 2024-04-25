import { cn } from '@/utils/cn'
import { memo } from 'react'

type LargeProps = React.ComponentProps<'div'>
export const Large: React.FC<LargeProps> = memo(({ className, ...props }) => {
    return <div className={cn('text-lg font-semibold', className)} {...props} />
})
Large.displayName = 'Large'
