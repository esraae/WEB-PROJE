package com.example.polls.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.polls.model.Sale;

public interface SaleRepository  extends JpaRepository<Sale,Long> {

}
