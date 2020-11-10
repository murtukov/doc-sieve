import React from 'react';
import {SketchPicker} from 'react-color';
import {Button, Classes, Icon, Popover, Position, Menu, MenuItem} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import {useDispatch} from "react-redux";

function ConceptRow({data, index}) {
    const c = useStyles();
    const {bgColor, textColor, name} = data;
    const dispatch = useDispatch();

    function removeConcept() {
        if(!window.confirm('Remove the concept?')) {
            return;
        }
        dispatch.app.removeConcept(index);
    }

    return (
        <div className={c.root}>
            <Popover position={Position.LEFT_TOP}>
                <Button
                    minimal
                    icon={<Icon icon='full-circle' color={bgColor}/>}
                />
                <SketchPicker
                    color={bgColor}
                    // onChange={handleColorChange('textColor')}
                />
            </Popover>
            <span className={c.name}>{name}</span>
            <Popover position={Position.BOTTOM} minimal>
                <Button icon='menu' minimal className={c.button}/>
                <Menu>
                    <MenuItem text='Add subconcept' icon='plus'/>
                    <MenuItem text='Edit' icon='edit'/>
                    <MenuItem text='Remove' icon='trash' onClick={removeConcept}/>
                </Menu>
            </Popover>
        </div>
    );
}

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 5,
        // '&:hover $button': {
        //     display: 'inline-flex'
        // },
    },
    name: {
        flexGrow: 1
    },
    // button: {
    //     display: 'none',
    // }
});

export default ConceptRow;