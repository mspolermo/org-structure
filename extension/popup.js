document.getElementById('org-unit-tab-button').addEventListener('click', () => {
    setActiveTab('org-unit');
});

document.getElementById('person-tab-button').addEventListener('click', () => {
    setActiveTab('person');
});

function setActiveTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.getElementById(`${tabName}-tab-button`).classList.add('active');
}

document.getElementById('create-org-unit').addEventListener('click', async () => {
    const name = document.getElementById('org-unit-name').value;
    const description = document.getElementById('org-unit-description').value;
    const parentOrgUnitId = document.getElementById('parent-org-unit-id').value;
    const workingHours = document.getElementById('org-unit-working-hours').value;
    const lunchBreak = document.getElementById('org-unit-lunch-break').value;
    const summary = document.getElementById('org-unit-summary').value;

    const response = await fetch('http://localhost:5001/org-unit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description || null,
            parentOrgUnitId: parentOrgUnitId || null,
            workingHours: workingHours || null,
            lunchBreak: lunchBreak || null,
            summary: summary || null
        })
    });

    if (response.ok) {
        alert('Org Unit created successfully');
    } else {
        alert('Failed to create Org Unit');
    }
});

document.getElementById('create-person').addEventListener('click', async () => {
    const name = document.getElementById('person-name').value;
    const post = document.getElementById('person-post').value;
    const email = document.getElementById('person-email').value;
    const location = document.getElementById('person-location').value;
    const birthday = document.getElementById('person-birthday').value;
    const orgUnitId = document.getElementById('org-unit-id').value;
    const employmentDate = document.getElementById('org-employment-date').value;
    const phone = document.getElementById('person-phone').value; 
    const table = document.getElementById('person-table').value;
    const isChef = document.getElementById('is-chef').checked;
    const isManager = document.getElementById('is-manager').checked;

    const response = await fetch('http://localhost:5001/persons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            post: post,
            email: email,
            phone: phone || null,
            location: location,
            birthday: birthday,
            table: table || null,
            orgUnitId: orgUnitId,
            isChef: isChef,
            isManager: isManager,
            employmentDate: employmentDate
        })
    });

    if (response.ok) {
        alert('Person created successfully');
    } else {
        alert('Failed to create Person');
    }
});
