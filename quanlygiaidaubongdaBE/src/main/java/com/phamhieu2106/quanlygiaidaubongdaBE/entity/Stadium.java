package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "stadium")
public class Stadium extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameStadium;

    private Long capacity;

    private String location;

    @ManyToOne
    @JoinColumn(name = "id_team", referencedColumnName = "id")
    private Team team;
}
