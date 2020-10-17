import React, {useContext, useEffect} from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, CompositeDecorator} from 'draft-js';
import {useSelector} from "react-redux";
import {EditorContext} from "../editor/Editor";
import './styles.css';

function RichExample() {
    const {sampleText} = useSelector(state => state.app);
    const {editorState, setEditorState, editorRef} = useContext(EditorContext);

    useEffect(() => {
        const decorator = new CompositeDecorator([
            {
                strategy: findAnnotationEntities,
                component: Annotation,
            },
        ]);
        setEditorState(EditorState.createWithText(sampleText, decorator));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function findAnnotationEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'ANNOTATION'
                );
            },
            callback
        );
    }

    const Annotation = (props) => {
        console.log('annotation props: ', props);
        const entity = props.contentState.getEntity(props.entityKey);
        const conceptData = entity.getData();

        return (
            <span className='annotation' style={{backgroundColor: conceptData.bgColor}}>
                {props.children}
            </span>
        );
    };

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

    return (
        <div className="RichEditor-root">
            <div onClick={() => editorRef.current.focus()}>
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