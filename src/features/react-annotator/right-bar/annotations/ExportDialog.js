import React from 'react';
import {Button, Classes, Dialog, H4, Icon, Intent} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import {saveAs} from 'file-saver';
import md5 from 'md5';

function ExportDialog({onClose, isOpen}) {
    const {annotations, text} = useSelector(s => s.app);

    // const [state, update] = useState({
    //     name: '',
    //     description: '',
    //     bgColor: 'lightgreen',
    //     textColor: 'black'
    // });
    //dssssssssssss
    // function handleFieldChange({target}) {
    //     update({...state, [target.name]: target.value});
    // }

    function handleSaveClick() {
        const exportData = {
            annotations,
            textHash: md5(text),
        }

        const blob = new Blob([JSON.stringify(exportData)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "annotations.txt");
        onClose();
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} canEscapeKeyClose>
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='clean'/>
                <H4>Export annotations</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>

            <div className={Classes.DIALOG_BODY}>
                {/*<FormGroup label='Name'>*/}
                {/*    <InputGroup*/}
                {/*        name='name'*/}
                {/*        value={state.name}*/}
                {/*        onChange={handleFieldChange}*/}
                {/*    />*/}
                {/*</FormGroup>*/}
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button
                        large
                        text='Export'
                        intent={Intent.SUCCESS}
                        onClick={handleSaveClick}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default ExportDialog;