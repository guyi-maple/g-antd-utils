import {Spin} from "antd";
import GContainer from "../GContainer";
import {ColumnType} from "antd/es/table";
import React from "react";
import TableContainer from "./TableContainer";

export interface GTableProps {
    columns: ColumnType<any>[]
    children?: any
    datasource?: any[]
    loading?: boolean
}

const GTable = (props: GTableProps) => {

    return <Spin spinning={props.loading === true}>
        <GContainer defaultCustomer={{columns: props.columns}}>
            <TableContainer datasource={props.datasource} />
            {props.children}
        </GContainer>
    </Spin>
}

export default GTable