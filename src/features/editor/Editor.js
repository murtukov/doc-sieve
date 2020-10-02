import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import LeftBar from "./sub/left-bar/LeftBar";
import {createUseStyles} from "react-jss";
import RightBar from "./sub/right-bar/RightBar";
import {useSelector} from "react-redux";
import {minWidth as rightBarWidth} from "./sub/right-bar/styles";
import {width as leftBarWidth} from "./sub/left-bar/styles";

function Editor() {
    const c = useStyles();
    const sampleText = useSelector(s => s.app.sampleText);

    return (
        <MainLayout>
            <LeftBar/>
            <div className={c.content}>
                {sampleText}
            </div>
            <RightBar/>
        </MainLayout>
    );
}

const useStyles = createUseStyles({
    content: {
        padding: 20,
        marginLeft: leftBarWidth,
        marginRight: rightBarWidth,
        whiteSpace: "pre-line",
        fontSize: 16
    }
});

export default Editor;