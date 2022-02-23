import {Table, Spin} from "antd";
import {useContainerContext} from "../GContainer";
import {ColumnType} from "antd/es/table";

export interface GTableProps {
    children?: any
    datasource: (ctx: any) => any[]
    columns: ColumnType<any>[]
    loading?: (ctx: any) => boolean
}

const GTable = (props: GTableProps) => {

    const state = useContainerContext()

    return <Spin spinning={props.loading && props.loading(state)}>
        <Table
            pagination={false}
            columns={props.columns}
            dataSource={props.datasource(state)}
        />
        {props.children}
    </Spin>
}

export default GTable