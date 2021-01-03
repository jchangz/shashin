import React, { createContext, useReducer } from "react";

export const ScrollerContext = createContext({});

const scrollerReducer = (state, action) => {
    switch (action.type) {
        case 'setRoute':
            return {
                ...state,
                route: action.route
            }
        case 'setIntersecting':
            return {
                ...state,
                intersecting: action.intersecting,
                title: action.title
            }
        case 'setImages':
            return {
                ...state,
                images: action.images
            }
        default:
            throw new Error();
    }
};

export const ScrollerProvider = (props) => {
    const initialState = { route: null, content: null, images: null, title: null, intersecting: null };
    const [stateScroller, dispatchScroller] = useReducer(scrollerReducer, initialState);

    const scrollerContextProps = {
        stateScroller,
        dispatchScroller
    };

    return (
        <ScrollerContext.Provider value={scrollerContextProps}>
            {props.children}
        </ScrollerContext.Provider>
    );
};
