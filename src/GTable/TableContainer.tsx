import {useContainerCustomerContext} from "../GContainer";
import {Table} from "antd";

export interface TableContainerProps {
    datasource?: any[]
}

const TableContainer = (props: TableContainerProps) => {

    const context = useContainerCustomerContext()

    return <Table
        pagination={false}
        columns={context.columns}
        dataSource={props.datasource}
    />
}

export default TableContainer