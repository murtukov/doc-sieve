import React from 'react';
import {Button} from "@blueprintjs/core";
import styles from './styles';

function LeftBar() {
    const c = styles();

    return (
        <div className={c.root}>
            <Button icon='floppy-disk' minimal/>
            <Button icon='edit' minimal/>
            <Button icon='text-highlight' minimal/>
            <Button icon='new-text-box' minimal/>
        </div>
    );
}

export default LeftBar;