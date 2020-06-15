package com.example.polls.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.polls.model.audit.DateAudit;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }),
		@UniqueConstraint(columnNames = { "email" }) })
public class User extends DateAudit {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 40)
	private String name;

	@NotNull
	@Size(max = 40)
	private String surname;

	@NotNull
	@Size(max = 15)
	private String username;

	@NotNull
	@Size(max = 40)
	@Email
	private String email;

	@NotNull
	@Size(max = 100)
	private String password;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id")
	private Role role;

	public User() {

	}

	public User(String name, String username, String email, String password, Role role) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
