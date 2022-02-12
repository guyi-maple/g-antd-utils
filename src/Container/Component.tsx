import {ComponentProps} from "./types";
import {useEffect} from "react";

const Component = (props: ComponentProps) => {

    useEffect(() => {
        if (props.g?.register) {
            props.g?.register({
                name: props.name
            }, 'component')
        }
    },[props])

    return props.children || null
}

export default Component