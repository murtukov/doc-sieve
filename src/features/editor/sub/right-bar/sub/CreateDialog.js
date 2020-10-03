import React, {useState} from 'react';
import {Button, Classes, Dialog, FormGroup, H4, Icon, InputGroup, Intent, Popover, TextArea} from "@blueprintjs/core";
import {SketchPicker} from 'react-color';
import {useDispatch} from "react-redux";

function CreateDialog({isOpen, onClose}) {
    const [state, update] = useState({
        name: '',
        description: '',
        bgColor: 'lightgreen',
        textColor: 'black'
    });

    const dispatch = useDispatch();

    const handleFieldChange = ({target}) => {
        update({...state, [target.name]: target.value});
    }

    const handleColorChange = field => color => {
        update({...state, [field]: color.hex});
    }

    function handleSaveClick() {
        dispatch.app.addEntity(state);
        onClose();
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} canEscapeKeyClose>
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='clean'/>
                <H4>Create new entity</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>

            <div className={Classes.DIALOG_BODY}>
                <FormGroup label='Name'>
                    <InputGroup
                        name='name'
                        value={state.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup label='Description'>
                    <TextArea fill
                        name='description'
                        value={state.description}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup inline label='Background color' style={{justifyContent: "flex-end"}}>
                    <InputGroup
                        value={state.bgColor}
                        rightElement={
                            <Popover>
                                <Button
                                    minimal
                                    icon={<Icon icon='full-circle' color={state.bgColor}/>}
                                />
                                <SketchPicker
                                    color={state.bgColor}
                                    onChange={handleColorChange('bgColor')}
                                />
                            </Popover>
                        }
                    />
                </FormGroup>
                <FormGroup inline label='Text color' style={{justifyContent: "flex-end"}}>
                    <InputGroup
                        value={state.textColor}
                        rightElement={
                            <Popover>
                                <Button
                                    minimal
                                    icon={<Icon icon='full-circle' color={state.textColor}/>}
                                />
                                <SketchPicker
                                    color={state.textColor}
                                    onChange={handleColorChange('textColor')}
                                />
                            </Popover>
                        }
                    />
                </FormGroup>
            </div>

            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button
                        large
                        text='Save'
                        intent={Intent.SUCCESS}
                        onClick={handleSaveClick}/>
                </div>
            </div>
        </Dialog>
    );
}

export default CreateDialog;