package com.phamhieu2106.quanlygiaidaubongdaBE.repository;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    @Query(
            value = """
                    SELECT tour.id,tour.nameTournament,tour.startDate,tour.endDate
                    , COUNT(stan.team) as numberTeam, tour.totalRound
                     FROM Tournament tour
                     JOIN Standing stan ON stan.tournament.id = tour.id
                     GROUP BY tour.id, tour.nameTournament, tour.startDate, tour.endDate, tour.totalRound
                     ORDER BY tour.tournamentStatus DESC
                    """
    )
    List<Tournament> getAll();
}
