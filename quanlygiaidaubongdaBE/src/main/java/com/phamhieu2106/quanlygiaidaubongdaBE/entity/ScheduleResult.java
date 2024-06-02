package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.MatchResult;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "schedule_result")
public class ScheduleResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Schedule schedule;

    private Integer homeTeamScore;
    private Integer awayTeamScore;

    @Enumerated(EnumType.STRING)
    private MatchResult matchResult;
}
