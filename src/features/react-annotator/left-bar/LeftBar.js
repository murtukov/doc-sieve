import React, {useContext, useState} from 'react';
import {AnchorButton, Position, Tooltip} from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {WorkspaceContext} from "../Workspace";
import {useDropzone} from "react-dropzone";
import ExportDialog from "./ExportDialog";
import ImportDialog from "./ImportDialog";
import styles from "./styles";

function LeftBar() {
    const c = styles();
    const {selectedConcept, selectedTextRange} = useSelector(s => s.app);
    const concepts = useSelector(s => s.app.conceptTree.items);
    const dispatch = useDispatch();
    const {highlighter} = useContext(WorkspaceContext);

    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

    const closeExportDialog = () => setIsExportDialogOpen(false);
    const openExportDialog  = () => setIsExportDialogOpen(true);

    const closeImportDialog = () => setIsImportDialogOpen(false);
    const openImportDialog  = () => setIsImportDialogOpen(true);

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
            data: {
                conceptId: selectedConcept
            }
        };

        highlighter.current.draw(annotation);
        dispatch.app.addAnnotation(annotation);
        dispatch.app.setSelectedTextRange(null);
    }

    return (
        <div className={c.root}>
            <ExportDialog isOpen={isExportDialogOpen} onClose={closeExportDialog}/>
            <ImportDialog isOpen={isImportDialogOpen} onClose={closeImportDialog}/>

            <Tooltip content='Add annotation' position={Position.RIGHT}>
                <AnchorButton
                    className={c.btn}
                    icon='new-text-box'
                    onClick={createAnnotation}
                    disabled={!selectedTextRange || !concepts[selectedConcept]}
                    minimal
                />
            </Tooltip>

            <Tooltip content='Open file' position={Position.RIGHT}>
                <AnchorButton
                    className={c.btn}
                    icon='folder-open'
                    minimal
                    onClick={open}
                />
            </Tooltip>
            <input {...getInputProps()} />

            <Tooltip content='Export data' position={Position.RIGHT}>
                <AnchorButton
                    className={c.btn}
                    icon='export'
                    onClick={openExportDialog}
                    minimal
                />
            </Tooltip>

            <Tooltip content='Import data' position={Position.RIGHT}>
                <AnchorButton
                    className={c.btn}
                    icon='import'
                    onClick={openImportDialog}
                    minimal
                />
            </Tooltip>

        </div>
    );
}

export default LeftBar;