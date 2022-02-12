import {Table} from "antd";
import {ContainerOptionProps} from "../Container/types";
import Component from "../Container/Component";
import Container from "../Container";
import React from "react";
import {getContextField} from "../Common/context";

export interface GTableProps extends ContainerOptionProps {
    children?: any
    datasource: string
}

const GTable = (props: GTableProps) => {
    return <Container {...props}>
        <Component name="fetch" />
        <Table
            pagination={false}
            dataSource={getContextField(props, props.datasource)}
            columns={[{dataIndex: 'id', title: 'ID'}]}
        />
        {props.children || null}
    </Container>
}

export default GTable