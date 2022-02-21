import {Button, ButtonProps} from "antd";
import {useContainerContext, useContainerDispatch} from "./index";

export interface ActionButtonProps extends ButtonProps {
    action: string
}

const ActionButton = (props: ActionButtonProps) => {

    const context = useContainerContext()
    const dispatch = useContainerDispatch()

    const onClick = () => {
        context.action(props.action, context, dispatch)
    }

    return <Button {...props} onClick={onClick} />
}

export default ActionButton