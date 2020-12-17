import React, {useEffect, useRef} from 'react';
import MainLayout from "../../layouts/MainLayout";
import LeftBar from "../workspace/left-bar/LeftBar";
import RightBar from "../workspace/right-bar/RightBar";
import Highlighter from "../../libs/annotator/ui/highlighter";

export const WizardContext = React.createContext(null);
export const highlighter = React.createRef();

function Wizard() {
    const annotatorRef = useRef(null);
    
    useEffect(() => {
        if (annotatorRef.current) {
            highlighter.current = new Highlighter(annotatorRef.current);
        }
    }, [annotatorRef.current]); // eslint-disable-line

    return (
        <MainLayout>
            <WizardContext.Provider value={{highlighter}}>
                <LeftBar/>
                <div id='content'>

                </div>
                <RightBar/>
            </WizardContext.Provider>
        </MainLayout>
    );
}

export default Wizard;