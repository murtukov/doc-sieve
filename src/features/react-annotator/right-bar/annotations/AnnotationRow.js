import React, { useContext } from 'react';
import { createUseStyles } from "react-jss";
import {Button, Icon} from "@blueprintjs/core";
import { WorkspaceContext } from "../../Workspace";
import { useDispatch } from "react-redux";
import chroma from 'chroma-js';

function AnnotationRow({annotation}) {
    const c = useStyles();
    const {highlighter} = useContext(WorkspaceContext);
    const dispatch = useDispatch();

    function removeAnnotation(event) {
        event.stopPropagation();
        highlighter.current.undraw(annotation);
        dispatch.app.removeAnnotation(annotation);
    }

    function handleMouseEnter() {
        const elements = getAnnotatedElements(annotation.id);

        for (let el of elements) {
            changeBgOpacity(el, 1);
            // make all children bgcolor opacity 0
            el.querySelectorAll('*').forEach(el => changeBgOpacity(el, 0))
        }
    }

    function handleMouseLeave() {
        const elements = getAnnotatedElements(annotation.id);
        for (let el of elements) {
            changeBgOpacity(el, 0.5);
            // make all children bgcolor opacity 0
            el.querySelectorAll('*').forEach(el => changeBgOpacity(el, 0.5))
        }
    }

    function getAnnotatedElements(id) {
        return document.querySelectorAll(`[data-annotation-id="${id}"]`);
    }

    function changeBgOpacity(element, opacity) {
        const color = chroma(element.style.backgroundColor);
        element.style.backgroundColor = color.alpha(opacity).css();
        // element.style.textShadow = '2px 2px 8px #FF0000';
    }

    function handleClick(event) {
        const elements = getAnnotatedElements(annotation.id);
        elements[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    }

    return (
        <div
            className={c.root}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClickCapture={handleClick}
        >
            <Icon
                className={c.icon}
                icon='full-circle'
                color={annotation.data.bgColor}
            />
            <div className={c.quote}>{annotation.quote}</div>
            <Button icon={"cross"} minimal onClick={removeAnnotation}/>
        </div>
    );
}

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: [0, 10],
        alignItems: "center",
        cursor: "pointer"
    },
    quote: {
        width: 245,
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    icon: {
        marginRight: 5
    }
});

export default AnnotationRow;