import React from 'react';
import {Button} from "@blueprintjs/core";
import styles from './styles';
import {useSelector} from "react-redux";

function LeftBar() {
    const c = styles();
    const selectedConcept = useSelector(s => s.app.selectedConcept);

    function handleSaveClick() {
        console.log("SAVE clicked!");
    }

    return (
        <div className={c.root}>
            <Button
                icon='new-text-box'
                onClick={() => console.log("Create annotation...")}
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