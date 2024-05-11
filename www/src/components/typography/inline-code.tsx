import { cn } from '@/utils/cn'
import { memo } from 'react'

type InlineCodeProps = React.ComponentProps<'code'>
export const InlineCode: React.FC<InlineCodeProps> = memo(({ className, ...props }) => {
    return (
        <code
            className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
            {...props}
        />
    )
})
InlineCode.displayName = 'InlineCode'
