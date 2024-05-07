package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class TeamRequest {

    @NotBlank
    private String teamName;
    @NotNull
    private Integer foundation;
    @NotBlank
    private String president;
    private Long idCoach;
    private List<Long> idStadiums;
    @NotNull
    private MultipartFile imageFile;
}
