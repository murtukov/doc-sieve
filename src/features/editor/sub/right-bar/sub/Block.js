import React from 'react';
import {H6} from "@blueprintjs/core";
import useStyles from '../styles';

function Block({title, actions, children}) {
    const c = useStyles();

    return (
        <div className={c.block}>
            <H6 className={c.title}>
                {title}
                {actions}
            </H6>
            {children}
        </div>
    );
}

export default Block;