import { DatePicker } from 'antd';
import {ContainerOptionProps} from "../Container/types";
import React from "react";

export interface TimeProps extends ContainerOptionProps  {
    start: string
    end: string
    field?: string
    format?: string
    style?: React.CSSProperties
}

export const RangeTime = (props: TimeProps) => {

    const onChange = (time: any) => {
        const ctx = {} as any
        ctx[props.field || 'time'] = time
        props.g?.uploadContext(ctx)
    }

    return <DatePicker.RangePicker
        format={props.format}
        style={props.style}
        value={props.g?.context.time}
        onChange={onChange}
    />
}