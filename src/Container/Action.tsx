import {ActionProps} from "./types";
import React from "react";

export interface ActionDomProps extends ActionProps {
    children?: any
}

const Action = (props: ActionDomProps) => {
    return props.children ? React.cloneElement(props.children, props, props.children.props.children) : null
}

export default Action