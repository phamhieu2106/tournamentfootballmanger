package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "coach_history")
public class CoachHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String detail;

    @ManyToOne
    @JoinColumn(name = "id_coach", referencedColumnName = "id")
    private Coach coach;

}
