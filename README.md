# Performance Evaluation & Staff Ranking System

A comprehensive HR dashboard system built with pure HTML, CSS, and JavaScript. This project includes two interconnected dashboards that work together to provide complete performance evaluation and ranking capabilities.

## 🎯 Project Overview

This system consists of two main components:

1. **Performance Evaluation Dashboard** (`index.html`) - For conducting individual staff evaluations
2. **Staff Ranking Dashboard** (`ranking.html`) - For viewing ranked performance results

## 📁 Project Structure

```
/
├── index.html              # Performance Evaluation Dashboard
├── ranking.html            # Staff Ranking Dashboard
├── style.css               # Shared styling (used by both dashboards)
├── script.js               # Evaluation dashboard functionality
├── ranking.js              # Ranking dashboard functionality
├── criteria.json           # Evaluation criteria configuration
└── data/
    └── sample_staff.json   # Demo staff data
```

## 🔗 System Integration

### How the Dashboards Connect

The two dashboards are connected through **localStorage**:

1. **Performance Evaluation Dashboard** saves evaluation data to localStorage with key: `"staffEvaluations"`
2. **Staff Ranking Dashboard** reads from the same localStorage to generate rankings

### Data Flow

```
Individual Evaluations → localStorage → Ranking Calculations → Dashboard Display
```

### localStorage Structure

```javascript
{
  "staffEvaluations": {
    "EMP001": {
      "name": "John Smith",
      "department": "Engineering",
      "overall": { "totalScore": 119, "criteriaCount": 30 },
      "categories": {
        "category_0": { "name": "Work Ethic", "totalScore": 18, "average": 3.6 }
      },
      "comments": { "strengths": "...", "improvements": "...", "goals": "..." }
    }
  }
}
```

## 🚀 Getting Started

### Option 1: Using Demo Data (Recommended for GitHub)

1. Open `ranking.html` directly
2. Demo data will be loaded automatically
3. Explore all features without needing evaluations

### Option 2: Complete Workflow

1. **Step 1**: Open `index.html` (Performance Evaluation)
2. **Step 2**: Complete evaluations for staff members
3. **Step 3**: Open `ranking.html` (Staff Ranking)
4. **Step 4**: View automatic rankings based on saved evaluations

## 📊 Features

### Performance Evaluation Dashboard
- ✅ Excel-like evaluation interface
- ✅ 6 performance categories with detailed criteria
- ✅ 1-5 scoring system with auto-calculation
- ✅ Employee selector with sample data
- ✅ Comments section for feedback
- ✅ Export to PDF and Excel
- ✅ Reset functionality

### Staff Ranking Dashboard
- ✅ Automatic ranking based on total scores
- ✅ Grade calculation (A+ to D)
- ✅ Top 3 performer highlighting (Gold, Silver, Bronze)
- ✅ Department and Grade filtering
- ✅ Search functionality
- ✅ Top performers filter
- ✅ Summary statistics cards
- ✅ Export rankings to Excel
- ✅ Auto-refresh from localStorage

## 🎨 Design Features

- **Professional HR Aesthetic**: Clean, corporate design with orange accents
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Focus states, reduced motion support
- **Print-Friendly**: Optimized print styles for PDF export
- **Excel-like Interface**: Familiar grid layout for evaluations

## 🔧 Customization

### Modify Evaluation Criteria

Edit `criteria.json` to customize evaluation categories:

```json
{
  "evaluationCriteria": {
    "categories": [
      {
        "name": "Your Custom Category",
        "criteria": [
          "Your criterion 1",
          "Your criterion 2"
        ]
      }
    ]
  }
}
```

### Adjust Grade Scale

Modify the grade calculation in `ranking.js`:

```javascript
function calculateGrade(average) {
    if (average >= 4.6) return 'A+';
    if (average >= 4.0) return 'A';
    // ... adjust thresholds
}
```

### Change Visual Theme

Update CSS variables in `style.css`:

```css
:root {
    --primary-color: #ff6b35;  /* Change to your brand color */
    --background-color: #f8f9fa;
}
```

## 📈 Grade Scale

| Average Score | Grade | Description |
|---------------|-------|-------------|
| 4.6 – 5.0     | A+    | Outstanding |
| 4.0 – 4.5     | A     | Exceeds Expectations |
| 3.5 – 3.9     | B     | Meets Expectations |
| 3.0 – 3.4     | C     | Needs Improvement |
| < 3.0         | D     | Requires Improvement |

## 🔐 Safety & Privacy

- ✅ **Template-Safe**: Uses placeholder data only
- ✅ **No Real Names**: All employee names are fictional
- ✅ **No Sensitive Data**: Safe for GitHub publication
- ✅ **No Backend**: Runs entirely in the browser
- ✅ **No Authentication**: Simple, secure local operation

## 🌐 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Usage Instructions

### For HR Managers:

1. **Initial Setup**: Use demo data to familiarize with the system
2. **Customization**: Modify criteria and departments as needed
3. **Evaluation Process**: Complete evaluations for each employee
4. **Review Rankings**: Monitor performance trends and identify top performers
5. **Export Data**: Generate reports for management review

### For Developers:

1. **Data Integration**: Connect to your existing employee database
2. **API Integration**: Replace localStorage with REST API calls
3. **Custom Fields**: Add additional evaluation criteria
4. **Advanced Analytics**: Implement trend analysis and historical comparisons

## 🚨 Important Notes

- **localStorage Requirement**: Both dashboards must run on the same domain for data sharing
- **Browser Storage**: Data persists until browser cache is cleared
- **Demo Mode**: Ranking dashboard shows demo data when no evaluations exist
- **Export Naming**: Excel exports include "TEMPLATE" for safety

## 🤝 Contributing

This is a template project designed for educational and demonstration purposes. Feel free to:

- Customize for your organization's needs
- Add new features and functionality
- Integrate with existing HR systems
- Enhance the UI/UX design

## 📄 License

This project is provided as a template for HR performance evaluation systems. Use freely for educational and commercial purposes.

---

**Built with ❤️ for HR professionals and developers**

*For technical support or customization requests, please refer to the code comments and documentation within each file.*
