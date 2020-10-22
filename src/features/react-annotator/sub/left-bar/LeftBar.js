import React, { useContext, useEffect, useRef } from 'react';
import { Button } from "@blueprintjs/core";
import styles from './styles';
import { useSelector } from "react-redux";
import { WorkspaceContext } from "../../Workspace";
import Highlighter from "../../../../libs/annotator/ui/highlighter";

function LeftBar() {
    const c = styles();
    // const selectedConcept = useSelector(s => s.app.selectedConcept);
    const selectedTextRange = useSelector(s => s.app.selectedTextRange);
    const {annotatorRef} = useContext(WorkspaceContext);
    const highlighter = useRef(null);

    useEffect(() => {
        if (annotatorRef.current) {
            highlighter.current = new Highlighter(annotatorRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [annotatorRef.current]);

    function createAnnotation() {
        highlighter.current.draw(selectedTextRange);
    }

    return (
        <div className={c.root}>
            <Button
                icon='new-text-box'
                onClick={createAnnotation}
                disabled={!selectedTextRange}
                minimal
            />
            <Button
                icon='floppy-disk'
                minimal
            />
            <Button icon='edit' minimal disabled/>
            <Button icon='text-highlight' minimal disabled/>
        </div>
    );
}

export default LeftBar;