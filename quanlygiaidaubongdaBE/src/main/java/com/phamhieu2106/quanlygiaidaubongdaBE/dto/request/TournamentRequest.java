package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.TournamentStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class TournamentRequest {

    private String nameTournament;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer totalRound;

    private Set<Long> idTeams;

    public Tournament map(Tournament tournament) {

        tournament.setNameTournament(this.getNameTournament());
        tournament.setStartDate(this.getStartDate());
        tournament.setEndDate(this.getEndDate());
        tournament.setTotalRound(this.getTotalRound());

        LocalDate now = LocalDate.now();

        if (now.isBefore(this.startDate)) {
            tournament.setTournamentStatus(TournamentStatus.COMING);
        } else if (now.isAfter(this.startDate)) {
            tournament.setTournamentStatus(TournamentStatus.STARTED);
        } else {
            tournament.setTournamentStatus(TournamentStatus.ENDED);
        }

        return tournament;
    }
}
