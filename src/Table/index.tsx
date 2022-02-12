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
}

const GTable = (props: GTableProps) => {

    const page = props.g?.context[props.page || 'page'] as TablePagination || {current: 1, size: 10}

    return <Container {...props}>
        <Component name="fetch" />
        <Table
            pagination={false}
            loading={props.g?.context.loading}
            dataSource={getContextField(props, props.datasource || 'datasource')}
            columns={[{dataIndex: 'id', title: 'ID'}]}
        />
        <div style={{paddingTop: 16, textAlign: 'right'}}>
            <Pagination
                current={page.current}
                pageSize={page.size}
                total={page.size}
            />
        </div>
        {props.children || null}
    </Container>
}

export default GTable