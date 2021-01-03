import React, { createContext, useReducer } from "react";

export const LoadingContext = createContext({});

const loadingReducer = (state, action) => {
    switch (action.type) {
        case 'finishLoad':
            return { loaded: true };
        case 'reset':
            return { loaded: false };
        default:
            throw new Error();
    }
};

export const LoadingProvider = (props) => {
    const initialState = { loaded: false };
    const [stateLoading, dispatchLoading] = useReducer(loadingReducer, initialState);

    const loadingContextProps = {
        stateLoading,
        dispatchLoading
    };

    return (
        <LoadingContext.Provider value={loadingContextProps}>
            {props.children}
        </LoadingContext.Provider>
    );
};
