import React from 'react';
import {Redirect, Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import {Provider} from 'react-redux';
import store from "./libs/rematch";
import TreeExample from "./features/tree-example/ConceptTree";
import Annotator from "./features/annotatorjs/Annotator";
import Workspace from "./features/react-annotator/Workspace";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Redirect from='/' to='editor' noThrow/>
                <Wizard path='wizard'/>
                <TreeExample path='tree-example'/>
                <Annotator path='annotator' />
                <Workspace path='editor'/>
            </Router>
        </Provider>
    );
}

export default App;