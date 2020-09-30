import React from 'react';
import MainLayout from "../layouts/MainLayout";
import LeftBar from "../editor/LeftBar";
import sampleText from './sample-text';
import {createUseStyles} from "react-jss";

function CustomEditor() {
    const c = useStyles();

    return (
        <MainLayout>
            <LeftBar/>

            <div className={c.content}>
                {sampleText}
            </div>
        </MainLayout>
    );
}

// function insertAnnotations(text) {
//
// }

const useStyles = createUseStyles({
    content: {
        padding: 20,
        marginLeft: 80,
        whiteSpace: "pre-line"
    }
});

export default CustomEditor;