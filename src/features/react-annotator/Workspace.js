import React, { useRef } from 'react';
import LeftBar from "./sub/left-bar/LeftBar";
import sampleText from "../app/sample-text";
import RightBar from "./sub/right-bar/RightBar";
import MainLayout from "../../layouts/MainLayout";
import { createUseStyles } from "react-jss";
import { width as leftBarWidth } from "./sub/left-bar/styles";
import { minWidth as rightBarWidth } from "./sub/right-bar/styles";
import ReactAnnotator from "./ReactAnnotator";
import { useDispatch } from "react-redux";

export const WorkspaceContext = React.createContext(null);

function Workspace() {
    const c = useStyles();
    const annotatorRef = useRef(null);
    const dispatch = useDispatch();

    function handleSelected(annotation) {
        dispatch.app.setSelectedTextRange(annotation);
    }

    function handleAnnotatorMount(ref) {
        annotatorRef.current = ref.current;
    }

    return (
        <MainLayout>
            <WorkspaceContext.Provider value={{annotatorRef}}>
                <LeftBar/>
                <div id='content' className={c.content}>
                    <ReactAnnotator
                        onSelected={handleSelected}
                        onMount={handleAnnotatorMount}
                    >
                        {sampleText}
                    </ReactAnnotator>
                </div>
                <RightBar/>
            </WorkspaceContext.Provider>
        </MainLayout>
    );
}

const useStyles = createUseStyles({
    content: {
        marginLeft: leftBarWidth,
        marginRight: rightBarWidth,
        whiteSpace: "pre-line",
        padding: 15,
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

export default Workspace;