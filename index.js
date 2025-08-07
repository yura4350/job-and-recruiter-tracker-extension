// Storage keys
const JOBS_STORAGE_KEY = "savedJobs"
const RECRUITERS_STORAGE_KEY = "savedRecruiters"

// Data arrays
let savedJobs = []
let savedRecruiters = []

// DOM elements
const tabButtons = document.querySelectorAll('.tab-btn')
const tabPanels = document.querySelectorAll('.tab-panel')

// Job elements
const jobTitleInput = document.getElementById('job-title-input')
const jobUrlInput = document.getElementById('job-url-input')
const saveJobBtn = document.getElementById('save-job-btn')
const saveJobTabBtn = document.getElementById('save-job-tab-btn')
const deleteJobsBtn = document.getElementById('delete-jobs-btn')
const jobsList = document.getElementById('jobs-list')
const jobsCount = document.getElementById('jobs-count')

// Recruiter elements
const recruiterNameInput = document.getElementById('recruiter-name-input')
const recruiterCompanyInput = document.getElementById('recruiter-company-input')
const recruiterUrlInput = document.getElementById('recruiter-url-input')
const saveRecruiterBtn = document.getElementById('save-recruiter-btn')
const saveRecruiterTabBtn = document.getElementById('save-recruiter-tab-btn')
const deleteRecruitersBtn = document.getElementById('delete-recruiters-btn')
const recruitersList = document.getElementById('recruiters-list')
const recruitersCount = document.getElementById('recruiters-count')

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData()
    setupEventListeners()
    renderJobs()
    renderRecruiters()
})

// Load data from localStorage
function loadData() {
    const jobsFromStorage = localStorage.getItem(JOBS_STORAGE_KEY)
    const recruitersFromStorage = localStorage.getItem(RECRUITERS_STORAGE_KEY)
    
    if (jobsFromStorage) {
        savedJobs = JSON.parse(jobsFromStorage)
    }
    
    if (recruitersFromStorage) {
        savedRecruiters = JSON.parse(recruitersFromStorage)
    }
}

function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab
            switchTab(targetTab)
        })
    })
    
    // Job events
    saveJobBtn.addEventListener('click', saveJob)
    saveJobTabBtn.addEventListener('click', saveCurrentTabAsJob)
    deleteJobsBtn.addEventListener('click', clearAllJobs)
    
    // Recruiter events
    saveRecruiterBtn.addEventListener('click', saveRecruiter)
    saveRecruiterTabBtn.addEventListener('click', saveCurrentTabAsRecruiter)
    deleteRecruitersBtn.addEventListener('click', clearAllRecruiters)
    
    // Enter key support
    jobTitleInput.addEventListener('keypress', handleEnterKey)
    jobUrlInput.addEventListener('keypress', handleEnterKey)
    recruiterNameInput.addEventListener('keypress', handleEnterKey)
    recruiterCompanyInput.addEventListener('keypress', handleEnterKey)
    recruiterUrlInput.addEventListener('keypress', handleEnterKey)
}

// Handle Enter key press
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab
        if (activeTab === 'jobs') {
            saveJob()
        } else {
            saveRecruiter()
        }
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach(btn => {
        btn.classList.remove('active')
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active')
        }
    })
    
    // Update tab panels
    tabPanels.forEach(panel => {
        panel.classList.remove('active')
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add('active')
        }
    })
}

// Save job posting
function saveJob() {
    const title = jobTitleInput.value.trim()
    const url = jobUrlInput.value.trim()
    
    if (!url) {
        alert('Please enter a job posting URL')
        return
    }
    
    const job = {
        id: Date.now(),
        title: title || 'Untitled Job',
        url: url,
        dateAdded: new Date().toLocaleDateString()
    }
    
    savedJobs.unshift(job) // Add to beginning of array
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(savedJobs))
    
    // Clear inputs
    jobTitleInput.value = ''
    jobUrlInput.value = ''
    
    renderJobs()
}

// Save current tab as job
function saveCurrentTabAsJob() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0]
        
        const job = {
            id: Date.now(),
            title: currentTab.title || 'Untitled Job',
            url: currentTab.url,
            dateAdded: new Date().toLocaleDateString()
        }
        
        savedJobs.unshift(job)
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(savedJobs))
        renderJobs()
    })
}

// Save recruiter
function saveRecruiter() {
    const name = recruiterNameInput.value.trim()
    const company = recruiterCompanyInput.value.trim()
    const url = recruiterUrlInput.value.trim()
    
    if (!name) {
        alert('Please enter the recruiter name')
        return
    }
    
    if (!url) {
        alert('Please enter a contact URL')
        return
    }
    
    const recruiter = {
        id: Date.now(),
        name: name,
        company: company || 'Unknown Company',
        url: url,
        dateAdded: new Date().toLocaleDateString()
    }
    
    savedRecruiters.unshift(recruiter)
    localStorage.setItem(RECRUITERS_STORAGE_KEY, JSON.stringify(savedRecruiters))
    
    // Clear inputs
    recruiterNameInput.value = ''
    recruiterCompanyInput.value = ''
    recruiterUrlInput.value = ''
    
    renderRecruiters()
}

// Save current tab as recruiter
function saveCurrentTabAsRecruiter() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0]
        const name = prompt('Enter recruiter name:')
        
        if (!name) return
        
        const company = prompt('Enter company name (optional):') || 'Unknown Company'
        
        const recruiter = {
            id: Date.now(),
            name: name,
            company: company,
            url: currentTab.url,
            dateAdded: new Date().toLocaleDateString()
        }
        
        savedRecruiters.unshift(recruiter)
        localStorage.setItem(RECRUITERS_STORAGE_KEY, JSON.stringify(savedRecruiters))
        renderRecruiters()
    })
}

// Render jobs list
function renderJobs() {
    jobsCount.textContent = savedJobs.length
    
    if (savedJobs.length === 0) {
        jobsList.innerHTML = ''
        return
    }
    
    const jobsHTML = savedJobs.map(job => `
        <li class="job-item">
            <div class="job-title">${escapeHtml(job.title)}</div>
            <a href="${escapeHtml(job.url)}" target="_blank" class="item-url">${escapeHtml(job.url)}</a>
            <div class="item-date">Added: ${job.dateAdded}</div>
        </li>
    `).join('')
    
    jobsList.innerHTML = jobsHTML
}

// Render recruiters list
function renderRecruiters() {
    recruitersCount.textContent = savedRecruiters.length
    
    if (savedRecruiters.length === 0) {
        recruitersList.innerHTML = ''
        return
    }
    
    const recruitersHTML = savedRecruiters.map(recruiter => `
        <li class="recruiter-item">
            <div class="recruiter-name">${escapeHtml(recruiter.name)}</div>
            <div class="recruiter-company">${escapeHtml(recruiter.company)}</div>
            <a href="${escapeHtml(recruiter.url)}" target="_blank" class="item-url">${escapeHtml(recruiter.url)}</a>
            <div class="item-date">Added: ${recruiter.dateAdded}</div>
        </li>
    `).join('')
    
    recruitersList.innerHTML = recruitersHTML
}

// Clear all jobs
function clearAllJobs() {
    if (confirm('Are you sure you want to delete all saved job postings?')) {
        savedJobs = []
        localStorage.removeItem(JOBS_STORAGE_KEY)
        renderJobs()
    }
}

// Clear all recruiters
function clearAllRecruiters() {
    if (confirm('Are you sure you want to delete all saved recruiters?')) {
        savedRecruiters = []
        localStorage.removeItem(RECRUITERS_STORAGE_KEY)
        renderRecruiters()
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}