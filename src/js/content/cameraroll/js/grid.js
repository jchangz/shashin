import React, { useCallback } from 'react';
import { a } from 'react-spring';

function Grid({ content, index, trail, setOpenLightBox, imageLoaded, setSelectedImage }) {

    const openLightBox = useCallback(() => {
        setSelectedImage(index)
        setOpenLightBox(true)
    }, []);

    return (
        <div className="reflow">
            <img className="reflow-preview"
                src={content[index].url + "?w=50&blur=50"} alt="" />
            <a.img style={trail}
                onClick={openLightBox}
                onLoad={imageLoaded}
                src={content[index].url + "?w=200"} alt="" />
        </div>
    )
}

export default Grid