import { Card } from '@/components/ui/card'
import { ChildrenProps } from '@/utils/types/type-helpers'
import { memo } from 'react'

type AuthCardProps = ChildrenProps
export const AuthCard: React.FC<AuthCardProps> = memo(({ children }) => {
    return <Card className="w-[450px]">{children}</Card>
})
AuthCard.displayName = 'AuthCard'
