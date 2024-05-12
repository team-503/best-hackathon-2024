import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { memo } from 'react'

type AuthCardProps = React.ComponentProps<typeof Card>
export const AuthCard: React.FC<AuthCardProps> = memo(({ className, children, ...props }) => {
    return (
        <Card className={cn('w-[450px]', className)} {...props}>
            {children}
        </Card>
    )
})
AuthCard.displayName = 'AuthCard'
