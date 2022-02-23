import GContainer, {useContainerContext, useContainerDispatch} from "./GContainer";
import Fetch from "./Common/Fetch";
import ActionButton from "./GContainer/ActionButton";
import GTable from "./GTable";
import GPagination from "./GTable/GPagination";
import Register from "./GContainer/Register";

const TTT = () => {

    const state = useContainerContext()

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
        <ActionButton loading={state.loading} action="fetch">212121</ActionButton>
        <GTable
            columns={[
                {dataIndex: 'id', title: 'ID'},
                {dataIndex: 'name', title: '姓名'},
                {dataIndex: 'age', title: '年龄'}
            ]}
            loading={ctx => ctx.loading === true}
            datasource={ctx => ctx.datasource?.list}
        >
            <GPagination
                action="fetch"
                total={state.datasource?.total}
                onChange={(page, size) => ({page, size})}
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