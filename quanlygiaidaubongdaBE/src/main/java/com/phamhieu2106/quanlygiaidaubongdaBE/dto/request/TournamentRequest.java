package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.TournamentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Set;

@Data
public class TournamentRequest {

    private String nameTournament;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer totalRound;

    private Set<Long> idTeams;

    @NotNull
    private MultipartFile imageFile;

    public Tournament map(Tournament tournament) {

        tournament.setNameTournament(this.getNameTournament());
        tournament.setStartDate(this.getStartDate());
        tournament.setEndDate(this.getEndDate());
        tournament.setTotalRound(this.getTotalRound());
        tournament.setTournamentStatus(TournamentStatus.COMING);

        return tournament;
    }
}
