import React from 'react';
import Dropzone from "../../sub/Dropzone";
import Step2 from "./Step2";
import classes from "classnames";
import {Classes} from "@blueprintjs/core";

function Step1({openPanel, highlighter, closeDialog}) {
    function handleDrop(files) {
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            const base64 = event.target.result.split(',')[1];
            const json = Buffer.from(base64, "base64").toString();

            const foundData = [];

            let result;
            try {
                result = JSON.parse(json);
            } catch {
                alert("The file doesn't contain a valid JSON.");
            }

            if (result.text) {
                foundData.push('text');
            }

            if (result.annotations) {
                foundData.push('annotations');
            }

            if (result.ontology) {
                foundData.push('ontology');
            }

            openPanel({component: Step2, props: {highlighter, result, closeDialog}});
        });

        reader.readAsDataURL(files[0]);
    }

    return (
        <div className={Classes.DIALOG_BODY}>
            <Dropzone onDrop={handleDrop} multiple/>
        </div>
    );
}


export default Step1;