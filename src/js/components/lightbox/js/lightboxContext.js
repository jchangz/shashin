import React, { createContext, useReducer } from "react";

export const LightboxContext = createContext({});

const lightboxReducer = (state, action) => {
    switch (action.type) {
        case 'selectedImage':
            return {
                ...state,
                selected: action.selected
            }
        case 'setIntersecting':
            return {
                ...state,
                intersecting: action.intersecting
            }
        case 'closeLightbox':
            return {
                ...state,
                selected: null,
                intersecting: null
            }
        default:
            throw new Error();
    }
};

export const LightboxProvider = (props) => {
    const initialState = { selected: null, intersecting: null };
    const [stateLightbox, dispatchLightbox] = useReducer(lightboxReducer, initialState);

    const lightboxContextProps = {
        stateLightbox,
        dispatchLightbox
    };

    return (
        <LightboxContext.Provider value={lightboxContextProps}>
            {props.children}
        </LightboxContext.Provider>
    );
};
