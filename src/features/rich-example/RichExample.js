import React, {useRef, useState} from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import BlockStyleControls from "./sub/BlockStyleControls";
import InlineStyleControls from "./sub/InlineStyleControls";
import './styles.css';
import {useSelector} from "react-redux";

function RichExample() {
    const sampleText = useSelector(state => state.app.sampleText);
    const editorRef = useRef(null);
    const [editorState, setEditorState] = useState(() => EditorState.createWithText(sampleText));

    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }

    function mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, /* maxDepth */ 4);

            if (newEditorState !== editorState) {
                setEditorState(newEditorState);
            }

            return;
        }
        return getDefaultKeyBinding(e);
    }

    function toggleBlockType(blockType) {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    function toggleInlineStyle(inlineStyle) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="RichEditor-root">
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <div className={className} onClick={() => editorRef.current.focus()}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={setEditorState}
                    placeholder="Tell a story..."
                    ref={editorRef}
                />
            </div>
        </div>
    );
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    CUSTOM: {
        backgroundColor: '#faee00',
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

export default RichExample;