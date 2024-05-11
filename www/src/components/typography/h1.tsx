import { cn } from '@/utils/cn'
import { memo } from 'react'

type H1Props = React.ComponentProps<'h1'>
export const H1: React.FC<H1Props> = memo(({ className, ...props }) => {
    return <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props} />
})
H1.displayName = 'H1'
