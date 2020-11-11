import React, {useState} from 'react';
import {PanelStack} from "@blueprintjs/core";
import {createUseStyles} from "react-jss";
import Step1 from "./Panels/Step1";

function ImportSteps() {
    const c = useStyles();
    const [stack, updateStack] = useState([
        {
            props: {},
            component: Step1
        }
    ]);

    function addToPanelStack(arg) {
        updateStack([...stack, arg]);
    }

    function removeFromPanelStack() {
        if(stack.length > 1) {
            stack.pop();
            updateStack([...stack]);
        }
    }

    return (
        <PanelStack
            stack={stack}
            showPanelHeader={false}
            onOpen={addToPanelStack}
            onClose={removeFromPanelStack}
        />
    );
}

const useStyles = createUseStyles({
    root: {}
});

export default ImportSteps;