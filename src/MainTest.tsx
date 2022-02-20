import GContainer, {useContainerContext, useContainerDispatch} from "./GContainer";
import {Button} from "antd";
import Action from "./GContainer/Action";

const ActionButton = (props: {action?: (bind: string) => void}) => {
    // @ts-ignore
    return <Button onClick={() => props.action('test')}>action</Button>
}

const TTT = () => {
    const state = useContainerContext()
    const dispatch = useContainerDispatch()
    return <div>
        <div>{state.text}</div>
        <Button onClick={() => dispatch({type: 'register', payload: {name: 'test', executor: () => console.info(11111)}})}>11111</Button>
        <Button onClick={() => dispatch({type: 'test'})}>22222</Button>
        <Action>
            <ActionButton />
        </Action>
    </div>
}

const MainTest = () => {

    return <GContainer>
        <TTT />
    </GContainer>
}

export default MainTest;