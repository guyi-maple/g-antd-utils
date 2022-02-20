import {useContainerDispatch} from "./index";
import {useEffect} from "react";

export interface RegisterProps {
    name: string
    action: string
    before?: string
    after?: string
    order?: number
    executor: (ctx: any) => Promise<any>
}

const Register = (props: RegisterProps) => {

    const dispatch = useContainerDispatch()

    useEffect(() => {
        dispatch({
            type: 'register',
            payload: {
                ...props,
                order: props.order || 0
            }
        })
    }, [])

    return <></>
}

export default Register