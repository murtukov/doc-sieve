import React from 'react';
import Dropzone from "../../sub/Dropzone";
import Step2 from "./Step2";

function Step1({openPanel}) {
    function handleDrop(files) {
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            const base64 = event.target.result.split(',')[1];
            const result = Buffer.from(base64, "base64").toString();

            try {
                console.log(JSON.parse(result));
            } catch {

            }

            openPanel({component: Step2, props: {}});
        });
        reader.readAsDataURL(files[0]);
    }

    return (
        <Dropzone onDrop={handleDrop} multiple/>
    );
}

export default Step1;