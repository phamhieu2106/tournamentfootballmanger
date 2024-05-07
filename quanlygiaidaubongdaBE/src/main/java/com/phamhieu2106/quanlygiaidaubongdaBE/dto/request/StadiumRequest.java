package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StadiumRequest {

    @NotBlank
    private String nameStadium;
    @NotNull
    private Long capacity;
    @NotEmpty
    private String location;
    private Long idTeam;
}
