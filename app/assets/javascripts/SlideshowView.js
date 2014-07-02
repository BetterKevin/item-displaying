/*** SlideshowView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');
    var Lightbox = require('famous/views/Lightbox');

    var SlideView = require('SlideView');

    function SlideshowView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0],
            align: [0.5, 0]
        });

        this.mainNode = this.add(this.rootModifier);

        _createLightbox.call(this);
        _createSlides.call(this);
    }

    function _createLightbox() {
        this.lightbox = new Lightbox();
        this.mainNode.add(this.lightbox);
    }

    function _createSlides() {
        this.slides = [];
        this.currentIndex = 0;

        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            slide.on('nextPage', function() {
                this.showNextSlide();
            }.bind(this));

            slide.on('prePage', function() {
                this.showPreSlide();
            }.bind(this));
            // slide.on('click', this.showNextSlide.bind(this));
        }
        this.showCurrentSlide();
    }


    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.prototype.showCurrentSlide = function() {
        this.ready = false;

        var slide = this.slides[this.currentIndex];
        this.lightbox.setOptions(this.options.lightboxOpts);
        this.lightbox.show(slide, function() {
            this.ready = true;
        }.bind(this));
    };

    SlideshowView.prototype.showCurrentPreSlide = function() {
        this.ready = false;

        var slide = this.slides[this.currentIndex];
        this.lightbox.setOptions(this.options.lightboxOptsPre);
        this.lightbox.show(slide, function() {
            this.ready = true;
        }.bind(this));
    };

    SlideshowView.prototype.showNextSlide = function() {
        if (!this.ready) return;

        this.currentIndex++;
        if (this.currentIndex === this.slides.length) this.currentIndex = 0;
        this.showCurrentSlide();
    };

    SlideshowView.prototype.showPreSlide = function() {
        if (!this.ready) return;

        this.currentIndex--;
        if (this.currentIndex === -1) this.currentIndex = this.slides.length - 1;
        this.showCurrentPreSlide();
    };

    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        lightboxOpts: {
            inOpacity: 1,
            inTransform: Transform.translate(300, 0, 0),
            outTransform: Transform.translate(-500, 0, 0),
            // showTransform: Transform.translate(300, 0, 0),
            inTransition: { duration: 500, curve: Easing.outBack },
            outTransition: { duration: 350, curve: Easing.inQuad }
        },
        lightboxOptsPre: {
            inTransform: Transform.translate(-300, 0, 0),
            outTransform: Transform.translate(500, 0, 0),
            inTransition: { duration: 500, curve: Easing.outBack },
            outTransition: { duration: 350, curve: Easing.inQuad }
        }
    };

    module.exports = SlideshowView;
});
