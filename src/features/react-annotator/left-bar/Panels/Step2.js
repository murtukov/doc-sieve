import React, {useEffect, useMemo, useState} from 'react';
import {Button, Callout, Checkbox, Classes, Divider, Intent, Radio, RadioGroup} from "@blueprintjs/core";
import check from "@atlaskit/icon/glyph/check";
import {useSelector} from "react-redux";
import md5 from "uuid/dist/esm-node/md5";
import {createUseStyles} from "react-jss";

function Step2({result}) {
    const c = useStyles();
    const {text} = useSelector(s => s.app);
    const concepts = useSelector(s => s.app.conceptTree.items);

    // Checked fields
    const [checked, setChecked] = useState({
        annotations: false,
        ontology: false,
        text: false,
    });

    // Import options
    const [options, setOptions] = useState({
        annotations: 'replace'
    });

    const [violations, setViolations] = useState({
        incompleteOntology: null, // array: list of annotation, that don't have a related concept
        wrongText: false,         // bool
    })

    const handleCheckboxChange = (field) => ({target}) => {
        setChecked({...checked, [field]: target.checked})
    }

    useEffect(() => {
        let violations = {
            incompleteOntology: null,
            wrongText: false,
        };

        // There is text, but it's unchecked
        if (result.text && !checked.text && (result.text !== text)) {
            violations = {wrongText: true};
        }
        // There is no text, and textHash is different
        if (!result.text && result.textHash !== md5(text)) {
            violations = {wrongText: true};
        }

        if (checked.annotations) {
            if (!checked.ontology) {
                // List of annotations, that have no concept
                const notFound = [];

                // Check that all annotations have a concept
                for (let a of result.annotations) {
                    if (!concepts[a.data.conceptId]) {
                        notFound.push(a);
                    }
                }

                if (notFound.length > 0) {
                    violations = {...violations, incompleteOntology: notFound}
                }
            }
        }

        setViolations(violations);
    }, [checked, result, text, concepts]);

    function handleRadioChange({target}) {
        setOptions({annotations: target.value})
    }

    const canImport = useMemo(() => {
        // at least one data should be checked
        let atLeastOne = false;
        if (checked.annotations || checked.ontology || checked.text) {
            atLeastOne = true;
        }

        return violations.wrongText && atLeastOne;
    }, [violations, checked]);

    return <>
        <div className={Classes.DIALOG_BODY}>
            <p>Found following data (tick to import):</p>
            {result.annotations &&
                <div className={c.annotationsRow}>
                    <Checkbox
                        label={<b>Annotations:</b>}
                        checked={checked.annotations}
                        onChange={handleCheckboxChange('annotations')}
                        large
                    />
                    <RadioGroup
                        onChange={handleRadioChange}
                        selectedValue={options.annotations}
                        disabled={!checked.annotations}
                        inline
                        className={c.options}
                    >
                        <Radio label="replace" value="replace" />
                        <Radio label="merge" value="merge" />
                    </RadioGroup>
                </div>
            }
            {result.ontology &&
                <>
                    <Checkbox
                        label={<b>Ontology</b>}
                        checked={checked.ontology}
                        onChange={handleCheckboxChange('ontology')}
                        large
                    />
                </>
            }
            {result.text &&
                <>
                    <Checkbox
                        label={<b>Text</b>}
                        checked={checked.text}
                        onChange={handleCheckboxChange('text')}
                        large
                    />
                </>
            }

            {violations &&
                <>
                    {violations.wrongText &&
                        <Callout title='Validation error' icon='error'>
                            The import data is mean for another text
                        </Callout>
                    }
                    {violations.incompleteOntology &&
                        <Callout icon='error'>
                            Some of the annotations cannot be imported, because your ontology doesn't contain all necessary concepts.
                            To fix this import the ontology as well.
                        </Callout>
                    }
                </>
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

const useStyles = createUseStyles({
    annotationsRow: {
        display: "flex"
    },
    options: {
        marginLeft: 20
    }
});

export default Step2;