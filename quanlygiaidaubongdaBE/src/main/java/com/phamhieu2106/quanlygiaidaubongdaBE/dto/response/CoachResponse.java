package com.phamhieu2106.quanlygiaidaubongdaBE.dto.response;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Sex;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

@Data
public class CoachResponse implements Serializable {
    private Long id;
    private String name;
    private Date dob;
    private Sex sex;
    private National national;
    private Status status;
}
