import React from "react";
import {useContainerContext} from "./index";

const ContextProvider = ({children}: any) => {

    const context = useContainerContext();

    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, {g: {context}})
        }
        return child
    })
}

export default ContextProvider