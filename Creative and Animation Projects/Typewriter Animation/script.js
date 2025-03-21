document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const typewriter = document.getElementById('typewriter');
    const speedInput = document.getElementById('speed');
    const loopCheckbox = document.getElementById('loop');
    const pauseResumeBtn = document.getElementById('pauseResume');

    // Sentences to type
    const sentences = [
        "Welcome to the typewriter effect.",
        "This is a premium animation.",
        "Enjoy the smooth typing experience!"
    ];

    // State
    let currentSentence = 0;
    let charIndex = 0;
    let typingSpeed = parseInt(speedInput.value);
    let isPaused = false;
    let animationFrame;

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';

    // Typewriter function
    function type() {
        if (isPaused) return;

        const text = sentences[currentSentence];
        if (charIndex < text.length) {
            typewriter.textContent = text.substring(0, charIndex + 1);
            typewriter.appendChild(cursor); // Add cursor after text
            charIndex++;
            animationFrame = setTimeout(type, typingSpeed);
        } else {
            // Keep cursor visible during pause
            typewriter.appendChild(cursor);
            setTimeout(() => {
                typewriter.textContent = '';
                charIndex = 0;
                currentSentence = (currentSentence + 1) % sentences.length;
                if (currentSentence === 0 && !loopCheckbox.checked) {
                    typewriter.appendChild(cursor); // Keep cursor at end
                    return; // Stop if no loop
                }
                type();
            }, 1500); // Delay between sentences
        }
    }

    // Speed adjustment
    speedInput.addEventListener('input', () => {
        typingSpeed = parseInt(speedInput.value);
    });

    // Pause/Resume toggle
    pauseResumeBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseResumeBtn.textContent = isPaused ? 'Resume' : 'Pause';
        if (!isPaused) type();
        else clearTimeout(animationFrame);
    });

    // Start typing
    type();

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        clearTimeout(animationFrame);
    });
});