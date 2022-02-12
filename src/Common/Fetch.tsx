import Container from "../Container";
import Bind from "../Container/Bind";
import {response} from "./response";
import request from 'umi-request';

export type FetchMethod = "GET" | "POST"

export interface FetchProps {
    url: string
    name?: string
    query?: any
    queryName?: string
    responseName?: string
    loadingName?: string
    method?: FetchMethod
    component: string
}

const Fetch = (props: FetchProps) => {

    const fetch = (ctx: any, setContext: (ctx: any) => void) => new Promise(resolve => {
        response({
            request: request(props.url, {
                method: props.method || 'GET',
                data: {...(props.query || {}), ...(props.queryName ? (ctx[props.queryName] || {}) : {})}
            }),
            onLoadingChange: loading => {
                const data = {};
                // @ts-ignore
                data[props.loadingName || 'loading'] = loading
                setContext(data)
            }
        }).then(resp => {
            const data = {}
            // @ts-ignore
            data[props.responseName || 'response'] = resp
            resolve(data)
        })
    })

    return <Container {...props}>
        <Bind
            component={props.component}
            name={props.name || 'fetch'}
            executor={fetch}
        />
    </Container>
}

export default Fetch