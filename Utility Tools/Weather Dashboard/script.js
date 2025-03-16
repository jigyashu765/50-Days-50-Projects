class WeatherDashboard {
    constructor() {
        this.dashboard = document.querySelector('.weather-dashboard');
        this.tempToggle = document.querySelector('.temp-toggle');
        this.locationToggle = document.querySelector('.location-toggle');
        this.tempDisplay = document.querySelector('.temperature');
        this.unitDisplay = document.querySelector('.unit');
        this.cityName = document.querySelector('.city-name');
        this.weatherIcon = document.querySelector('.weather-icon');
        this.condition = document.querySelector('.condition');
        
        this.state = {
            isCelsius: true,
            currentLocation: 0,
            locations: [
                { city: 'New York', tempC: 22, tempF: 72, icon: '☀️', condition: 'Sunny' },
                { city: 'London', tempC: 15, tempF: 59, icon: '🌧️', condition: 'Rainy' },
                { city: 'Tokyo', tempC: 18, tempF: 64, icon: '⛅', condition: 'Partly Cloudy' },
                { city: 'Sydney', tempC: 28, tempF: 82, icon: '☀️', condition: 'Clear' },
                { city: 'Paris', tempC: 17, tempF: 63, icon: '🌥️', condition: 'Cloudy' },
                { city: 'Moscow', tempC: -2, tempF: 28, icon: '❄️', condition: 'Snowy' }
            ]
        };
        
        this.init();
    }

    init() {
        this.tempToggle.addEventListener('click', () => this.toggleTemperature());
        this.locationToggle.addEventListener('click', () => this.toggleLocation());
        this.updateDisplay();
    }

    toggleTemperature() {
        this.state.isCelsius = !this.state.isCelsius;
        this.updateDisplay();
    }

    toggleLocation() {
        this.state.currentLocation = (this.state.currentLocation + 1) % this.state.locations.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const current = this.state.locations[this.state.currentLocation];
        const temp = this.state.isCelsius ? current.tempC : current.tempF;
        const unit = this.state.isCelsius ? '°C' : '°F';

        this.cityName.textContent = current.city;
        this.tempDisplay.textContent = temp;
        this.unitDisplay.textContent = unit;
        this.weatherIcon.textContent = current.icon;
        this.condition.textContent = current.condition;

        // Animate update
        this.tempDisplay.parentElement.style.animation = 'pulse 0.3s';
        setTimeout(() => {
            this.tempDisplay.parentElement.style.animation = '';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});