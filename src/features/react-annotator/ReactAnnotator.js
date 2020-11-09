import React, { useEffect, useRef } from 'react';
import {Range} from 'xpath-range';
import Highlighter from "../../libs/annotator/ui/highlighter";
import { v4 as uuidv4 } from 'uuid';

function ReactAnnotator({onSelected, children: text, onMount, annotations}) {
    const rootRef = useRef();
    const highlighter = useRef();

    useEffect(() => {
        onMount(rootRef);
        highlighter.current = new Highlighter(rootRef.current);
        highlighter.current.drawAll(annotations);
        // eslint-disable-next-line
    }, [])

    function makeAnnotation(ranges, element = document.body, ignoreSelector = '.annotator-hl') {
        const text = [];
        const serializedRanges = [];

        for (let r of ranges) {
            text.push(r.text().trim());
            serializedRanges.push(r.serialize(element, ignoreSelector));
        }

        return {
            id: uuidv4(),
            quote: text.join(' / '),
            ranges: serializedRanges
        };
    }

    function onSelection(ranges, event) {
        if (ranges.length > 0) {
            const annotation = makeAnnotation(ranges, rootRef.current);
            onSelected(annotation);
        } else {
            onSelected(null)
        }
    }

    /**
     * Event callback: called when the mouse button is released. Checks to see if a
     * selection has been made and if so displays the adder.
     *
     * event - A mouseup Event object.
     *
     * Returns nothing.
     */
    function checkForEndSelection(event) {
        function nullSelection() {
            onSelection([], event);
        }

        // Get the currently selected ranges.
        const selectedRanges = captureDocumentSelection();

        if (selectedRanges.length === 0) {
            nullSelection();
            return;
        }

        onSelection(selectedRanges, event);
    }

    /**
     * Public: capture the current selection from the document, excluding any nodes
     * that fall outside of the adder's `element`.
     *
     * @return {array} - NormalizedRange instances.
     */
    function captureDocumentSelection() {
        const ranges = [];
        const rangesToIgnore = [];
        const selection = window.getSelection();

        if (selection.isCollapsed) {
            return [];
        }

        for (let i = 0; i < selection.rangeCount; i++) {
            const r = selection.getRangeAt(i);
            const browserRange = new Range.BrowserRange(r);
            const normedRange = browserRange.normalize().limit(rootRef.current);

            // If the new range falls fully outside our rootRef.current, we should
            // add it back to the document but not return it from this method.
            if (normedRange === null) {
                rangesToIgnore.push(r);
            } else {
                ranges.push(normedRange);
            }
        }

        // BrowserRange::normalize() modifies the DOM structure and deselects the
        // underlying text as a result. So here we remove the selected ranges and
        // reapply the new ones.
        selection.removeAllRanges();

        for (let item of rangesToIgnore) {
            selection.addRange(item);
        }

        // Add normed ranges back to the selection
        for (let range of ranges) {
            const drange = rootRef.current.ownerDocument.createRange();
            drange.setStartBefore(range.start);
            drange.setEndAfter(range.end);
            selection.addRange(drange);
        }

        return ranges;
    }

    return (
        <div ref={rootRef} onMouseUp={checkForEndSelection}>
            {text}
        </div>
    );
}

export default ReactAnnotator;