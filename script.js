// This function allows navigation to a specified page.
function navigateTo(page) {
    // Your navigation logic here
}

// This function resets the test results and the input fields.
function resetTest() {
    document.querySelector('.typing-input').value = ''; // Resetting the input field
    // Additional reset logic here
}

// Existing functionality preserved.
// ... 

// Example of modal handling for displaying results
function showModal(results) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class='modal-content'> <span class='close'>&times;</span><p>${results}</p></div>`;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    };

    modal.style.display = 'block';
}
