package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Coach coach;

    @OneToOne
    @JoinColumn(name = "id_image", referencedColumnName = "id")
    private Image image;
}
