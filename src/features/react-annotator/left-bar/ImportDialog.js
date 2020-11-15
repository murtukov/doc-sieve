import React from 'react';
import {Button, Classes, Dialog, H4, Icon} from "@blueprintjs/core";
import ImportSteps from "./ImportSteps";

function ImportDialog({isOpen, onClose}) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            canEscapeKeyClose
            className={Classes.DIALOG}
        >
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='import'/>
                <H4>Import data</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>


            <ImportSteps/>
        </Dialog>
    );
}

export default ImportDialog;