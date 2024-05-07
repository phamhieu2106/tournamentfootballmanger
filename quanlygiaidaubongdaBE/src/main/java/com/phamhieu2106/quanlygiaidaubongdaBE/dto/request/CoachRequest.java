package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Sex;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Date;

@Data
public class CoachRequest {

    @NotBlank
    private String name;

    private Date dob;

    @NotNull
    private Sex sex;

    @NotNull
    private Long idNational;

    @NotNull
    private Status status;
}
