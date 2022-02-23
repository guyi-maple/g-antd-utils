import {response} from "./response";
import qs from 'qs';
import request from 'umi-request';
import Register from "../GContainer/Register";
import {updateContext} from "./dispatch";

export type FetchMethod = "GET" | "POST"

export interface FetchProps {
    url: string
    name: string
    action: string
    onFetch?: (ctx: any) => any
    onLoading?: (loading: boolean) => any
    onFetchSuccess: (resp: any) => any
    method?: FetchMethod
}

const Fetch = (props: FetchProps) => {

    const fetch = async (ctx: any, dispatch: any) => {
        const method = props.method || 'GET'

        let data = props.onFetch ? (props.onFetch(ctx) || {}) : undefined
        let url = props.url
        if (method === 'GET') {
            url = `${url}?${qs.stringify(data)}`
            data = undefined
        }

        const resp = await response({
            request: request(url, {method, data}),
            onLoadingChange: loading => updateContext(dispatch, props.onLoading ? props.onLoading(loading) : undefined)
        })

        return props.onFetchSuccess(resp)
    }

    return <Register name={props.name} action={props.action} executor={fetch} />

}

export default Fetch