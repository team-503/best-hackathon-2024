/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, memo } from 'react'

type ShowProps = {
    children?: React.ReactNode
}
type ShowWhenProps = {
    isTrue: boolean
    children?: React.ReactNode
}
type ShowOtherwiseProps = {
    render?: React.ReactNode
    children?: React.ReactNode
}
type ShowComponent = React.FC<ShowProps> & {
    When: React.FC<ShowWhenProps>
    Else: React.FC<ShowOtherwiseProps>
}
export const Show: ShowComponent = ({ children }) => {
    let when: React.ReactNode = null
    let otherwise: React.ReactNode = null

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
