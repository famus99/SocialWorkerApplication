// Admin.js - Functionality specific to the Admin page
let workers = [];
let totalClientCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadStatistics();
    
    document.getElementById('refreshStats').addEventListener('click', loadStatistics);
    document.getElementById('backupBtn').addEventListener('click', backupData);
    document.getElementById('testConnectionBtn').addEventListener('click', testConnection);
    document.getElementById('resetDemoDataBtn').addEventListener('click', resetDemoData);
});

async function loadStatistics() {
    try {
        // Get all workers
        workers = await WorkerService.getAllWorkers();
        document.getElementById('totalWorkers').textContent = workers.length;
        
        // Count total clients and calculate average
        totalClientCount = 0;
        
        for (const worker of workers) {
            const clients = await WorkerService.getClientsForWorker(worker.id);
            totalClientCount += clients.length;
        }
        
        document.getElementById('totalClients').textContent = totalClientCount;
        
        const avgClients = workers.length > 0 ? (totalClientCount / workers.length).toFixed(1) : '0';
        document.getElementById('avgClientsPerWorker').textContent = avgClients;
    } catch (error) {
        console.error('Error loading statistics:', error);
        alert('Error loading statistics. Please try again later.');
    }
}

function backupData() {
    // This is a simulated backup function
    // In a real application, this would make an API call to the backend
    
    alert('Data backup initiated. This is a simulated feature.');
    setTimeout(() => {
        alert('Backup completed successfully!');
    }, 2000);
}

function testConnection() {
    // Simulate a connection test
    alert('Testing database connection...');
    
    setTimeout(() => {
        alert('Connection successful!');
    }, 1500);
}

function resetDemoData() {
    if (confirm('WARNING: This will reset all data to demo state. This action cannot be undone. Continue?')) {
        alert('This is a simulated feature. In a real application, this would reset the database to a demo state.');
        
        setTimeout(() => {
            alert('Demo data reset successfully!');
            loadStatistics();
        }, 2000);
    }
}