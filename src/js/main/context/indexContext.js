import React, { createContext, useReducer } from "react";

export const IndexContext = createContext({});

const indexReducer = (state, action) => {
    switch (action.type) {
        case 'setIndex': {
            return { index: action.index }
        }
        case 'clearIndex':
            return { index: null }
        default:
            throw new Error();
    }
};

export const IndexProvider = (props) => {
    const initialState = { index: null }
    const [stateIndex, dispatchIndex] = useReducer(indexReducer, initialState);

    const indexContextProps = {
        stateIndex,
        dispatchIndex
    };

    return (
        <IndexContext.Provider value={indexContextProps}>
            {props.children}
        </IndexContext.Provider>
    );
};
