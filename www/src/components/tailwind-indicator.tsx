import { memo } from 'react'

type TailwindIndicatorProps = unknown
export const TailwindIndicator: React.FC<TailwindIndicatorProps> = memo(() => {
    return (
        <div className="fixed bottom-1 left-1 z-[1000000] flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-3 font-sans text-xs text-slate-50">
            <div className="block sm:hidden">xs</div>
            <div className="hidden sm:block md:hidden">sm</div>
            <div className="hidden md:block lg:hidden">md</div>
            <div className="hidden lg:block xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block">2xl</div>
        </div>
    )
})
TailwindIndicator.displayName = 'TailwindIndicator'
