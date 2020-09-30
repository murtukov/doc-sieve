import React from 'react';
import {Router} from "@reach/router";
import Editor from "./features/editor/Editor";
import Wizard from "./features/wizard/Wizard";
import CustomEditor from "./features/custom-editor/CustomEditor";

function App() {
    return (
        <Router>
            <Editor path='editor'/>
            <Wizard path='wizard'/>
            <CustomEditor path='custom-editor'/>
        </Router>
    );
}

export default App;