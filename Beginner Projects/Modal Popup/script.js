
// Get DOM elements
const openBtn = document.querySelector('.open-modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

// Open modal
openBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
});

// Close modal with button
closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
    }
});