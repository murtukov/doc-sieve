import React, {useContext, useState} from 'react';
import {Button} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {WorkspaceContext} from "../Workspace";
import { saveAs } from 'file-saver';
import styles from './styles';
import {useDropzone} from "react-dropzone";
import ExportDialog from "./ExportDialog";

function LeftBar() {
    const c = styles();
    const {selectedConcept, selectedTextRange, annotations} = useSelector(s => s.app);
    const dispatch = useDispatch();
    const {highlighter} = useContext(WorkspaceContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => setIsDialogOpen(false);
    const openDialog  = () => setIsDialogOpen(true);

    const {open, getInputProps} = useDropzone({
        multiple: false,
        onDrop
    });

    function onDrop(files) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const base64 = event.target.result.split(',')[1];
            dispatch.app.setText(Buffer.from(base64, "base64").toString());
        });
        reader.readAsDataURL(files[0]);
    }

    function createAnnotation() {
        const annotation = {
            ...selectedTextRange,
            data: selectedConcept
        };

        highlighter.current.draw(annotation);
        dispatch.app.addAnnotation(annotation);
        dispatch.app.setSelectedTextRange(null);
    }

    function saveAnnotations() {
        const blob = new Blob([JSON.stringify(annotations)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "annotations.txt");
    }

    return (
        <div className={c.root}>
            <ExportDialog isOpen={isDialogOpen} onClose={closeDialog}/>
            <Button
                icon='new-text-box'
                onClick={createAnnotation}
                disabled={!selectedTextRange || !selectedConcept}
                minimal
            />
            <Button
                icon='folder-open'
                minimal
                onClick={open}
            />
            <input {...getInputProps()} />
            <Button
                icon='floppy-disk'
                onClick={saveAnnotations}
                minimal
                disabled={annotations.length === 0}
            />
            <Button
                icon='export'
                onClick={openDialog}
                minimal
            />
        </div>
    );
}

export default LeftBar;