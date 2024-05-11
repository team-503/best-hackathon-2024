import { cn } from '@/utils/cn'
import { memo } from 'react'

type H3Props = React.ComponentProps<'h3'>
export const H3: React.FC<H3Props> = memo(({ className, ...props }) => {
    return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
})
H3.displayName = 'H3'
