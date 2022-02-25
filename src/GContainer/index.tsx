import {createContext, useContext, useReducer} from "react";

export interface Context {
    customer: any
    components: Component[],
    waiters: Waiter[]
    contextListeners: ContextListener[],
    action: (ctx: Context, name: string, dispatch: any, customer?: any) => void
}

export interface Component {
    name: string
    action?: string
    before?: string
    after?: string
    order: number
    executor: (ctx: any, dispatch: any) => Promise<any>
}

export type WaiterType = 'component' | 'context' | 'customer'
export interface Waiter {
    name: string
    for: string
    type: WaiterType
    handler: () => void
}

export interface ContextListener {
    field: string
    handle: (field: string, original: any, current: any) => void
}

export interface DispatchProps {
    type: string
    payload: any
}

const CustomerContext = createContext<any>(null)
const ContainerContext = createContext<any>(null)
const DispatchContext = createContext<any>(null)

export const useContainerContext = () => useContext(ContainerContext)
export const useContainerCustomerContext = () => useContext(CustomerContext)
export const useContainerDispatch = () => useContext(DispatchContext)

// 执行注册的组件
const runComponent = async (customer: any, dispatch: any,component: Component, before: any, after: any) => {
    // 执行需要在给定组件前执行的组件
    if (before[component.name]) {
        customer = {...customer, ...(await runComponent(customer, dispatch, before[component.name], before, after) || {})}
    }

    // 执行给定组件
    customer = {...customer, ...(await component.executor(customer, dispatch) || {})}

    // 执行需要在给定组件后执行的组件
    if (after[component.name]) {
        customer = {...customer, ...(await runComponent(customer, dispatch, after[component.name], before, after) || {})}
    }

    return customer
}

// 执行所有action属性与给定名称相同的组件
const runAction = (ctx: Context, name: string, dispatch: any, customer?: any) => {
    // 所有标注了需要在某个组件前执行的组件
    const before = {} as any
    (ctx.components as Component[]).filter(c => c.before).forEach(c => before[c.before || ''] = c)

    // 所有标注了需要在某个组件后执行的组件
    const after = {} as any
    (ctx.components as Component[]).filter(c => c.after).forEach(c => after[c.after || ''] = c)

    // 所有action属性与给定名称相同的组件
    const cs = (ctx.components as Component[]).filter(c => c.action === name)
    // 排序
    cs.sort((c1, c2) => c1.order > c2.order ? 1 : c1.order < c2.order ? -1 : 0)

    // 执行
    const runner = async () => {
        let customerContext = {...ctx.customer, ...(customer || {})}
        for (let i = 0; i < cs.length; i++) {
            customerContext = {...customerContext, ...(await runComponent(customerContext, dispatch, cs[i], before, after) || {})}
        }
        return customerContext
    }
    runner().then(customer => dispatch({type: 'update', payload: customer}))
}

const updateContext = (ctx: Context, customer: any) => {
    Object.keys(customer)
        .map(key => ({key, handlers: ctx.contextListeners.filter(listener => listener.field === key).map(listener => listener.handle)}))
        .forEach(item => item.handlers.forEach(handler => handler(item.key, ctx.customer[item.key], customer[item.key])))
    return {...ctx, customer: {...ctx.customer, ...(customer || {})}}
}

export interface GContainerProps {
    children: any
    defaultCustomer?: any
}

const GContainer = (props: GContainerProps) => {

    // 动作实现集合
    const actions = {
        registerComponent: (ctx: Context, component: Component) => ({...ctx, components: [...ctx.components, component]}),
        registerContextListener: (ctx: Context, listener: ContextListener) => ({...ctx, contextListeners: [...ctx.contextListeners, listener]}),
        updateContainerContext: (ctx: Context, newContext: any) => ({...ctx, ...(newContext || {})}),
        update: updateContext,
    } as any

    // 触发动作
    const reducer = (context: Context, dispatch: DispatchProps) => {
        const action = actions[dispatch.type]
        if (action) {
            return {...context, ...action(context, dispatch.payload)}
        }
        return context
    }

    const [state, dispatch] = useReducer(reducer, {
        action: runAction,
        customer: props.defaultCustomer || {},
        waiters: [] as Waiter[],
        components: [] as Component[],
        contextListeners: [] as ContextListener[]
    } as Context)

    return <ContainerContext.Provider value={state}>
        <CustomerContext.Provider value={state.customer}>
            <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
        </CustomerContext.Provider>
    </ContainerContext.Provider>
}

export default GContainer