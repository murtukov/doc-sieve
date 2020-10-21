import React, { useEffect, useRef } from 'react';
import {Range} from 'xpath-range';
import Highlighter from "../../libs/annotator/ui/highlighter";

const id = (function () {
    let counter = 0;
    return () => counter++;
}());

function ReactAnnotator({children: text}) {
    const rootRef = useRef(null);
    let highlighter;

    useEffect(() => {
        highlighter = new Highlighter(rootRef.current);
    }, []);

    function makeAnnotation(ranges, contextEl = document.body, ignoreSelector = '.annotator-hl') {
        const text = [];
        const serializedRanges = [];

        for (let i = 0; i < ranges.length; i++) {
            const r = ranges[i];
            text.push(r.text().trim());
            serializedRanges.push(r.serialize(contextEl, ignoreSelector));
        }

        return {
            id: id(),
            quote: text.join(' / '),
            ranges: serializedRanges
        };
    }

    function onSelection(ranges, event) {
        if (ranges.length > 0) {
            const annotation = makeAnnotation(ranges, rootRef.current);
            console.log("Selection happened", annotation);
            // s.adder.load(annotation);
            highlighter.draw(annotation);
        } else {
            // s.adder.hide();
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

            // If the new range falls fully outside our this.element, we should
            // add it back to the document but not return it from this method.
            if (normedRange === null) {
                rangesToIgnore.push(r);
            } else {
                ranges.push(normedRange);
            }
        }

        // BrowserRange#normalize() modifies the DOM structure and deselects the
        // underlying text as a result. So here we remove the selected ranges and
        // reapply the new ones.
        selection.removeAllRanges();

        for (let item of rangesToIgnore) {
            selection.addRange(item);
        }

        // Add normed ranges back to the selection
        for (let item of ranges) {
            const range = item;
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

// ReactAnnotator.propTypes = {
//     children: PropTypes.string.isRequired
// };

export default ReactAnnotator;