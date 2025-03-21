document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    const themeToggle = document.getElementById('theme-toggle');

    // Toggle event details
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
});