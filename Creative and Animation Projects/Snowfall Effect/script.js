document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('.snowfall-layer');
    let settings = {
        intensity: 100,
        speed: 5,
        wind: 20,
        color: '#ffffff'
    };

    function createSnowflake(layer) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';

        // Randomize properties
        const startX = Math.random() * 100; // Random horizontal start position
        const duration = (Math.random() * 5 + 5) / settings.speed * (layer.classList.contains('foreground') ? 1 : layer.classList.contains('midground') ? 1.5 : 2);
        const windOffset = (Math.random() - 0.5) * settings.wind * 2; // Wind effect
        const startY = Math.random() * 120 - 10; // Random vertical start position from -10vh to 110vh

        snowflake.style.left = `${startX}vw`;
        snowflake.style.top = `${startY}vh`; // Start at random height
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `0s`; // No delay, starts immediately
        snowflake.style.opacity = Math.random() * 0.5 + (layer.classList.contains('foreground') ? 0.4 : layer.classList.contains('midground') ? 0.2 : 0.1);
        snowflake.style.color = settings.color;
        snowflake.style.setProperty('--wind-offset', `${windOffset}vw`);

        layer.appendChild(snowflake);

        // Recreate snowflake after animation for continuous effect
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake(layer); // Recreate immediately
        });
    }

    function updateSnowfall() {
        layers.forEach(layer => {
            layer.innerHTML = ''; // Clear existing snowflakes
            const flakeCount = Math.floor(settings.intensity * (layer.classList.contains('foreground') ? 0.4 : layer.classList.contains('midground') ? 0.35 : 0.25));
            for (let i = 0; i < flakeCount; i++) {
                createSnowflake(layer);
            }
        });
    }

    // Initial snowfall
    updateSnowfall();

    // Control settings
    document.getElementById('intensity').addEventListener('input', (e) => {
        settings.intensity = parseInt(e.target.value);
        updateSnowfall();
    });

    document.getElementById('speed').addEventListener('input', (e) => {
        settings.speed = parseInt(e.target.value);
        updateSnowfall();
    });

    document.getElementById('wind').addEventListener('input', (e) => {
        settings.wind = parseInt(e.target.value);
        updateSnowfall();
    });

    document.getElementById('color').addEventListener('input', (e) => {
        settings.color = e.target.value;
        updateSnowfall();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSnowfall();
    });
});