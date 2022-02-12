import React, {ReactElement} from "react";

export const cloneElement = (element: React.ReactElement, props: any) => React.cloneElement(
    element,
    props,
    element.props?.children
)

export const cloneElementChildren = (children: ReactElement[], props: any) =>
    React.Children.map(children, child => cloneElement(child, props))