class PasswordGenerator {
    constructor() {
        // DOM Elements
        this.passwordInput = document.getElementById('password');
        this.copyBtn = document.getElementById('copyBtn');
        this.lengthInput = document.getElementById('length');
        this.lengthValue = document.getElementById('lengthValue');
        this.uppercaseCheckbox = document.getElementById('uppercase');
        this.lowercaseCheckbox = document.getElementById('lowercase');
        this.numbersCheckbox = document.getElementById('numbers');
        this.symbolsCheckbox = document.getElementById('symbols');
        this.generateBtn = document.getElementById('generateBtn');
        this.message = document.getElementById('message');

        // Initial State
        this.state = {
            length: 8,
            useUppercase: true,
            useLowercase: true,
            useNumbers: true,
            useSymbols: true
        };

        // Setup Event Listeners
        this.setupEventListeners();
        this.updateLengthDisplay();
        this.generatePassword();
    }

    setupEventListeners() {
        // Length Slider
        this.lengthInput.addEventListener('input', (e) => {
            this.state.length = Number(e.target.value);
            this.updateLengthDisplay();
            this.generatePassword();
        });

        // Checkboxes
        this.uppercaseCheckbox.addEventListener('change', (e) => {
            this.state.useUppercase = e.target.checked;
            this.generatePassword();
        });
        this.lowercaseCheckbox.addEventListener('change', (e) => {
            this.state.useLowercase = e.target.checked;
            this.generatePassword();
        });
        this.numbersCheckbox.addEventListener('change', (e) => {
            this.state.useNumbers = e.target.checked;
            this.generatePassword();
        });
        this.symbolsCheckbox.addEventListener('change', (e) => {
            this.state.useSymbols = e.target.checked;
            this.generatePassword();
        });

        // Generate Button
        this.generateBtn.addEventListener('click', () => this.generatePassword());

        // Copy Button
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    updateLengthDisplay() {
        this.lengthValue.textContent = this.state.length;
    }

    generatePassword() {
        const { length, useUppercase, useLowercase, useNumbers, useSymbols } = this.state;
        let charset = '';
        let password = '';

        // Build character set based on selected options
        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) charset += '0123456789';
        if (useSymbols) charset += '!@#$%';

        // Validate at least one option is selected
        if (charset.length === 0) {
            this.passwordInput.value = '';
            this.message.textContent = 'Please select at least one character type';
            this.message.style.color = '#e74c3c';
            this.message.style.display = 'block';
            return;
        }

        // Generate password
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        this.passwordInput.value = password;
        this.message.style.display = 'none';
    }

    copyToClipboard() {
        if (this.passwordInput.value) {
            this.passwordInput.select();
            document.execCommand('copy');
            this.message.textContent = 'Copied to clipboard!';
            this.message.style.color = '#2ecc71';
            this.message.style.display = 'block';
            setTimeout(() => {
                this.message.style.display = 'none';
            }, 2000);
        } else {
            this.message.textContent = 'No password to copy';
            this.message.style.color = '#e74c3c';
            this.message.style.display = 'block';
            setTimeout(() => {
                this.message.style.display = 'none';
            }, 2000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new PasswordGenerator());