import React, { useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import Content from './js/content.js';
import Close from './js/close.js';
import Progress from './js/progress.js';
import './lightbox.scss';
// import Debug from './js/debug.js';

function Lightbox({ content, selected, setClose }) {
    const [intersecting, setIntersecting] = useState(null);
    const [show, setShow] = useState(null)
    const [immediate, setImmediate] = useState(null); //prevent translate animation on initial click

    const open = useSpring({
        transform: show ? 'translateY(0)' : 'translateY(100%)'
    })

    useEffect(() => {
        if (selected !== null) {
            setShow(true)
            setIntersecting(selected)
            setTimeout(() => {
                setImmediate(true)
            }, 275);
        }
    }, [selected])

    const closeLightbox = () => {
        setShow(null)
        setClose(null)
        setImmediate(null)
    }

    return (
        <a.div className="lightbox" style={open}>

            <Content
                prop={{ selected, intersecting, immediate }}
                content={content}
                setIntersecting={setIntersecting}
            />

            <Progress
                content={content}
                prop={{ intersecting }}
            />

            <Close closeLightbox={closeLightbox} />

            {/* <Debug prop={{intersecting}}/> */}

        </a.div>
    )
}

export default Lightbox;