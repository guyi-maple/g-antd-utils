import {response} from "./response";
import qs from 'qs';
import request from 'umi-request';
import Register from "../GContainer/Register";

export type FetchMethod = "GET" | "POST"

export interface FetchProps {
    url: string
    name?: string
    onFetch?: (ctx: any) => any
    responseName?: string
    loadingName?: string
    method?: FetchMethod
}

const Fetch = (props: FetchProps) => {

    const fetch = async (ctx: any, dispatch: any) => {
        const method = props.method || 'GET'

        let data = props.onFetch ? props.onFetch(ctx) : undefined
        let url = props.url
        if (method === 'GET') {
            url = `${url}?${qs.stringify(data)}`
            data = undefined
        }

        const resp = await response({
            request: request(url, {method, data}),
            onLoadingChange: loading => {
                const data = {} as any;
                data[props.loadingName || 'loading'] = loading
                dispatch({
                    type: 'update',
                    payload: data
                })
            }
        })
        const result = {} as any
        result[props.responseName || 'response'] = resp
        return result
    }

    return <Register name={props.name || 'fetch'} action={props.name || 'fetch'} executor={fetch} />

}

export default Fetch