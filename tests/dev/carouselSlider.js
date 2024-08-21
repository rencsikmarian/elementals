import { Elemental } from "../../index";

const CarouselSlider = Object(Elemental)("carouselSlider", function (elemental, settings) {
    console.log("init carouselSlider: ", elemental, settings);
    // Default settings
    const defaults = {
        slideInterval: 5000,
        transitionSpeed: 300,
        autoPlay: true
    };

    // Merge default settings with user settings
    const config = { ...defaults, ...settings };
    console.log("init config: ", config);

    // Component state
    let currentSlide = 0;
    let slides;
    let interval;
    let isPlaying = config.autoPlay;

    // DOM elements
    const slider = elemental.el;
    let sliderTrack;
    let prevButton;
    let nextButton;

    function init() {
        // Create slider structure
        createSliderStructure();
        
        // Get all slides
        slides = sliderTrack.children;
        
        // Set initial position
        updateSlidePosition();
        
        // Add event listeners
        addEventListeners();
        
        // Start autoplay if enabled
        if (isPlaying) {
            startAutoPlay();
        }
    }

    function createSliderStructure() {
        // Create slider track
        sliderTrack = document.createElement('div');
        sliderTrack.className = 'carousel-track';
        
        // Move all direct children of slider into the track
        while (slider.firstChild) {
            sliderTrack.appendChild(slider.firstChild);
        }
        
        // Add track to slider
        slider.appendChild(sliderTrack);
        
        // Create navigation buttons
        prevButton = document.createElement('button');
        prevButton.className = 'carousel-prev';
        prevButton.innerHTML = '&lt;';
        
        nextButton = document.createElement('button');
        nextButton.className = 'carousel-next';
        nextButton.innerHTML = '&gt;';
        
        slider.appendChild(prevButton);
        slider.appendChild(nextButton);
    }

    function addEventListeners() {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        slider.addEventListener('mouseenter', pauseAutoPlay);
        slider.addEventListener('mouseleave', resumeAutoPlay);
    }

    function updateSlidePosition() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    function startAutoPlay() {
        if (!interval) {
            interval = setInterval(nextSlide, config.slideInterval);
        }
    }

    function stopAutoPlay() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function pauseAutoPlay() {
        if (isPlaying) {
            stopAutoPlay();
        }
    }

    function resumeAutoPlay() {
        if (isPlaying) {
            startAutoPlay();
        }
    }

    // Initialize the slider
    init();

    // Public methods
    return {
        next: nextSlide,
        prev: prevSlide,
        pause: function() {
            isPlaying = false;
            stopAutoPlay();
        },
        resume: function() {
            isPlaying = true;
            startAutoPlay();
        },
        destroy: function() {
            stopAutoPlay();
            prevButton.removeEventListener('click', prevSlide);
            nextButton.removeEventListener('click', nextSlide);
            slider.removeEventListener('mouseenter', pauseAutoPlay);
            slider.removeEventListener('mouseleave', resumeAutoPlay);
            // Additional cleanup if necessary
        }
    };
});

export default CarouselSlider;