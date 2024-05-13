package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.NationRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.NationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("api/nations")
public class NationResource implements IResource<ResponseEntity<?>, NationRequest> {

    private final NationService nationService;


    @Autowired
    public NationResource(NationService nationService) {
        super();
        this.nationService = nationService;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(nationService.getAll());
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(nationService.getOne(id));
    }

    @PostMapping
    @Override
    public ResponseEntity<?> add(@Valid @ModelAttribute NationRequest object
    ) throws IOException {
        return ResponseEntity.ok(nationService.add(object));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id
            , @Valid @ModelAttribute NationRequest object) throws IOException {
        return ResponseEntity.ok(nationService.update(id, object));

    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(Long id) {
        return null;
    }

}
