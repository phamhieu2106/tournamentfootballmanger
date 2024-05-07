package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Player;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.BestFoot;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Position;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Sex;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
public class PlayerRequest {

    @NotBlank
    private String fullName;

    @NotNull
    private Date dob;

    private Float height;

    @NotNull
    private Integer number;

    @NotNull
    private Position position;

    @NotNull
    private Sex sex;

    @NotNull
    private BestFoot bestFoot;

    @NotNull
    private Long idNation;

    private Long idTeam;

    @NotNull
    private Status status;

    @NotNull
    private MultipartFile imageFile;

    public Player mapObjectAddRequest(PlayerRequest object) {
        return Player.builder()
                .fullName(object.getFullName().trim())
                .dob(object.getDob())
                .height(object.getHeight())
                .number(object.getNumber())
                .status(object.getStatus())
                .position(object.getPosition())
                .sex(object.getSex())
                .bestFoot(object.getBestFoot())
                .national(National.builder().id(object.getIdNation()).build())
                .team(Team.builder().id(object.getIdNation()).build()).build();
    }

    public Player mapObjectUpdateRequest(Long id, PlayerRequest object) {
        return Player.builder()
                .id(id)
                .fullName(object.getFullName().trim())
                .dob(object.getDob())
                .height(object.getHeight())
                .number(object.getNumber())
                .status(object.getStatus())
                .position(object.getPosition())
                .sex(object.getSex())
                .bestFoot(object.getBestFoot())
                .national(National.builder().id(object.getIdNation()).build())
                .team(Team.builder().id(object.getIdNation()).build()).build();
    }
}
