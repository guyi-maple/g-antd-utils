export interface ContainerProps {
    children?: any
}

export interface ContainerComponent {
    name: string
}
export interface ContainerBinding {
    after?: string
    before?: string
    order?: number
    component: string
    name: string
    executor: (context: any) => any
}

export type RegisterType = 'component' | 'binding'

export interface RegisterProps {
    register?: (value: ContainerComponent | ContainerBinding, type: RegisterType) => void
}

export interface ComponentProps extends RegisterProps {
    name: string
    children?: any
}

export interface BindProps extends ContainerBinding, RegisterProps {

}

export interface ActionProps {
    action?: (component: string) => void
}