import {Button, ButtonProps} from "antd";
import {useContainerContext, useContainerDispatch} from "./index";
import {runAction} from "../Common";

export interface ActionButtonProps extends ButtonProps {
    action: string
}

const ActionButton = (props: ActionButtonProps) => {

    const context = useContainerContext()
    const dispatch = useContainerDispatch()

    const onClick = () => {
        runAction(context, dispatch, props.action)
    }

    return <Button {...props} onClick={onClick} />
}

export default ActionButton