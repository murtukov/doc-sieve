import React, { useContext } from 'react';
import { createUseStyles } from "react-jss";
import {Button, Icon} from "@blueprintjs/core";
import { WorkspaceContext } from "../../../Workspace";
import { useDispatch } from "react-redux";
import chroma from 'chroma-js';

function AnnotationRow({annotation}) {
    const c = useStyles();
    const {highlighter} = useContext(WorkspaceContext);
    const dispatch = useDispatch();

    function removeAnnotation() {
        highlighter.current.undraw(annotation);
        dispatch.app.removeAnnotation(annotation);
    }

    function handleMouseEnter() {
        const elements = getAnnotatedElements(annotation.id);

        for (let el of elements) {
            highlightElement(el);
        }
    }

    function handleMouseLeave() {
        const elements = getAnnotatedElements(annotation.id);
        for (let el of elements) {
            unhighlightElement(el);
        }
    }

    function getAnnotatedElements(id) {
        return document.querySelectorAll(`[data-annotation-id="${id}"]`);
    }

    function highlightElement(element) {
        const color = chroma(element.style.backgroundColor);
        element.style.backgroundColor = color.alpha(1).css();
    }

    function unhighlightElement(element) {
        const color = chroma(element.style.backgroundColor);
        element.style.backgroundColor = color.alpha(0.5).css();
    }

    return (
        <div className={c.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        alignItems: "center"
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