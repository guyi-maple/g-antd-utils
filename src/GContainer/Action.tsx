import React from "react";
import {useContainerCustomerContext, useContainerDispatch} from "./index";

const Action = ({children}: any) => {

    const state = useContainerCustomerContext()
    const dispatch = useContainerDispatch()

    const action = (action: string) => {
        state.action(action, state, dispatch)
    }

    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, {action})
        }
        return child
    })
}

export default Action