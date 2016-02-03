package com.echofex;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Employee {

	private String name;
	private Date dateOfBirth;
	private String title;

	SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

	public Employee() {
	}

	public Employee(String name, Date dateOfBirth, String title) {
		super();
		this.name = name;
		this.dateOfBirth = dateOfBirth;
		this.title = title;
	}

	public Employee(String name, String dateOfBirth, String title) throws ParseException {
		this.name = name;
		this.dateOfBirth = formatter.parse(dateOfBirth);
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
