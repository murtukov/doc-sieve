import React from 'react';
import {Button} from "@blueprintjs/core";
import styles from './styles';
import {useDispatch} from "react-redux";

function LeftBar() {
    const c = styles();
    const dispatch = useDispatch();

    function handleAddNewTagClick() {
        const selection = document.getSelection();

        if (selection.isCollapsed) {
            return;
        }

        // dispatch.app.createTag(selection);
    }

    return (
        <div className={c.root}>
            <Button icon='new-text-box' minimal onClick={handleAddNewTagClick}/>
            <Button icon='floppy-disk' minimal/>
            <Button icon='edit' minimal/>
            <Button icon='text-highlight' minimal/>
        </div>
    );
}

export default LeftBar;