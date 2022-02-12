import {Table} from "antd";
import {ContainerOptionProps} from "../Container/types";
import Component from "../Container/Component";
import Container from "../Container";
import Bind from "../Container/Bind";
import ActionButton from "../Container/ActionsButton";

export interface GTableProps extends ContainerOptionProps {
    children?: any
}

const GTable = (props: GTableProps) => {
    return <Container {...props}>
        <Component name="fetch" />
        <Table
            pagination={false}
            dataSource={props.g?.context.datasource}
            columns={[{dataIndex: 'id', title: 'ID'}]}
        />
        <Bind component="fetch" name="fetch" executor={ctx => ({datasource: [...(ctx.datasource || []),{id: `生成 - ${Math.random()}`}]})} />
        <ActionButton components={["test","fetch"]} text="测试" />
    </Container>
}

export default GTable