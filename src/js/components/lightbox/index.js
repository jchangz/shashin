import React, { useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import Content from './js/content.js';
import Close from './js/close.js';
import Progress from './js/progress.js';
import './lightbox.scss';
// import Debug from './js/debug.js';

function Lightbox({ content, selectedImage, setSelectedImage, setOpenLightBox }) {

    const [intersecting, setIntersecting] = useState(null)
    const [show, setShow] = useState(null)
    const [immediate, setImmediate] = useState(null) //prevent translate animation on initial click

    const open = useSpring({
        transform: show ? 'translateY(0)' : 'translateY(100%)'
    })

    useEffect(() => {
        if (selectedImage !== null) {
            setShow(true)
            setIntersecting(selectedImage)
            setTimeout(() => {
                setImmediate(true)
            }, 275);
        }
    }, [selectedImage])

    const closeLightbox = () => {
        setShow(null)
        setSelectedImage(null)
        setImmediate(null)
        setOpenLightBox(null)
    }

    return (
        <a.div className="lightbox" style={open}>
            <Content
                prop={{ selectedImage, intersecting, immediate }}
                content={content}
                setIntersecting={setIntersecting} />
            <Progress
                content={content}
                prop={{ intersecting }} />
            <Close
                closeLightbox={closeLightbox} />
            {/* <Debug prop={{intersecting}}/> */}
        </a.div>
    )
}

export default Lightbox;