import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import LeftBar from "./LeftBar";
import {createUseStyles} from "react-jss";
import sample from '../../assets/sample.txt';

function Editor() {
    const c = useStyles();
    const [config] = useState({
        text: "Press [h] to see 'help'",
        denotations: [
            {
                span: {
                    begin: 6,
                    end: 9
                },
                obj: "Key"
            },
            {
                span: {
                    begin: 17,
                    end: 23
                },
                obj: "Page"
            }
        ]
    });

    // useEffect(() => {
    //
    // }, []);

    // fetch(sample)
    //     .then(r => r.text())
    //     .then(text  => updateConfig({...config, text}))

    return <MainLayout>
        <LeftBar/>

        <div className={'textae-editor ' + c.content} mode='edit'>
            {JSON.stringify(config)}
        </div>,
    </MainLayout>;
}

const useStyles = createUseStyles({
    content: {
        // padding: 20,
        marginLeft: 80,
        whiteSpace: "pre-line"
    }
});

export default Editor;