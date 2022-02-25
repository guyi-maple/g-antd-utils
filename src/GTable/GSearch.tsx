import {ColumnType} from "antd/es/table";
import {ReactElement, useEffect} from "react";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useContainerCustomerContext} from "../GContainer";
import {useContainerContextUpdater} from "../GContainer/dispatch";

export interface RenderPanel {
    (field: string, search: (query: any) => void, clear: (fields: string[]) => void): ReactElement
}

export interface GSearchProps {
    for: string[]
    onSearch: (query: any) => void
    onClear: (fields: string[]) => void
    panel?: RenderPanel
    icon?:  (filtered: boolean) => ReactElement
}

const GSearch = (props: GSearchProps) => {

    const customer = useContainerCustomerContext()
    const updater = useContainerContextUpdater()

    useEffect(() => {
        updater.customer({
            ...customer,
            columns: customer.columns.map((column: ColumnType<any>) => {
                if (props.for.includes(column.dataIndex as string)) {
                    column.title = `${column.title} - 1`
                }
                return column
            })
        })
    }, [])

    return <></>
}

GSearch.Columns = (element: ReactElement<GSearchProps>, columns: ColumnType<any>[]) => {

    const defaultPanel = (field: string, search: (query: any) => void, clear: (fields: string[]) => void, confirm: any) => <Input.Search
        allowClear={true}
        onSearch={value => {
            if (!value || value === '') {
                clear([field])
            } else {
                search(Object.fromEntries([[field, value]]))
            }
        }}
    />

    const search = (query: any) => element.props.onSearch(query)
    const clear = (fields: string[]) => element.props.onClear(fields)

    return columns.map(column => {
        if (element.props.for.includes(column.dataIndex as string)) {
            column.filterDropdown = ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                console.info(setSelectedKeys, selectedKeys, confirm, clearFilters)
                return element.props.panel ?
                    element.props.panel(column.dataIndex as string, search, clear) :
                    defaultPanel(column.dataIndex as string, search, clear, confirm)
            }
        }
        if (element.props.icon) {
            column.filterIcon = element.props.icon
        } else {
            column.filterIcon = filtered => {
                console.info('filtered', filtered)
                return <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            }
        }
        return column
    })
}

export default GSearch