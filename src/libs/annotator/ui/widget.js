import $ from 'jquery';

/**
 * Base class for the Editor and Viewer elements. Contains methods that
 * are shared between the two.
 */
class Widget {
    element = null;
    options = {};
    classes = {};

    static defaultClasses = {
        hide: 'annotator-hide',
        invert: {
            x: 'annotator-invert-x',
            y: 'annotator-invert-y'
        }
    };

    static defaultOptions = {
        // A CSS selector or Element to append the Widget to.
        appendTo: 'body'
    };

    static defaultTemplate = '<div></div>';

    constructor(options) {
        this.classes = {...Widget.defaultClasses, ...options.classes};
        this.options = {...Widget.defaultOptions, ...options};
        this.element = $(options.template || Widget.defaultTemplate);
        this.extensionsInstalled = false;
    }

    set template(template) {
        this.element = $(template);
    }

    /**
     * Destroy the Widget, unbinding all events and removing the element.
     */
    destroy() {
        this.element.remove();
    }

    /**
     * Executes all given widget-extensions.
     */
    installExtensions() {
        if (this.options.extensions) {
            for (let i = 0, len = this.options.extensions.length; i < len; i++) {
                const extension = this.options.extensions[i];
                extension(this);
            }
        }
    }

    _maybeInstallExtensions() {
        if (!this.extensionsInstalled) {
            this.extensionsInstalled = true;
            this.installExtensions();
        }
    }

    /**
     * Attach the widget to a css selector or element.
     * Plus do any post-construction install.
     */
    attach() {
        this.element.appendTo(this.options.appendTo);
        this._maybeInstallExtensions();
    }

    /**
     * Public: Show the widget.
     * Returns nothing.
     */
    show() {
        this.element.removeClass(this.classes.hide);
        // invert if necessary
        this.checkOrientation();
    }

    /**
     * Public: Hide the widget.
     * Returns nothing.
     */
    hide() {
        $(this.element).addClass(this.classes.hide);
    }

    /**
     * Returns true if the widget is currently displayed, false otherwise.
     *
     * Examples:
     * ```
     *   widget.show()
     *   widget.isShown() # => true
     *
     *   widget.hide()
     *   widget.isShown() # => false
     * ```
     * Returns true if the widget is visible.
     *
     * @return {boolean}
     */
    isShown() {
        return !$(this.element).hasClass(this.classes.hide);
    }

    /**
     * @return {this}
     */
    checkOrientation() {
        this.resetOrientation();

        const $win = $(global);
        const $widget = this.element.children(":first");
        const offset = $widget.offset();
        const viewport = {
            top: $win.scrollTop(),
            right: $win.width() + $win.scrollLeft()
        };
        const current = {
            top: offset.top,
            right: offset.left + $widget.width()
        };

        if ((current.top - viewport.top) < 0) {
            this.invertY();
        }

        if ((current.right - viewport.right) > 0) {
            this.invertX();
        }

        return this;
    }

    /**
     * Public: Resets orientation of widget on the X & Y axis.
     *
     * Examples:
     * ```
     *   widget.resetOrientation() # Widget is original way up.
     * ```
     *
     * Returns itself for chaining.
     *
     * @return {this}
     */
    resetOrientation() {
        this.element
            .removeClass(this.classes.invert.x)
            .removeClass(this.classes.invert.y);
        return this;
    }

    /**
     * Inverts the widget on the X axis.
     *
     * Examples
     * ```
     *   widget.invertX() # Widget is now right aligned.
     * ```
     *
     * @return {this}
     */
    invertX() {
        this.element.addClass(this.classes.invert.x);
        return this;
    }

    // Public: Inverts the widget on the Y axis.
    //
    // Examples
    //
    //   widget.invertY() # Widget is now upside down.
    //
    // Returns itself for chaining.
    invertY() {
        this.element.addClass(this.classes.invert.y);
        return this;
    }

    // Public: Find out whether or not the widget is currently upside down
    //
    // Returns a boolean: true if the widget is upside down
    isInvertedY() {
        return this.element.hasClass(this.classes.invert.y);
    }

    // Public: Find out whether or not the widget is currently right aligned
    //
    // Returns a boolean: true if the widget is right aligned
    isInvertedX() {
        return this.element.hasClass(this.classes.invert.x);
    }
}

export default Widget;