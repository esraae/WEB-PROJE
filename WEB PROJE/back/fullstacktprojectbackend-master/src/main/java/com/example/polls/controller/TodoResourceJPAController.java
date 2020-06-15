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

import com.example.polls.model.Product;
import com.example.polls.repository.TodoRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoResourceJPAController {

	@Autowired
	private TodoRepository repository;

	@GetMapping("/jpa/users/{username}/todos")
	public List<Product> getAllTodos(@PathVariable String username) {

		return repository.findAll();
	}

	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Product getTodo(@PathVariable String username, @PathVariable long id) {

		return repository.findById(id).get();
	}

	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		repository.deleteById(id);

		return ResponseEntity.noContent().build();

	}

	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Product> updateTodo(@PathVariable String username, @PathVariable long id,
			@RequestBody Product todo) {
		@SuppressWarnings("unused")
		Product todosUpdated = repository.save(todo);
		return new ResponseEntity<Product>(todo, HttpStatus.OK);

	}

	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Product todo) {
		Product todosUpdated = repository.save(todo);
		// Oluşturulan kaydın id değerini geri dönüyoruz
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todosUpdated.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
}
