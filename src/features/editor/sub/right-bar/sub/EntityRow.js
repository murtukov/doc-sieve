import React from 'react';
import {SketchPicker} from 'react-color';
import {Button, Icon, Popover, Position} from "@blueprintjs/core";

function EntityRow({data}) {
    const {bgColor, textColor, name} = data;

    return (
        <div>
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
            <span>{name}</span>
            <Button icon='edit' minimal/>
        </div>
    );
}

export default EntityRow;