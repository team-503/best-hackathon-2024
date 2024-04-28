import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Children } from '@/types/children.type'
import { memo } from 'react'

type AuthCardProps = {
    title: string
    description: string
    children?: Children
}
export const AuthCard: React.FC<AuthCardProps> = memo(({ title, description, children }) => {
    return (
        <Card className='w-[450px]'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
})
AuthCard.displayName = 'AuthCard'
