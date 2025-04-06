package com.fdmgroup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.model.Client;


public interface ClientRepository extends JpaRepository<Client, Long> {
}

