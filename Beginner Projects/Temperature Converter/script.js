function convertToFahrenheit() {
    const celsius = document.getElementById('celsius').value;
    const fahrenheit = (celsius * 9/5) + 32;
    document.getElementById('result').innerText = `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
}

function convertToCelsius() {
    const fahrenheit = document.getElementById('fahrenheit').value;
    const celsius = (fahrenheit - 32) * 5/9;
    document.getElementById('result').innerText = `${fahrenheit}°F is ${celsius.toFixed(2)}°C`;
}
