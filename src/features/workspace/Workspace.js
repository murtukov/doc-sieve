import React, { useEffect, useRef } from 'react';
import LeftBar from "./left-bar/LeftBar";
import RightBar from "./right-bar/RightBar";
import MainLayout from "../../layouts/MainLayout";
import { createUseStyles } from "react-jss";
import { width as leftBarWidth } from "./left-bar/styles";
import { minWidth as rightBarWidth } from "./right-bar/styles";
import ReactAnnotator from "./ReactAnnotator";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "../../libs/annotator/ui/highlighter";

export const WorkspaceContext = React.createContext(null);
export const highlighter = React.createRef();

function Workspace() {
    const c = useStyles();
    const annotatorRef = useRef(null);
    const dispatch = useDispatch();
    const annotations = useSelector(s => s.app.annotations);
    const text = useSelector(s => s.app.text);

    useEffect(() => {
        if (annotatorRef.current) {
            highlighter.current = new Highlighter(annotatorRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [annotatorRef.current]);

    function handleSelected(annotation) {
        dispatch.app.setSelectedTextRange(annotation);
    }

    function handleAnnotatorMount(ref) {
        annotatorRef.current = ref.current;
    }

    return (
        <MainLayout>
            <WorkspaceContext.Provider value={{highlighter}}>
                <LeftBar/>
                <div id='content' className={c.content}>
                    <ReactAnnotator
                        annotations={annotations}
                        onSelected={handleSelected}
                        onMount={handleAnnotatorMount}
                    >
                        {text}
                    </ReactAnnotator>
                </div>
                <RightBar/>
            </WorkspaceContext.Provider>
        </MainLayout>
    );
}

const useStyles = createUseStyles({
    content: {
        flexGrow: 1,
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