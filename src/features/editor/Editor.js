import React from 'react';
import MainLayout from "../layouts/MainLayout";
import LeftBar from "./LeftBar";
// import {Row, Col} from 'react-flexbox-grid';

const data = `{
    "text": "Press [h] to see 'help'",
    "denotations": [
        {
            "span": {
                "begin":6,
                "end":9
            },
            "obj":"Key"
        },
        {
            "span": {
                "begin":17,
                "end":23
            },
            "obj": "Page"
        }
    ]
}`;

function Editor() {
    return <MainLayout>
        <LeftBar/>

        <div className="textae-editor" mode='edit'>
            {data}
        </div>,
    </MainLayout>;
}

export default Editor;