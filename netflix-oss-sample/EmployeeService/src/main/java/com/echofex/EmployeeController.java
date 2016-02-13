package com.echofex;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;



@RestController
@EnableCircuitBreaker
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

	@RequestMapping("/employees/list")
	@HystrixCommand(fallbackMethod = "defaultInvokeRemoteService")
	public List<Employee> getEmployeeList() throws Exception {
		double waitTime = Math.random()*2000;
		long waitTimeLong = Math.round(waitTime);
		System.out.println("######################   Wait Time :"  + waitTimeLong +"    ###################################");
		if(waitTime > 1800){
			throw new Exception("too much time");
		}
		Thread.sleep(waitTimeLong);
		return employees;
	}

	public List<Employee> defaultInvokeRemoteService() {
		List<Employee> employees = new ArrayList<Employee>();
		Employee fallback = null;
		try {
			fallback = new Employee("Fallback Employee", "11/11/1985", "Consultant");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		employees.add(fallback);
		return employees;
	}

}
