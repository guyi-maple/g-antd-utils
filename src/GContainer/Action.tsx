import React from "react";
import {useContainerContext, useContainerDispatch} from "./index";

const Action = ({children}: any) => {

    const state = useContainerContext()
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