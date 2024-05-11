export type Maybe<T> = T | undefined | null
export type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Children = React.ReactNode
export type ChildrenProps = {
    children?: Children
}
