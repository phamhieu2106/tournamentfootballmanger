package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.TournamentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tournament")
@Builder
public class Tournament extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameTournament;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer totalRound;

    @Enumerated(EnumType.STRING)
    private TournamentStatus tournamentStatus;
}
