import React from 'react';
import {Button, Classes, Dialog, H4, Icon} from "@blueprintjs/core";
import ImportSteps from "./ImportSteps";
import {createUseStyles} from "react-jss";
import classes from 'classnames';

function ImportDialog({isOpen, onClose}) {
    const c = useStyles();
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

            <div className={classes(Classes.DIALOG_BODY, c.dialogBody)}>
                <ImportSteps/>
            </div>
        </Dialog>
    );
}

const useStyles = createUseStyles({
    dialogBody: {
        display: "flex"
    }
});

export default ImportDialog;