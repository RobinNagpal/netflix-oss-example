package com.echofex;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
	private Employee robin = null;
	private Employee guneet = null;
	
	private List<Employee> employees = new ArrayList<Employee>();
	
	{
		try {
			robin = new Employee("Robin  Nagpal", "14/09/1985", "Sr. Tech Lead");
			guneet = new Employee("Gunet Kaur", "31/01/1987", "VP Data Analytics");
			employees.add(robin);
			employees.add(guneet);
			
			
		} catch (ParseException e) {
			e.printStackTrace();
		}	
	}
	
	
	@RequestMapping("/employees")
	public List<Employee> getEmployeeList(){
		return employees;
	}
	
}
