import {createContext, useContext, useReducer} from "react";

export interface Component {
    name: string
    action?: string
    before?: string
    after?: string
    order: number
    executor: (ctx: any) => Promise<any>
}

export interface DispatchProps {
    type: string
    payload: any
}

const StateContext = createContext<any>(null)
const DispatchContext = createContext<any>(null)

export const useContainerContext = () => useContext(StateContext)
export const useContainerDispatch = () => useContext(DispatchContext)


const runComponent = async (ctx: any, component: Component, before: any, after: any) => {
    let context = {...ctx}
    if (before[component.name]) {
        context = {...context, ...(await runComponent(context, before[component.name], before, after) || {})}
    }

    context = {...context, ...(await component.executor(context) || {})}

    if (after[component.name]) {
        context = {...context, ...(await runComponent(context, after[component.name], before, after) || {})}
    }

    return context
}

const GContainer = ({children}: any) => {

    const actions = {
        register: (ctx: any, component: Component) => ({...ctx, components: [...ctx.components, component]}),
        update: (ctx: any, newContext: any) => ({...ctx, ...newContext}),
        action: (ctx: any, {action, dispatch}:{action: string, dispatch: (ctx: DispatchProps) => any}) => {
            const before = {} as any
            (ctx.components as Component[]).filter(c => c.before).forEach(c => before[c.before || ''] = c)
            const after = {} as any
            (ctx.components as Component[]).filter(c => c.after).forEach(c => after[c.after || ''] = c)
            const cs = (ctx.components as Component[]).filter(c => c.action === action)
            cs.sort((c1, c2) => c1.order > c2.order ? 1 : c1.order < c2.order ? -1 : 0)
            const runner = async () => {
                let context = {...ctx}
                for (let i = 0; i < cs.length; i++) {
                    context = {...context, ...(await runComponent(context, cs[i], before, after) || {})}
                }
                return context
            }
            runner().then(context => dispatch({type: 'update', payload: context}))
        }
    } as any

    const reducer = (context: any, dispatch: DispatchProps) => {
        const action = actions[dispatch.type]
        if (action) {
            return {...context, ...action(context, dispatch.payload)}
        }
        return context
    }

    const [state, dispatch] = useReducer(reducer, {components: [] as Component[]})

    return <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
}

export default GContainer