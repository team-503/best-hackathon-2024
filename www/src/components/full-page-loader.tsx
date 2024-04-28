import { Transition } from '@headlessui/react'
import { Loader2 } from 'lucide-react'
import { memo } from 'react'

type FullPageLoaderProps = {
    isLoading?: boolean
}
export const FullPageLoader: React.FC<FullPageLoaderProps> = memo(({ isLoading = false }) => {
    return (
        <Transition
            show={isLoading}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        </Transition>
    )
})
FullPageLoader.displayName = 'FullPageLoader'
