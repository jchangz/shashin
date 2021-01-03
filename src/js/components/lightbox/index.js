import React from 'react';
import Content from './js/content.js';
import Progress from './js/progress.js';
import './lightbox.scss';

function Lightbox({ content }) {
    return (
        <div className="lightbox" >
            <Content content={content} />
            <Progress content={content} />
        </div>
    )
}

export default Lightbox;