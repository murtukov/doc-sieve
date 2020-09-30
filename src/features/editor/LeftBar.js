import React from 'react';
import {createUseStyles} from "react-jss";
import {Button} from "@blueprintjs/core";

function LeftBar() {
    const c = useStyles();

    return (
        <div className={c.root}>
            <Button icon='floppy-disk' minimal/>
            <Button icon='edit' minimal/>
            <Button icon='text-highlight' minimal/>
            <Button icon='new-text-box' minimal/>
        </div>
    );
}

const useStyles = createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 80,
        position: "fixed",
        left: 0,
        padding: 15,
        height: '100%',
        backgroundColor: "#f3f3fb",
        '& button': {
            height: 50
        }
    }
});

export default LeftBar;