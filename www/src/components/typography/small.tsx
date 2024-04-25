import { cn } from '@/utils/cn'
import { memo } from 'react'

type SmallProps = React.ComponentProps<'small'>
export const Small: React.FC<SmallProps> = memo(({ className, ...props }) => {
    return <small className={cn('text-sm font-medium leading-none', className)} {...props} />
})
Small.displayName = 'Small'
