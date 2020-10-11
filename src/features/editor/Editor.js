import React, {useEffect, useRef} from 'react';
import MainLayout from "../../layouts/MainLayout";
import LeftBar from "./sub/left-bar/LeftBar";
import {createUseStyles} from "react-jss";
import RightBar from "./sub/right-bar/RightBar";
import {useSelector} from "react-redux";
import {minWidth as rightBarWidth} from "./sub/right-bar/styles";
import {width as leftBarWidth} from "./sub/left-bar/styles";
import RichExample from "../rich-example/RichExample";

function Editor() {
    const c = useStyles();
    const {sampleText, annotations} = useSelector(s => s.app);
    const content = useRef(null);

    return (
        <MainLayout>
            <LeftBar/>
            <div ref={content} id='content' className={c.content}>
                <RichExample/>
            </div>
            <RightBar/>
        </MainLayout>
    );
}

const useStyles = createUseStyles({
    content: {
        marginLeft: leftBarWidth,
        marginRight: rightBarWidth,
        whiteSpace: "pre-line",
        fontSize: 16,
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: 8,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#a5a5a5',
        },
    },
});

export default Editor;