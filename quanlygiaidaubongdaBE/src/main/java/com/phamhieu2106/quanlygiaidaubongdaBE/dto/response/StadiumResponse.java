package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import lombok.Data;

import java.io.Serializable;

@Data
public class StadiumResponse implements Serializable {

    private Long id;
    private String nameStadium;
    private Long capacity;
    private String location;
    private Team team;
}
