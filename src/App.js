import React from 'react';
import {Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import Editor from "./features/editor/Editor";
import {Provider} from 'react-redux';
import store from "./libs/rematch";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Editor path='editor'/>
                <Wizard path='wizard'/>
            </Router>
        </Provider>
    );
}

export default App;