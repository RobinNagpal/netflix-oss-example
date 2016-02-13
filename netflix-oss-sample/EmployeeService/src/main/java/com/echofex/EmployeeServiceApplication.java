package com.echofex;

import javax.xml.crypto.Data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.DataCenterAwareMarshallingStrategy;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.eureka.EurekaInstanceConfigBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.netflix.appinfo.DataCenterInfo;
import com.netflix.appinfo.DataCenterInfo.Name;
import com.netflix.appinfo.UniqueIdentifier;

@SpringBootApplication
@EntityScan("com.echofex")
@EnableDiscoveryClient
@ComponentScan
public class EmployeeServiceApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(EmployeeServiceApplication.class, args);
	}
	
	
	
	@Bean
	@Profile("!default")
	public EurekaInstanceConfigBean eurekaInstanceConfig() {
	  EurekaInstanceConfigBean b = new EurekaInstanceConfigBean();

	  DataCenterInfo info = new DataCenterAwareMarshallingStrategy.InstanceIdDataCenterInfo("Employee-Service" + Math.random());
	  b.setDataCenterInfo(info);
	  b.setDataCenterInfo(info);
	  return b;
	}
}

class CustomDataCenterInfo implements DataCenterInfo, UniqueIdentifier {

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Name getName() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
