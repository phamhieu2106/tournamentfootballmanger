package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.CoachRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.CoachService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/api/coaches")
public class CoachController implements IController<ResponseEntity<?>, CoachRequest> {

    private final CoachService coachService;

    @Autowired
    public CoachController(CoachService coachService) {
        super();
        this.coachService = coachService;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(coachService.getAll());
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(coachService.getOne(id));

    }

    @Override
    @PostMapping
    public ResponseEntity<?> add(@Valid @ModelAttribute CoachRequest object) throws IOException {
        return ResponseEntity.ok(coachService.add(object));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @Valid @ModelAttribute CoachRequest object) throws IOException {
        return ResponseEntity.ok(coachService.update(id, object));
    }

    @Override
    public ResponseEntity<?> remove(@PathVariable("id") Long id) {
        return ResponseEntity.ok(coachService.remove(id));
    }
}
