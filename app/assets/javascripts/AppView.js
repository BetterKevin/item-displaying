/*** AppView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // import the SlideshowView class
    var SlideshowView = require('SlideshowView');

    function AppView() {
        View.apply(this, arguments);

        // create a new instance of slideshow view
        var slideshowView = new SlideshowView({
            data: this.options.data
        });

        // add the instance to app view
        this.add(slideshowView);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        data: undefined
    };

    module.exports = AppView;
});
