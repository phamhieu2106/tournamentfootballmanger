package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import lombok.Data;

@Data
public class StadiumResponse {

    private Long id;
    private String nameStadium;
    private Long capacity;
    private String location;
    private Team team;
}
