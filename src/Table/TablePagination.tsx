import Container from "../Container";
import {Pagination, Spin} from "antd";
import React from "react";
import {ContainerOptionProps} from "../Container/types";

export interface TablePaginationProps extends ContainerOptionProps {
    field?: string
    page?: number
    size?: number
    pageSizeOption?: string[] | number[]
    onChange: (page: number, size: number, action?: (cs: string[], page?: any) => Promise<void>) => void
}

const TablePagination = (props: TablePaginationProps) => {

    return <Container>
        <div style={{paddingTop: 16, textAlign: 'right'}}>
            <Pagination
                current={props.g?.context.page?.current || 1}
                pageSize={props.g?.context.page?.size || 10}
                total={props.g?.context.page?.total}
                pageSizeOptions={props.pageSizeOption}
                onChange={(page, size) => props.onChange(page, size, props.g?.action)}
            />
        </div>
    </Container>
}

export default TablePagination