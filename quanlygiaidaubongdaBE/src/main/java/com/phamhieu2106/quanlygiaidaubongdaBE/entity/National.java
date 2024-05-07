package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "national")
public class National extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nationName;
    private String nationCode;
    @OneToOne
    @JoinColumn(name = "id_image", referencedColumnName = "id")
    private Image image;

}
