import GContainer, {useContainerContext, useContainerCustomerContext, useContainerDispatch} from "./GContainer";
import Fetch from "./Common/Fetch";
import ActionButton from "./GContainer/ActionButton";
import GTable from "./GTable";
import GPagination from "./GTable/GPagination";
import Register from "./GContainer/Register";
import GSearch from "./GTable/GSearch";
import {
    registerContextListener,
    updateContext,
    useContainerAction,
    useContainerComponentAwaiter,
} from "./Common";
import {Button} from "antd";
import {useEffect} from "react";

const TestModal = () => {

    // useContainerComponentAwaiter('test', ctx => console.info(ctx))

    return <div>
        <Register name="test" action="test" executor={async () => {}} />
        1111111
    </div>
}

const TTT = () => {

    const state = useContainerCustomerContext()
    const dispatch = useContainerDispatch()

    const action = useContainerAction()
    useContainerComponentAwaiter('fetch', () => action('fetch'))

    return <div>
        <div>{JSON.stringify(state)}</div>
        <Register name="converter-query" action="fetch" before="fetch" executor={async ctx => ({
            query: {
                ...(ctx.query || {}),
                page: ctx.page || 1,
                size: ctx.size || 10
            }
        })} />
        <Fetch
            name="fetch"
            action="fetch"
            onFetch={ctx => ctx.query}
            onLoading={loading => ({loading})}
            onFetchSuccess={resp => ({datasource: resp, query: undefined, loading: undefined})}
            url="https://18f14bb2-a92c-433c-9be9-cef43abf9066.mock.pstmn.io/table/page"
        />
        <Button loading={state.loading} onClick={() => action('fetch')}>212121</Button>
        <GTable
            columns={[
                {dataIndex: 'id', title: 'ID'},
                {dataIndex: 'name', title: '姓名'},
                {dataIndex: 'age', title: '年龄'}
            ]}
            loading={state.loading}
            datasource={state.datasource?.list}
        >
            <GPagination
                total={state.datasource?.total}
                current={state.page}
                onChange={(page, size) => action('fetch', {page, query: {page, size}})}
            />
            <GSearch
                for={['id', 'name']}
                onClear={fields => action('fetch', {query: {...(state.query || {}), ...Object.fromEntries(fields.map(field => [field, undefined]))}})}
                onSearch={query => action('fetch', {query: {...(state.query || {}), ...query}})}
            />
        </GTable>
    </div>
}

const MainTest = () => {

    return <GContainer>
        <TTT />
    </GContainer>
}

export default MainTest;