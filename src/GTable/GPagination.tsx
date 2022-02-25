import {CSSProperties} from "react";
import {Pagination} from "antd";

export type PageLocation = 'left' | 'right' | 'center'

export interface GPaginationProps {
    location?: PageLocation
    style?: CSSProperties
    pageSize?: number
    total?: number
    current?: number
    onChange?: (current: number, size: number) => void
}

const GPagination = (props: GPaginationProps) => {

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
                current={props.current || 1}
                pageSize={props.pageSize || 10}
                onChange={props.onChange}
            />
        </div> : null
}

export default GPagination