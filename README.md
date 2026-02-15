# 💰 Expense Tracker

A beautiful, modern expense tracking web application built with vanilla JavaScript. Track your spending, visualize patterns, and make smarter financial decisions.

**🌐 [Live Demo](https://nathan-forest.github.io/expense-tracker/)**

![Expense Tracker Screenshot](screenshot.png)

---

## ✨ Features

### Core Functionality
- ➕ **Add Expenses** - Record spending with amount, category, description, and date
- 📋 **View All Expenses** - See complete spending history with visual cards
- 🗑️ **Delete Expenses** - Remove individual expenses or clear all data
- 💾 **Data Persistence** - All data saved to localStorage (survives page refresh)
- 🔍 **Filter by Category** - View expenses by specific categories

### Advanced Features
- 📊 **Category Breakdown** - Visual bars showing spending distribution by category
- 💡 **Smart Insights** - Automatic analysis of spending patterns including:
  - Top spending category
  - Average expense amount
  - Largest single expense
  - Daily spending average
- 📥 **Export to CSV** - Download expense data for Excel/Google Sheets
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile

### Visual Design
- 🎨 Modern gradient backgrounds
- 💳 Elevated card designs with shadows
- ✨ Smooth animations and transitions
- 🌈 Color-coded categories
- 📊 Animated progress bars

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser localStorage API
- **Styling:** CSS Grid, Flexbox, CSS Variables, Animations
- **Tools:** Git, GitHub Pages

---

## 🚀 Getting Started

### Live Version
Visit the [live demo](https://nathan-forest.github.io/expense-tracker/) to use immediately!

### Local Development

1. **Clone the repository**
```bash
   git clone https://github.com/Nathan-Forest/expense-tracker.git
   cd expense-tracker
```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (e.g., Live Server in VS Code)

3. **Start tracking expenses!**
   - No build process required
   - No dependencies to install
   - Pure vanilla JavaScript

---

## 📊 How to Use

1. **Add an Expense**
   - Enter amount, select category, add description
   - Choose the date (defaults to today)
   - Click "Add Expense"

2. **View Your Data**
   - See total spending and monthly summary at the top
   - Check category breakdown to see where your money goes
   - Review smart insights for spending patterns

3. **Filter Expenses**
   - Click category buttons to filter by type
   - Click "All" to see everything

4. **Export Data**
   - Click "Export CSV" to download all expenses
   - Open in Excel or Google Sheets for further analysis

5. **Manage Data**
   - Click 🗑️ on individual expenses to delete
   - Use "Clear All" to reset everything

---

## 🎨 Features in Detail

### Category Breakdown Visualization
The app automatically calculates spending by category and displays animated progress bars showing percentage distribution. Categories are color-coded for easy recognition.

### Smart Insights
Four key metrics calculated in real-time:
- **Top Category:** Shows which category you spend most on
- **Average Expense:** Total divided by number of transactions
- **Largest Expense:** Highlights your biggest single purchase
- **Daily Average:** Projects spending per day this month

### CSV Export
All expense data can be exported to CSV format with columns:
- Date
- Category
- Description
- Amount

Perfect for importing into Excel, Google Sheets, or accounting software.

---

## 📁 Project Structure
```
expense-tracker/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── style.css       # All styles (variables, animations, responsive)
│   └── js/
│       └── app.js          # Application logic (900+ lines)
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

---

## 🎓 What I Learned

Building this project taught me:

- **Browser APIs:** localStorage, Blob API, URL.createObjectURL
- **DOM Manipulation:** Creating, reading, updating, deleting elements dynamically
- **Event Handling:** Forms, buttons, filters, user interactions
- **Data Visualization:** Building progress bars and insights from raw data
- **CSS Mastery:** Grid, Flexbox, animations, transitions, responsive design
- **State Management:** Managing application data without frameworks
- **File Generation:** Creating and downloading CSV files client-side
- **Responsive Design:** Making apps work on all screen sizes
- **Code Organization:** Structuring a larger JavaScript application

---

## 🚀 Future Enhancements

Potential features to add:
- [ ] Budget setting and warnings
- [ ] Monthly/yearly comparison charts
- [ ] Recurring expense tracking
- [ ] Multiple currency support
- [ ] Data import from CSV
- [ ] Dark mode toggle
- [ ] Expense tagging system
- [ ] Search functionality
- [ ] PWA capabilities (offline mode, install as app)
- [ ] Backend integration with database

---

## 💼 Portfolio Project

This expense tracker was built as a portfolio project to demonstrate:
- Modern JavaScript skills
- Frontend development capabilities
- UI/UX design sensibility
- Problem-solving and debugging
- Clean, maintainable code

**Built for:** Demonstrating skills for junior developer roles in financial software

---

## 📝 License

This project is licensed under the MIT License.
```
MIT License

Copyright (c) 2024 Nathan Forest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Nathan Forest**
- GitHub: [@Nathan-Forest](https://github.com/Nathan-Forest)
- LinkedIn: [Nathan Forest](https://www.linkedin.com/in/nathan-forest-b8a0a867)

---

## 🙏 Acknowledgments

- Built as a learning project while transitioning from IT support to software development
- Designed with financial software applications in mind
- Inspired by the need for simple, effective personal finance tools

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**