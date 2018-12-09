const SlideToDisplay = {
    FIRST: 'first',
    NEXT: 'next',
    PREV: 'prev'
};

export default class {
    constructor(elementSelector, slideImagePaths) {
        this.slideCount = slideImagePaths.length;
        this.currentSlideIndex = 0;

        this.slideshow = document.querySelector(elementSelector);
        this.slideshow.classList.add('slideshow');

        this.slides = document.createElement('div');
        this.slides.className = 'slideshow-slides';
        this.slideshow.appendChild(this.slides);
        
        this.prevSlideButton = document.createElement('div');
        this.prevSlideButton.className = 'slideshow-prev-button';
        this.prevSlideButton.innerHTML = '&#10094;';
        this.prevSlideButton.addEventListener('click', () => this.showSlide(SlideToDisplay.PREV));
        this.slideshow.appendChild(this.prevSlideButton);
        
        this.nextSlideButton = document.createElement('div');
        this.nextSlideButton.className = 'slideshow-next-button';
        this.nextSlideButton.innerHTML = '&#10095;';
        this.nextSlideButton.addEventListener('click', () => this.showSlide(SlideToDisplay.NEXT));
        this.slideshow.appendChild(this.nextSlideButton);
        
        this.indicators = document.createElement('div');
        this.indicators.className = 'slideshow-indicators';
        this.slideshow.appendChild(this.indicators);
        
        this.setSlides(slideImagePaths);
    }    
    
    setSlides(slideImagePaths) {
        // Reset the current slide index and slide count
        this.slideCount = slideImagePaths.length;
        this.currentSlideIndex = 0;

        // Load the slide image elements
        this.slides.innerHTML = '';
        slideImagePaths.forEach((slideImagePath) => {
            let slideImage = document.createElement('img');
            slideImage.className = 'slideshow-slide';
            slideImage.src = slideImagePath;
            slideImage.style.display = 'none';

            this.slides.appendChild(slideImage);
        });

        // Set the visibility of the previous and next icons
        this.prevSlideButton.classList.add('hidden');
        if (this.slideCount <= 1) this.nextSlideButton.classList.add('hidden');

        // Load the slide indicators
        this.indicators.innerHTML = '';
        for (var i = 0; i < this.slideCount; i++) {
            let indicator = document.createElement('div');
            indicator.className = 'slideshow-indicator';
            this.indicators.appendChild(indicator);
        }

        // Show the first slide
        this.showSlide(SlideToDisplay.FIRST);
    }

    showSlide(slideToDisplay) {
        // Set the index of the next slide to display
        let newSlideIndex;
        switch (slideToDisplay) {
            case SlideToDisplay.FIRST:
                newSlideIndex = 0;
                break;
            case SlideToDisplay.NEXT:
                newSlideIndex = this.currentSlideIndex === this.slideCount - 1 ? 0 : this.currentSlideIndex + 1;
                break;
            case SlideToDisplay.PREV:
                newSlideIndex = this.currentSlideIndex === 0 ? this.slideCount - 1 : this.currentSlideIndex - 1;
                break;
        }

        // Hide the currently displayed slide and show the next one
        const slides = this.slides.querySelectorAll('.slideshow-slide');
        slides.item(this.currentSlideIndex).style.display = 'none';
        slides.item(newSlideIndex).style.display = 'block';

        // Show or hide the previous and next buttons
        if (newSlideIndex === 0) {
            this.prevSlideButton.classList.add('hidden');
        } else {
            this.prevSlideButton.classList.remove('hidden');
        }
        if (newSlideIndex === this.slideCount - 1) {
            this.nextSlideButton.classList.add('hidden');
        } else {
            this.nextSlideButton.classList.remove('hidden');
        }
    
        // Unselect the currently selected indicator and select the next one
        const indicators = this.indicators.querySelectorAll('.slideshow-indicator');
        indicators.item(this.currentSlideIndex).classList.remove('slideshow-indicator-selected');
        indicators.item(newSlideIndex).classList.add('slideshow-indicator-selected');
        
        // Update the current slide index
        this.currentSlideIndex = newSlideIndex;
    }
}