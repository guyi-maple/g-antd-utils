import {CSSProperties} from "react";
import {Pagination} from "antd";
import {runAction, updateContext} from "../Common";
import {useContainerContext, useContainerDispatch} from "../GContainer";

export type PageLocation = 'left' | 'right' | 'center'

export interface GPaginationProps {
    location?: PageLocation
    style?: CSSProperties
    action?: string
    pageSize?: number
    total?: number
    current?: number
    fieldName?: string
    onChange?: (current: number, size: number) => any
}

const GPagination = (props: GPaginationProps) => {

    const context = useContainerContext()
    const dispatch = useContainerDispatch()

    const onChange = (current: number, size: number) => {
        const data = props.onChange ? props.onChange(current, size) : {page: current, size}
        const ctx = {...context, ...data}
        ctx[props.fieldName || 'pagination'] = {current}
        updateContext(dispatch, ctx)
        if (props.action) {
            runAction(ctx, dispatch, props.action)
        }
    }

    return props.total && props.total > 0 ?
        <div
            style={{
                paddingTop: 16,
                ...(props.style || {}),
                textAlign: props.location || 'right'
            }}
        >
            <Pagination
                total={props.total}
                current={props.current || context[props.fieldName || 'pagination']?.current || 1}
                pageSize={props.pageSize || 10}
                onChange={onChange}
            />
        </div> : null
}

export default GPagination