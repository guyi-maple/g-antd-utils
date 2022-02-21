import GContainer, {useContainerContext} from "./GContainer";
import Fetch from "./Common/Fetch";
import ActionButton from "./GContainer/ActionButton";
import {Spin} from "antd";
import Register from "./GContainer/Register";

const TTT = () => {
    const state = useContainerContext()
    return <Spin spinning={state.loading === true}>
        <div>{JSON.stringify(state)}</div>
        <Fetch url="https://18f14bb2-a92c-433c-9be9-cef43abf9066.mock.pstmn.io/table/page" onFetch={ctx => ctx.query} />
        <Register name="query" action="fetch" before="fetch" executor={async () => ({query: {page: 1, size: 10}})} />
        <Register name="over" action="fetch" executor={async () => ({query: undefined})} />
        <ActionButton action="fetch">212121</ActionButton>
    </Spin>
}

const MainTest = () => {

    return <GContainer>
        <TTT />
    </GContainer>
}

export default MainTest;