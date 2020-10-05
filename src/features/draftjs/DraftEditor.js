import React, {useState} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Button} from "@blueprintjs/core";

function DraftEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createWithText('Malakiautdin'));

    function onBoldClick() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    }

    return <>
        <Button onClick={onBoldClick}>Bold</Button>
        <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder='Enter'
        />
    </>;
}

export default DraftEditor;