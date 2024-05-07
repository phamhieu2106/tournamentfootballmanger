package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Position;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Sex;

public class PlayerResponse {

    private Long id;

    private String fullName;

    private Sex sex;

    private Position position;

    private National national;

    private Team team;
    
    private Image image;
}
