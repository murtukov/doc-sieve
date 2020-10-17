import React, {useRef, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import LeftBar from "./sub/left-bar/LeftBar";
import {createUseStyles} from "react-jss";
import RightBar from "./sub/right-bar/RightBar";
import {minWidth as rightBarWidth} from "./sub/right-bar/styles";
import {width as leftBarWidth} from "./sub/left-bar/styles";
import RichExample from "../rich-example/RichExample";
import {EditorState, RichUtils} from "draft-js";
import {useSelector} from "react-redux";

export const EditorContext = React.createContext(null);

function Editor() {
    const c = useStyles();
    const content = useRef(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const {selectedConcept} = useSelector(state => state.app);
    const editorRef = useRef(null);

    function createAnnotation(e) {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity(
            'ANNOTATION',
            'MUTABLE',
            selectedConcept
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ));

        setTimeout(() => editorRef.current.focus(), 500)
    }

    return (
        <MainLayout>
            <EditorContext.Provider value={{
                editorState,
                setEditorState,
                editorRef,
                createAnnotation
            }}>
                <LeftBar/>
                <div ref={content} id='content' className={c.content}>
                    <RichExample/>
                </div>
                <RightBar/>
            </EditorContext.Provider>
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