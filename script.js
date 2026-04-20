// create functionality to add expense with amount and category and display in list
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// calculate total expense per category and display
let totalExpenses = {};

function updateTotals() {
    const items = expenseList.getElementsByTagName('li');
    totalExpenses = {};
    for (let item of items) {
        const text = item.textContent;
        const categoryEnd = text.indexOf(': $');
        const category = text.substring(0, categoryEnd);
        const amountStart = categoryEnd + 3;
        const amountEnd = text.indexOf(' (', amountStart);
        const amount = parseFloat(text.substring(amountStart, amountEnd));
        if (totalExpenses[category]) {
            totalExpenses[category] += amount;
        } else {
            totalExpenses[category] = amount;
        }
    }
    displayTotalExpenses();
}

function checkExpenseLimit() {
    const limitInput = document.getElementById('expense-limit');
    const limit = parseFloat(limitInput.value);
    if (isNaN(limit)) return;
    let totalExpense = 0;
    for (const category in totalExpenses) {
        totalExpense += totalExpenses[category];
    }
    if (totalExpense > limit) {
        alert(`Total expense of $${totalExpense.toFixed(2)} exceeds the limit of $${limit.toFixed(2)}!`);
    }
}

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    if (amount && category && date) {
        const expenseItem = document.createElement('li');
        expenseItem.textContent = `${category}: $${amount} (${date})`;
        expenseItem.setAttribute('data-date', date);
        expenseList.appendChild(expenseItem);
        expenseForm.reset();
        updateTotals();
        checkExpenseLimit();
    }
});
function displayTotalExpenses() {
    const totalExpenseList = document.getElementById('total-expense-list');
    totalExpenseList.innerHTML = '';
    for (const category in totalExpenses) {
        const totalItem = document.createElement('li');
        totalItem.textContent = `${category}: $${totalExpenses[category].toFixed(2)}`;
        totalExpenseList.appendChild(totalItem);
    }
}

function checkExpenseLimit() {
    const limitInput = document.getElementById('expense-limit');
    const limit = parseFloat(limitInput.value);
    if (isNaN(limit)) return;
    let totalExpense = 0;
    for (const category in totalExpenses) {
        totalExpense += totalExpenses[category];
    }
    if (totalExpense > limit) {
        alert(`Total expense of $${totalExpense.toFixed(2)} exceeds the limit of $${limit.toFixed(2)}!`);
    }
}
// filter expenses by date and show weekly summary
const dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const items = expenseList.getElementsByTagName('li');
    const filteredExpenses = [];
    for (let item of items) {
        const text = item.textContent;
        const categoryEnd = text.indexOf(': $');
        const category = text.substring(0, categoryEnd);
        const amountStart = categoryEnd + 3;
        const amountEnd = text.indexOf(' (', amountStart);
        const amount = parseFloat(text.substring(amountStart, amountEnd));
        const expenseDate = new Date(item.getAttribute('data-date'));
        if (expenseDate.toDateString() === selectedDate.toDateString()) {
            filteredExpenses.push({ category, amount });
        }  
    }
    displayFilteredExpenses(filteredExpenses);
}
);
function displayFilteredExpenses(expenses) {
    const filteredExpenseList = document.getElementById('filtered-expense-list');
    filteredExpenseList.innerHTML = '';
    expenses.forEach(expense => {
        const expenseItem = document.createElement('li');
        expenseItem.textContent = `${expense.category}: $${expense.amount.toFixed(2)}`;
        filteredExpenseList.appendChild(expenseItem);
    });
}
// show alert if total expense exceeds user defined limit
const expenseLimitInput = document.getElementById('expense-limit');
expenseLimitInput.addEventListener('change', function() {
    checkExpenseLimit();
});

// Set default date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});
