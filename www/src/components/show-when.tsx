/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenProps, Children as IChildren } from '@/utils/types/type-helpers'
import { Children, memo } from 'react'

type ShowProps = ChildrenProps
type ShowWhenProps = ChildrenProps & {
    isTrue: boolean
}
type ShowOtherwiseProps = ChildrenProps & {
    render?: IChildren
}
type ShowComponent = React.FC<ShowProps> & {
    When: React.FC<ShowWhenProps>
    Else: React.FC<ShowOtherwiseProps>
}
export const Show: ShowComponent = ({ children }) => {
    let when: IChildren = null
    let otherwise: IChildren = null

    Children.forEach(children, children => {
        if ((children as any)?.props?.isTrue === undefined) {
            otherwise = children
        } else if (!when && (children as any)?.props?.isTrue === true) {
            when = children
        }
    })

    return when || otherwise
}
Show.When = memo(({ isTrue, children }) => isTrue && children)
Show.Else = memo(({ render, children }) => render || children)
Show.displayName = 'Show'
