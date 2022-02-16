import {Button, Form} from "antd";
import {RangeTime} from "./Form/Time";
import ActionButton from "./Container/ActionsButton";
import GTable from "./Table";
import Fetch from "./Common/Fetch";
import Bind from "./Container/Bind";
import TablePagination from "./Table/TablePagination";
import Container from "./Container";
import React from "react";
import TestInput from "./TestInput";

const Test = () => {

    const [form] = Form.useForm()

    return <Container loading="loading">
        <Form form={form}>
            <Form.Item name="time" rules={[{required: true, message: '请选择时间'}]}>
                <TestInput />
            </Form.Item>
            <ActionButton components={["fetch"]} text="测试" />
            <Button>武功</Button>
        </Form>
        <Bind component="fetch" name="check" before="fetch-list" executor={() => new Promise(resolve => {
            form.validateFields().then(resolve).catch(() => resolve(false))
            // form.validateFields().then(() => resolve(true)).catch(() => resolve(false))
        })} />
        <GTable datasource="datasource">
            <Fetch
                url="https://18f14bb2-a92c-433c-9be9-cef43abf9066.mock.pstmn.io/table/page"
                name="fetch-list"
                component="fetch"
                onFetch={ctx => ({
                    page: ctx.page?.current || 1,
                    size: ctx.page?.size || 10,
                    startTime: ctx.time[0].format('yyyy-MM-DD HH:mm:ss'),
                    endTime: ctx.time[1].format('yyyy-MM-DD HH:mm:ss')
                })}
            />
            <Bind component="fetch" name="converter" after="fetch-list" executor={async ctx => ({
                datasource: ctx.response.list,
                page: {...ctx.page, total: ctx.response.total}
            })} />
            <TablePagination onChange={(page, size, action) => {
                if (action) {
                    action(['fetch'], {page: {current: page, page: page, size: size}}).then(() => {})
                }
            }} />
            {/*<Bind component="fetch" after="fetch-list" name="converter-list" executor={async ctx => ({datasource: ctx.response, response: undefined})} />*/}
        </GTable>
    </Container>
}

export default Test