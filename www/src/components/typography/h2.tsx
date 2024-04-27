import { cn } from '@/utils/cn'
import { memo } from 'react'

type H2Props = React.ComponentProps<'h2'>
export const H2: React.FC<H2Props> = memo(({ className, ...props }) => {
    return <h2 className={cn('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)} {...props} />
})
H2.displayName = 'H2'
