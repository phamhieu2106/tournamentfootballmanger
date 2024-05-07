package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.BestFoot;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Position;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Sex;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Player extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private Date dob;

    private Float height;

    private Integer number;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Position position;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Enumerated(EnumType.STRING)
    private BestFoot bestFoot;

    @ManyToOne
    @JoinColumn(name = "id_nation", referencedColumnName = "id")
    private National national;

    @ManyToOne
    @JoinColumn(name = "id_team", referencedColumnName = "id")
    private Team team;

    @OneToOne
    @JoinColumn(name = "id_image", referencedColumnName = "id")
    private Image image;
}
