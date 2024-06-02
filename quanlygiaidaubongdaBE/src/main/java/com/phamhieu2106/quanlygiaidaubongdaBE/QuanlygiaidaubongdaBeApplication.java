package com.phamhieu2106.quanlygiaidaubongdaBE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class QuanlygiaidaubongdaBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuanlygiaidaubongdaBeApplication.class, args);
    }

}
