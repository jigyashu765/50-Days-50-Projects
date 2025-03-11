// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Centralized state management for the gallery's current filter
    const state = {
        currentFilter: 'all' // Default filter shows all items
    };

    // Cache DOM elements for better performance (avoid repeated queries)
    const filterButtons = document.querySelectorAll('.filter-btn'); // All filter buttons
    const galleryItems = document.querySelectorAll('.gallery-item'); // All gallery items

    // Use event delegation on the filter-buttons container for efficient click handling
    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        // Find the closest filter button element (handles clicks on child elements if any)
        const button = e.target.closest('.filter-btn');
        if (!button) return; // Exit if click wasn't on a button (e.g., gap between buttons)

        // Remove 'active' class from all buttons to reset their state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button for visual feedback
        button.classList.add('active');

        // Update the current filter in state based on the button's data-filter attribute
        state.currentFilter = button.dataset.filter;
        // Trigger the filtering function to update the gallery
        filterGallery();
    });

    // Function to filter gallery items with smooth animations
    function filterGallery() {
        // Loop through each gallery item to determine visibility
        galleryItems.forEach(item => {
            // Get the category of the current item from its data-category attribute
            const itemCategory = item.dataset.category;
            // Determine if the item should be shown based on the current filter
            const shouldShow = state.currentFilter === 'all' || state.currentFilter === itemCategory;

            // Initially hide the item by adding the 'hidden' class (triggers CSS animation)
            item.classList.add('hidden');
            
            // Use a timeout to delay showing items, allowing the hide animation to complete
            setTimeout(() => {
                if (shouldShow) {
                    // Remove 'hidden' class to reveal the item with a fade-in effect
                    item.classList.remove('hidden');
                }
            }, 150); // Delay matches CSS transition duration (0.3s / 2 for smooth effect)
        });
    }

    // Function to implement lazy loading for images, improving initial page load performance
    function lazyLoadImages() {
        // Select all images within gallery items
        const images = document.querySelectorAll('.gallery-item img');
        
        // Create an IntersectionObserver to detect when images enter the viewport
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Check if the image is in the viewport
                if (entry.isIntersecting) {
                    const img = entry.target; // The image element
                    // Load the image by setting src (falls back to current src if no data-src)
                    img.src = img.dataset.src || img.src;
                    // Stop observing this image once loaded
                    observer.unobserve(img);
                }
            });
        });

        // Start observing each image for lazy loading
        images.forEach(img => observer.observe(img));
    }

    // Initialize the gallery on page load
    filterGallery(); // Apply the initial filter (shows all items)
    lazyLoadImages(); // Start lazy loading images
});