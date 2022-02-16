import {DatePicker} from 'antd';
import {ContainerOptionProps} from "../Container/types";
import React from "react";
import {Moment} from "moment";

export interface TimeProps extends ContainerOptionProps  {
    field?: string
    format?: string
    style?: React.CSSProperties
    onChange?: (values: Moment[]) => void
}

export const RangeTime = (props: TimeProps) => {

    const onChange = (time: Moment[]) => {
        const ctx = {} as any
        ctx[props.field || 'time'] = time
        props.g?.uploadContext(ctx)
        if (props.onChange) {
            props.onChange(time)
        }
    }

    return <DatePicker.RangePicker
        format={props.format}
        style={props.style}
        value={props.g?.context[props.format || 'time']}
        onChange={value => onChange(value as Moment[])}
    />
}