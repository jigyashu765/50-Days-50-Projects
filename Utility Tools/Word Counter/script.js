class WordCounter {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.wordCountElement = document.getElementById('wordCount');
        this.charCountElement = document.getElementById('charCount');
        this.clearBtn = document.getElementById('clearBtn');

        this.state = {
            text: '',
            wordCount: 0,
            charCount: 0
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.textInput.addEventListener('input', (e) => this.handleInput(e));
        this.clearBtn.addEventListener('click', () => this.clearText());
    }

    handleInput(e) {
        const text = e.target.value;
        this.state.text = text;

        // Count words (split by whitespace and filter out empty strings)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        this.state.wordCount = text.trim() ? words.length : 0;

        // Count characters (including spaces and newlines)
        this.state.charCount = text.length;

        this.updateDisplay();
    }

    updateDisplay() {
        this.wordCountElement.textContent = this.state.wordCount;
        this.charCountElement.textContent = this.state.charCount;
    }

    clearText() {
        this.state = {
            text: '',
            wordCount: 0,
            charCount: 0
        };
        this.textInput.value = '';
        this.updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => new WordCounter());