import React, { createContext, useReducer } from "react";

export const OpenContext = createContext({});

const openReducer = (state, action) => {
    switch (action.type) {
        case 'setOpenLevel1':
            return {
                ...state,
                openLevel1: true
            }
        case 'closeOpenLevel1':
            return {
                ...state,
                openLevel1: false
            }
        case 'openLevel2':
            return {
                ...state,
                openLevel2: true
            }
        case 'closeLevel2':
            return {
                ...state,
                openLevel2: false
            }
        case 'openLightbox':
            return {
                ...state,
                lightbox: true
            }
        case 'closeLightbox':
            return {
                ...state,
                lightbox: false
            }
        default:
            throw new Error();
    }
};

export const OpenProvider = (props) => {
    const initialState = { openLevel1: false, openLevel2: false, lightbox: false }
    const [stateOpen, dispatchOpen] = useReducer(openReducer, initialState);

    const openContextProps = {
        stateOpen,
        dispatchOpen
    };

    return (
        <OpenContext.Provider value={openContextProps}>
            {props.children}
        </OpenContext.Provider>
    );
};
