import { cn } from '@/utils/cn'
import { memo } from 'react'

type ListProps = React.ComponentProps<'li'>
export const List: React.FC<ListProps> = memo(({ className, ...props }) => {
    return <li className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
})
List.displayName = 'List'
