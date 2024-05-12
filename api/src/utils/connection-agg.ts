type TConnectionType<T> = {
    nodes: T[]
    pageInfo: {
        limit: number
        nextPageCursor: number | null
    }
}

export const connectionAgg = <TNodes, TArgs extends { limit: number; nextPageCursor: number }>(
    nodes: TNodes[],
    args: TArgs,
): TConnectionType<TNodes> => {
    return {
        nodes,
        pageInfo: {
            limit: args.limit,
            nextPageCursor: args.nextPageCursor,
        },
    }
}
