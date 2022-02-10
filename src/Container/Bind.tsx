import {BindProps} from "./types";
import {useEffect} from "react";

const Bind = (props: BindProps) => {

    useEffect(() => {
        if (props.register) {
            props.register({
                after: props.after,
                before: props.before,
                name: props.name,
                order: props.order || 0,
                component: props.component,
                executor: props.executor
            }, 'binding')
        }
    }, [props])
    return <></>
}

export default Bind