document.addEventListener('DOMContentLoaded', () => {
    // Ripple Effect Handler for Click
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--ripple-x', `${x}px`);
            this.style.setProperty('--ripple-y', `${y}px`);
        });
    });

    // Animation Speed Control
    const speedSlider = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    const buttons = document.querySelectorAll('.btn');

    speedSlider.addEventListener('input', function() {
        const speed = this.value;
        speedValue.textContent = `${speed}x`;
        
        buttons.forEach(button => {
            button.style.setProperty('--animation-speed', speed);
            
            // Update specific animations
            if (button.classList.contains('ripple-btn')) {
                button.style.animationDuration = `${0.6 / speed}s`; // For click
            }
            if (button.classList.contains('bounce-btn')) {
                button.style.animationDuration = `${0.5 / speed}s`;
            }
        });
        
        // Update hover ripple speed via CSS rule
        const styleSheet = document.styleSheets[0];
        const ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => 
            rule.selectorText === '.ripple-btn:hover::before'
        );
        if (ruleIndex !== -1) {
            styleSheet.deleteRule(ruleIndex);
        }
        styleSheet.insertRule(`
            .ripple-btn:hover::before {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: rippleHover ${1.5 / speed}s infinite linear;
                pointer-events: none;
            }
        `, styleSheet.cssRules.length);
    });

    // Initial CSS custom properties for ripple click position
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .ripple-btn::after {
            left: var(--ripple-x);
            top: var(--ripple-y);
            animation-duration: calc(0.6s / var(--animation-speed, 1));
        }
    `, styleSheet.cssRules.length);
});