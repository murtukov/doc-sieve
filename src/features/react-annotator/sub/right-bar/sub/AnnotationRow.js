import React, { useContext } from 'react';
import { createUseStyles } from "react-jss";
import { Icon } from "@blueprintjs/core";
import { WorkspaceContext } from "../../../Workspace";
import { useDispatch } from "react-redux";

function AnnotationRow({data}) {
    const c = useStyles();
    const {highlighter} = useContext(WorkspaceContext);
    const dispatch = useDispatch();

    function removeAnnotation() {
        highlighter.current.undraw(data);
        dispatch.app.removeAnnotation(data);
    }

    return (
        <div className={c.root}>
            <Icon icon='full-circle' color={data.data.bgColor}/>
            <div className={c.quote}>{data.quote}</div>span>
            <Icon icon='cross' onClick={removeAnnotation}/>
        </div>
    );
}

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: 10,
    },
    quote: {
        width: 200
    }
});

export default AnnotationRow;