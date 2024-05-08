package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Coach;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TeamRequest {

    private Long id;
    @NotBlank
    private String teamName;
    @NotNull
    private Integer foundation;
    @NotBlank
    private String president;
    private Long idCoach;
    @NotNull
    private MultipartFile imageFile;

    public Team map(Team team) {

        team.setId(this.id);
        team.setTeamName(this.teamName);
        team.setFoundation(this.foundation);
        team.setPresident(this.president);
        team.setCoach(Coach.builder().id(this.idCoach).build());

        return team;
    }
}
