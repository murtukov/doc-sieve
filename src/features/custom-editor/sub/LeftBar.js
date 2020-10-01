import React, {useState} from 'react';
import {Button, Position, Tooltip} from "@blueprintjs/core";
import styles from '../styles';

function LeftBar() {
    const c = styles();
    const [state, updateState] = useState({
        isTextSelected: false
    });

    function addTagToSelectedText() {
        const selection = document.getSelection();

        if (selection.isCollapsed) return;

        const range = selection.getRangeAt(0);
    }

    return (
        <div className={c.root}>
            {/*<Tooltip content='Add tag to selected text' position={Position.RIGHT}>*/}
                <Button icon='highlight' minimal disabled={!state.isTextSelected}/>
            {/*</Tooltip>*/}
            <Button icon='floppy-disk' minimal/>
            <Button icon='edit' minimal/>
            <Button icon='new-text-box' minimal/>
        </div>
    );
}

export default LeftBar;