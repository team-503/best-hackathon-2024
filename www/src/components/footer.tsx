import { Muted } from '@/components/typography/muted'
import { ThemeSelector } from '@/modules/theme/components/theme-selector'
import { cn } from '@/utils/cn'
import { memo } from 'react'

type FooterProps = React.ComponentProps<'section'>
export const Footer: React.FC<FooterProps> = memo(({ className, ...props }) => {
    return (
        <section className={cn('border-t py-6', className)} {...props}>
            <div className="container flex justify-between items-center">
                <Muted>
                    Build by{' '}
                    <a href="https://github.com/team-503" className="underline">
                        503 team
                    </a>
                    . The source code is available on{' '}
                    <a href="https://github.com/team-503/best-hackathon-2024" className="underline">
                        GitHub
                    </a>
                    .
                </Muted>
                <ThemeSelector variant="outline" />
            </div>
        </section>
    )
})
Footer.displayName = 'Footer'
