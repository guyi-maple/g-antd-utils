import {Form, FormItemProps, FormProps} from "antd";
import React from "react";

export const GForm = (props: FormProps) => {
    return <Form {...props}>{React.Children.map(props.children, child => React.isValidElement(child) ? React.cloneElement(child, props) : child)}</Form>
}

export const GFormItem = (props: FormItemProps) => {
    return <Form.Item>{React.Children.map(props.children, child => React.isValidElement(child) ? React.cloneElement(child, props) : child)}</Form.Item>
}