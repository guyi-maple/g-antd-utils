import React from "react";
import GContainer from "./GContainer";
import Register from "./GContainer/Register";
import ActionButton from "./GContainer/ActionButton";
import ContextProvider from "./GContainer/ContextProvider";

const Test1 = (props: any) => {

    return <div>{props.g?.context.text}</div>
}

const Test = () => {

    return <GContainer>
        <Register name="test1" action="test1" executor={ async () => ({text: `test1 - ${Math.random()}`})} />
        <Register name="test2" action="test2" executor={ async () => ({text: `test2 - ${Math.random()}`})} />
        <ActionButton action="test1">Test1</ActionButton>
        <ActionButton action="test2">Test2</ActionButton>
        <ContextProvider>
            <Test1 />
        </ContextProvider>
    </GContainer>
}

export default Test