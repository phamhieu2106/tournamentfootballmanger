package com.phamhieu2106.quanlygiaidaubongdaBE.repository;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationalRepository extends JpaRepository<National,Long> {
}
