import React, {useState} from 'react';
import {Button, Checkbox, Classes, Dialog, H4, Icon, Intent} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import {saveAs} from 'file-saver';
import md5 from 'md5';

function ExportDialog({onClose, isOpen}) {
    const {annotations, text, conceptTree} = useSelector(s => s.app);
    const [checked, setChecked] = useState({
        annotations: true,
        ontology: true,
        text: true,
    });

    function handleExportClick() {
        const data = {};

        if (checked.annotations) {
            data.annotations = annotations;
        }

        if (checked.ontology) {
            data.ontology = conceptTree;
        }

        if (checked.text) {
            data.text = text;
        } else {
            data.textHash = md5(text);
        }

        const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "export.json");
        onClose();
    }

    const handleCheckboxChange = (field) => (event) => {
        setChecked({
            ...checked,
            [field]: event.target.checked
        })
    }

    function isNoneChecked() {
        return !checked.annotations && !checked.ontology;
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} canEscapeKeyClose>
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='clean'/>
                <H4>Export data</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>

            <div className={Classes.DIALOG_BODY}>
                <h3>Include:</h3>
                <Checkbox
                    label='Annotations'
                    checked={checked.annotations}
                    onChange={handleCheckboxChange('annotations')}
                    large
                />
                <Checkbox
                    label='Ontology'
                    checked={checked.ontology}
                    onChange={handleCheckboxChange('ontology')}
                    large
                />
                <Checkbox
                    label='Text'
                    checked={checked.text}
                    onChange={handleCheckboxChange('text')}
                    disabled={!checked.annotations && !checked.ontology}
                    large
                />
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button
                        large
                        text='Export'
                        intent={Intent.SUCCESS}
                        onClick={handleExportClick}
                        disabled={isNoneChecked()}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default ExportDialog;