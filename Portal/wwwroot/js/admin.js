document.addEventListener('DOMContentLoaded', function() {
    const addCustomerForm = document.getElementById('addCustomerForm');

    if (addCustomerForm) {
        addCustomerForm.addEventListener('submit', function(e) {
            const nameInput = document.getElementById('customerName');
            const emailInput = document.getElementById('customerEmail');

            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
        });
    }

    const tableRows = document.querySelectorAll('#customerTableBody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.classList.remove('table-active'));
            this.classList.add('table-active');
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        const nameInput = document.getElementById('customerName');
        const emailInput = document.getElementById('customerEmail');
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
    }
});
