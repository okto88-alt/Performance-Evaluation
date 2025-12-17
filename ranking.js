/**
 * Staff Ranking Dashboard
 * Connects to Performance Evaluation system via localStorage
 * Template-safe version for GitHub publication
 */

// Global variables
let staffData = [];
let filteredData = [];
let demoDataLoaded = false;

/**
 * Demo Staff Data (Template Only)
 * Used when localStorage is empty or no evaluations exist
 */
const DEMO_STAFF_DATA = [
    {
        staffId: "EMP001",
        name: "John Smith",
        department: "Engineering",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 18, count: 5, average: 3.6 },
            "Product & System Knowledge": { total: 16, count: 5, average: 3.2 },
            "Customer Service Quality": { total: 14, count: 5, average: 2.8 },
            "Communication Skills": { total: 17, count: 5, average: 3.4 },
            "Problem Solving & Decision Making": { total: 15, count: 5, average: 3.0 },
            "Teamwork & Collaboration": { total: 19, count: 5, average: 3.8 }
        },
        status: "Active"
    },
    {
        staffId: "EMP002",
        name: "Sarah Johnson",
        department: "Sales",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 22, count: 5, average: 4.4 },
            "Product & System Knowledge": { total: 20, count: 5, average: 4.0 },
            "Customer Service Quality": { total: 23, count: 5, average: 4.6 },
            "Communication Skills": { total: 21, count: 5, average: 4.2 },
            "Problem Solving & Decision Making": { total: 19, count: 5, average: 3.8 },
            "Teamwork & Collaboration": { total: 20, count: 5, average: 4.0 }
        },
        status: "Active"
    },
    {
        staffId: "EMP003",
        name: "Michael Chen",
        department: "Marketing",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 20, count: 5, average: 4.0 },
            "Product & System Knowledge": { total: 18, count: 5, average: 3.6 },
            "Customer Service Quality": { total: 21, count: 5, average: 4.2 },
            "Communication Skills": { total: 22, count: 5, average: 4.4 },
            "Problem Solving & Decision Making": { total: 19, count: 5, average: 3.8 },
            "Teamwork & Collaboration": { total: 21, count: 5, average: 4.2 }
        },
        status: "Review"
    },
    {
        staffId: "EMP004",
        name: "Emily Davis",
        department: "Human Resources",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 24, count: 5, average: 4.8 },
            "Product & System Knowledge": { total: 23, count: 5, average: 4.6 },
            "Customer Service Quality": { total: 22, count: 5, average: 4.4 },
            "Communication Skills": { total: 25, count: 5, average: 5.0 },
            "Problem Solving & Decision Making": { total: 23, count: 5, average: 4.6 },
            "Teamwork & Collaboration": { total: 24, count: 5, average: 4.8 }
        },
        status: "Active"
    },
    {
        staffId: "EMP005",
        name: "David Wilson",
        department: "Finance",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 17, count: 5, average: 3.4 },
            "Product & System Knowledge": { total: 19, count: 5, average: 3.8 },
            "Customer Service Quality": { total: 16, count: 5, average: 3.2 },
            "Communication Skills": { total: 15, count: 5, average: 3.0 },
            "Problem Solving & Decision Making": { total: 18, count: 5, average: 3.6 },
            "Teamwork & Collaboration": { total: 17, count: 5, average: 3.4 }
        },
        status: "Active"
    },
    {
        staffId: "EMP006",
        name: "Lisa Anderson",
        department: "Engineering",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 21, count: 5, average: 4.2 },
            "Product & System Knowledge": { total: 22, count: 5, average: 4.4 },
            "Customer Service Quality": { total: 20, count: 5, average: 4.0 },
            "Communication Skills": { total: 19, count: 5, average: 3.8 },
            "Problem Solving & Decision Making": { total: 23, count: 5, average: 4.6 },
            "Teamwork & Collaboration": { total: 21, count: 5, average: 4.2 }
        },
        status: "Active"
    },
    {
        staffId: "EMP007",
        name: "Robert Brown",
        department: "Operations",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 13, count: 5, average: 2.6 },
            "Product & System Knowledge": { total: 12, count: 5, average: 2.4 },
            "Customer Service Quality": { total: 14, count: 5, average: 2.8 },
            "Communication Skills": { total: 11, count: 5, average: 2.2 },
            "Problem Solving & Decision Making": { total: 13, count: 5, average: 2.6 },
            "Teamwork & Collaboration": { total: 15, count: 5, average: 3.0 }
        },
        status: "Review"
    },
    {
        staffId: "EMP008",
        name: "Jennifer Lee",
        department: "Customer Support",
        evaluations: {
            "Work Ethic & Professional Attitude": { total: 23, count: 5, average: 4.6 },
            "Product & System Knowledge": { total: 21, count: 5, average: 4.2 },
            "Customer Service Quality": { total: 24, count: 5, average: 4.8 },
            "Communication Skills": { total: 22, count: 5, average: 4.4 },
            "Problem Solving & Decision Making": { total: 20, count: 5, average: 4.0 },
            "Teamwork & Collaboration": { total: 23, count: 5, average: 4.6 }
        },
        status: "Active"
    }
];

/**
 * Initialize the ranking dashboard
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Staff Ranking Dashboard initialized');
    showLoadingOverlay('Loading staff data...');
    
    // Load data from localStorage or demo data
    loadStaffData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Populate filters
    populateFilters();
    
    // Calculate and display rankings
    calculateRankings();
    
    hideLoadingOverlay();
});

/**
 * Load staff data from localStorage or demo data
 * CONNECTION TO PERFORMANCE EVALUATION SYSTEM:
 * - Reads from localStorage key "staffEvaluations"
 * - If empty/unavailable, loads demo data
 * - Expected localStorage format: { staffId: evaluationData }
 */
function loadStaffData() {
    try {
        // Read from localStorage - connection to Performance Evaluation system
        const storedData = localStorage.getItem('staffEvaluations');
        
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('Loaded data from localStorage:', parsedData);
            staffData = convertStoredDataToRankingFormat(parsedData);
            updateDataSource('Local Storage (Performance Evaluations)');
            demoDataLoaded = false;
        } else {
            console.log('No localStorage data found, loading demo data');
            staffData = [...DEMO_STAFF_DATA];
            updateDataSource('Demo Data (Template)');
            demoDataLoaded = true;
        }
        
        filteredData = [...staffData];
        
    } catch (error) {
        console.error('Error loading staff data:', error);
        // Fallback to demo data
        staffData = [...DEMO_STAFF_DATA];
        filteredData = [...staffData];
        updateDataSource('Demo Data (Error Fallback)');
        demoDataLoaded = true;
        showNotification('Error loading saved data. Using demo data instead.', 'warning');
    }
}

/**
 * Convert stored evaluation data to ranking format
 * This function connects the Performance Evaluation data structure to the Ranking format
 */
function convertStoredDataToRankingFormat(storedData) {
    const rankingData = [];
    
    // Convert stored evaluation format to ranking format
    Object.keys(storedData).forEach(staffId => {
        const evaluationData = storedData[staffId];
        
        // Calculate totals from evaluation data
        let totalScore = 0;
        let totalCriteria = 0;
        const categoryScores = {};
        
        // Process evaluation categories
        if (evaluationData.categories) {
            Object.keys(evaluationData.categories).forEach(categoryKey => {
                const category = evaluationData.categories[categoryKey];
                if (category.totalScore !== undefined && category.criteriaCount > 0) {
                    totalScore += category.totalScore;
                    totalCriteria += category.criteriaCount;
                    categoryScores[category.name] = {
                        total: category.totalScore,
                        count: category.criteriaCount,
                        average: category.average
                    };
                }
            });
        }
        
        // Create ranking entry
        rankingData.push({
            staffId: staffId,
            name: evaluationData.name || `Employee ${staffId}`,
            department: evaluationData.department || 'General',
            evaluations: categoryScores,
            totalScore: totalScore,
            averageScore: totalCriteria > 0 ? totalScore / totalCriteria : 0,
            status: evaluationData.status || 'Active'
        });
    });
    
    return rankingData;
}

/**
 * Update data source indicator
 */
function updateDataSource(source) {
    const sourceElement = document.getElementById('data-source-text');
    const sourceIcon = document.querySelector('.data-source-icon');
    
    if (sourceElement) {
        sourceElement.textContent = `Data Source: ${source}`;
    }
    
    if (sourceIcon) {
        sourceIcon.textContent = source.includes('Demo') ? '📋' : '💾';
    }
}

/**
 * Calculate rankings and grades for all staff
 */
function calculateRankings() {
    // Calculate total scores and averages for demo data
    staffData.forEach(staff => {
        if (staff.evaluations) {
            let totalScore = 0;
            let totalCriteria = 0;
            
            Object.keys(staff.evaluations).forEach(category => {
                const evalData = staff.evaluations[category];
                totalScore += evalData.total;
                totalCriteria += evalData.count;
            });
            
            staff.totalScore = totalScore;
            staff.averageScore = totalCriteria > 0 ? totalScore / totalCriteria : 0;
        } else {
            staff.totalScore = 0;
            staff.averageScore = 0;
        }
        
        // Calculate grade based on average score
        staff.grade = calculateGrade(staff.averageScore);
    });
    
    // Sort by total score (descending) for ranking
    staffData.sort((a, b) => b.totalScore - a.totalScore);
    
    // Add rank numbers
    staffData.forEach((staff, index) => {
        staff.rank = index + 1;
    });
    
    // Update filtered data and display
    applyFilters();
    updateSummaryCards();
    displayRankings();
}

/**
 * Calculate grade based on average score
 */
function calculateGrade(average) {
    if (average >= 4.6) return 'A+';
    if (average >= 4.0) return 'A';
    if (average >= 3.5) return 'B';
    if (average >= 3.0) return 'C';
    return 'D';
}

/**
 * Get grade class for styling
 */
function getGradeClass(grade) {
    return `grade-${grade.replace('+', '-plus')}`;
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Filter controls
    document.getElementById('department-filter').addEventListener('change', applyFilters);
    document.getElementById('grade-filter').addEventListener('change', applyFilters);
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('top-performers-only').addEventListener('change', applyFilters);
    
    // Export button
    document.getElementById('export-ranking').addEventListener('click', exportToExcel);
    
    // Refresh button
    document.getElementById('refresh-data').addEventListener('click', refreshData);
}

/**
 * Populate filter dropdowns
 */
function populateFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const departments = [...new Set(staffData.map(staff => staff.department))];
    
    // Clear existing options except "All Departments"
    departmentFilter.innerHTML = '<option value="">All Departments</option>';
    
    // Add department options
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
}

/**
 * Apply filters to the data
 */
function applyFilters() {
    const departmentFilter = document.getElementById('department-filter').value;
    const gradeFilter = document.getElementById('grade-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const topPerformersOnly = document.getElementById('top-performers-only').checked;
    
    filteredData = staffData.filter(staff => {
        // Department filter
        if (departmentFilter && staff.department !== departmentFilter) {
            return false;
        }
        
        // Grade filter
        if (gradeFilter && staff.grade !== gradeFilter) {
            return false;
        }
        
        // Search filter
        if (searchTerm) {
            const searchFields = `${staff.staffId} ${staff.name}`.toLowerCase();
            if (!searchFields.includes(searchTerm)) {
                return false;
            }
        }
        
        // Top performers filter
        if (topPerformersOnly && staff.grade !== 'A+' && staff.grade !== 'A') {
            return false;
        }
        
        return true;
    });
    
    displayRankings();
}

/**
 * Display the ranking table
 */
function displayRankings() {
    const tbody = document.getElementById('ranking-tbody');
    const noDataDiv = document.getElementById('no-data');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '';
        noDataDiv.style.display = 'block';
        return;
    }
    
    noDataDiv.style.display = 'none';
    tbody.innerHTML = '';
    
    filteredData.forEach(staff => {
        const row = document.createElement('tr');
        
        // Add special styling for top 3 performers
        if (staff.rank === 1) {
            row.className = 'top-1';
        } else if (staff.rank === 2) {
            row.className = 'top-2';
        } else if (staff.rank === 3) {
            row.className = 'top-3';
        }
        
        row.innerHTML = `
            <td class="col-rank">
                <span class="rank-number ${getRankClass(staff.rank)}">${staff.rank}</span>
            </td>
            <td class="col-staff-id">${staff.staffId}</td>
            <td class="col-name">${staff.name}</td>
            <td class="col-department">${staff.department}</td>
            <td class="col-score">${staff.totalScore}</td>
            <td class="col-average">${staff.averageScore.toFixed(1)}</td>
            <td class="col-grade">
                <span class="grade-badge ${getGradeClass(staff.grade)}">${staff.grade}</span>
            </td>
            <td class="col-status">
                <span class="status-${staff.status.toLowerCase()}">${staff.status}</span>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

/**
 * Get CSS class for rank styling
 */
function getRankClass(rank) {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
}

/**
 * Update summary cards
 */
function updateSummaryCards() {
    const summaryContainer = document.getElementById('ranking-summary');
    
    // Calculate summary statistics
    const totalStaff = staffData.length;
    const teamAverage = staffData.length > 0 
        ? (staffData.reduce((sum, staff) => sum + staff.averageScore, 0) / staffData.length)
        : 0;
    const bestPerformer = staffData.length > 0 ? staffData[0] : null;
    const lowestPerformer = staffData.length > 0 ? staffData[staffData.length - 1] : null;
    
    summaryContainer.innerHTML = `
        <div class="summary-card">
            <h3>Total Staff</h3>
            <div class="value">${totalStaff}</div>
            <div class="subtitle">evaluated</div>
        </div>
        
        <div class="summary-card">
            <h3>Team Average</h3>
            <div class="value">${teamAverage.toFixed(1)}</div>
            <div class="subtitle">out of 5.0</div>
        </div>
        
        <div class="summary-card best-performer">
            <h3>Best Performer</h3>
            <div class="value">${bestPerformer ? bestPerformer.name : 'N/A'}</div>
            <div class="subtitle">${bestPerformer ? bestPerformer.grade + ' Grade' : ''}</div>
        </div>
        
        <div class="summary-card lowest-performer">
            <h3>Needs Attention</h3>
            <div class="value">${lowestPerformer ? lowestPerformer.name : 'N/A'}</div>
            <div class="subtitle">${lowestPerformer ? lowestPerformer.grade + ' Grade' : ''}</div>
        </div>
    `;
}

/**
 * Export ranking to Excel (CSV format)
 */
function exportToExcel() {
    showLoadingOverlay('Exporting ranking data...');
    
    setTimeout(() => {
        try {
            const csvContent = generateRankingCSV();
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `staff_ranking_TEMPLATE_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            hideLoadingOverlay();
            showNotification('Ranking exported successfully!', 'success');
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
function generateRankingCSV() {
    let csv = 'Staff Ranking Report\n';
    csv += `Generated,${new Date().toLocaleDateString()}\n`;
    csv += `Data Source,${demoDataLoaded ? 'Demo Data' : 'Performance Evaluations'}\n`;
    csv += `Total Staff,${staffData.length}\n\n`;
    
    csv += 'Rank,Staff ID,Name,Department,Total Score,Average,Grade,Status\n';
    
    filteredData.forEach(staff => {
        csv += `${staff.rank},"${staff.staffId}","${staff.name}","${staff.department}",${staff.totalScore},${staff.averageScore.toFixed(2)},"${staff.grade}","${staff.status}"\n`;
    });
    
    csv += '\nGrade Distribution\n';
    const gradeDistribution = {};
    staffData.forEach(staff => {
        gradeDistribution[staff.grade] = (gradeDistribution[staff.grade] || 0) + 1;
    });
    
    Object.keys(gradeDistribution).sort().forEach(grade => {
        csv += `"${grade} Grade",${gradeDistribution[grade]}\n`;
    });
    
    return csv;
}

/**
 * Refresh data from localStorage
 */
function refreshData() {
    showLoadingOverlay('Refreshing data...');
    
    setTimeout(() => {
        loadStaffData();
        calculateRankings();
        populateFilters();
        hideLoadingOverlay();
        showNotification('Data refreshed successfully!', 'success');
    }, 500);
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
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#ff6b35'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Auto-refresh data every 30 seconds (optional)
 * This ensures the ranking stays updated if evaluations change
 */
setInterval(() => {
    const storedData = localStorage.getItem('staffEvaluations');
    if (storedData) {
        loadStaffData();
        calculateRankings();
    }
}, 30000); // 30 seconds

console.log('Staff Ranking Dashboard script loaded successfully');

// Add CSS animations
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
`;
document.head.appendChild(style);