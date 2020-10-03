import React from 'react';

function EntityRow({data}) {
    const {bgColor, textColor, name, description} = data;

    return (
        <span>
            <span>{bgColor}</span>
            <span>{textColor}</span>
            <span>{name}</span>
            <span>{description}</span>
        </span>
    );
}

export default EntityRow;