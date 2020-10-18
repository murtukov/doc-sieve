import Widget from './widget';

const util = require('annotator/src/util');

const $ = util.$;
const _t = util.gettext;

// Adder shows and hides an annotation adder button that can be clicked on to
// create an annotation.
class Adder extends Widget {
    NS = 'annotator-adder';

    static defaultOptions = {
        // Callback, called when the user clicks the adder when an
        // annotation is loaded.
        onCreate: null
    };

    static defaultTemplate = `
        <div class="annotator-adder annotator-hide">
            <button type="button">${_t('Annotate')}</button>
        </div>
    `;

    constructor(options) {
        super({
            ...Adder.defaultOptions,
            ...options,
            template: options.template || Adder.defaultTemplate
        });

        this.ignoreMouseup = false;
        this.annotation = null;
        this.onCreate = this.options.onCreate;

        this.element
            .on("click." + this.NS, 'button', e => this.onClick(e))
            .on("mousedown." + this.NS, 'button', e => this.onMousedown(e));

        this.document = this.element[0].ownerDocument;
        $(this.document.body).on("mouseup." + this.NS, e => this.onMouseup(e));
    }

    destroy() {
        this.element.off("." + this.NS);
        $(this.document.body).off("." + this.NS);
        Widget.prototype.destroy.call(this);
    }

    // Public: Load an annotation and show the adder.
    //
    // annotation - An annotation Object to load.
    // position - An Object specifying the position in which to show the editor
    //            (optional).
    //
    // If the user clicks on the adder with an annotation loaded, the onCreate
    // handler will be called. In this way, the adder can serve as an
    // intermediary step between making a selection and creating an annotation.
    //
    // Returns nothing.
    load(annotation, position) {
        this.annotation = annotation;
        this.show(position);
    }

    /**
     * Show the adder.
     *
     * Examples
     * ```
     *   adder.show()
     *   adder.hide()
     *   adder.show({top: '100px', left: '80px'})
     * ```
     *
     * @param {object?} position - An Object specifying the position in which to show the editor.
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
        super.show();
    }

    /**
     * Event callback: called when the mouse button is depressed on the adder.
     *
     * @param event - A mousedown Event object
     *
     * @return {void}
     */
    onMousedown(event) {
        // Do nothing for right-clicks, middle-clicks, etc.
        if (event.which > 1) {
            return;
        }

        event.preventDefault();
        // Prevent the selection code from firing when the mouse button is
        // released
        this.ignoreMouseup = true;
    }

    // Event callback: called when the mouse button is released
    //
    // event - A mouseup Event object
    //
    // Returns nothing.
    onMouseup(event) {
        // Do nothing for right-clicks, middle-clicks, etc.
        if (event.which > 1) {
            return;
        }

        // Prevent the selection code from firing when the ignoreMouseup flag is
        // set
        if (this.ignoreMouseup) {
            event.stopImmediatePropagation();
        }
    }

    // Event callback: called when the adder is clicked. The click event is used
    // as well as the mousedown so that we get the :active state on the adder
    // when clicked.
    //
    // event - A mousedown Event object
    //
    // Returns nothing.
    onClick(event) {
        // Do nothing for right-clicks, middle-clicks, etc.
        if (event.which > 1) {
            return;
        }

        event.preventDefault();

        // Hide the adder
        super.hide();
        this.ignoreMouseup = false;

        // Create a new annotation
        if (this.annotation !== null && typeof this.onCreate === 'function') {
            this.onCreate(this.annotation, event);
        }
    }
}

export default Adder;
