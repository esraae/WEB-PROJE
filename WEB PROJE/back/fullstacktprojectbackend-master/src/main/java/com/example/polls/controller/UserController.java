package com.example.polls.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CustomUserDetailsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

	@Autowired
	private UserRepository repository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	CustomUserDetailsService authenticationManager;

	@GetMapping("/jpa/users/{username}/user")
	public List<User> getAllUsers(@PathVariable String username) {
		List<User> users = repository.findAll();
		if (users != null && !users.isEmpty()) {
			for (User u : users) {
				u.setRole(null);
			}
		}
		return users;
	}

	@GetMapping("/jpa/users/userControl/{name}")
	public boolean isAdmin(@PathVariable String name) {
		return repository.findByUsername(name).get().getRole().getName() == RoleName.ROLE_ADMIN;
	}

	@GetMapping("/jpa/users/{username}/user/{id}")
	public User getUser(@PathVariable String username, @PathVariable long id) {
		User user = repository.findById(id).get();
		if (user != null) {
			user.setRole(null);
		}
		return user;
	}

	@DeleteMapping("/jpa/users/{username}/user/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable String username, @PathVariable long id) {
		repository.deleteById(id);

		return ResponseEntity.noContent().build();

	}

	@PutMapping("/jpa/users/{username}/user/{id}")
	public ResponseEntity<User> updateUser(@PathVariable String username, @PathVariable long id,
			@RequestBody User user) {

		User tmp = repository.findById(user.getId()).get();

		if (!tmp.getPassword().equals(user.getPassword())) {
			User user1 = user;
			user1.setEmail("tmp@tmp.com");
			user1.setId(Long.valueOf(0));
			user1.setUsername("tmp123321");
			user1.setRole(roleRepository.findByName(RoleName.ROLE_USER).orElse(null));
			user1.setPassword(passwordEncoder.encode(user.getPassword()));
			user1 = repository.save(user1);
			user.setPassword(user1.getPassword());
			deleteUser("", user1.getId());
		}
		User userUpdated = repository.save(user);

		return new ResponseEntity<User>(userUpdated, HttpStatus.OK);

	}

	@PostMapping("/jpa/users/{username}/user")
	public ResponseEntity<Void> createUser(@PathVariable String username, @RequestBody User user) {
		user.setRole(roleRepository.findByName(RoleName.ROLE_USER).orElse(null));
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		User userUpdated = repository.save(user);
		// Oluşturulan kaydın id değerini geri dönüyoruz
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
