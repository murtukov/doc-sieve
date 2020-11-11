import React from 'react';
import {Button, Classes, Dialog, H4, Icon} from "@blueprintjs/core";
import ImportSteps from "./ImportSteps";

function ImportDialog({isOpen, onClose}) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} canEscapeKeyClose>
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='import'/>
                <H4>Import data</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>

            <div className={Classes.DIALOG_BODY}>
                <ImportSteps/>
            </div>

            {/*<div className={Classes.DIALOG_FOOTER}>*/}
            {/*    <div className={Classes.DIALOG_FOOTER_ACTIONS}>*/}
            {/*        <Button*/}
            {/*            large*/}
            {/*            text='Import'*/}
            {/*            intent={Intent.SUCCESS}*/}
            {/*            onClick={handleImportClick}*/}
            {/*            disabled*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Dialog>
    );
}

export default ImportDialog;