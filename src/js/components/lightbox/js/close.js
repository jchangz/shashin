import React from 'react';

function Close({ closeLightbox }) {

    return (
        <div className="lightbox-close" onClick={closeLightbox} />
    )
}

export default Close