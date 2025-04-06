// script.js - Common functionality for all pages
const API_BASE_URL = 'http://localhost:8080/api';

// Worker API functions
const WorkerService = {
    // Get all workers
    getAllWorkers: async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/workers`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching workers:', error);
            throw error;
        }
    },
    
    // Create a new worker
    createWorker: async function(worker) {
        try {
            const response = await fetch(`${API_BASE_URL}/workers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(worker)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating worker:', error);
            throw error;
        }
    },
    
    // Delete a worker
    deleteWorker: async function(workerId) {
        try {
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting worker:', error);
            throw error;
        }
    },
    
    // Get all clients for a worker
    getClientsForWorker: async function(workerId) {
        try {
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}/clients`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching clients for worker ${workerId}:`, error);
            throw error;
        }
    },
    
    // Create a client for a worker
    createClientForWorker: async function(workerId, client) {
        try {
            const response = await fetch(`${API_BASE_URL}/workers/${workerId}/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating client:', error);
            throw error;
        }
    },
    
    // Delete a client
    deleteClient: async function(clientId) {
        try {
            const response = await fetch(`${API_BASE_URL}/workers/clients/${clientId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    }
};