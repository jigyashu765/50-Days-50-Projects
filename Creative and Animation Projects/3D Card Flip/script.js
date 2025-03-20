document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const flipTrigger = card.dataset.flip;

        // Click Trigger
        if (flipTrigger === 'click') {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        }

        // Hover Trigger
        if (flipTrigger === 'hover') {
            card.addEventListener('mouseenter', () => {
                card.classList.add('flipped');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('flipped');
            });
        }
    });
});