package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Coach;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import lombok.Data;

import java.io.Serializable;

@Data
public class TeamResponse implements Serializable {

    private Long id;
    private String teamName;
    private Long foundation;
    private String president;
    private Coach coach;
    private Image image;
}
