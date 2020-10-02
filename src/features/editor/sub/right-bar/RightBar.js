import React from 'react';
import {FormGroup, InputGroup} from "@blueprintjs/core";
import styles from './styles';

function RightBar() {
    const c = styles();

    return (
        <div className={c.root}>
            <FormGroup>
                <InputGroup
                    placeholder='Comething'
                />
            </FormGroup>
        </div>
    );
}

export default RightBar;