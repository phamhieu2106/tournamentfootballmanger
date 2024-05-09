package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import lombok.Data;

@Data
public class StandingResponse {
    private Long id;
    private Integer points;
    private Integer matchPlayed;
    private Team team;
    private Tournament tournament;
}
