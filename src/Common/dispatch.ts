
export const updateContext = (dispatch: any, ctx: any) => {
    if (ctx) {
        dispatch({
            type: 'update',
            payload: ctx
        })
    }
}

export const runAction = (ctx: any, dispatch: any, name: string) => {
    if (ctx && dispatch && name) {
        ctx.action(name, ctx, dispatch)
    }
}