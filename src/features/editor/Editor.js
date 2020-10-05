import React, {useEffect, useRef} from 'react';
import MainLayout from "../../layouts/MainLayout";
import LeftBar from "./sub/left-bar/LeftBar";
import {createUseStyles} from "react-jss";
import RightBar from "./sub/right-bar/RightBar";
import {useSelector} from "react-redux";
import {minWidth as rightBarWidth} from "./sub/right-bar/styles";
import {width as leftBarWidth} from "./sub/left-bar/styles";

function Editor() {
    const c = useStyles();
    const {sampleText, tags} = useSelector(s => s.app);
    const content = useRef(null);

    // useEffect(() => {
    //     console.log(tags);
    //     const ranges = [];
    //     for (let tag of tags) {
    //         let range = new Range();
    //         let box = document.getElementById('content');
    //         range.setStart(box.firstChild, tag.offset.start);
    //         range.setEnd(box.firstChild, tag.offset.end);
    //         ranges.push(range);
    //     }
    //
    //     for (let range of ranges) {
    //         let h1 = document.createElement('h1');
    //         range.surroundContents(h1);
    //     }
    // }, [])

    return (
        <MainLayout>
            <LeftBar/>
            <div ref={content} id='content' className={c.content}>
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