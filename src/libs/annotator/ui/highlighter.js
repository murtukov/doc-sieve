import $ from 'jquery';
import {Range} from 'xpath-range';

/**
 * highlightRange wraps the DOM Nodes within the provided range with a highlight
 * element of the specified class and returns the highlight Elements.
 *
 * @param normedRange - A NormalizedRange to be highlighted.
 * @param {string} cssClass - A CSS class to use for the highlight (default: 'annotator-hl')
 *
 * Returns an array of highlight Elements.
 */
function highlightRange(normedRange, cssClass = 'annotator-hl') {
    const white = /^\s*$/;

    // Ignore text nodes that contain only whitespace characters. This prevents
    // spans being injected between elements that can only contain a restricted
    // subset of nodes such as table rows and lists. This does mean that there
    // may be the odd abandoned whitespace node in a paragraph that is skipped
    // but better than breaking table layouts.
    const nodes = normedRange.textNodes();
    const results = [];

    for (let node of nodes) {
        if (!white.test(node.nodeValue)) {
            const hl = document.createElement('span');
            hl.className = cssClass;
            // hl.style.backgroundColor = store.getState().app.selectedConcept.bgColor;
            node.parentNode.replaceChild(hl, node);
            hl.appendChild(node);
            results.push(hl);
        }
    }
    return results;
}

/**
 * reanchorRange will attempt to normalize a range, swallowing Range.RangeErrors
 * for those ranges which are not reanchorable in the current document.
 */
function reanchorRange(range, rootElement) {
    try {
        return Range.sniff(range).normalize(rootElement);
    } catch (e) {
        if (!(e instanceof Range.RangeError)) {
            // Oh Javascript, why you so crap? This will lose the traceback.
            throw(e);
        }
        // Otherwise, we simply swallow the error. Callers are responsible
        // for only trying to draw valid annotations.
    }
    return null;
}

/**
 * Highlighter provides a simple way to draw highlighted <span> tags over
 * annotated ranges within a document.
 *
 * element - The root Element on which to dereference annotation ranges and
 *           draw highlights.
 * options - An options Object containing configuration options for the plugin.
 *           See `Highlighter.options` for available options.
 *
 */
class Highlighter {
    options = {
        // The CSS class to apply to drawn highlights
        highlightClass: 'annotator-hl',
        // Number of annotations to draw at once
        chunkSize: 10,
        // Time (in ms) to pause between drawing chunks of annotations
        chunkDelay: 10
    }

    constructor(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, this.options, options);
    }

    destroy() {
        $(this.element)
            .find("." + this.options.highlightClass)
            .each((_, el) => {
                $(el).contents().insertBefore(el);
                $(el).remove();
            });
    }

    /**
     * Public: Draw highlights for all the given annotations
     *
     * annotations - An Array of annotation Objects for which to draw highlights.
     *
     * Returns nothing.
     */
    drawAll(annotations) {
        return new Promise((resolve) => {
            let highlights = [];

            const loader = (annList) => {
                if (!annList) {
                    annList = [];
                }

                const now = annList.splice(0, this.options.chunkSize);

                for (let item of now) {
                    highlights = highlights.concat(this.draw(item));
                }

                // If there are more to do, do them after a delay
                if (annList.length > 0) {
                    setTimeout(function () {
                        loader(annList);
                    }, this.options.chunkDelay);
                } else {
                    resolve(highlights);
                }
            }

            const clone = annotations.slice();
            loader(clone);
        });
    }

    /**
     * Public: Draw highlights for the annotation.
     *
     * annotation - An annotation Object for which to draw highlights.
     *
     * Returns an Array of drawn highlight elements.
     */
    draw(annotation) {
        const normedRanges = [];

        for (let i = 0; i < annotation.ranges.length; i++) {
            const r = reanchorRange(annotation.ranges[i], this.element);
            if (r !== null) {
                normedRanges.push(r);
            }
        }

        if (!annotation._local) {
            annotation._local = {};
        }
        if (!annotation._local.highlights) {
            annotation._local.highlights = [];
        }

        for (let normed of normedRanges) {
            $.merge(
                annotation._local.highlights,
                highlightRange(normed, this.options.highlightClass)
            );
        }

        // Save the annotation data on each highlighter element.
        $(annotation._local.highlights).data('annotation', annotation);

        // Add a data attribute for annotation id if the annotation has one
        if (undefined !== annotation.id) {
            $(annotation._local.highlights)
                .attr('data-annotation-id', annotation.id);
        }

        return annotation._local.highlights;
    }

    /**
     * Public: Remove the drawn highlights for the given annotation.
     *
     * annotation - An annotation Object for which to purge highlights.
     *
     * Returns nothing.
     */
    undraw(annotation) {
        if (!annotation._local?.highlights) {
            return;
        }

        for (let i = 0; i < annotation._local.highlights.length; i++) {
            const h = annotation._local.highlights[i];
            if (null !== h.parentNode) {
                $(h).replaceWith(h.childNodes);
            }
        }
        delete annotation._local.highlights;
    }

    /**
     * Public: Redraw the highlights for the given annotation.
     *
     * annotation - An annotation Object for which to redraw highlights.
     *
     * Returns the list of newly-drawn highlights.
     */
    redraw(annotation) {
        this.undraw(annotation);
        return this.draw(annotation);
    }
}

/**
 * standalone is a module that uses the Highlighter to draw/undraw highlights
 * automatically when annotations are created and removed.
 */
export function standalone(element, options) {
    const widget = new Highlighter(element, options);

    return {
        destroy: function () { widget.destroy(); },
        annotationsLoaded: function (anns) { widget.drawAll(anns); },
        annotationCreated: function (ann) { widget.draw(ann); },
        annotationDeleted: function (ann) { widget.undraw(ann); },
        annotationUpdated: function (ann) { widget.redraw(ann); }
    };
}

export default Highlighter;
