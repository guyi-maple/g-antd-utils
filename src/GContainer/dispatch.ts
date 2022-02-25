import {useEffect} from "react";
import {
    Component,
    ContextListener,
    useContainerContext, useContainerCustomerContext, useContainerDispatch, Waiter,
} from "./index";

export const registerComponent = (dispatch: any, component: Component) => {
    if (dispatch && component) {
        dispatch({
            type: 'registerComponent',
            payload: component
        })
    }
}

export const registerContextListener = (dispatch: any, listener: ContextListener) => {
    if (dispatch && listener) {
        dispatch({
            type: 'registerContextListener',
            payload: listener
        })
    }
}

export const updateContext = (dispatch: any, ctx: any) => {
    if (ctx) {
        dispatch({
            type: 'update',
            payload: ctx
        })
    }
}

export const useContainerAction = () => {
    const context = useContainerContext()
    const dispatch = useContainerDispatch()

    return (name: string, customer?: any) => context.action(context, name, dispatch, customer)
}

export const useContainerComponentAwaiter = (name: string, handler: () => void) => {

    const context = useContainerContext()

    useEffect(() => {
        if (context.components.filter((c: Component) => c.name === name).length > 0) {
            handler()
        }
    }, [context.components])

}

export const useContainerContextUpdater = () => {
    const dispatch = useContainerDispatch()
    return {
        customer: (customer: any) => dispatch({type: 'update', payload: customer}),
        container: (context: any) => dispatch({type: 'updateContainerContext', payload: context})
    }
}