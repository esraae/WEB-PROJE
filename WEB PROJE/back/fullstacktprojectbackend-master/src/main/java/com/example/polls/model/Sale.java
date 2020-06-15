package com.example.polls.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Sale {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@NotEmpty
	private String name;
	
	@NotNull
	@NotEmpty
	private String address;
	
	@NotNull
	private int count=1;
	
	private boolean accept=false;

	@ManyToOne
	@NotNull
	Product product;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isAccept() {
		return accept;
	}

	public void setAccept(boolean accept) {
		this.accept = accept;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		if(count<=0) {
			count=1;
		}
		this.count = count;
	}

}
