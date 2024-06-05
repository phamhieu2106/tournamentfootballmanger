package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import lombok.Data;

import java.io.Serializable;

@Data
public class StandingResponse implements Serializable {
    private Long id;
    private Integer points;
    private Integer win;
    private Integer loss;
    private Integer draw;
    private Integer matchPlayed;
    private Team team;
//    private Tournament tournament;
}
