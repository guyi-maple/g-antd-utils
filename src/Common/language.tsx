import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from "antd";
import moment from "moment/moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn')

export const Chinese = (props: {children: any}) => {
    return <ConfigProvider locale={zhCN}>
        {props.children}
    </ConfigProvider>
}