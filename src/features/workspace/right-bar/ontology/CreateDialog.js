import React, {useState} from 'react';
import {Button, Classes, Dialog, FormGroup, H4, Icon, InputGroup, Intent, Popover, TextArea} from "@blueprintjs/core";
import {SketchPicker} from 'react-color';
import {useDispatch, useSelector} from "react-redux";

function CreateDialog({isOpen, onClose}) {
    const [state, update] = useState({
        name: '',
        description: '',
        question: '',
        bgColor: 'lightgreen',
        textColor: 'black'
    });

    const conceptTree = useSelector(s => s.app.conceptTree);
    const dispatch = useDispatch();

    const handleColorChange = field => color => {
        update({...state, [field]: color.hex});
    }

    function handleFieldChange({target}) {
        update({...state, [target.name]: target.value});
    }

    function handleSaveClick() {
        if (state.name in conceptTree.items) {
            alert("Concept already exists");
            return;
        }
        dispatch.app.addConcept(state);
        update({...state, name: '', description: ''});
        onClose();
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} canEscapeKeyClose>
            <div className={Classes.DIALOG_HEADER}>
                <Icon icon='clean'/>
                <H4>Create new concept</H4>
                <Button icon='cross' minimal onClick={onClose}/>
            </div>

            <div className={Classes.DIALOG_BODY}>
                <FormGroup label='Name' labelInfo='(required)'>
                    <InputGroup
                        name='name'
                        required
                        value={state.name}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup label='Related question' labelInfo='(required)'>
                    <TextArea
                        fill
                        required
                        name='question'
                        value={state.question}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup label='Description'>
                    <TextArea
                        fill
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
                        onClick={handleSaveClick}
                        disabled={!state.name || !state.question}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default CreateDialog;