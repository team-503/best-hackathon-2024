import { H1 } from '@/components/typography/h1'
import { cn } from '@/utils/cn'
import { memo } from 'react'
import { Link } from 'react-router-dom'

type AuthPersonTypeCardProps = React.ComponentProps<typeof Link>
export const AuthPersonTypeCard: React.FC<AuthPersonTypeCardProps> = memo(({ className, children, ...props }) => {
    return (
        <Link
            className={cn(
                'flex items-center justify-center text-balance rounded-3xl p-5 text-center transition-all duration-300 hover:scale-[1.005]',
                className,
            )}
            {...props}
        >
            <H1>{children}</H1>
        </Link>
    )
})
AuthPersonTypeCard.displayName = 'AuthPersonTypeCard'
