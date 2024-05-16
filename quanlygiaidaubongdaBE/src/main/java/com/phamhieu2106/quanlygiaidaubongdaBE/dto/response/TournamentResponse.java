package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.TournamentStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TournamentResponse {
    private Long id;

    private String nameTournament;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer totalRound;

    private TournamentStatus status;
    
    private Image image;


}
