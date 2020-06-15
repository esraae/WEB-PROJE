package com.example.polls.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polls.model.User;
import com.example.polls.repository.UserRepository;

@RestController
public class ExampleController {

	@Autowired
	UserRepository userRepository;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(value = "/getUsers")
	public List<User> getUsers() {
		return userRepository.findAll();
	}
}
