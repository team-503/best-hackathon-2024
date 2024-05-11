type TConnectionType<T> = {
    nodes: T[]
    pageInfo: {
        limit: number
        nextPageCursor: number | null
    }
}

const getNextPageCursorFromNodes = <TNodes extends { id: number }>(nodes: TNodes[]): number | null => {
    return nodes.length === 0 ? null : nodes.at(-1)?.id ?? null
}

export const connectionAgg = <TNodes extends { id: number }, TArgs extends { limit: number }>(
    nodes: TNodes[],
    args: TArgs,
): TConnectionType<TNodes> => {
    return {
        nodes,
        pageInfo: {
            limit: args.limit,
            nextPageCursor: getNextPageCursorFromNodes(nodes),
        },
    }
}
