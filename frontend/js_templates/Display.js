// Display.js - Functionality specific to the Clients display page
let currentWorkerId = null;
let currentWorkerName = '';

// Load content when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if a worker ID is stored in session storage
    currentWorkerId = sessionStorage.getItem('currentWorkerId');
    
    if (currentWorkerId) {
        // A worker was selected, so load their clients
        loadClientsForWorker(currentWorkerId);
        document.getElementById('workerSelector').style.display = 'none';
        document.getElementById('addClientForm').style.display = 'block';
    } else {
        // No worker selected, show the worker selector
        document.getElementById('clientList').innerHTML = '<p>Please select a worker to view their clients.</p>';
        loadWorkerDropdown();
        document.getElementById('addClientForm').style.display = 'none';
    }
    
    // Set up event listeners
    document.getElementById('backToWorkers').addEventListener('click', function() {
        window.location.href = 'WorkerPage.html';
    });
    
    document.getElementById('viewClientsBtn').addEventListener('click', function() {
        const selectedWorkerId = document.getElementById('workerDropdown').value;
        if (selectedWorkerId) {
            currentWorkerId = selectedWorkerId;
            sessionStorage.setItem('currentWorkerId', currentWorkerId);
            loadClientsForWorker(currentWorkerId);
            document.getElementById('workerSelector').style.display = 'none';
            document.getElementById('addClientForm').style.display = 'block';
        } else {
            alert('Please select a worker.');
        }
    });
    
    document.getElementById('clientForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addClient();
    });
});

// Load the worker dropdown
async function loadWorkerDropdown() {
    try {
        const workers = await WorkerService.getAllWorkers();
        const dropdown = document.getElementById('workerDropdown');
        
        workers.forEach(worker => {
            const option = document.createElement('option');
            option.value = worker.id;
            option.textContent = worker.name + ' (' + worker.role + ')';
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading workers for dropdown:', error);
        alert('Error loading workers. Please try again later.');
    }
}

// Load clients for a specific worker
async function loadClientsForWorker(workerId) {
    const clientListElement = document.getElementById('clientList');
    clientListElement.innerHTML = '<p>Loading clients...</p>';
    
    try {
        // Get worker details
        const workers = await WorkerService.getAllWorkers();
        const currentWorker = workers.find(w => w.id == workerId);
        
        if (currentWorker) {
            currentWorkerName = currentWorker.name;
            document.getElementById('clientsHeader').textContent = `Clients for ${currentWorker.name}`;
            document.getElementById('workerInfo').innerHTML = `
                <p><strong>Worker:</strong> ${currentWorker.name}</p>
                <p><strong>Role:</strong> ${currentWorker.role}</p>
            `;
        }
        
        const clients = await WorkerService.getClientsForWorker(workerId);
        
        if (clients.length === 0) {
            clientListElement.innerHTML = '<p>No clients found for this worker. Add a new client below.</p>';
            return;
        }
        
        clientListElement.innerHTML = '';
        clients.forEach(client => {
            const clientCard = document.createElement('div');
            clientCard.className = 'client-card';
            clientCard.innerHTML = `
                <h3>${client.name}</h3>
                <p class="client-email">${client.email}</p>
                <div class="client-actions">
                    <button class="delete-client-btn" onclick="deleteClient(${client.id})">Delete</button>
                </div>
            `;
            clientListElement.appendChild(clientCard);
        });
    } catch (error) {
        clientListElement.innerHTML = '<p>Error loading clients. Please try again later.</p>';
        console.error('Error loading clients:', error);
    }
}

// Add a new client
async function addClient() {
    if (!currentWorkerId) {
        alert('Please select a worker first.');
        return;
    }
    
    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    
    const newClient = {
        name: nameInput.value,
        email: emailInput.value
    };
    
    try {
        await WorkerService.createClientForWorker(currentWorkerId, newClient);
        
        // Clear the form
        nameInput.value = '';
        emailInput.value = '';
        
        // Reload the client list
        loadClientsForWorker(currentWorkerId);
        
        alert('Client added successfully!');
    } catch (error) {
        alert('Error adding client. Please try again.');
        console.error('Error adding client:', error);
    }
}

// Delete a client
async function deleteClient(clientId) {
    if (confirm('Are you sure you want to delete this client?')) {
        try {
            await WorkerService.deleteClient(clientId);
            loadClientsForWorker(currentWorkerId);
            alert('Client deleted successfully!');
        } catch (error) {
            alert('Error deleting client. Please try again.');
            console.error('Error deleting client:', error);
        }
    }
}