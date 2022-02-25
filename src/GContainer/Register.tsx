import {Component, useContainerDispatch} from "./index";
import {useEffect} from "react";
import {registerComponent} from "./dispatch";

export interface RegisterProps {
    name: string
    action: string
    before?: string
    after?: string
    order?: number
    executor: (ctx: any, dispatch: any) => Promise<any>
}

const Register = (props: RegisterProps) => {

    const dispatch = useContainerDispatch()

    useEffect(() => {
        registerComponent(dispatch, {...props, order: props.order || 0} as Component)
    }, [])

    return <></>
}

export default Register