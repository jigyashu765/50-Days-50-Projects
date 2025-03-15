class BMICalculator {
    constructor() {
        this.form = document.getElementById('bmi-form');
        this.heightInput = document.getElementById('height');
        this.weightInput = document.getElementById('weight');
        this.resultDiv = document.getElementById('result');
        this.bmiValueSpan = document.getElementById('bmi-value');
        this.bmiCategoryP = document.getElementById('bmi-category');
        this.resetButton = document.getElementById('reset-btn');
        this.heightError = document.getElementById('height-error');
        this.weightError = document.getElementById('weight-error');

        // Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit);
        this.resetButton.addEventListener('click', this.handleReset);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);

        if (this.validateInputs(height, weight)) {
            const bmi = this.calculateBMI(height, weight);
            const category = this.getBMICategory(bmi);
            this.displayResult(bmi, category);
        }
    }

    validateInputs(height, weight) {
        let isValid = true;

        if (isNaN(height)) {
            this.showError(this.heightError, 'Please enter a valid height');
            isValid = false;
        } else if (height <= 0) {
            this.showError(this.heightError, 'Height must be greater than 0');
            isValid = false;
        } else {
            this.hideError(this.heightError);
        }

        if (isNaN(weight)) {
            this.showError(this.weightError, 'Please enter a valid weight');
            isValid = false;
        } else if (weight <= 0) {
            this.showError(this.weightError, 'Weight must be greater than 0');
            isValid = false;
        } else {
            this.hideError(this.weightError);
        }

        return isValid;
    }

    showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    calculateBMI(height, weight) {
        // BMI = weight (kg) / (height (m) * height (m))
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal Weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    displayResult(bmi, category) {
        this.bmiValueSpan.textContent = bmi.toFixed(1);
        this.bmiCategoryP.textContent = `Category: ${category}`;
        
        this.resultDiv.classList.remove('hidden');
        setTimeout(() => {
            this.resultDiv.classList.add('visible');
        }, 10); // Small delay for transition to work
    }

    handleReset() {
        this.form.reset();
        this.resultDiv.classList.remove('visible');
        this.resultDiv.classList.add('hidden');
        this.hideError(this.heightError);
        this.hideError(this.weightError);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
});