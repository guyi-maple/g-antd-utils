import {ContainerOptionProps} from "./types";
import {Button, ButtonProps} from "antd";

export interface ActionsButtonProps extends ContainerOptionProps,ButtonProps {
    components: string[]
    text?: string
}

const ActionButton = (props: ActionsButtonProps) => {

    const onClick = () => {
      if (props.g?.action) {
          props.g?.action(props.components)
      }
    }
    return <Button {...props} onClick={onClick}>{props.text}</Button>
}

export default ActionButton