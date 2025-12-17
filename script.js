/**
 * Performance Evaluation Dashboard
 * Template-safe version for GitHub publication
 */

// Global variables
let evaluationData = {};
let currentEmployee = 'employee-a';
let criteriaData = {};

/**
 * Evaluation Criteria Structure
 * Safe placeholder data for demonstration
 */
const evaluationCriteria = {
    categories: [
        {
            name: "Work Ethic & Professional Attitude",
            criteria: [
                "Punctuality and attendance consistency",
                "Professional appearance and conduct",
                "Reliability and dependability",
                "Initiative and self-motivation",
                "Work quality and attention to detail"
            ]
        },
        {
            name: "Product & System Knowledge",
            criteria: [
                "Understanding of company products/services",
                "Knowledge of internal systems and processes",
                "Technical proficiency in role requirements",
                "Ability to learn and adapt to changes",
                "Compliance with policies and procedures"
            ]
        },
        {
            name: "Customer Service Quality",
            criteria: [
                "Responsiveness to customer needs",
                "Problem-solving for customer issues",
                "Professional communication with clients",
                "Follow-up and customer satisfaction",
                "Handling difficult situations professionally"
            ]
        },
        {
            name: "Communication Skills",
            criteria: [
                "Verbal communication effectiveness",
                "Written communication clarity",
                "Active listening skills",
                "Presentation abilities",
                "Cross-departmental communication"
            ]
        },
        {
            name: "Problem Solving & Decision Making",
            criteria: [
                "Analytical thinking and reasoning",
                "Creative solution development",
                "Decision-making under pressure",
                "Risk assessment and management",
                "Continuous improvement mindset"
            ]
        },
        {
            name: "Teamwork & Collaboration",
            criteria: [
                "Cooperation with team members",
                "Supporting colleagues when needed",
                "Sharing knowledge and expertise",
                "Conflict resolution skills",
                "Contributing to team objectives"
            ]
        }
    ]
};

/**
 * Sample Employee Data (Template Only)
 */
const sampleEmployeeData = {
    'employee-a': {
        comments: {
            strengths: "Shows strong dedication to work and consistently meets deadlines.",
            improvements: "Could improve communication with cross-functional teams.",
            goals: "Focus on leadership development and process optimization skills."
        }
    },
    'employee-b': {
        comments: {
            strengths: "Excellent customer service skills and product knowledge.",
            improvements: "Time management could be enhanced for complex projects.",
            goals: "Develop technical skills and pursue advanced certifications."
        }
    },
    'employee-c': {
        comments: {
            strengths: "Strong problem-solving abilities and creative thinking.",
            improvements: "Could benefit from better documentation practices.",
            goals: "Mentor junior team members and lead innovation projects."
        }
    }
};

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Performance Evaluation Dashboard initialized');
    loadEmployeeData();
    createEvaluationTable();
    setupEventListeners();
    updateSummary();
});

/**
 * Load employee data or initialize empty data
 */
function loadEmployeeData() {
    const employee = sampleEmployeeData[currentEmployee];
    
    // Initialize evaluation data structure
    evaluationData = {
        overall: {
            totalScore: 0,
            criteriaCount: 0,
            completionRate: 0,
            performanceLevel: 'Not Evaluated'
        },
        categories: {},
        criteria: {},
        comments: employee ? employee.comments : {
            strengths: '',
            improvements: '',
            goals: ''
        }
    };

    // Initialize category data
    evaluationCriteria.categories.forEach((category, catIndex) => {
        evaluationData.categories[`category_${catIndex}`] = {
            name: category.name,
            totalScore: 0,
            criteriaCount: 0,
            average: 0
        };
    });

    // Initialize criteria data
    let criterionIndex = 1;
    evaluationCriteria.categories.forEach((category, catIndex) => {
        category.criteria.forEach((criterion) => {
            evaluationData.criteria[`criterion_${criterionIndex}`] = {
                category: catIndex,
                name: criterion,
                score: null,
                total: 0,
                average: 0
            };
            criterionIndex++;
        });
    });

    loadComments();
}

/**
 * Create the evaluation table dynamically
 */
function createEvaluationTable() {
    const tbody = document.getElementById('evaluation-tbody');
    tbody.innerHTML = '';

    let criterionIndex = 1;
    
    evaluationCriteria.categories.forEach((category, catIndex) => {
        // Add category header row
        const categoryRow = document.createElement('tr');
        categoryRow.className = 'category-header';
        categoryRow.innerHTML = `
            <td colspan="9">${category.name}</td>
        `;
        tbody.appendChild(categoryRow);

        // Add criteria rows
        category.criteria.forEach((criterion, critIndex) => {
            const row = document.createElement('tr');
            row.setAttribute('data-criterion', `criterion_${criterionIndex}`);
            row.setAttribute('data-category', catIndex);
            
            row.innerHTML = `
                <td class="col-number">${criterionIndex}</td>
                <td class="col-criteria">
                    <span class="criteria-label">${criterion}</span>
                </td>
                <td class="col-score">
                    <input type="radio" 
                           name="criterion_${criterionIndex}" 
                           value="1" 
                           class="score-radio"
                           data-criterion="criterion_${criterionIndex}"
                           data-category="${catIndex}">
                </td>
                <td class="col-score">
                    <input type="radio" 
                           name="criterion_${criterionIndex}" 
                           value="2" 
                           class="score-radio"
                           data-criterion="criterion_${criterionIndex}"
                           data-category="${catIndex}">
                </td>
                <td class="col-score">
                    <input type="radio" 
                           name="criterion_${criterionIndex}" 
                           value="3" 
                           class="score-radio"
                           data-criterion="criterion_${criterionIndex}"
                           data-category="${catIndex}">
                </td>
                <td class="col-score">
                    <input type="radio" 
                           name="criterion_${criterionIndex}" 
                           value="4" 
                           class="score-radio"
                           data-criterion="criterion_${criterionIndex}"
                           data-category="${catIndex}">
                </td>
                <td class="col-score">
                    <input type="radio" 
                           name="criterion_${criterionIndex}" 
                           value="5" 
                           class="score-radio"
                           data-criterion="criterion_${criterionIndex}"
                           data-category="${catIndex}">
                </td>
                <td class="col-total">
                    <span class="score-value" id="total_criterion_${criterionIndex}">0</span>
                </td>
                <td class="col-average">
                    <span class="score-value" id="average_criterion_${criterionIndex}">0.0</span>
                </td>
            `;
            
            tbody.appendChild(row);
            criterionIndex++;
        });
    });

    createCategorySummaries();
}

/**
 * Create category summary cards
 */
function createCategorySummaries() {
    const categoryGrid = document.getElementById('category-grid');
    categoryGrid.innerHTML = '';

    evaluationCriteria.categories.forEach((category, catIndex) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-category', catIndex);
        
        categoryCard.innerHTML = `
            <div class="category-name">${category.name}</div>
            <div class="category-score" id="category_score_${catIndex}">0.0</div>
            <div class="category-criteria-count" id="category_count_${catIndex}">0 of ${category.criteria.length} criteria evaluated</div>
        `;
        
        categoryGrid.appendChild(categoryCard);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Employee selector
    document.getElementById('employee-select').addEventListener('change', function() {
        currentEmployee = this.value;
        loadEmployeeData();
        clearAllSelections();
        updateSummary();
        loadComments();
    });

    // Score radio buttons (delegated event listener)
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('score-radio')) {
            handleScoreChange(e.target);
        }
    });

    // Export buttons
    document.getElementById('export-pdf').addEventListener('click', exportToPDF);
    document.getElementById('export-excel').addEventListener('click', exportToExcel);
    
    // Reset button
    document.getElementById('reset-evaluations').addEventListener('click', resetAllEvaluations);

    // Comment textareas
    document.getElementById('strengths-comment').addEventListener('input', updateComments);
    document.getElementById('improvements-comment').addEventListener('input', updateComments);
    document.getElementById('goals-comment').addEventListener('input', updateComments);
}

/**
 * Handle score change from radio buttons
 */
function handleScoreChange(radio) {
    const criterionId = radio.dataset.criterion;
    const categoryId = radio.dataset.category;
    const score = parseInt(radio.value);

    // Update evaluation data
    evaluationData.criteria[criterionId].score = score;
    evaluationData.criteria[criterionId].total = score;

    // Update UI
    updateCriterionDisplay(criterionId);
    updateCategoryDisplay(categoryId);
    updateSummary();
}

/**
 * Update individual criterion display
 */
function updateCriterionDisplay(criterionId) {
    const criterion = evaluationData.criteria[criterionId];
    const totalElement = document.getElementById(`total_${criterionId}`);
    const averageElement = document.getElementById(`average_${criterionId}`);

    if (totalElement) totalElement.textContent = criterion.total;
    if (averageElement) averageElement.textContent = criterion.average.toFixed(1);
}

/**
 * Update category display
 */
function updateCategoryDisplay(categoryId) {
    const categoryKey = `category_${categoryId}`;
    const category = evaluationData.categories[categoryKey];
    
    // Calculate category totals
    let totalScore = 0;
    let criteriaCount = 0;
    
    Object.keys(evaluationData.criteria).forEach(criterionId => {
        const criterion = evaluationData.criteria[criterionId];
        if (criterion.category === categoryId && criterion.score !== null) {
            totalScore += criterion.score;
            criteriaCount++;
        }
    });
    
    category.totalScore = totalScore;
    category.criteriaCount = criteriaCount;
    category.average = criteriaCount > 0 ? totalScore / criteriaCount : 0;
    
    // Update UI
    const scoreElement = document.getElementById(`category_score_${categoryId}`);
    const countElement = document.getElementById(`category_count_${categoryId}`);
    
    if (scoreElement) scoreElement.textContent = category.average.toFixed(1);
    if (countElement) countElement.textContent = `${criteriaCount} of ${evaluationCriteria.categories[categoryId].criteria.length} criteria evaluated`;
}

/**
 * Update overall summary
 */
function updateSummary() {
    let totalScore = 0;
    let criteriaCount = 0;
    
    Object.keys(evaluationData.criteria).forEach(criterionId => {
        const criterion = evaluationData.criteria[criterionId];
        if (criterion.score !== null) {
            totalScore += criterion.score;
            criteriaCount++;
        }
    });
    
    const totalCriteria = Object.keys(evaluationData.criteria).length;
    const overallAverage = criteriaCount > 0 ? totalScore / criteriaCount : 0;
    const completionRate = totalCriteria > 0 ? (criteriaCount / totalCriteria) * 100 : 0;
    const performanceLevel = getPerformanceLevel(overallAverage);
    
    // Update global state
    evaluationData.overall.totalScore = totalScore;
    evaluationData.overall.criteriaCount = criteriaCount;
    evaluationData.overall.completionRate = completionRate;
    evaluationData.overall.performanceLevel = performanceLevel;
    
    // Update UI elements
    document.getElementById('overall-score').textContent = overallAverage.toFixed(1);
    document.getElementById('total-criteria').textContent = criteriaCount;
    document.getElementById('completion-rate').textContent = `${Math.round(completionRate)}%`;
    document.getElementById('performance-level').textContent = performanceLevel;
}

/**
 * Get performance level based on score
 */
function getPerformanceLevel(average) {
    if (average === 0) return 'Not Evaluated';
    if (average < 2) return 'Needs Improvement';
    if (average < 3) return 'Meets Expectations';
    if (average < 4) return 'Exceeds Expectations';
    return 'Outstanding';
}

/**
 * Clear all selections
 */
function clearAllSelections() {
    const radioButtons = document.querySelectorAll('.score-radio');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Reset all displays
    Object.keys(evaluationData.criteria).forEach(criterionId => {
        evaluationData.criteria[criterionId].score = null;
        evaluationData.criteria[criterionId].total = 0;
        updateCriterionDisplay(criterionId);
    });
    
    // Reset category displays
    evaluationCriteria.categories.forEach((category, catIndex) => {
        updateCategoryDisplay(catIndex);
    });
}

/**
 * Load comments for current employee
 */
function loadComments() {
    const comments = evaluationData.comments;
    document.getElementById('strengths-comment').value = comments.strengths || '';
    document.getElementById('improvements-comment').value = comments.improvements || '';
    document.getElementById('goals-comment').value = comments.goals || '';
}

/**
 * Update comments
 */
function updateComments() {
    evaluationData.comments.strengths = document.getElementById('strengths-comment').value;
    evaluationData.comments.improvements = document.getElementById('improvements-comment').value;
    evaluationData.comments.goals = document.getElementById('goals-comment').value;
}

/**
 * Reset all evaluations
 */
function resetAllEvaluations() {
    if (confirm('Are you sure you want to reset all evaluations? This action cannot be undone.')) {
        clearAllSelections();
        
        // Clear comments
        document.getElementById('strengths-comment').value = '';
        document.getElementById('improvements-comment').value = '';
        document.getElementById('goals-comment').value = '';
        updateComments();
        
        updateSummary();
        
        showNotification('All evaluations have been reset.', 'success');
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : '#ff6b35'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Export to PDF using print functionality
 */
function exportToPDF() {
    showLoadingOverlay('Exporting to PDF...');
    
    setTimeout(() => {
        // Add print-specific styling
        document.body.classList.add('print-mode');
        
        // Print the page
        window.print();
        
        // Remove print styling
        setTimeout(() => {
            document.body.classList.remove('print-mode');
            hideLoadingOverlay();
            showNotification('PDF export initiated. Use your browser\'s print dialog to save as PDF.', 'success');
        }, 500);
    }, 500);
}

/**
 * Export to Excel (CSV format)
 */
function exportToExcel() {
    showLoadingOverlay('Exporting to Excel...');
    
    setTimeout(() => {
        try {
            const csvContent = generateCSVContent();
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `performance_evaluation_${currentEmployee}_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            hideLoadingOverlay();
            showNotification('Excel export completed successfully!', 'success');
        } catch (error) {
            hideLoadingOverlay();
            showNotification('Export failed. Please try again.', 'error');
            console.error('Export error:', error);
        }
    }, 500);
}

/**
 * Generate CSV content for Excel export
 */
function generateCSVContent() {
    let csv = 'Performance Evaluation Report\n';
    csv += `Employee,${currentEmployee}\n`;
    csv += `Date,${new Date().toLocaleDateString()}\n`;
    csv += `Overall Score,${evaluationData.overall.totalScore > 0 ? (evaluationData.overall.totalScore / evaluationData.overall.criteriaCount).toFixed(2) : '0.00'}\n`;
    csv += `Performance Level,${evaluationData.overall.performanceLevel}\n`;
    csv += `Completion Rate,${evaluationData.overall.completionRate.toFixed(1)}%\n\n`;
    
    csv += 'Criteria,Category,Score\n';
    
    Object.keys(evaluationData.criteria).forEach(criterionId => {
        const criterion = evaluationData.criteria[criterionId];
        const categoryName = evaluationCriteria.categories[criterion.category].name;
        const score = criterion.score || 'Not Evaluated';
        csv += `"${criterion.name}","${categoryName}",${score}\n`;
    });
    
    csv += '\nCategory Averages\n';
    evaluationCriteria.categories.forEach((category, catIndex) => {
        const categoryData = evaluationData.categories[`category_${catIndex}`];
        csv += `"${category.name}",${categoryData.average.toFixed(2)}\n`;
    });
    
    csv += '\nComments\n';
    csv += `Key Strengths,"${evaluationData.comments.strengths}"\n`;
    csv += `Areas for Improvement,"${evaluationData.comments.improvements}"\n`;
    csv += `Future Goals,"${evaluationData.comments.goals}"\n`;
    
    return csv;
}

/**
 * Show loading overlay
 */
function showLoadingOverlay(message = 'Processing...') {
    const overlay = document.getElementById('loading-overlay');
    overlay.style.display = 'flex';
    overlay.querySelector('p').textContent = message;
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    overlay.style.display = 'none';
}

/**
 * Add CSS animations for notifications
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .print-mode {
        background: white !important;
    }
    
    .print-mode .header {
        background: #ff6b35 !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }
    
    .print-mode .summary-card,
    .print-mode .category-card {
        border: 1px solid #dee2e6 !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }
`;
document.head.appendChild(style);

// Initialize tooltips for better UX
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('score-radio')) {
        const score = e.target.value;
        const labels = {
            '1': 'Poor',
            '2': 'Needs Improvement', 
            '3': 'Meets Expectations',
            '4': 'Exceeds Expectations',
            '5': 'Outstanding'
        };
        e.target.title = `Score ${score}: ${labels[score]}`;
    }
});

console.log('Performance Evaluation Dashboard script loaded successfully');