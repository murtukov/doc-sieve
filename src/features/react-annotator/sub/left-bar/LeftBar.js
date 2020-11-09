import React, {useContext} from 'react';
import {Button} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {WorkspaceContext} from "../../Workspace";
import styles from './styles';

function LeftBar() {
    const c = styles();
    const {selectedConcept, selectedTextRange, annotations} = useSelector(s => s.app);
    const dispatch = useDispatch();
    const {highlighter} = useContext(WorkspaceContext);

    function createAnnotation() {
        const annotation = {
            ...selectedTextRange,
            data: selectedConcept
        };
        debugger;
        highlighter.current.draw(annotation);
        dispatch.app.addAnnotation(annotation);
        dispatch.app.setSelectedTextRange(null);
    }

    function saveAnnotations() {
        console.log(annotations);
    }

    return (
        <div className={c.root}>
            <Button
                icon='new-text-box'
                onClick={createAnnotation}
                disabled={!selectedTextRange || !selectedConcept}
                minimal
            />
            <Button
                icon='floppy-disk'
                onClick={saveAnnotations}
                minimal
            />
            <Button icon='edit' minimal disabled/>
            <Button icon='text-highlight' minimal disabled/>
        </div>
    );
}

export default LeftBar;