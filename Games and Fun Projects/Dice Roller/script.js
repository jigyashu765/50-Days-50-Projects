class DiceRoller {
    constructor() {
        this.container = document.querySelector('.dice-roller');
        this.diceContainer = document.querySelector('.dice-container');
        this.rollBtn = document.querySelector('.roll-btn');
        this.soundBtn = document.querySelector('.sound-btn');
        this.diceCount = document.querySelector('#dice-count');
        this.totalDisplay = document.querySelector('.total');
        this.historyList = document.querySelector('.history-list');
        this.audioContext = null;
        this.state = { rolling: false, soundEnabled: true };
        this.init();
    }

    init() {
        this.rollBtn.addEventListener('click', () => this.rollDice());
        this.soundBtn.addEventListener('click', () => this.toggleSound());
        this.renderDice(1); // Initial render with 1 die
    }

    renderDice(count) {
        this.diceContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const die = document.createElement('div');
            die.classList.add('die');
            die.textContent = '1';
            this.diceContainer.appendChild(die);
        }
    }

    rollDice() {
        if (this.state.rolling) return;
        this.state.rolling = true;
        this.rollBtn.disabled = true;

        const count = parseInt(this.diceCount.value);
        this.renderDice(count);
        const dice = document.querySelectorAll('.die');
        
        // Start rolling animation and sound
        dice.forEach(die => die.classList.add('rolling'));
        if (this.state.soundEnabled) this.playRollSound();

        let rolls = 0;
        const interval = setInterval(() => {
            let total = 0;
            dice.forEach(die => {
                const value = Math.floor(Math.random() * 6) + 1;
                die.textContent = value;
                total += value;
            });
            this.totalDisplay.textContent = total;
            rolls++;

            if (rolls >= 10) { // Simulate rolling for ~1 second
                clearInterval(interval);
                dice.forEach(die => die.classList.remove('rolling'));
                this.state.rolling = false;
                this.rollBtn.disabled = false;
                this.addToHistory(total);
            }
        }, 100);
    }

    playRollSound() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
        oscillator.stop(this.audioContext.currentTime + 1);
    }

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        this.soundBtn.classList.toggle('muted', !this.state.soundEnabled);
    }

    addToHistory(total) {
        const li = document.createElement('li');
        li.textContent = `Roll: ${total}`;
        this.historyList.appendChild(li);
        this.historyList.scrollTop = this.historyList.scrollHeight; // Auto-scroll to latest roll
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DiceRoller();
});