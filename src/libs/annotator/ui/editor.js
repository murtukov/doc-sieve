import Widget from './widget';
import {gettext as _t} from "../utils";
import $ from 'jquery';

// id returns an identifier unique within this session
const id = (function () {
    let counter = -1;
    return () => counter += 1;
}());


// preventEventDefault prevents an event's default, but handles the condition
// that the event is null or doesn't have a preventDefault function.
function preventEventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
}

// dragTracker is a function which allows a callback to track changes made to
// the position of a draggable "handle" element.
//
// handle - A DOM element to make draggable
// callback - Callback function
//
// Callback arguments:
//
// delta - An Object with two properties, "x" and "y", denoting the amount the
//         mouse has moved since the last (tracked) call.
//
// Callback returns: Boolean indicating whether to track the last movement. If
// the movement is not tracked, then the amount the mouse has moved will be
// accumulated and passed to the next mousemove event.
//
export function dragTracker(handle, callback) {
    let lastPos = null;
    let throttled = false;

    // Event handler for mousemove
    function mouseMove(e) {
        if (throttled || lastPos === null) {
            return;
        }

        const delta = {
            y: e.pageY - lastPos.top,
            x: e.pageX - lastPos.left
        };

        let trackLastMove = true;
        // The callback function can return false to indicate that the tracker
        // shouldn't keep updating the last position. This can be used to
        // implement "walls" beyond which (for example) resizing has no effect.
        if (typeof callback === 'function') {
            trackLastMove = callback(delta);
        }

        if (false !== trackLastMove) {
            lastPos = {
                top: e.pageY,
                left: e.pageX
            };
        }

        // Throttle repeated mousemove events
        throttled = true;
        setTimeout(() => { throttled = false }, 1000 / 60);
    }

    // Event handler for mouseup
    function mouseUp() {
        lastPos = null;
        $(handle.ownerDocument)
            .off('mouseup', mouseUp)
            .off('mousemove', mouseMove);
    }

    // Event handler for mousedown -- starts drag tracking
    function mouseDown(e) {
        if (e.target !== handle) {
            return;
        }

        lastPos = {
            top: e.pageY,
            left: e.pageX
        };

        $(handle.ownerDocument)
            .on('mouseup', mouseUp)
            .on('mousemove', mouseMove);

        e.preventDefault();
    }

    // Public: turn off drag tracking for this dragTracker object.
    function destroy() {
        $(handle).off('mousedown', mouseDown);
    }

    $(handle).on('mousedown', mouseDown);

    return {destroy: destroy};
}


// resizer is a component that uses a dragTracker under the hood to track the
// dragging of a handle element, using that motion to resize another element.
//
// element - DOM Element to resize
// handle - DOM Element to use as a resize handle
// options - Object of options.
//
// Available options:
//
// invertedX - If this option is defined as a function, and that function
//             returns a truthy value, the horizontal sense of the drag will be
//             inverted. Useful if the drag handle is at the left of the
//             element, and so dragging left means "grow the element"
// invertedY - If this option is defined as a function, and that function
//             returns a truthy value, the vertical sense of the drag will be
//             inverted. Useful if the drag handle is at the bottom of the
//             element, and so dragging down means "grow the element"
export function resizer(element, handle, options) {
    const $el = $(element);
    if (typeof options === 'undefined' || options === null) {
        options = {};
    }

    // Translate the delta supplied by dragTracker into a delta that takes
    // account of the invertedX and invertedY callbacks if defined.
    function translate(delta) {
        let directionX = 1;
        let directionY = -1;

        if (typeof options.invertedX === 'function' && options.invertedX()) {
            directionX = -1;
        }
        if (typeof options.invertedY === 'function' && options.invertedY()) {
            directionY = 1;
        }

        return {
            x: delta.x * directionX,
            y: delta.y * directionY
        };
    }

    // Callback for dragTracker
    function resize(delta) {
        const height = $el.height();
        const width = $el.width();
        const translated = translate(delta);

        if (Math.abs(translated.x) > 0) {
            $el.width(width + translated.x);
        }
        if (Math.abs(translated.y) > 0) {
            $el.height(height + translated.y);
        }

        // Did the element dimensions actually change? If not, then we've
        // reached the minimum size, and we shouldn't track
        return ($el.height() !== height || $el.width() !== width);
    }

    // We return the dragTracker object in order to expose its methods.
    return dragTracker(handle, resize);
}


// mover is a component that uses a dragTracker under the hood to track the
// dragging of a handle element, using that motion to move another element.
//
// element - DOM Element to move
// handle - DOM Element to use as a move handle
//
export function mover(element, handle) {
    function move(delta) {
        $(element).css({
            top: parseInt($(element).css('top'), 10) + delta.y,
            left: parseInt($(element).css('left'), 10) + delta.x
        });
    }

    // We return the dragTracker object in order to expose its methods.
    return dragTracker(handle, move);
}

// Public: Creates an element for editing annotations.
class Editor extends Widget {
    NS = "annotator-editor";
    fields = [];
    annotation = {};

    // Classes to toggle state.
    static defaultClasses = {
        hide: 'annotator-hide',
        focus: 'annotator-focus'
    };

    // Configuration options
    static defaultOptions = {
        // Add the default field(s) to the editor.
        defaultFields: true
    };

    // HTML template for this.element
    static defaultTemplate = `
        <div class="annotator-outer annotator-editor annotator-hide">
            <form class="annotator-widget">
                <ul class="annotator-listing"/>
                <div class="annotator-controls">
                    <a href="#cancel" class="annotator-cancel">${_t('Cancel')}</a>'
                    <a href="#save" class="annotator-save annotator-focus">${_t('Save')}</a>
                </div>
            </form>
        </div>
    `;

    /**
     * Creates an instance of the Editor object.
     *
     * @param {object} options - An Object literal containing options.
     *
     * Examples
     * ```
     *   # Creates a new editor, adds a custom field and
     *   # loads an annotation for editing.
     *   editor = new Annotator.Editor
     *   editor.addField({
     *     label: 'My custom input field',
     *     type:  'textarea'
     *     load:  someLoadCallback
     *     save:  someSaveCallback
     *   })
     *   editor.load(annotation)
     * ```
     */
    constructor(options) {
        super({
            ...Editor.defaultOptions,
            ...options,
            classes: {
                ...Editor.defaultClasses,
                ...options.classes
            },
            template: options.template || Editor.defaultTemplate
        });

        if (this.options.defaultFields) {
            this.addField({
                type: 'textarea',
                label: _t('Comments') + '\u2026',
                load(field, annotation) {
                    $(field).find('textarea').val(annotation.text || '');
                },
                submit(field, annotation) {
                    annotation.text = $(field).find('textarea').val();
                }
            });
        }

        this.element
            .on(`submit.${this.NS}`, 'form', e => this.onFormSubmit(e))
            .on(`click.${this.NS}`, '.annotator-save', e => this.onSaveClick(e))
            .on(`click.${this.NS}`, '.annotator-cancel', e => this.onCancelClick(e))
            .on(`mouseover.${this.NS}`, '.annotator-cancel', e => this.onCancelMouseover(e))
            .on(`keydown.${this.NS}`, 'textarea', e => this.onTextareaKeydown(e));
    }

    destroy() {
        this.element.off("." + this.NS);
        super.destroy();
    }

    /**
     * Public: Show the editor.
     *
     * @param {object?} position - An Object specifying the position in which to show the editor.
     *
     * Examples
     * ```
     *   editor.show()
     *   editor.hide()
     *   editor.show({top: '100px', left: '80px'})
     * ```
     *
     * @return {void}
     */
    show(position) {
        if (position) {
            this.element.css({
                top: position.top,
                left: position.left
            });
        }

        this.element
            .find('.annotator-save')
            .addClass(this.classes.focus);

        super.show();

        // give main textarea focus
        this.element.find(":input:first").focus();

        this.setupDraggables();
    }

    /**
     * Load an annotation into the editor and display it.
     *
     * @param {object}  annotation - An annotation Object to display for editing.
     * @param {object?} position - An Object specifying the position in which to show the editor.
     *
     * @return {Promise} Returns a Promise that is resolved when the editor is submitted, or
     *                   rejected if editing is cancelled.
     */
    load(annotation, position) {
        this.annotation = annotation;

        for (let field of this.fields) {
            field.load(field.element, this.annotation);
        }

        return new Promise((resolve, reject) => {
            this.dfd = {resolve, reject};
            this.show(position);
        });
    }

    /**
     * Submits the editor and saves any changes made to the annotation.
     *
     * @return {void}
     */
    submit() {
        for (let field of this.fields) {
            field.submit(field.element, this.annotation);
        }
        if (this.dfd) {
            this.dfd.resolve();
        }
        this.hide();
    }

    /**
     * Cancels the editing process, discarding any edits made to the
     * annotation.
     *
     * @return {this}
     */
    cancel() {
        if (this.dfd) {
            this.dfd.reject('editing cancelled');
        }
        this.hide();
    }

    /** Public: Adds an addional form field to the editor. Callbacks can be
     * provided to update the view and anotations on load and submission.
     *
     * Examples:
     * ```
     *   # Add a new input element.
     *   editor.addField({
     *     label: "Tags",
     *
     *     # This is called when the editor is loaded use it to update your
     *     # input.
     *     load: (field, annotation) ->
     *       # Do something with the annotation.
     *       value = getTagString(annotation.tags)
     *       $(field).find('input').val(value)
     *
     *     # This is called when the editor is submitted use it to retrieve data
     *     # from your input and save it to the annotation.
     *     submit: (field, annotation) ->
     *       value = $(field).find('input').val()
     *       annotation.tags = getTagsFromString(value)
     *   })
     *
     *   # Add a new checkbox element.
     *   editor.addField({
     *     type: 'checkbox',
     *     id: 'annotator-field-my-checkbox',
     *     label: 'Allow anyone to see this annotation',
     *     load: (field, annotation) ->
     *       # Check what state of input should be.
     *       if checked
     *         $(field).find('input').attr('checked', 'checked')
     *       else
     *         $(field).find('input').removeAttr('checked')
     *
     *     submit: (field, annotation) ->
     *       checked = $(field).find('input').is(':checked')
     *       # Do something.
     *   })
     *
     * ```
     * options - An options Object. Options are as follows:
     *           id     - A unique id for the form element will also be set as
     *                    the "for" attrubute of a label if there is one.
     *                    (default: "annotator-field-{number}")
     *           type   - Input type String. One of "input", "textarea",
     *                    "checkbox", "select" (default: "input")
     *           label  - Label to display either in a label Element or as
     *                    placeholder text depending on the type. (default: "")
     *           load   - Callback Function called when the editor is loaded
     *                    with a new annotation. Receives the field <li> element
     *                    and the annotation to be loaded.
     *           submit - Callback Function called when the editor is submitted.
     *                    Receives the field <li> element and the annotation to
     *                    be updated.
     * 
     * @return {object}  the created <li> Element.
     */ 
    addField(options) {
        const field = $.extend({
            id: 'annotator-field-' + id(),
            type: 'input',
            label: '',
            load() {},
            submit() {}
        }, options);

        const element = $('<li class="annotator-item" />');

        field.element = element[0];

        let input = null;
        if (field.type === 'textarea') {
            input = $('<textarea />');
        } else if (field.type === 'checkbox') {
            input = $('<input type="checkbox" />');
        } else if (field.type === 'input') {
            input = $('<input />');
        } else if (field.type === 'select') {
            input = $('<select />');
        } else {
            throw new Error("Field type can be only textarea, checkbox, input or select.");
        }

        element.append(input);

        input.attr({
            id: field.id,
            placeholder: field.label
        });

        if (field.type === 'checkbox') {
            element.addClass('annotator-checkbox');
            element.append($('<label />', {
                'for': field.id,
                'html': field.label
            }));
        }

        this.element.find('ul:first').append(element);
        this.fields.push(field);

        return field.element;
    }

    checkOrientation() {
        super.checkOrientation();

        const list = this.element.find('ul').first();
        const controls = this.element.find('.annotator-controls');

        if (this.element.hasClass(this.classes.invert.y)) {
            controls.insertBefore(list);
        } else if (controls.is(':first-child')) {
            controls.insertAfter(list);
        }

        return this;
    }

    /** Event callback: called when a user clicks the editor form (by pressing
     * return, for example).
     *
     * Returns nothing
     */
    onFormSubmit(event) {
        preventEventDefault(event);
        this.submit();
    }

    /**
     * Event callback: called when a user clicks the editor's save button.
     *
     * Returns nothing
     */
    onSaveClick(event) {
        preventEventDefault(event);
        this.submit();
    }

    /**
     * Event callback: called when a user clicks the editor's cancel button.
     *
     * Returns nothing
     */
    onCancelClick(event) {
        preventEventDefault(event);
        this.cancel();
    }

    /**
     * Event callback: called when a user mouses over the editor's cancel
     * button.
     *
     * Returns nothing
     */
    onCancelMouseover() {
        this.element
            .find('.' + this.classes.focus)
            .removeClass(this.classes.focus);
    }

    /**
     * Event callback: listens for the following special keypresses.
     * - escape: Hides the editor
     * - enter:  Submits the editor
     *
     * event - A keydown Event object.
     *
     * Returns nothing
     */
    onTextareaKeydown(event) {
        if (event.which === 27) {
            // "Escape" key => abort.
            this.cancel();
        } else if (event.which === 13 && !event.shiftKey) {
            // If "return" was pressed without the shift key, we're done.
            this.submit();
        }
    }

    /**
     * Sets up mouse events for resizing and dragging the editor window.
     *
     * Returns nothing.
     */
    setupDraggables() {
        if (this._resizer) {
            this._resizer.destroy();
        }
        if (this._mover) {
            this._mover.destroy();
        }

        this.element.find('.annotator-resize').remove();

        // Find the first/last item element depending on orientation
        let cornerItem;
        if (this.element.hasClass(this.classes.invert.y)) {
            cornerItem = this.element.find('.annotator-item:last');
        } else {
            cornerItem = this.element.find('.annotator-item:first');
        }

        if (cornerItem) {
            $('<span class="annotator-resize"/>').appendTo(cornerItem);
        }

        const controls = this.element.find('.annotator-controls')[0];
        const textarea = this.element.find('textarea:first')[0];
        const resizeHandle = this.element.find('.annotator-resize')[0];
        const self = this;

        this._resizer = resizer(textarea, resizeHandle, {
            invertedX: () => this.element.hasClass(self.classes.invert.x),
            invertedY: () => this.element.hasClass(self.classes.invert.y)
        });

        this._mover = mover(this.element[0], controls);
    }
}

/**
 * standalone is a module that uses the Editor to display an editor widget
 * allowing the user to provide a note (and other data) before an annotation is
 * created or updated.
 */
export function standalone(options) {
    const widget = new Editor(options);

    return {
        destroy() {
            widget.destroy();
        },
        beforeAnnotationCreated(annotation) {
            return widget.load(annotation);
        },
        beforeAnnotationUpdated(annotation) {
            return widget.load(annotation);
        }
    };
}

export default Editor;
