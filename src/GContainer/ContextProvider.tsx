import React from "react";
import {useContainerCustomerContext} from "./index";

const ContextProvider = ({children}: any) => {

    const context = useContainerCustomerContext();

    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, {g: {context}})
        }
        return child
    })
}

export default ContextProvider