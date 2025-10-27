document.addEventListener('DOMContentLoaded', function() {
    const dashboardForm = document.getElementById('dashboardForm');
    const textContent = document.getElementById('textContent');

    if (dashboardForm && textContent) {
        let autoSaveTimer;
        textContent.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                localStorage.setItem('dashboard-draft', textContent.value);
            }, 1000);
        });

        const draft = localStorage.getItem('dashboard-draft');
        if (draft && textContent.value === '') {
            if (confirm('A draft was found. Would you like to restore it?')) {
                textContent.value = draft;
            }
        }

        dashboardForm.addEventListener('submit', function() {
            localStorage.removeItem('dashboard-draft');
        });

        const charCount = document.createElement('div');
        charCount.className = 'text-muted small mt-1';
        charCount.textContent = `${textContent.value.length} characters`;
        textContent.parentNode.appendChild(charCount);

        textContent.addEventListener('input', function() {
            charCount.textContent = `${textContent.value.length} characters`;
        });

        dashboardForm.addEventListener('submit', function(e) {
            if (textContent.value.trim() === '') {
                if (!confirm('You are about to save empty content. Continue?')) {
                    e.preventDefault();
                    return false;
                }
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (document.referrer.includes('/Dashboard') && !urlParams.toString()) {
        showNotification('Content saved successfully!', 'success');
    }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 150);
    }, 3000);
}
