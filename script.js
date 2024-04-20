const pincodeForm = document.getElementById('pincodeForm');
const pincodeInput = document.getElementById('pincodeInput');
const pincodeDetails = document.getElementById('pincodeDetails');
const loader = document.getElementById('loader');
let postOfficeData = []; // Store the fetched pincode details

pincodeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pincode = pincodeInput.value.trim();
    if (pincode.length !== 6) {
        alert('Please enter a 6-digit Indian Postal Code.');
        return;
    }

    try {
        loader.style.display = 'block'; // Show loader
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data && data.length > 0 && data[0].Status === 'Success') {
            postOfficeData = data[0].PostOffice;
            displayPincodeDetails(postOfficeData);
        } else {
            alert('Error fetching pincode data.');
        }
    } catch (error) {
        alert('Error fetching pincode data.');
    } finally {
        loader.style.display = 'none'; // Hide loader
    }
});

pincodeInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const filteredData = postOfficeData.filter(office => office.Name.toLowerCase().includes(searchTerm));
    displayPincodeDetails(filteredData);
});

function displayPincodeDetails(data) {
    if (data.length === 0) {
        pincodeDetails.innerHTML = '<p>Couldn\'t find the postal data you\'re looking for...</p>';
        return;
    }

    const detailsHTML = data.map(office => `
        <h2>Pincode Details</h2>
        <p><strong>Post Office Name:</strong> ${office.Name}</p>
        <p><strong>Pincode:</strong> ${office.Pincode}</p>
        <p><strong>District:</strong> ${office.District}</p>
        <p><strong>State:</strong> ${office.State}</p>
    `).join('');

    pincodeDetails.innerHTML = detailsHTML;
}
