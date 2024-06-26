package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "standing")
@Builder
public class Standing extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer points;

    private Integer matchPlayed;
    private Integer win;
    private Integer draw;
    private Integer loss;

    @ManyToOne
    @JoinColumn(name = "id_team", referencedColumnName = "id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "id_tournament", referencedColumnName = "id")
    private Tournament tournament;
}
