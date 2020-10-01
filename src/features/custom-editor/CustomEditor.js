import React, {useEffect} from 'react';
import MainLayout from "../layouts/MainLayout";
import LeftBar from "./sub/LeftBar";
import sampleText from './sample-text';
import {createUseStyles} from "react-jss";

function CustomEditor() {
    const c = useStyles();

    useEffect(() => {
        function onMouseUp() {
            const selection = window.getSelection();

            if (selection.isCollapsed)
                return;

            // const range = selection.getRangeAt(0);

            // let spanNode = document.createElement('span');
            // spanNode.style.backgroundColor = 'lightgreen';
            // spanNode.style.display = 'inline-block';
            // try {
            //     range.surroundContents(spanNode);
            // } catch(e) {
            //     alert(e)
            // }

            console.log(selection.toString())
        }

        document.getElementById('content').addEventListener('mouseup', onMouseUp);
        return () => document.removeEventListener('mouseup', onMouseUp)
    }, []);

    return (
        <MainLayout>
            <LeftBar/>

            <div id='content' className={c.content}>
                {sampleText}
            </div>
        </MainLayout>
    );
}

const useStyles = createUseStyles({
    content: {
        padding: 20,
        marginLeft: 80,
        whiteSpace: "pre-line",
    }
});

export default CustomEditor;