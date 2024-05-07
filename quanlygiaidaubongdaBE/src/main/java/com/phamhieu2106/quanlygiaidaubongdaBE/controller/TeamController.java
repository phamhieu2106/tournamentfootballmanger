package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TeamRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.TeamResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/api/teams")
public class TeamController implements IController<ResponseEntity<?>, TeamRequest> {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        super();
        this.teamService = teamService;
    }

    @GetMapping
    @Override
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(teamService.getAll());
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(teamService.getOne(id));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> add(@Valid @ModelAttribute TeamRequest object) throws IOException {
        return ResponseEntity.ok(teamService.add(object));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @Valid @ModelAttribute TeamRequest object) throws IOException {
        return ResponseEntity.ok(teamService.update(id,object));
    }

    @Override
    public ResponseEntity<?> remove(Long id) {
        return null;
    }
}
