export interface ContainerComponent {
    name: string
}
export interface ContainerBinding {
    after?: string
    before?: string
    order?: number
    component: string
    name: string
    executor: (context: any, setContext: (ctx: any) => void) => Promise<any>
}

export interface ActionFunction {
    (componentNames: string[]): Promise<any>
}

export interface RegisterFunction {
    (value: ContainerComponent | ContainerBinding, type: RegisterType): void
}

export interface ContainerOptionProps {
    g?: {
        context: any
        action: ActionFunction
        register: RegisterFunction
    }
}


export interface ContainerProps extends ContainerOptionProps{
    children: any
}

export type RegisterType = 'component' | 'binding'

export interface ComponentProps extends ContainerOptionProps {
    name: string
    children?: any
}

export interface BindProps extends ContainerBinding, ContainerOptionProps {

}