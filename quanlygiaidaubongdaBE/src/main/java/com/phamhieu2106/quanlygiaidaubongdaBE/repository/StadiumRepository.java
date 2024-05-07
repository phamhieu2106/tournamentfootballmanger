package com.phamhieu2106.quanlygiaidaubongdaBE.repository;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium, Long> {

    boolean existsStadiumByNameStadium(String name);
}
