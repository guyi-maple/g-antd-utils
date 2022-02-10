import {ActionProps} from "./types";
import {Button, ButtonProps} from "antd";

export interface ActionsButtonProps extends ActionProps,ButtonProps {
    component: string
    text?: string
}

const ActionButton = (props: ActionsButtonProps) => {

    const p = {...props}
    p.action = undefined

    const onClick = () => {
      if (props.action) {
          props.action(props.component)
      }
    }

    return <Button {...p} onClick={onClick}>{props.text}</Button>
}

export default ActionButton