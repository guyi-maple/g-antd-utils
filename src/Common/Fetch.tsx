import Container from "../Container";
import Bind from "../Container/Bind";
import {response} from "./response";
import qs from 'qs';
import request from 'umi-request';
import {useContainerDispatch} from "../GContainer";
import {useEffect} from "react";

export type FetchMethod = "GET" | "POST"

export interface FetchProps {
    url: string
    name?: string
    onFetch?: (ctx: any) => any
    responseName?: string
    loadingName?: string
    method?: FetchMethod
    component: string
}

const Fetch = (props: FetchProps) => {

    const dispatch = useContainerDispatch()

    const fetch = (ctx: any, setContext: (ctx: any) => void) => new Promise(resolve => {
        const method = props.method || 'GET'

        let data = props.onFetch ? props.onFetch(ctx) : undefined
        let url = props.url
        if (method === 'GET') {
            url = `${url}?${qs.stringify(data)}`
            data = undefined
        }

        response({
            request: request(url, {method, data}),
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

    useEffect(() => {
        dispatch({
            type: 'register'
        })
    }, [])

    return <></>

    return <Container {...props}>
        <Bind
            component={props.component}
            name={props.name || 'fetch'}
            executor={fetch}
        />
    </Container>
}

export default Fetch