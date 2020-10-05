import React from "react";

function StyledButton(props) {
    function onToggle(e) {
        e.preventDefault();
        props.onToggle(props.style);
    }

    let className = 'RichEditor-styleButton';
    if (props.active) {
        className += ' RichEditor-activeButton';
    }

    return (
        <span className={className} onClick={onToggle}>
          {props.label}
        </span>
    );
}

export default StyledButton;