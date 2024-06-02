package com.phamhieu2106.quanlygiaidaubongdaBE.repository;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    @Modifying
    @Transactional
    @Query(value = """
                    UPDATE Tournament tour
                    SET tour.tournamentStatus =
                       CASE\s
                        WHEN :now < tour.startDate THEN "COMING"
                        WHEN :now >= tour.startDate AND :now <= tour.endDate THEN "STARTED"
                        WHEN :now > tour.endDate THEN "ENDED"
                       END
            """)
    void updateTournament(LocalDate now);

}
