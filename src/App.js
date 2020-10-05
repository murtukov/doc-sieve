import React from 'react';
import {Redirect, Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import Editor from "./features/editor/Editor";
import {Provider} from 'react-redux';
import store from "./libs/rematch";
import DraftEditor from "./features/draftjs/DraftEditor";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Redirect from='/' to='editor' noThrow/>
                <Editor path='editor'/>
                <Wizard path='wizard'/>
                <DraftEditor path='draftjs'/>
            </Router>
        </Provider>
    );
}

export default App;