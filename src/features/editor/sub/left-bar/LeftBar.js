import React, {useContext} from 'react';
import {Button} from "@blueprintjs/core";
import styles from './styles';
import {useSelector} from "react-redux";
import {EditorContext} from "../../Editor";

function LeftBar() {
    const c = styles();
    const selectedConcept = useSelector(s => s.app.selectedConcept);
    const {editorState, createAnnotation} = useContext(EditorContext);

    function handleSaveClick() {
        console.log("==> Editor state: ", editorState);
    }

    return (
        <div className={c.root}>
            <Button
                icon='new-text-box'
                onClick={createAnnotation}
                disabled={!selectedConcept}
                minimal
            />
            <Button
                icon='floppy-disk'
                onClick={handleSaveClick}
                minimal
            />
            <Button icon='edit' minimal disabled/>
            <Button icon='text-highlight' minimal disabled/>
        </div>
    );
}

export default LeftBar;