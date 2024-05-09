package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Standing;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StandingRequest {

    @NotNull
    private Integer points;
    @NotNull
    private Integer matchPlayed;
    @NotNull
    private Long idTeam;
    @NotNull
    private Long idTournament;

    public Standing map(Standing standing) {

        standing.setPoints(this.points);
        standing.setMatchPlayed(this.matchPlayed);
        standing.setTeam(Team.builder().id(idTeam).build());
        standing.setTournament(Tournament.builder().id(idTournament).build());

        return standing;
    }
}
