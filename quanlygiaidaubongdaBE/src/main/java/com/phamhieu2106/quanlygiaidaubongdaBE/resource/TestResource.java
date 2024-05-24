package com.phamhieu2106.quanlygiaidaubongdaBE.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/demo")
public class TestResource {

    @GetMapping
    public ResponseEntity<?> sayHello() {
        return ResponseEntity.ok("Hello you authen success!!");
    }
}
