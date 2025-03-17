// Conversion data
const conversionRates = {
    length: {
        units: ['meters', 'kilometers', 'centimeters', 'inches', 'feet'],
        rates: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            inches: 39.3701,
            feet: 3.28084,
        },
        baseUnit: 'meters', // Base unit for length
    },
    weight: {
        units: ['grams', 'kilograms', 'pounds', 'ounces'],
        rates: {
            grams: 1,
            kilograms: 0.001,
            pounds: 0.00220462,
            ounces: 0.035274,
        },
        baseUnit: 'grams', // Base unit for weight
    },
    volume: {
        units: ['liters', 'milliliters', 'gallons', 'cubic inches'],
        rates: {
            liters: 1,
            milliliters: 1000,
            gallons: 0.264172,
            'cubic inches': 61.0237,
        },
        baseUnit: 'liters', // Base unit for volume
    },
};

// State management
const state = {
    category: 'length',
    inputUnit: 'meters', // Default input unit
    outputUnit: 'feet', // Default output unit
    inputValue: 0,
};

// DOM elements
const elements = {
    inputValue: document.getElementById('inputValue'),
    outputValue: document.getElementById('outputValue'),
    inputUnit: document.getElementById('inputUnit'),
    outputUnit: document.getElementById('outputUnit'),
    categoryButtons: document.querySelectorAll('.category-btn'),
};

// Populate dropdowns with units
const populateUnits = (category) => {
    const { units, baseUnit } = conversionRates[category];
    elements.inputUnit.innerHTML = '';
    elements.outputUnit.innerHTML = '';

    units.forEach(unit => {
        const option1 = new Option(unit, unit);
        const option2 = new Option(unit, unit);
        elements.inputUnit.add(option1);
        elements.outputUnit.add(option2);
    });

    // Set default units
    state.inputUnit = baseUnit;
    state.outputUnit = units.find(unit => unit !== baseUnit); // Set output unit to a non-base unit
    elements.inputUnit.value = state.inputUnit;
    elements.outputUnit.value = state.outputUnit;
};

// Convert units
const convertUnits = () => {
    const { rates, baseUnit } = conversionRates[state.category];
    const inputValue = parseFloat(elements.inputValue.value) || 0;

    // Convert input value to base unit
    const valueInBaseUnit = inputValue / rates[state.inputUnit];

    // Convert base unit value to output unit
    const outputValue = valueInBaseUnit * rates[state.outputUnit];

    // Update output value
    elements.outputValue.value = outputValue.toFixed(2);
};

// Event handlers
const updateCategory = (category) => {
    state.category = category;
    elements.categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
    populateUnits(category);
    convertUnits();
};

const updateInputValue = (value) => {
    state.inputValue = parseFloat(value) || 0;
    convertUnits();
};

const updateUnit = (type, value) => {
    state[type] = value;
    convertUnits();
};

// Event listeners
elements.categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => updateCategory(btn.dataset.category));
});

elements.inputValue.addEventListener('input', (e) => updateInputValue(e.target.value));
elements.inputUnit.addEventListener('change', (e) => updateUnit('inputUnit', e.target.value));
elements.outputUnit.addEventListener('change', (e) => updateUnit('outputUnit', e.target.value));

// Initialize
populateUnits(state.category);
convertUnits();