import { cn } from '@/utils/cn'
import React, { memo } from 'react'

type PProps = React.ComponentProps<'p'>
export const P: React.FC<PProps> = memo(({ className, ...props }) => {
    return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
})
P.displayName = 'P'
