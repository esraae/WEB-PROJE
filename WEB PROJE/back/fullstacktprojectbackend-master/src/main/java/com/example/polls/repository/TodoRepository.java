package com.example.polls.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.polls.model.Product;

@Repository
public interface TodoRepository extends JpaRepository<Product,Long> {

//   List<Product> findByUsername(String username);
}
