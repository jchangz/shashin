import React from 'react';

function Loader({ prop }) {
    return (
        <div>
            {prop.loading ?
                <div className="svg-wrapper" >
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <rect className={"shape " + (prop.initial === true ? '' : 'loaded')} height="100%" width="100%" />
                    </svg>
                </div>
                : null
            }
        </div>
    )
}

export default Loader