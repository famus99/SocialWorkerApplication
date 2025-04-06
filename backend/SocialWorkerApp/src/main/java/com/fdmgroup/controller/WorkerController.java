package com.fdmgroup.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fdmgroup.model.Client;
import com.fdmgroup.model.Worker;
import com.fdmgroup.service.WorkerService;
import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    @Autowired
    private WorkerService workerService;
    
    @GetMapping
    public ResponseEntity<List<Worker>> getAllWorkers() {
        return ResponseEntity.ok(workerService.getAllWorkers());
    }
    
    @GetMapping("/{workerId}")
    public ResponseEntity<Worker> getWorkerById(@PathVariable Long workerId) {
        return ResponseEntity.ok(workerService.getWorkerById(workerId));
    }

    @GetMapping("/{workerId}/clients")
    public ResponseEntity<List<Client>> getAllClientsForWorker(@PathVariable Long workerId) {
        return ResponseEntity.ok(workerService.getAllClientsForWorker(workerId));
    }

    @GetMapping("/{workerId}/clients/{clientId}")
    public ResponseEntity<Client> getClientById(@PathVariable Long workerId, @PathVariable Long clientId) {
        return ResponseEntity.ok(workerService.getClientById(workerId, clientId));
    }

    @DeleteMapping("/{workerId}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long workerId) {
        workerService.deleteWorker(workerId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clients/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId) {
        workerService.deleteClient(clientId);
        return ResponseEntity.noContent().build();
    }
    
   // Create a new Worker
    @PostMapping
    public ResponseEntity<Worker> createWorker(@RequestBody Worker worker) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workerService.createWorker(worker));
    }

    // Create a Client under a Worker
    @PostMapping("/{workerId}/clients")
    public ResponseEntity<Client> createClientForWorker(
            @PathVariable Long workerId, 
            @RequestBody Client client) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workerService.createClientForWorker(workerId, client));
    }
}

