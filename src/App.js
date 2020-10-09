import React from 'react';
import {Redirect, Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import Editor from "./features/editor/Editor";
import {Provider} from 'react-redux';
import store from "./libs/rematch";
import AnnotationEditor from "./features/annotation-example/AnnotationEditor";
import EntityEditorExample from "./features/entity-example/EntityExample";
import TweetExample from "./features/tweet-example/TweetExample";
import RichExample from "./features/rich-example/RichExample";
import ColorfulExample from "./features/colorful-example/ColorfulExample";
import TreeExample from "./features/tree-example/ConceptTree";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Redirect from='/' to='editor' noThrow/>
                <Editor path='editor'/>
                <Wizard path='wizard'/>
                <AnnotationEditor path='annotation-example'/>
                <EntityEditorExample path='entity-example'/>
                <TweetExample path='tweet-example'/>
                <RichExample path='rich-example'/>
                <ColorfulExample path='colorful-example'/>
                <TreeExample path='tree-example'/>
            </Router>
        </Provider>
    );
}

export default App;