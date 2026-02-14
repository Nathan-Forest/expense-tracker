/**
 * Expense Tracker Application
 * Manages expenses with categories, filtering, and local storage
 */

// ============================================
// STATE MANAGEMENT
// ============================================

// This is our "database" - an array of expense objects
let expenses = [];

// Currently selected filter category
let currentFilter = 'all';

// ============================================
// DOM ELEMENTS - Get references to HTML elements
// ============================================

// Form elements
const expenseForm = document.getElementById('expense-form');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const descriptionInput = document.getElementById('expense-description');
const dateInput = document.getElementById('expense-date');

// Display elements
const expensesList = document.getElementById('expenses-list');
const totalAmountElement = document.getElementById('total-amount');
const monthAmountElement = document.getElementById('month-amount');
const expenseCountElement = document.getElementById('expense-count');

// Filter buttons
const filterButtons = document.querySelectorAll('.btn-filter');

// ============================================
// INITIALIZE APP
// ============================================

// Set today's date as default in the date input
dateInput.valueAsDate = new Date();

// Add event listeners
expenseForm.addEventListener('submit', handleAddExpense);

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
});

console.log('💰 Expense Tracker initialized!');
// ============================================
// EXPENSE CLASS - Blueprint for expense objects
// ============================================

class Expense {
    constructor(amount, category, description, date) {
        this.id = Date.now().toString(); // Unique ID based on timestamp
        this.amount = parseFloat(amount);
        this.category = category;
        this.description = description;
        this.date = date;
        this.createdAt = new Date().toISOString();
    }

    // Format amount as currency
    getFormattedAmount() {
        return `$${this.amount.toFixed(2)}`;
    }

    // Get category emoji
    getCategoryEmoji() {
        const emojis = {
            'food': '🍕',
            'transport': '🚗',
            'entertainment': '🎬',
            'shopping': '🛍️',
            'bills': '💡',
            'health': '🏥',
            'other': '📦'
        };
        return emojis[this.category] || '📦';
    }

    // Get formatted date
    getFormattedDate() {
        const d = new Date(this.date);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    }
}
// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle adding a new expense
 */
function handleAddExpense(event) {
    // Prevent form from refreshing the page
    event.preventDefault();

    // Get values from form
    const amount = amountInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    // Validate amount
    if (amount <= 0) {
        alert('Amount must be greater than 0!');
        return;
    }

    // Create new expense object
    const expense = new Expense(amount, category, description, date);

    // Add to expenses array
    expenses.push(expense);

    // Update the display
    renderExpenses();
    updateSummary();

    // Clear the form
    expenseForm.reset();
    dateInput.valueAsDate = new Date(); // Reset date to today

    // Show success feedback
    console.log('✅ Expense added:', expense);
}
// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Render all expenses to the page
 */
function renderExpenses() {
    // Filter expenses based on current filter
    const filteredExpenses = currentFilter === 'all' 
        ? expenses 
        : expenses.filter(exp => exp.category === currentFilter);

    // Clear the list
    expensesList.innerHTML = '';

    // If no expenses, show empty state
    if (filteredExpenses.length === 0) {
        expensesList.innerHTML = `
            <p class="empty-state">
                ${currentFilter === 'all' 
                    ? 'No expenses yet. Add your first expense above! 👆' 
                    : `No ${currentFilter} expenses found. Try a different filter!`}
            </p>
        `;
        return;
    }

    // Create expense cards
    filteredExpenses.forEach(expense => {
        const expenseCard = createExpenseCard(expense);
        expensesList.appendChild(expenseCard);
    });
}

/**
 * Create an expense card element
 */
function createExpenseCard(expense) {
    const card = document.createElement('div');
    card.className = 'expense-card';
    card.innerHTML = `
        <div class="expense-icon">${expense.getCategoryEmoji()}</div>
        <div class="expense-details">
            <h4>${expense.description}</h4>
            <p class="expense-category">${expense.category}</p>
            <p class="expense-date">${expense.getFormattedDate()}</p>
        </div>
        <div class="expense-amount">${expense.getFormattedAmount()}</div>
        <button class="btn-delete" onclick="deleteExpense('${expense.id}')">🗑️</button>
    `;
    return card;
}

/**
 * Delete an expense
 */
function deleteExpense(id) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }

    // Remove from array
    expenses = expenses.filter(exp => exp.id !== id);

    // Update display
    renderExpenses();
    updateSummary();

    console.log('🗑️ Expense deleted');
}
/**
 * Update summary statistics
 */
function updateSummary() {
    // Calculate total
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate this month's total
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthTotal = expenses
        .filter(exp => {
            const expDate = new Date(exp.date);
            return expDate.getMonth() === currentMonth && 
                   expDate.getFullYear() === currentYear;
        })
        .reduce((sum, exp) => sum + exp.amount, 0);

    // Update display
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
    monthAmountElement.textContent = `$${monthTotal.toFixed(2)}`;
    expenseCountElement.textContent = expenses.length;
}
/**
 * Handle filter button clicks
 */
function handleFilterClick(event) {
    const button = event.target;
    const category = button.getAttribute('data-category');

    // Update current filter
    currentFilter = category;

    // Update button styles
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Re-render expenses
    renderExpenses();
}