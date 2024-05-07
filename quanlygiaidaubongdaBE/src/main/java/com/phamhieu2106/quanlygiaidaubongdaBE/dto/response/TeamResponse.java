package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Coach;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Stadium;
import lombok.Data;

import java.util.List;

@Data
public class TeamResponse {

    private Long id;
    private String teamName;
    private String president;
    private Coach coach;
    private List<Stadium> stadiums;
    private Image image;
}
