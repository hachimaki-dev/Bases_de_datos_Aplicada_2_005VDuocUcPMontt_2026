document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressBar = document.getElementById('progressBar');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize slides
    function init() {
        // Find all steps in all slides and make sure they are hidden initially
        slides.forEach((slide, index) => {
            if (index !== currentSlide) {
                slide.classList.remove('active');
            }
        });
        
        updateUI();
    }

    // Go to next action (either reveal step or go to next slide)
    function nextAction() {
        const slide = slides[currentSlide];
        // Find hidden steps in current slide
        const hiddenSteps = slide.querySelectorAll('.step:not(.visible)');

        if (hiddenSteps.length > 0) {
            // Reveal next step
            hiddenSteps[0].classList.add('visible');
        } else {
            // No more steps, go to next slide
            if (currentSlide < totalSlides - 1) {
                slides[currentSlide].classList.remove('active');
                currentSlide++;
                slides[currentSlide].classList.add('active');
                updateUI();
            }
        }
    }

    // Go to previous action (hide step or go to prev slide)
    function prevAction() {
        const slide = slides[currentSlide];
        // Find visible steps in current slide
        const visibleSteps = slide.querySelectorAll('.step.visible');

        if (visibleSteps.length > 0) {
            // Hide last visible step
            visibleSteps[visibleSteps.length - 1].classList.remove('visible');
        } else {
            // Go to previous slide
            if (currentSlide > 0) {
                slides[currentSlide].classList.remove('active');
                currentSlide--;
                slides[currentSlide].classList.add('active');
                updateUI();
                
                // When going backwards to a slide, all its steps should be visible
                const prevSlideSteps = slides[currentSlide].querySelectorAll('.step');
                prevSlideSteps.forEach(s => s.classList.add('visible'));
            }
        }
    }

    // Update buttons, counter, and progress bar
    function updateUI() {
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        
        prevBtn.disabled = currentSlide === 0;
        // Even if on last slide, we don't disable next button immediately if there are steps left
        const slide = slides[currentSlide];
        const hiddenSteps = slide.querySelectorAll('.step:not(.visible)');
        nextBtn.disabled = currentSlide === totalSlides - 1 && hiddenSteps.length === 0;

        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextAction();
        updateUI(); // Ensure nextBtn disabled state is updated if last step revealed
    });
    
    prevBtn.addEventListener('click', () => {
        prevAction();
        updateUI();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault(); // Prevent page scroll on space
            nextAction();
            updateUI();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevAction();
            updateUI();
        }
    });

    init();
});
