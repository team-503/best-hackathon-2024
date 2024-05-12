import { Card } from '@/components/ui/card'
import { Children } from '@/types/children.type'
import { memo } from 'react'

type AuthCardProps = {
    children?: Children
}
export const AuthCard: React.FC<AuthCardProps> = memo(({ children }) => {
    return <Card className="w-[450px]">{children}</Card>
})
AuthCard.displayName = 'AuthCard'
