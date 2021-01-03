import React, { useState, useEffect, useRef, useContext } from 'react';
import { a, useSprings, useTransition } from 'react-spring';
import useImageLoaded from '../../../hooks/useImageLoaded.js';
import { OpenContext } from "../../../main/context/openContext.js";
import { ScrollerContext } from "../../../components/scroller/js/scrollerContext.js";
import { LightboxContext } from '../../../components/lightbox/js/lightboxContext.js';
import Lightbox from '../../../components/lightbox/index.js';

function Content() {
    const myInput = useRef()
    const imageTransform = useRef([])
    const { stateOpen, dispatchOpen } = useContext(OpenContext);
    const { stateScroller } = useContext(ScrollerContext);
    const { stateLightbox, dispatchLightbox } = useContext(LightboxContext);
    const content = stateScroller.images
    const { loading } = useImageLoaded(content, "?w=200")
    const [removePlaceholder, setRemovePlaceholder] = useState(null)

    useEffect(() => {
        if (loading === false) {
            setTimeout(() => {
                setRemovePlaceholder(true)
            }, 200);
        }
    }, [loading])

    const selectLightboxImage = (e) => {
        var viewTop = (myInput.current.offsetHeight / 2) - e.target.offsetTop - (e.target.offsetHeight / 2)
        var viewLeft = ((window.innerWidth / 2) - (e.target.offsetWidth / 2)) - e.target.offsetLeft
        var targetIndex = parseInt(e.target.dataset.number);
        imageTransform.current = [viewTop, viewLeft]
        dispatchOpen({
            type: 'openLightbox'
        })
        dispatchLightbox({
            type: 'selectedImage',
            selected: targetIndex
        })
    }

    const transitions = useTransition(stateOpen.lightbox, null, {
        from: { opacity: 0, transform: 'scale(2.5)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(1.5)' },
    })
    const springs = useSprings(content.length, content.map((item, i) => ({
        config: { mass: 1, tension: 400, friction: 30 },
        transform: stateLightbox.selected === null ? "translate(0px, 0px) scale(1)" :
            (i !== stateLightbox.selected) ? `translate(0px, 0px) scale(0.5)"}` :
                `translate(${imageTransform.current[1]}px, ${imageTransform.current[0]}px) scale(2.8)"}`,
        opacity: loading ? 0 : (stateLightbox.selected === null) ? 1 :
            (i !== stateLightbox.selected) ? 0 : 1
    })))

    return (
        <div className="cr-content">
            <h2 className="cr-content-title">Camera Roll {stateScroller.title}</h2>
            <div className="cr-content-main">
                <div className="cr-content-grid"
                    ref={myInput}>
                    {removePlaceholder ? null :
                        <div className="cr-content-grid-placeholder">
                            <div className="cr-content-grid">
                                {content.map((item, i) => (
                                    <div className="reflow" key={i}>
                                        <img className="reflow-preview"
                                            src={item.url + "?w=50&blur=50"} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {springs.map(({ opacity, transform }, i) => (
                        <a.div className="reflow"
                            data-number={i}
                            key={i}
                            style={{ opacity, transform }}
                            onClick={stateOpen.openLevel2 === false ? null : selectLightboxImage}>
                            <img src={content[i].url + "?w=200"} alt="" />
                        </a.div>
                    ))}
                </div>
                {transitions.map(({ item, key, props }) => item ?
                    <a.div className="cr-lightbox"
                        style={props}
                        key={key}>
                        <Lightbox content={content} />
                    </a.div> : null)}
            </div>
        </div>
    )
}

export default Content