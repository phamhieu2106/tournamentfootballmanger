package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TournamentRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TournamentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("api/tournaments")
public class TournamentResource implements IResource<ResponseEntity<?>, TournamentRequest> {

    private final TournamentService tournamentService;

    public TournamentResource(TournamentService tournamentService) {
        super();
        this.tournamentService = tournamentService;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(tournamentService.getAll());
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(tournamentService.getOne(id));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> add(@Valid @RequestBody TournamentRequest object) throws IOException {
        return ResponseEntity.ok(tournamentService.add(object));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id,
                                    @Valid @RequestBody TournamentRequest object) throws IOException {
        return ResponseEntity.ok(tournamentService.update(id, object));
    }

    @Override
    public ResponseEntity<?> remove(Long id) {
        return ResponseEntity.ok(tournamentService.getAll());
    }
}
