import Widget from "./widget";
import {escapeHtml, gettext as _t, mousePosition} from "../utils";
import $ from 'jquery';

// TODO: check why this jquery doesn't work as expected
//       maybe because it's another instance and need to import it everywhere
// import $ from 'jquery';

// const util = require('annotator/src/util');
// const $ = util.$;

/**
 * Simple parser for hypermedia link structure
 *
 * Examples:
 * ```
 *   links = [
 *     {
 *       rel: 'alternate',
 *       href: 'http: *example.com/pages/14.json',
 *       type: 'application/json'
 *     },
 *     {
 *       rel: 'prev':
 *       href: 'http: *example.com/pages/13'
 *     }
 *   ]
 *
 *   parseLinks(links, 'alternate')
 *   # => [{rel: 'alternate', href: 'http: *...', ... }]
 *   parseLinks(links, 'alternate', {type: 'text/html'})
 *   # => []
 * ```
 */
function parseLinks(data, rel, cond) {
    cond = $.extend({}, cond, {rel: rel});

    const results = [];
    for (let d of data) {
        let match = true;
        for (let k in cond) {
            if (cond.hasOwnProperty(k) && d[k] !== cond[k]) {
                match = false;
                break;
            }
        }

        if (match) {
            results.push(d);
        }
    }

    return results;
}


/**
 * Creates an element for viewing annotations. 
 */
class Viewer extends Widget {
    NS = 'annotator-viewer';

    // Classes for toggling annotator state.
    static defaultClasses = {
        showControls: 'annotator-visible'
    };

    // HTML templates for this.widget and this.item properties.
    static defaultTemplate = `
        <div class="annotator-outer annotator-viewer annotator-hide">
            <ul class="annotator-widget annotator-listing"/>
        </div>
    `;

    static defaultItemTemplate = `
        <li class="annotator-annotation annotator-item">
            <span class="annotator-controls">
                <a href="#" title="${_t('View as webpage')}" class="annotator-link">
                    ${_t('View as webpage')}
                </a>
                
                <button type="button" title="${_t('Edit')}" class="annotator-edit">
                    ${_t('Edit')}
                </button>
                
                <button type="button" title="${_t('Delete')}" class="annotator-delete">
                    ${_t('Delete')}
                </button>
            </span>
        </li>
    `;
    
    static defaultOptions = {
        // Add the default field(s) to the viewer.
        defaultFields: true,

        // Time, in milliseconds, before the viewer is hidden when a user mouses off
        // the viewer.
        inactivityDelay: 500,

        // Time, in milliseconds, before the viewer is updated when a user mouses
        // over another annotation.
        activityDelay: 100,

        // Hook, passed an annotation, which determines if the viewer's "edit"
        // button is shown. If it is not a function, the button will not be shown.
        permitEdit: () => false,

        // Hook, passed an annotation, which determines if the viewer's "delete"
        // button is shown. If it is not a function, the button will not be shown.
        permitDelete: () => false,

        // If set to a DOM Element, will set up the viewer to automatically display
        // when the user hovers over Annotator highlights within that element.
        autoViewHighlights: null,

        // Callback, called when the user clicks the edit button for an annotation.
        onEdit() {},

        // Callback, called when the user clicks the delete button for an
        // annotation.
        onDelete() {}
    };
    
    /**
     * Creates an instance of the Viewer object.
     *
     * @param {object} options - An Object containing options.
     *
     * Examples:
     * ```
     *   # Creates a new viewer, adds a custom field and displays an annotation.
     *   viewer = new Viewer()
     *   viewer.addField({
     *     load: someLoadCallback
     *   })
     *   viewer.load(annotation)
     * ```
     */
    constructor(options) {
        super({
            ...Viewer.defaultOptions,
            ...options,
            classes: {
                ...Viewer.defaultClasses,
                ...options.classes
            },
            template: options.template || Viewer.defaultTemplate,
        });

        this.itemTemplate = options.itemTemplate || Viewer.defaultItemTemplate;
        this.fields = [];
        this.annotations = [];
        this.hideTimer = null;
        this.hideTimerDfd = null;
        this.hideTimerActivity = null;
        this.mouseDown = false;

        this.render = (annotation) => {
            if (annotation.text) {
                return escapeHtml(annotation.text);
            } else {
                return `<i>${_t('No comment')}</i>`;
            }
        };

        if (this.options.defaultFields) {
            this.addField({
                load: (field, annotation) => {
                    $(field).html(this.render(annotation));
                }
            });
        }

        if (typeof this.options.onEdit !== 'function') {
            throw new TypeError("onEdit callback must be a function");
        }
        if (typeof this.options.onDelete !== 'function') {
            throw new TypeError("onDelete callback must be a function");
        }
        if (typeof this.options.permitEdit !== 'function') {
            throw new TypeError("permitEdit callback must be a function");
        }
        if (typeof this.options.permitDelete !== 'function') {
            throw new TypeError("permitDelete callback must be a function");
        }

        const self = this;
        if (this.options.autoViewHighlights) {
            this.document = this.options.autoViewHighlights.ownerDocument;

            $(this.options.autoViewHighlights)
                .on("mouseover." + this.NS, '.annotator-hl', function (event) {
                    // If there are many overlapping highlights, still only
                    // call _onHighlightMouseover once.
                    if (event.target === this) {
                        self.onHighlightMouseover(event);
                    }
                })
                .on("mouseleave." + this.NS, '.annotator-hl', () => this.startHideTimer());

            $(this.document.body)
                .on(`mousedown.${this.NS}`, e => {
                    if (e.which === 1) {
                        this.mouseDown = true;
                    }
                })
                .on(`mouseup.${this.NS}`, e => {
                    if (e.which === 1) {
                        this.mouseDown = false;
                    }
                });
        }

        this.element
            .on(`click.${this.NS}`, '.annotator-edit', e => this.onEditClick(e))
            .on(`click.${this.NS}`, '.annotator-delete', e => this.onDeleteClick(e))
            .on(`mouseenter.${this.NS}`, () => this.clearHideTimer())
            .on(`mouseleave.${this.NS}`, () => this.startHideTimer());
    }

    destroy() {
        if (this.options.autoViewHighlights) {
            $(this.options.autoViewHighlights).off("." + this.NS);
            $(this.document.body).off("." + this.NS);
        }
        this.element.off("." + this.NS);
        super.destroy();
    }

    /**
     * Public: Show the viewer.
     *
     * position - An Object specifying the position in which to show the editor
     *            (optional).
     *
     * Examples
     *
     *   viewer.show()
     *   viewer.hide()
     *   viewer.show({top: '100px', left: '80px'})
     *
     * Returns nothing.
     */
    show(position) {
        if (typeof position !== 'undefined' && position !== null) {
            this.element.css({
                top: position.top,
                left: position.left
            });
        }

        const controls = this.element
            .find('.annotator-controls')
            .addClass(this.classes.showControls);

        setTimeout(() => controls.removeClass(this.classes.showControls), 500);

        super.show();
    }

    /**
     * Public: Load annotations into the viewer and show it.
     *
     * annotation - An Array of annotations.
     *
     * Examples
     *
     *   viewer.load([annotation1, annotation2, annotation3])
     *
     * Returns nothing.
     */
    load(annotations = [], position) {
        const list = this.element.find('ul:first').empty();

        for (let annotation of annotations) {
            this.annotationItem(annotation)
                .appendTo(list)
                .data('annotation', annotation);
        }

        this.show(position);
    }

    /**
     * Set the annotation renderer.
     *
     * @param {function} renderer - A function that accepts an annotation and returns HTML.
     *
     * Returns nothing.
     */
    setRenderer(renderer) {
        this.render = renderer;
    }

    /**
     * Create the list item for a single annotation
     */
    annotationItem(annotation) {
        const item = $(this.itemTemplate).clone();

        const controls = item.find('.annotator-controls');
        const link = controls.find('.annotator-link');
        const edit = controls.find('.annotator-edit');
        const del  = controls.find('.annotator-delete');

        const links = parseLinks(
            annotation.links || [],
            'alternate',
            {'type': 'text/html'}
        );
        const hasValidLink = (links.length > 0 &&
                            typeof links[0].href !== 'undefined' &&
                            links[0].href !== null);

        if (hasValidLink) {
            link.attr('href', links[0].href);
        } else {
            link.remove();
        }

        let controller = {};
        if (this.options.permitEdit(annotation)) {
            controller.showEdit = function () {
                edit.removeAttr('disabled');
            };
            controller.hideEdit = function () {
                edit.attr('disabled', 'disabled');
            };
        } else {
            edit.remove();
        }
        if (this.options.permitDelete(annotation)) {
            controller.showDelete = function () {
                del.removeAttr('disabled');
            };
            controller.hideDelete = function () {
                del.attr('disabled', 'disabled');
            };
        } else {
            del.remove();
        }

        for (let field of this.fields) {
            const element = $(field.element).clone().appendTo(item)[0];
            field.load(element, annotation, controller);
        }

        return item;
    }

    /**
     * Public: Adds an addional field to an annotation view. A callback can be
     * provided to update the view on load.
     *
     * options - An options Object. Options are as follows:
     *           load - Callback Function called when the view is loaded with an
     *                  annotation. Recieves a newly created clone of an item
     *                  and the annotation to be displayed (it will be called
     *                  once for each annotation being loaded).
     *
     * Examples
     *
     *   # Display a user name.
     *   viewer.addField({
     *     # This is called when the viewer is loaded.
     *     load: (field, annotation) ->
     *       field = $(field)
     *
     *       if annotation.user
     *         field.text(annotation.user) # Display the user
     *       else
     *         field.remove()              # Do not display the field.
     *   })
     *
     * Returns itself.
     */
    addField(options) {
        const field = $.extend({
            load() {}
        }, options);

        field.element = $('<div/>')[0];
        this.fields.push(field);
        return this;
    }

    /**
     * Event callback: called when the edit button is clicked.
     *
     * event - An Event object.
     *
     * Returns nothing.
     */
    onEditClick(event) {
        const item = $(event.target)
            .parents('.annotator-annotation')
            .data('annotation');
        this.hide();
        this.options.onEdit(item);
    }

    /**
     * Event callback: called when the delete button is clicked.
     *
     * event - An Event object.
     *
     * Returns nothing.
     */
    onDeleteClick(event) {
        const item = $(event.target)
            .parents('.annotator-annotation')
            .data('annotation');
        this.hide();

        console.log("Delete annotation", item);

        this.options.onDelete(item);
    }

    /**
     * Event callback: called when a user triggers `mouseover` on a highlight
     * element.
     *
     * event - An Event object.
     *
     * Returns nothing.
     */
    onHighlightMouseover(event) {
        // If the mouse button is currently depressed, we're probably trying to
        // make a selection, so we shouldn't show the viewer.
        if (this.mouseDown) {
            return;
        }

        this.startHideTimer(true)
            .done(() => {
                const annotations = $(event.target)
                    .parents('.annotator-hl')
                    .addBack()
                    .map((_, elem) => $(elem).data("annotation"))
                    .toArray();

                // Now show the viewer with the wanted annotations
                this.load(annotations, mousePosition(event));
            });
    }

    /**
     * Starts the hide timer. This returns a promise that is resolved when the
     * viewer has been hidden. If the viewer is already hidden, the promise will
     * be resolved instantly.
     *
     * activity - A boolean indicating whether the need to hide is due to a user
     *            actively indicating a desire to view another annotation (as
     *            opposed to merely mousing off the current one). Default: false
     *
     * Returns a Promise.
     */
    startHideTimer(activity = false) {
        // If timer has already been set, use that one.
        if (this.hideTimer) {
            if (activity === false || this.hideTimerActivity === activity) {
                return this.hideTimerDfd;
            } else {
                // The pending timeout is an inactivity timeout, so likely to be
                // too slow. Clear the pending timeout and start a new (shorter)
                // one!
                this.clearHideTimer();
            }
        }

        let timeout;
        if (activity) {
            timeout = this.options.activityDelay;
        } else {
            timeout = this.options.inactivityDelay;
        }

        this.hideTimerDfd = $.Deferred();

        if (!this.isShown()) {
            this.hideTimer = null;
            this.hideTimerDfd.resolve();
            this.hideTimerActivity = null;
        } else {
            this.hideTimer = setTimeout(() => {
                this.hide();
                this.hideTimerDfd.resolve();
                this.hideTimer = null;
            }, timeout);
            this.hideTimerActivity = Boolean(activity);
        }

        return this.hideTimerDfd.promise();
    }

    /**
     * Clears the hide timer. Also rejects any promise returned by a previous
     * call to _startHideTimer.
     *
     * Returns nothing.
     */
    clearHideTimer() {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
        this.hideTimerDfd.reject();
        this.hideTimerActivity = null;
    }
}

/**
 * standalone is a module that uses the Viewer to display an viewer widget in
 * response to some viewer action (such as mousing over an annotator highlight
 * element).
 */
export function standalone(options = {}) {
    let widget;

    return {
        start(app) {
            const ident = app.registry.getUtility('identityPolicy');
            const authz = app.registry.getUtility('authorizationPolicy');

            // Set default handlers for what happens when the user clicks the
            // edit and delete buttons:
            if (!options.onEdit) {
                options.onEdit = function (annotation) {
                    app.annotations.update(annotation);
                };
            }
            if (!options.onDelete) {
                options.onDelete = (annotation) => {
                    app.annotations['delete'](annotation);
                };
            }

            // Set default handlers that determine whether the edit and delete
            // buttons are shown in the viewer:
            if (!options.permitEdit) {
                options.permitEdit = (annotation) => authz.permits('update', annotation, ident.who());
            }
            if (!options.permitDelete) {
                options.permitDelete = (annotation) => authz.permits('delete', annotation, ident.who());
            }

            widget = new Viewer(options);
        },

        destroy() { widget.destroy() }
    };
}

export default Viewer;