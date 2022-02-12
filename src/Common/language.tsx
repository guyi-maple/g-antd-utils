import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from "antd";

export const Chinese = (props: {children: any}) => {
    return <ConfigProvider locale={zhCN}>
        {props.children}
    </ConfigProvider>
}