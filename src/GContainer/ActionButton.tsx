import {Button, ButtonProps} from "antd";
import {useContainerDispatch} from "./index";

export interface ActionButtonProps extends ButtonProps {
    action: string
}

const ActionButton = (props: ActionButtonProps) => {

    const dispatch = useContainerDispatch()

    const onClick = () => {
        dispatch({
            type: 'action',
            payload: {
                action: props.action,
                dispatch
            }
        })
    }

    return <Button {...props} onClick={onClick} />
}

export default ActionButton