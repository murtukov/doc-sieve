import React from 'react';
import {Redirect, Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import Editor from "./features/editor/Editor";
import {Provider} from 'react-redux';
import store from "./libs/rematch";
import DraftEditor from "./features/draftjs/DraftEditor";
import EntityEditorExample from "./features/draftjsEntityExample/EntityExample";
import TweetExample from "./features/tweet-example/TweetExample";
import RichExample from "./features/rich-example/RichExample";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Redirect from='/' to='editor' noThrow/>
                <Editor path='editor'/>
                <Wizard path='wizard'/>
                <DraftEditor path='draftjs'/>
                <EntityEditorExample path='entity-example'/>
                <TweetExample path='tweet-example'/>
                <RichExample path='rich-example'/>
            </Router>
        </Provider>
    );
}

export default App;