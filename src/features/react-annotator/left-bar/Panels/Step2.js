import React, {useState} from 'react';
import {Button, Checkbox, Classes, Intent} from "@blueprintjs/core";
import check from "@atlaskit/icon/glyph/check";
import {useSelector} from "react-redux";
import md5 from "uuid/dist/esm-node/md5";

function Step2({result}) {
    console.log(result);
    const {text} = useSelector(s => s.app);

    const [checked, setChecked] = useState({
        annotations: false,
        ontology: false,
        text: false,
    });

    const [canImport, setCanImport] = useState(false);

    const handleCheckboxChange = (field) => ({target}) => {
        setChecked({...checked, [field]: target.checked})
        validateImport();
    }

    function validateImport() {
        if (checked.annotations) {
            // Check belonging to the current text
            if (!checked.text && result.textHash !== md5(text)) {
                alert("The annotations don't belong to the current text.");
            }

            if (!checked.ontology) {
                // Check that all annotations
            }
        }

        if (checked.ontology) {

        }
    }

    return <>
        <div className={Classes.DIALOG_BODY}>
            <p>Found following data (tick to import):</p>
            {result.annotations &&
                <Checkbox
                    label='Annotations'
                    checked={checked.annotations}
                    onChange={handleCheckboxChange('annotations')}
                    large
                />
            }
            {result.ontology &&
                <Checkbox
                    label='Ontology'
                    checked={checked.ontology}
                    onChange={handleCheckboxChange('ontology')}
                    large
                />
            }
            {result.text &&
                <Checkbox
                    label='Text'
                    checked={checked.text}
                    onChange={handleCheckboxChange('text')}
                    large
                />
            }
        </div>

        <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                    text='Import'
                    intent={Intent.SUCCESS}
                    disabled={!canImport}
                    large
                />
            </div>
        </div>
    </>;
}
export default Step2;