import {createContext, useContext, useReducer} from "react";

export interface Component {
    name: string
    executor: (ctx: any) => Promise<any>
}

export interface DispatchProps {
    type: string
    payload: any
}

const StateContext = createContext<any>(null)
const DispatchContext = createContext<any>(null)

export const useContainerContext = () => useContext(StateContext)
export const useContainerDispatch = () => useContext(DispatchContext)

const GContainer = ({children}: any) => {

    const components = [] as Component[]

    const actions = {
        register: (component: Component) => components.push(component),
        action: ({name, dispatch}:{name: string, dispatch: (ctx: DispatchProps) => any}) => {
            console.info(name)
            dispatch({type: 'update', payload: {text: Math.random()}})
        },
        test: () => console.info(components)
    } as any

    const reducer = (context: any, dispatch: DispatchProps) => {
        const action = actions[dispatch.type]
        if (action) {
            action(dispatch.payload)
        }
        if (dispatch.type === 'update') {
            return {...context, ...dispatch.payload}
        }
        return context
    }

    const [state, dispatch] = useReducer(reducer, {})

    return <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
}

export default GContainer