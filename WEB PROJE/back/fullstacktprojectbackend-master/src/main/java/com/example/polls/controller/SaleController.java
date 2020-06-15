package com.example.polls.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.polls.model.Sale;
import com.example.polls.repository.SaleRepository;
import com.example.polls.repository.TodoRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SaleController {

	@Autowired
	private SaleRepository repository;
	
	@Autowired
	private TodoRepository productRepository;

	@GetMapping("/jpa/users/{username}/sale")
	public List<Sale> getAllSales(@PathVariable String username) {
		return repository.findAll();
	}

	@GetMapping("/jpa/users/{username}/sale/{id}")
	public Sale getSale(@PathVariable String username, @PathVariable long id) {
		return repository.findById(id).get();
	}

	@DeleteMapping("/jpa/users/{username}/sale/{id}")
	public ResponseEntity<Void> deleteSale(@PathVariable String username, @PathVariable long id) {
		repository.deleteById(id);

		return ResponseEntity.noContent().build();

	}

	@PutMapping("/jpa/users/{username}/sale/{id}")
	public ResponseEntity<Sale> updateSale(@PathVariable String username, @PathVariable long id,
			@RequestBody Sale sale) {
		Sale SaleUpdated = repository.save(sale);

		return new ResponseEntity<Sale>(SaleUpdated, HttpStatus.OK);

	}

	@PostMapping("/jpa/users/{username}/sale")
	public ResponseEntity<Void> createSale(@PathVariable String username, @RequestBody Sale sale) {
		sale.setProduct(productRepository.findById(sale.getProduct().getId()).orElse(null));
		Sale saleUpdated = repository.save(sale);
		// Oluşturulan kaydın id değerini geri dönüyoruz
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(sale.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
