class Accordion {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const isOpen = header.getAttribute('aria-expanded') === 'true';

        // Close all other items
        this.closeAllExcept(item);

        if (!isOpen) {
            header.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            header.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0';
        }
    }

    closeAllExcept(exceptItem) {
        this.items.forEach(item => {
            if (item !== exceptItem) {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
            }
        });
    }
}

// Initialize accordion when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.querySelector('.accordion-container');
    if (accordionContainer) {
        new Accordion(accordionContainer);
    }
});