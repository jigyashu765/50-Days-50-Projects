class FormValidator {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.usernameError = document.getElementById('usernameError');
        this.passwordError = document.getElementById('passwordError');
        this.successMessage = document.getElementById('successMessage');
        this.submitBtn = document.getElementById('submitBtn');

        this.state = {
            isValid: false,
            errors: {}
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.username.addEventListener('input', () => this.validateField('username'));
        this.password.addEventListener('input', () => this.validateField('password'));
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        let isValid = true;
        const errors = { ...this.state.errors };

        if (field === 'username') {
            const value = this.username.value.trim();
            if (!value) {
                errors.username = 'Username is required';
                isValid = false;
            } else if (value.length < 3) {
                errors.username = 'Username must be at least 3 characters';
                isValid = false;
            } else {
                delete errors.username;
            }
            this.updateError('username', errors.username);
        }

        if (field === 'password') {
            const value = this.password.value.trim();
            if (!value) {
                errors.password = 'Password is required';
                isValid = false;
            } else if (value.length < 6) {
                errors.password = 'Password must be at least 6 characters';
                isValid = false;
            } else if (!this.hasUpperCase(value)) {
                errors.password = 'Password must contain at least one uppercase letter';
                isValid = false;
            } else if (!this.hasLowerCase(value)) {
                errors.password = 'Password must contain at least one lowercase letter';
                isValid = false;
            } else if (!this.hasNumber(value)) {
                errors.password = 'Password must contain at least one number';
                isValid = false;
            } else if (!this.hasSpecialChar(value)) {
                errors.password = 'Password must contain at least one special character';
                isValid = false;
            } else {
                delete errors.password;
            }
            this.updateError('password', errors.password);
        }

        this.state = {
            ...this.state,
            isValid: Object.keys(errors).length === 0,
            errors
        };
        this.toggleSubmitButton();
    }

    // Helper methods for password validation
    hasUpperCase(str) {
        return /[A-Z]/.test(str);
    }

    hasLowerCase(str) {
        return /[a-z]/.test(str);
    }

    hasNumber(str) {
        return /[0-9]/.test(str);
    }

    hasSpecialChar(str) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }

    updateError(field, message) {
        const errorElement = field === 'username' ? this.usernameError : this.passwordError;
        if (message) {
            errorElement.textContent = message;
            errorElement.classList.add('active');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('active');
        }
    }

    toggleSubmitButton() {
        this.submitBtn.disabled = !this.state.isValid;
    }

    validateForm() {
        // Re-validate all fields
        this.validateField('username');
        this.validateField('password');
        return this.state.isValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.successMessage.textContent = 'Login successful!';
            this.successMessage.classList.add('active');
            this.form.reset();
            setTimeout(() => {
                this.successMessage.classList.remove('active');
            }, 2000);
        } else {
            console.log('Form is invalid. Please check errors.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new FormValidator());