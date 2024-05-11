import { cn } from '@/utils/cn'
import { memo } from 'react'

type BlockquoteProps = React.ComponentProps<'blockquote'>
export const Blockquote: React.FC<BlockquoteProps> = memo(({ className, ...props }) => {
    return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
})
Blockquote.displayName = 'Blockquote'
