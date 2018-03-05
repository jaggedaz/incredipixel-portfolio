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
        this.setSlides(slideImagePaths);
        this.slideshow.appendChild(this.slides);

        let prevSlideButton = document.createElement('div');
        prevSlideButton.className = 'slideshow-prev-button';
        prevSlideButton.innerHTML = '&#10094;';
        prevSlideButton.addEventListener('click', () => this.showSlide(SlideToDisplay.PREV));
        this.slideshow.appendChild(prevSlideButton);
        
        let nextSlideButton = document.createElement('div');
        nextSlideButton.className = 'slideshow-next-button';
        nextSlideButton.innerHTML = '&#10095;';
        nextSlideButton.addEventListener('click', () => this.showSlide(SlideToDisplay.NEXT));
        this.slideshow.appendChild(nextSlideButton);
    }    
    
    setSlides(slideImagePaths) {
        // Reset the current slide index and slide count
        this.slideCount = slideImagePaths.length;
        this.currentSlideIndex = 0;

        // Clear out any already loaded slides
        this.slides.innerHTML = '';

        // Load the slide image elements
        slideImagePaths.forEach((slideImagePath) => {
            let slideImage = document.createElement('img');
            slideImage.className = 'slideshow-slide';
            slideImage.src = slideImagePath;
            slideImage.style.display = 'none';

            this.slides.appendChild(slideImage);
        });

        // Show the first slide
        this.showSlide(SlideToDisplay.FIRST);
    }

    showSlide(slideToDisplay) {
        // Hide the currently displayed slide
        let currentlyDisplayedSlide = this.slides.querySelectorAll('.slideshow-slide').item(this.currentSlideIndex);
        currentlyDisplayedSlide.style.display = 'none';
    
        // Set the next slide to display
        switch (slideToDisplay) {
            case SlideToDisplay.FIRST:
                this.currentSlideIndex = 0;
                break;
            case SlideToDisplay.NEXT:
                this.currentSlideIndex = this.currentSlideIndex === this.slideCount - 1 ? 0 : this.currentSlideIndex + 1;
                break;
            case SlideToDisplay.PREV:
                this.currentSlideIndex = this.currentSlideIndex === 0 ? this.slideCount - 1 : this.currentSlideIndex - 1;
                break;
        }
    
        // Show the slide
        let nextSlideToDisplay = this.slides.querySelectorAll('.slideshow-slide').item(this.currentSlideIndex);
        nextSlideToDisplay.style.display = 'block';
    }
}