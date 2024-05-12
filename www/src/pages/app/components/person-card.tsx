import { PersonType } from '@/__generated__/graphql'
import { Button } from '@/components/ui/button'
import { Image } from 'lucide-react'
import { memo } from 'react'

type PersonCardProps = {
    person: PersonType
}
export const PersonCard: React.FC<PersonCardProps> = memo(({ person }) => {
    return (
        <div className="flex items-center gap-2">
            <Button size="icon-sm" variant="outline">
                <Image className="h-5 w-5" />
            </Button>
            <p>
                {person.surname} {person.name} {person.secondName}
            </p>
        </div>
    )
})
PersonCard.displayName = 'PersonCard'
