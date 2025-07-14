function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab triggers
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab trigger
    event.target.classList.add('active');
}

// Sub-tab functionality
function showSubTab(subTabName) {
    // Hide all sub-tab contents
    const subTabContents = document.querySelectorAll('.sub-tab-content');
    subTabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all sub-tab buttons
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    subTabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected sub-tab content
    document.getElementById(subTabName).classList.add('active');
    
    // Add active class to clicked sub-tab button
    event.target.classList.add('active');
}

// Country selection functionality
function updateSelectedCountries() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    const selectedCountriesDiv = document.getElementById('selectedCountries');
    
    const selectedCountries = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling.textContent;
            selectedCountries.push({
                value: checkbox.value,
                label: label
            });
        }
    });
    
    selectedCountriesDiv.innerHTML = '';
    selectedCountries.forEach(country => {
        const badge = document.createElement('span');
        badge.className = 'country-badge';
        badge.innerHTML = `
            ${country.label}
            <button type="button" onclick="removeCountry('${country.value}')">×</button>
        `;
        selectedCountriesDiv.appendChild(badge);
    });
}

function removeCountry(countryValue) {
    const checkbox = document.querySelector(`input[value="${countryValue}"]`);
    if (checkbox) {
        checkbox.checked = false;
        updateSelectedCountries();
    }
}

// Add event listeners to checkboxes
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedCountries);
    });

    // Form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest in becoming a Belcab distributor. We will contact you soon!');
    });
});