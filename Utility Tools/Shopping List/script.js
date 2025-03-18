class ShoppingList {
    constructor() {
        this.items = this.loadItemsFromStorage();
        this.editingId = null;
        
        // DOM Elements
        this.form = document.getElementById('itemForm');
        this.itemNameInput = document.getElementById('itemName');
        this.itemQuantityInput = document.getElementById('itemQuantity');
        this.submitBtn = document.getElementById('submitBtn');
        this.list = document.getElementById('shoppingList');

        this.setupEventListeners();
        this.renderList();
    }

    // LocalStorage Methods
    loadItemsFromStorage() {
        try {
            const storedItems = localStorage.getItem('shoppingList');
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.error('Error loading from LocalStorage:', error);
            return [];
        }
    }

    saveItemsToStorage() {
        try {
            localStorage.setItem('shoppingList', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving to LocalStorage:', error);
        }
    }

    // Event Listeners
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.itemNameInput.addEventListener('input', () => this.validateInput());
    }

    // Input Validation
    validateInput() {
        const name = this.itemNameInput.value.trim();
        this.submitBtn.disabled = !name || name.length > 50; // Max length for sanity
    }

    // Form Submission
    handleSubmit(e) {
        e.preventDefault();
        
        const name = this.itemNameInput.value.trim();
        const quantity = parseInt(this.itemQuantityInput.value);
        
        if (!this.isValidInput(name, quantity)) return;

        if (this.editingId === null) {
            this.addItem(name, quantity);
        } else {
            this.updateItem(name, quantity);
        }
        
        this.resetForm();
        this.renderList();
        this.saveItemsToStorage();
    }

    isValidInput(name, quantity) {
        return name && quantity > 0 && quantity <= 9999; // Reasonable quantity limit
    }

    addItem(name, quantity) {
        this.items.push({ id: Date.now(), name, quantity });
    }

    updateItem(name, quantity) {
        this.items = this.items.map(item =>
            item.id === this.editingId ? { ...item, name, quantity } : item
        );
    }

    // Edit and Delete Handlers
    handleEditItem(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) return;

        this.editingId = id;
        this.itemNameInput.value = item.name;
        this.itemQuantityInput.value = item.quantity;
        this.submitBtn.textContent = 'Update';
        this.submitBtn.classList.add('update');
        this.itemNameInput.focus();
    }

    handleDeleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        if (this.editingId === id) {
            this.resetForm();
        }
        this.renderList();
        this.saveItemsToStorage();
    }

    // Form Reset
    resetForm() {
        this.editingId = null;
        this.itemNameInput.value = '';
        this.itemQuantityInput.value = 1;
        this.submitBtn.textContent = 'Add Item';
        this.submitBtn.classList.remove('update');
        this.submitBtn.disabled = true; // Disable until valid input
    }

    // Rendering
    renderList() {
        this.list.innerHTML = '';
        
        this.items.forEach(item => {
            const li = this.createListItem(item);
            this.list.appendChild(li);
        });
    }

    createListItem(item) {
        const li = document.createElement('li');
        li.className = 'list-item';
        
        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'quantity';
        quantitySpan.textContent = `${item.quantity}x`;
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => this.handleEditItem(item.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.handleDeleteItem(item.id));
        
        li.append(quantitySpan, nameSpan, editBtn, deleteBtn);
        return li;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new ShoppingList();
    app.submitBtn.disabled = true; // Initial state
});