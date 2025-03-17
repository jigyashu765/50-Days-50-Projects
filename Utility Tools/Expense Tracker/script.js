// State management
const state = {
    transactions: [],
    balance: 0,
};

// DOM elements
const elements = {
    balance: document.getElementById('balance'),
    transactionForm: document.getElementById('transactionForm'),
    description: document.getElementById('description'),
    amount: document.getElementById('amount'),
    type: document.getElementById('type'),
    category: document.getElementById('category'),
    transactionList: document.getElementById('transactionList'),
};

// Update balance
const updateBalance = () => {
    state.balance = state.transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
    elements.balance.textContent = state.balance.toFixed(2);
};

// Render transaction list
const renderTransactions = () => {
    elements.transactionList.innerHTML = '';
    state.transactions.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.type);
        li.innerHTML = `
            <span>${t.description} (${t.category})</span>
            <span>${t.type === 'income' ? '+' : '-'}₹${t.amount.toFixed(2)}</span>
        `;
        elements.transactionList.appendChild(li);
    });
    updateBalance();
};

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();
    const description = elements.description.value.trim();
    const amount = parseFloat(elements.amount.value);
    const type = elements.type.value;
    const category = elements.category.value;

    if (!description || isNaN(amount) || amount <= 0) return;

    state.transactions.push({ description, amount, type, category });
    renderTransactions();

    // Clear form
    elements.description.value = '';
    elements.amount.value = '';
};

// Event listeners
elements.transactionForm.addEventListener('submit', addTransaction);

// Initialize
renderTransactions();