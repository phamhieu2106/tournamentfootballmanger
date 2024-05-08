package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Coach;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import lombok.Data;

@Data
public class TeamResponse {

    private Long id;
    private String teamName;
    private Long foundation;
    private String president;
    private Coach coach;
    private Image image;
}
