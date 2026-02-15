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
// LOCAL STORAGE FUNCTIONS
// ============================================

/**
 * Save expenses to localStorage
 */
function saveToLocalStorage() {
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log('💾 Saved to localStorage:', expenses.length, 'expenses');
    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
        alert('Failed to save expenses. Storage might be full.');
    }
}

/**
 * Load expenses from localStorage
 */
function loadFromLocalStorage() {
    try {
        const stored = localStorage.getItem('expenses');
        
        if (stored) {
            // Parse JSON string back to array
            const parsed = JSON.parse(stored);
            
            // Recreate Expense objects (they lost their methods when stored)
            expenses = parsed.map(data => {
                const expense = new Expense(
                    data.amount,
                    data.category,
                    data.description,
                    data.date
                );
                // Preserve the original ID and timestamps
                expense.id = data.id;
                expense.createdAt = data.createdAt;
                return expense;
            });
            
            console.log('📂 Loaded from localStorage:', expenses.length, 'expenses');
        } else {
            console.log('📂 No saved expenses found');
        }
    } catch (error) {
        console.error('❌ Error loading from localStorage:', error);
        expenses = []; // Reset to empty if there's an error
    }
}

/**
 * Clear all expenses (useful for testing)
 */
function clearAllExpenses() {
    if (confirm('Are you sure you want to delete ALL expenses? This cannot be undone!')) {
        expenses = [];
        localStorage.removeItem('expenses');
        renderExpenses();
        updateSummary();
        console.log('🗑️ All expenses cleared');
    }
}
// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle adding a new expense
 */
function handleAddExpense(event) {
    event.preventDefault();

    const amount = amountInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    if (amount <= 0) {
        alert('Amount must be greater than 0!');
        return;
    }

    const expense = new Expense(amount, category, description, date);
    expenses.push(expense);

    // 💾 SAVE TO LOCALSTORAGE
    saveToLocalStorage();

    renderExpenses();
    updateSummary();

    expenseForm.reset();
    dateInput.valueAsDate = new Date();

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
function handleAddExpense(event) {
    event.preventDefault();

    const amount = amountInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    if (amount <= 0) {
        alert('Amount must be greater than 0!');
        return;
    }

    const expense = new Expense(amount, category, description, date);
    expenses.push(expense);

    // 💾 SAVE TO LOCALSTORAGE
    saveToLocalStorage();

    renderExpenses();
    updateSummary();

    expenseForm.reset();
    dateInput.valueAsDate = new Date();

    console.log('✅ Expense added:', expense);
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

// ============================================
// CATEGORY BREAKDOWN & INSIGHTS
// ============================================

/**
 * Calculate spending by category
 */
function calculateCategoryBreakdown() {
    const breakdown = {};
    let total = 0;

    // Calculate totals per category
    expenses.forEach(expense => {
        if (!breakdown[expense.category]) {
            breakdown[expense.category] = 0;
        }
        breakdown[expense.category] += expense.amount;
        total += expense.amount;
    });

    // Convert to array with percentages
    const categories = Object.keys(breakdown).map(category => ({
        category: category,
        amount: breakdown[category],
        percentage: total > 0 ? (breakdown[category] / total * 100) : 0,
        emoji: getCategoryEmoji(category)
    }));

    // Sort by amount (highest first)
    categories.sort((a, b) => b.amount - a.amount);

    return { categories, total };
}

/**
 * Get emoji for category
 */
function getCategoryEmoji(category) {
    const emojis = {
        'food': '🍕',
        'transport': '🚗',
        'entertainment': '🎬',
        'shopping': '🛍️',
        'bills': '💡',
        'health': '🏥',
        'other': '📦'
    };
    return emojis[category] || '📦';
}

/**
 * Render category breakdown visualization
 */
function renderCategoryBreakdown() {
    const categoryBarsContainer = document.getElementById('category-bars');
    const { categories, total } = calculateCategoryBreakdown();

    // Clear container
    categoryBarsContainer.innerHTML = '';

    // If no expenses, show empty state
    if (categories.length === 0) {
        categoryBarsContainer.innerHTML = '<p class="empty-state">Add expenses to see category breakdown</p>';
        return;
    }

    // Create a bar for each category
    categories.forEach(cat => {
        const barItem = document.createElement('div');
        barItem.className = 'category-bar-item';
        
        barItem.innerHTML = `
            <div class="category-bar-header">
                <div class="category-info">
                    <span class="category-emoji">${cat.emoji}</span>
                    <span class="category-name">${cat.category}</span>
                    <span class="category-amount">$${cat.amount.toFixed(2)}</span>
                </div>
                <span class="category-percentage">${cat.percentage.toFixed(1)}%</span>
            </div>
            <div class="bar-container">
                <div class="bar-fill bar-${cat.category}" style="width: ${cat.percentage}%"></div>
            </div>
        `;
        
        categoryBarsContainer.appendChild(barItem);
    });
}
/**
 * Export expenses to CSV file
 */
function exportToCSV() {
    if (expenses.length === 0) {
        alert('No expenses to export!');
        return;
    }

    // CSV Headers
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    
    // Convert expenses to CSV rows
    const rows = expenses.map(expense => [
        expense.date,
        expense.category,
        expense.description,
        expense.amount.toFixed(2)
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create a Blob (file in memory)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 Expenses exported to CSV');
}

/**
 * Calculate and display spending insights
 */
function renderInsights() {
    const insightsContainer = document.getElementById('insights-container');
    
    if (expenses.length < 2) {
        insightsContainer.innerHTML = '<p class="empty-state">Add more expenses to see insights</p>';
        return;
    }
    
    insightsContainer.innerHTML = '';
    
    const insights = calculateInsights();
    
    // Create insight cards
    insights.forEach(insight => {
        const card = document.createElement('div');
        card.className = 'insight-card';
        card.innerHTML = `
            <h4>${insight.title}</h4>
            <div class="insight-value">${insight.value}</div>
            <div class="insight-description">${insight.description}</div>
        `;
        insightsContainer.appendChild(card);
    });
}

/**
 * Calculate insights from expense data
 */
function calculateInsights() {
    const insights = [];
    const { categories } = calculateCategoryBreakdown();
    
    // Most expensive category
    if (categories.length > 0) {
        const topCategory = categories[0];
        insights.push({
            title: 'Top Spending Category',
            value: `${topCategory.emoji} ${topCategory.category}`,
            description: `$${topCategory.amount.toFixed(2)} (${topCategory.percentage.toFixed(1)}% of total)`
        });
    }
    
    // Average expense amount
    const avgExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length;
    insights.push({
        title: 'Average Expense',
        value: `$${avgExpense.toFixed(2)}`,
        description: `Across ${expenses.length} transactions`
    });
    
    // Largest single expense
    const largestExpense = expenses.reduce((max, exp) => 
        exp.amount > max.amount ? exp : max
    , expenses[0]);
    insights.push({
        title: 'Largest Expense',
        value: `$${largestExpense.amount.toFixed(2)}`,
        description: `${largestExpense.description} (${largestExpense.category})`
    });
    
    // Calculate daily average for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthExpenses = expenses.filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    
    if (monthExpenses.length > 0) {
        const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const today = new Date().getDate();
        const dailyAvg = monthTotal / today;
        insights.push({
            title: 'Daily Average (This Month)',
            value: `$${dailyAvg.toFixed(2)}`,
            description: `Based on ${today} days in ${new Date().toLocaleDateString('en-US', { month: 'long' })}`
        });
    }
    
    return insights;
}
// ============================================
// INITIALIZE APP
// ============================================

// Load expenses from localStorage
loadFromLocalStorage();''

// Set today's date as default in the date input
dateInput.valueAsDate = new Date();

// Add event listeners
expenseForm.addEventListener('submit', handleAddExpense);

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
});

// Initial render
renderExpenses();
renderCategoryBreakdown();
renderInsights();
updateSummary();

console.log('💰 Expense Tracker initialized!');