import {Button, ButtonProps} from "antd";
import {useContainerAction} from "./dispatch";

export interface ActionButtonProps extends ButtonProps {
    action: string
}

const ActionButton = (props: ActionButtonProps) => {

    const action = useContainerAction()

    const onClick = () => {
        action(props.action)
    }

    return <Button {...props} onClick={onClick} />
}

export default ActionButton