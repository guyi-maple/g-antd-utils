import {Pagination, Table} from "antd";
import {ContainerOptionProps} from "../Container/types";
import Component from "../Container/Component";
import Container from "../Container";
import React from "react";
import {getContextField} from "../Common/context";

export interface TablePagination {
    current: number
    size: number
    total?: number
}

export interface GTableProps extends ContainerOptionProps {
    children?: any
    datasource?: string
    page?: string
    loading?: string
}

const GTable = (props: GTableProps) => {

    const loading = (props.loading && props.g?.context[props.loading] === true) as boolean
    return <Container {...props}>
        <Component name="fetch" />
        <Table
            pagination={false}
            loading={loading}
            dataSource={getContextField(props, props.datasource || 'datasource')}
            columns={[{dataIndex: 'id', title: 'ID'}]}
        />
        {props.children || null}
    </Container>
}

export default GTable