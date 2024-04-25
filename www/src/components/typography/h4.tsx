import { cn } from '@/utils/cn'
import { memo } from 'react'

type H4Props = React.ComponentProps<'h4'>
export const H4: React.FC<H4Props> = memo(({ className, ...props }) => {
    return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
})
H4.displayName = 'H4'
