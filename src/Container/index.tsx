import {ContainerBinding, ContainerComponent, ContainerProps, RegisterType} from "./types";
import React, {useState} from "react";

const Container = (props: ContainerProps) => {

    const components = [] as ContainerComponent[]
    const bindings = [] as ContainerBinding[]

    const [context, setContext] = useState({})

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
        const temp = {...context}
        Object.keys(ctx).forEach(key => {
            // @ts-ignore
            temp[key] = ctx[key]
        })
        setContext(temp)
    }

    const run = async (ctx: any, binding: ContainerBinding, before: any, after: any) => {
        let temp = {...ctx}
        if (before[binding.name]) {
            const bs = before[binding.name]
            for (let i = 0; i < bs.length; i++) {
                const result = await run(temp, bs[i], before, after)
                temp = {...temp, ...result}
            }
        }


        temp = {...temp, ...(await binding.executor(temp, uploadContext) || {})}

        if (after[binding.name]) {
            const as = after[binding.name]
            for (let i = 0; i < as.length; i++) {
                const result = await run(temp, as[i], before, after)
                temp = {...temp, ...result}
            }
        }

        return temp
    }

    const action = async (componentNames: string[]) => {
        let ctx = {...context}
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
                ctx = {...ctx, ...result}
            }
        }
        setContext(ctx)
    }

    return React.Children.map(props.children, child => React.cloneElement(child, {
        g: {
            register: props.g?.register || register,
            action: props.g?.action || action,
            context: props.g?.context || context
        }
    }, child.props.children))
}

export default Container