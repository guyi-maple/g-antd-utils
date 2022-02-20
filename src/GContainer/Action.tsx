import React from "react";
import {useContainerDispatch} from "./index";

const Action = ({children}: any) => {

    const dispatch = useContainerDispatch()

    const action = (action: string) => {
        dispatch({
            type: 'action',
            payload: {
                action,
                dispatch
            }
        })
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