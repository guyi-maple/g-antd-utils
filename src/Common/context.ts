import {ContainerOptionProps} from "../Container/types";

export const getContextField = (props: ContainerOptionProps, key: string) => props.g?.context[key]