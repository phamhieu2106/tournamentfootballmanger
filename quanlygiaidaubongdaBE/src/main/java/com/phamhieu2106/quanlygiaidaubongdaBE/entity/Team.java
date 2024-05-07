package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "team")
public class Team extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teamName;

    private Integer foundation;

    private String president;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "id")
    private Coach coach;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    private List<Stadium> stadiums;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_player", referencedColumnName = "id")
    private List<Player> players;

    @OneToOne
    @JoinColumn(name = "id_image", referencedColumnName = "id")
    private Image image;
}
