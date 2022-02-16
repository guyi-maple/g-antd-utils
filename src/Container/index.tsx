import {ContainerBinding, ContainerComponent, ContainerProps, RegisterType} from "./types";
import React, {Attributes, HTMLAttributes, useState} from "react";
import {Spin} from "antd";

const Container = (props: ContainerProps) => {

    const components = [] as ContainerComponent[]
    const bindings = [] as ContainerBinding[]

    const [context, setContext] = useState<any>({})

    const register = (value: any, type: RegisterType) => {
        if (type === 'component') {
            components.push(value as ContainerComponent)
            return
        }
        if (type === 'binding') {
            bindings.push(value as ContainerBinding)
            return
        }
    }

    const push = (map: any, type: string, binding: ContainerBinding) => {
        if (!map[type]) {
            map[type] = []
        }
        map[type].push(binding)
    }

    const uploadContext = (ctx: any) => {
        const temp = {...context} as any
        Object.keys(ctx).forEach(key => temp[key] = ctx[key])
        setContext(temp)
    }

    const run = async (ctx: any, binding: ContainerBinding, before: any, after: any) => {
        let temp = {...ctx}
        if (before[binding.name]) {
            const bs = before[binding.name]
            for (let i = 0; i < bs.length; i++) {
                const result = await run(temp, bs[i], before, after)
                if (result === false) {
                    return false
                }
                temp = {...temp, ...result}
            }
        }

        const result = await binding.executor(temp, uploadContext)
        if (result === false) {
            return false
        }
        temp = {...temp, ...(result || {})}

        if (after[binding.name]) {
            const as = after[binding.name]
            for (let i = 0; i < as.length; i++) {
                const result = await run(temp, as[i], before, after)
                if (result === false) {
                    return false
                }
                temp = {...temp, ...result}
            }
        }

        return temp
    }

    const action = async (componentNames: string[], data?: any) => {
        let ctx = {...context, ...(data || {})}
        for (let i = 0; i < componentNames.length; i++) {
            const componentName = componentNames[i]
            const binding = bindings.filter(binding => binding.component === componentName)

            const before = {}
            binding.filter(binding => binding.before !== undefined).forEach(binding => push(before, binding.before as string, binding))
            const after = {}
            binding.filter(binding => binding.after !== undefined).forEach(binding => push(after, binding.after as string, binding))

            const bs = bindings.filter(binding => !binding.after && !binding.before && binding.component === componentName)
                .sort((a,b) => {
                    const ao = a.order || 0
                    const bo = b.order || 0
                    return ao > bo ? 1 : ao === bo ? 0 : -1
                })

            for (let i = 0; i < bs.length; i++) {
                const result = await run(ctx, bs[i], before, after)
                if (result === false) {
                    return false
                }
                ctx = {...ctx, ...result}
            }
        }
        setContext(ctx)
    }

    // @ts-ignore
    const parse = (children: any) => {
        if (!children) {
            return null
        }
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child
            }
            return React.cloneElement(child, {
                // @ts-ignore
                g: {
                    register: props.g?.register || register,
                    action: props.g?.action || action,
                    uploadContext: props.g?.uploadContext || uploadContext,
                    context: props.g?.context || context
                }
                // @ts-ignore
            }, parse(child.props.children))
        })
    }

   const children = parse(props.children)

    return props.loading ? <Spin spinning={context[props.loading] === true}>{children}</Spin> : children
}

export default Container