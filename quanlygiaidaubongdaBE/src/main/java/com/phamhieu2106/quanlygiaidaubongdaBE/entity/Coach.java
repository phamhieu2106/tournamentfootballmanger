package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

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
@Table(name = "coach")
public class Coach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Date dob;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_nation", referencedColumnName = "id")
    private National national;

}
