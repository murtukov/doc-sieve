import React, { useContext } from 'react';
import { createUseStyles } from "react-jss";
import {Button, Icon} from "@blueprintjs/core";
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
            <Icon
                className={c.icon}
                icon='full-circle'
                color={data.data.bgColor}
            />
            <div className={c.quote}>{data.quote}</div>
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