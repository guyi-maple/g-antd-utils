import {RangeTime} from "./Form/Time";

export interface TestInputProps {
    onChange?: (value: any) => void
}

const TestInput = (props: TestInputProps) => {

    return <RangeTime onChange={time => {
        if (props.onChange) {
            props.onChange(time)
        }
    }} />
}

export default TestInput