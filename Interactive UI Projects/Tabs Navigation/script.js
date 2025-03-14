class TabsNavigation {
    constructor() {
        this.tabsContainer = document.querySelector('.tabs-container');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.tabIndicator = document.querySelector('.tab-indicator');
        this.activeTab = this.tabButtons[0].dataset.tab;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateIndicator(this.tabButtons[0]);
    }

    setupEventListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => this.handleTabClick(button), { passive: true });
        });

        // Optimize for resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.updateIndicator(this.getActiveButton()), 100);
        }, { passive: true });
    }

    handleTabClick(button) {
        if (button.dataset.tab === this.activeTab) return;

        this.activeTab = button.dataset.tab;
        this.updateActiveTab();
        this.updateIndicator(button);
    }

    updateActiveTab() {
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));

        const activeButton = this.getActiveButton();
        const activePane = document.getElementById(this.activeTab);

        activeButton.classList.add('active');
        activePane.classList.add('active');
    }

    getActiveButton() {
        return document.querySelector(`.tab-btn[data-tab="${this.activeTab}"]`);
    }

    updateIndicator(button) {
        const rect = button.getBoundingClientRect();
        const containerRect = this.tabsContainer.getBoundingClientRect();

        this.tabIndicator.style.width = `${rect.width}px`;
        this.tabIndicator.style.left = `${rect.left - containerRect.left}px`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TabsNavigation();
});