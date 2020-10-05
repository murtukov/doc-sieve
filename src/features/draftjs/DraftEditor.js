import React, {useEffect, useRef, useState} from 'react';
import {Editor, EditorState, RichUtils, CompositeDecorator, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {createUseStyles} from "react-jss";

function DraftEditor() {
    const editorRef = useRef(null);
    const urlRef = useRef(null);
    const c = useStyles();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [urlValue, setUrlValue] = useState('');
    const [showURLInput, setShowUrlInput] = useState(false);

    useEffect(() => {
        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);
        setEditorState(EditorState.createEmpty(decorator));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function logState() {
        const content = editorState.getCurrentContent();
        console.log(convertToRaw(content));
    }

    function focus() {
        editorRef.current.focus();
    }

    function promptForLink(e) {
        e.preventDefault();

        const selection = editorState.getSelection();

        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }

            setShowUrlInput(true);
            setUrlValue(url);

            // rework this
            setTimeout(() => urlRef.current.focus(), 500)
        }
    }

    function confirmLink(e) {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ));
        setShowUrlInput(false);
        setUrlValue('');

        setTimeout(() => editorRef.current.focus(), 500)
    }

    function onLinkInputKeyDown(e) {
        if (e.which === 13) {
            confirmLink(e);
        }
    }

    function removeLink(e) {
        e.preventDefault();
        const selection = editorState.getSelection();

        if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
        }
    }

    function findLinkEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'LINK'
                );
            },
            callback
        );
    }

    function onUrlChange(e) {
        setUrlValue(e.target.value);
    }

    const Link = (props) => {
        const {url} = props.contentState.getEntity(props.entityKey).getData();
        return (
            <a href={url} className={c.link}>
                {props.children}
            </a>
        );
    };

    let urlInput;
    if (showURLInput) {
        urlInput =
            <div className={c.urlInputContainer}>
                <input
                    ref={urlRef}
                    className={c.urlInput}
                    type="text"
                    onChange={onUrlChange}
                    value={urlValue}
                    onKeyDown={onLinkInputKeyDown}
                />
                <button onMouseDown={confirmLink}>
                    Confirm
                </button>
            </div>;
    }

    return (
        <div className={c.root}>
            <div style={{marginBottom: 10}}>
                Select some text, then use the buttons to add or remove links
                on the selected text.
            </div>
            <div className={c.buttons}>
                <button
                    onMouseDown={promptForLink}
                    style={{marginRight: 10}}>
                    Add Link
                </button>
                <button onMouseDown={removeLink}>
                    Remove Link
                </button>
            </div>
            {urlInput}
            <div className={c.editor} onClick={focus}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Enter some text..."
                    ref={editorRef}
                />
            </div>
            <input
                onClick={logState}
                className={c.button}
                type="button"
                value="Log State"
            />
        </div>
    );
}

const useStyles = createUseStyles({
    root: {
        fontFamily: "'Georgia', serif",
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: "'Georgia', serif",
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
});

export default DraftEditor;