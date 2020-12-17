import React from 'react';
import styles from './styles';
import Annotations from "./annotations/Annotations";
import Ontology from "./ontology/Ontology";

function RightBar() {
    const c = styles();

    return (
        <div className={c.root}>
            <Annotations/>
            <Ontology/>
        </div>
    );
}

export default RightBar;