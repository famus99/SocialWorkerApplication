// WorkerPage.js - Functionality specific to the Workers page
document.addEventListener('DOMContentLoaded', function() {
    // Load all workers when the page loads
    loadWorkers();
    
    // Set up the form submission handler
    document.getElementById('addWorkerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addWorker();
    });
});

// Function to load and display all workers
async function loadWorkers() {
    const workerListElement = document.getElementById('workerList');
    workerListElement.innerHTML = '<p>Loading workers...</p>';
    
    try {
        const workers = await WorkerService.getAllWorkers();
        
        if (workers.length === 0) {
            workerListElement.innerHTML = '<p>No workers found. Add a new worker below.</p>';
            return;
        }
        
        workerListElement.innerHTML = '';
        workers.forEach(worker => {
            const workerCard = document.createElement('div');
            workerCard.className = 'worker-card';
            workerCard.innerHTML = `
                <h3>${worker.name}</h3>
                <p class="worker-role">${worker.role}</p>
                <div class="worker-actions">
                    <button class="view-clients-btn" onclick="viewClients(${worker.id})">View Clients</button>
                    <button class="delete-worker-btn" onclick="deleteWorker(${worker.id})">Delete</button>
                </div>
            `;
            workerListElement.appendChild(workerCard);
        });
    } catch (error) {
        workerListElement.innerHTML = '<p>Error loading workers. Please try again later.</p>';
        console.error('Error loading workers:', error);
    }
}

// Function to add a new worker
async function addWorker() {
    const nameInput = document.getElementById('workerName');
    const roleInput = document.getElementById('workerRole');
    
    const newWorker = {
        name: nameInput.value,
        role: roleInput.value
    };
    
    try {
        await WorkerService.createWorker(newWorker);
        
        // Clear the form
        nameInput.value = '';
        roleInput.value = '';
        
        // Reload the worker list
        loadWorkers();
        
        alert('Worker added successfully!');
    } catch (error) {
        alert('Error adding worker. Please try again.');
        console.error('Error adding worker:', error);
    }
}

// Function to delete a worker
async function deleteWorker(workerId) {
    if (confirm('Are you sure you want to delete this worker? This will also delete all associated clients.')) {
        try {
            await WorkerService.deleteWorker(workerId);
            loadWorkers();
            alert('Worker deleted successfully!');
        } catch (error) {
            alert('Error deleting worker. Please try again.');
            console.error('Error deleting worker:', error);
        }
    }
}

// Function to view clients for a worker
function viewClients(workerId) {
    // Store the worker ID in session storage and redirect to the clients page
    sessionStorage.setItem('currentWorkerId', workerId);
    window.location.href = 'Display.html';
}