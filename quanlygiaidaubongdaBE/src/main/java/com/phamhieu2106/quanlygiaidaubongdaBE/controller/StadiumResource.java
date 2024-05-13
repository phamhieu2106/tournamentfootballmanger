package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.StadiumRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.StadiumService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("api/stadiums")
public class StadiumResource implements IResource<ResponseEntity<?>, StadiumRequest> {

    private final StadiumService service;

    @Autowired
    public StadiumResource(StadiumService service) {
        super();
        this.service = service;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getOne(id));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> add(@Valid @ModelAttribute StadiumRequest object) throws IOException {
        return ResponseEntity.ok(service.add(object));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @Valid @ModelAttribute StadiumRequest object) throws IOException {
        return ResponseEntity.ok(service.update(id, object));
    }

    @Override
    public ResponseEntity<?> remove(Long id) {
        return null;
    }
}
