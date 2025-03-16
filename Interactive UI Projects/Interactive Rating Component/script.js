class RatingComponent {
    constructor(container) {
        this.container = container;
        this.stars = container.querySelectorAll('.star');
        this.ratingStars = container.querySelector('.rating-stars');
        this.submitBtn = container.querySelector('.submit-btn');
        this.feedback = container.querySelector('textarea');
        this.message = container.querySelector('.rating-message');
        this.init();
    }

    init() {
        this.stars.forEach(star => {
            star.addEventListener('mouseover', () => this.handleHover(star));
            star.addEventListener('mouseout', () => this.handleHoverOut());
            star.addEventListener('click', () => this.handleClick(star));
        });

        this.submitBtn.addEventListener('click', () => this.handleSubmit());
    }

    handleHover(star) {
        const value = parseInt(star.dataset.value);
        this.stars.forEach(s => {
            if (parseInt(s.dataset.value) <= value) {
                s.classList.add('hover');
            } else {
                s.classList.remove('hover');
            }
        });
    }

    handleHoverOut() {
        this.stars.forEach(s => s.classList.remove('hover'));
    }

    handleClick(star) {
        const value = parseInt(star.dataset.value);
        this.ratingStars.dataset.rating = value;
        
        this.stars.forEach(s => {
            if (parseInt(s.dataset.value) <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    handleSubmit() {
        const rating = this.ratingStars.dataset.rating;
        if (rating > 0) {
            const feedbackText = this.feedback.value.trim();
            console.log('Rating:', rating, 'Feedback:', feedbackText); // For demo purposes
            
            this.container.querySelector('.rating-stars').style.pointerEvents = 'none';
            this.submitBtn.disabled = true;
            this.feedback.disabled = true;
            
            this.message.hidden = false;
            this.message.classList.add('visible');
            
            setTimeout(() => {
                this.reset();
            }, 2000);
        }
    }

    reset() {
        this.stars.forEach(s => s.classList.remove('active'));
        this.ratingStars.dataset.rating = '0';
        this.feedback.value = '';
        this.message.classList.remove('visible');
        this.message.hidden = true;
        this.container.querySelector('.rating-stars').style.pointerEvents = 'auto';
        this.submitBtn.disabled = false;
        this.feedback.disabled = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const ratingContainer = document.querySelector('.rating-container');
    if (ratingContainer) {
        new RatingComponent(ratingContainer);
    }
});