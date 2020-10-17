import React, {useEffect} from 'react';
import MainLayout from "../../layouts/MainLayout";
import annotator from 'annotator';
import sampleText from '../app/sample-text';
import $ from 'jquery';
import {main as CustomModule} from '../../libs/annotator/modules/main';

function myModule() {
    return {
        start(app) {
            console.log("Hello, world!");
        },
        configure(registry) {
            console.log("Registry", registry);
        },
        annotationCreated(annotation) {
            console.log('annotationCreated', annotation);
        }
    };
}

/**
 * This is a copy of the default editor extension for tags
 * @param e
 */
function customEditorExtension(e) {
    console.log("editor extension", e);

    // The input element added to the Annotator.Editor wrapped in jQuery.
    // Cached to save having to recreate it everytime the editor is displayed.
    let field = null;
    let input = null;

    // Take an array of tags and turn it into a string suitable for display in the
    // viewer.
    function stringifyTags(array) {
        return array.join(" ");
    }

    // Take a string from the tags input as an argument, and return an array of
    // tags.
    function parseTags(string) {
        string = string.trim();
        let tags = [];

        if (string) {
            tags = string.split(/\s+/);
        }

        return tags;
    }

    function updateField(field, annotation) {
        let value = '';
        if (annotation.tags) {
            value = stringifyTags(annotation.tags);
        }
        input.val(value);
    }

    function setAnnotationTags(field, annotation) {
        annotation.tags = parseTags(input.val());
    }

    field = e.addField({
        label: "this is label",
        load: updateField,
        submit: setAnnotationTags
    })

    input = $(field).find(':input');
}

function Annotator(props) {
    useEffect(() => {
        const app = new annotator.App();

        // Add modules
        app.include(CustomModule, {element: document.getElementById('content')});

        // Configure storage
        // app.include(annotator.storage.http);
        // app.include(annotator.storage.debug);
        // app.include(myModule)

        app.start();
    }, []);

    return (
        <MainLayout>
            <div id='content' >
                {sampleText}
            </div>
        </MainLayout>
    );
}

export default Annotator;