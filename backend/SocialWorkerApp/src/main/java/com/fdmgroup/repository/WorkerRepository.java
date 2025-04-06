package com.fdmgroup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.model.Worker;

public interface WorkerRepository extends JpaRepository<Worker, Long> {
}
