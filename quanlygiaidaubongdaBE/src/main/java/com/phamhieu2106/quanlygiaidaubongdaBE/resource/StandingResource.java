package com.phamhieu2106.quanlygiaidaubongdaBE.resource;

import com.phamhieu2106.quanlygiaidaubongdaBE.service.StandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/standings")
public class StandingResource {

    private final StandingService standingService;

    @Autowired
    public StandingResource(StandingService standingService) {
        super();
        this.standingService = standingService;
    }

    @GetMapping
    public ResponseEntity<?> getStandingsByTournamentId(@RequestParam("id") Long tournamentId) {
        return ResponseEntity.ok(standingService.getStandingsByTournament(tournamentId));
    }
}
