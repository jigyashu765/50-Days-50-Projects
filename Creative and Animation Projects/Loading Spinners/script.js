document.addEventListener('DOMContentLoaded', () => {
    const toggleSpinnerBtn = document.getElementById('toggleSpinner');
    const spinnerSelect = document.getElementById('spinnerSelect');
    const speedRange = document.getElementById('speedRange');
    const speedDisplay = document.getElementById('speedDisplay');
    const spinners = {
        circle: document.getElementById('circleSpinner'),
        bar: document.getElementById('barSpinner'),
        wave: document.getElementById('waveSpinner')
    };

    let isSpinning = false;
    let currentSpinner = 'circle';

    // Update speed display and spinner animation duration
    speedRange.addEventListener('input', () => {
        const speed = speedRange.value;
        speedDisplay.textContent = `${speed}s`;
        speedDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => speedDisplay.style.transform = 'scale(1)', 200);
        updateSpinnerSpeed(speed);
    });

    function updateSpinnerSpeed(speed) {
        const duration = `${speed}s`;
        spinners.circle.querySelector('.circle-inner').style.animationDuration = duration;
        spinners.bar.querySelector('.bar-inner').style.animationDuration = duration;
        spinners.wave.querySelectorAll('.dot').forEach(dot => {
            dot.style.animationDuration = duration;
        });
    }

    // Show selected spinner
    function showSpinner(type) {
        Object.values(spinners).forEach(spinner => {
            spinner.classList.add('hidden');
            spinner.classList.remove('active');
        });
        spinners[type].classList.remove('hidden');
        spinners[type].classList.add('active');
        currentSpinner = type;
    }

    spinnerSelect.addEventListener('change', () => {
        if (isSpinning) {
            showSpinner(spinnerSelect.value);
        }
    });

    // Toggle spinner visibility and animation
    toggleSpinnerBtn.addEventListener('click', () => {
        isSpinning = !isSpinning;
        toggleSpinnerBtn.textContent = isSpinning ? 'Stop Spinner' : 'Start Spinner';
        toggleSpinnerBtn.classList.toggle('active', isSpinning);

        if (isSpinning) {
            showSpinner(spinnerSelect.value);
            toggleSpinnerBtn.style.transform = 'scale(1.05)';
            setTimeout(() => toggleSpinnerBtn.style.transform = 'scale(1)', 200);

            // Auto-stop after 5 seconds (optional)
            setTimeout(() => {
                if (isSpinning) {
                    toggleSpinner();
                }
            }, 10000);
        } else {
            Object.values(spinners).forEach(spinner => {
                spinner.classList.add('hidden');
                spinner.classList.remove('active');
            });
        }
    });

    function toggleSpinner() {
        isSpinning = false;
        toggleSpinnerBtn.textContent = 'Start Spinner';
        toggleSpinnerBtn.classList.remove('active');
        Object.values(spinners).forEach(spinner => {
            spinner.classList.add('hidden');
            spinner.classList.remove('active');
        });
    }

    // Initialize with all spinners hidden
    Object.values(spinners).forEach(spinner => spinner.classList.add('hidden'));
    updateSpinnerSpeed(1);
});