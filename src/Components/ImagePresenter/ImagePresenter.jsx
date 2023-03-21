import React from 'react';

const ImagePresenter = ({image, altText}) => {
    return (
        <img 
            style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
            src={image} alt={altText}/>
    )
}

export default ImagePresenter;