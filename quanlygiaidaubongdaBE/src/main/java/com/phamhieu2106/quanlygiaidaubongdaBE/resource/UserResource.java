package com.phamhieu2106.quanlygiaidaubongdaBE.resource;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.AuthenRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.UserRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.AuthenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/auth")
public class UserResource implements IResource<ResponseEntity<?>, UserRequest> {

    private final AuthenService authenService;

    @Autowired
    public UserResource(AuthenService authenService) {
        super();
        this.authenService = authenService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(authenService.register(userRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenRequest authenRequest) {
        return ResponseEntity.ok(authenService.authenticate(authenRequest));
    }

    //
    @Override
    public ResponseEntity<?> add(@RequestBody UserRequest object) throws IOException {
        return null;
    }

    @Override
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return null;
    }


    @Override
    public ResponseEntity<?> update(Long id, UserRequest object) throws IOException {
        return null;
    }

    @Override
    public ResponseEntity<?> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<?> remove(Long id) {
        return null;
    }


}
