package com.fdmgroup.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fdmgroup.model.Client;
import com.fdmgroup.model.Worker;
import com.fdmgroup.repository.ClientRepository;
import com.fdmgroup.repository.WorkerRepository;

import java.util.List;

@Service
public class WorkerService {
    private static final String WORKER_NOT_FOUND = "Worker not found";
    private static final String CLIENT_NOT_FOUND = "Client not found";

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClientsForWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKER_NOT_FOUND));
        return worker.getClients();
    }

    public Client getClientById(Long workerId, Long clientId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKER_NOT_FOUND));
        
        return worker.getClients().stream()
                .filter(client -> client.getId().equals(clientId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CLIENT_NOT_FOUND));
    }

    @Transactional
    public void deleteWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKER_NOT_FOUND));
        workerRepository.delete(worker);
    }
    
    
    public Worker getWorkerById(Long workerId) {
        return workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKER_NOT_FOUND));
       
    }

    @Transactional
    public void deleteClient(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CLIENT_NOT_FOUND));
        clientRepository.delete(client);
    }
    
    public Worker createWorker(Worker worker) {
        return workerRepository.save(worker);
    }

    @Transactional
    public Client createClientForWorker(Long workerId, Client client) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKER_NOT_FOUND));
        
        client.setWorker(worker); // Link client to worker
        return clientRepository.save(client);
    }
    
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }
}
