import React from 'react';
import {Redirect, Router} from "@reach/router";
import Wizard from "./features/wizard/Wizard";
import {Provider} from 'react-redux';
import store from "./libs/rematch";
import Workspace from "./features/workspace/Workspace";
import { PersistGate } from 'redux-persist/integration/react';
import { getPersistor } from '@rematch/persist';

const persistor = getPersistor();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Redirect from='/' to='editor' noThrow/>
                    <Wizard path='wizard'/>
                    <Workspace path='editor'/>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;