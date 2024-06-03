package com.phamhieu2106.quanlygiaidaubongdaBE.service;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.StandingRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.StandingResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Standing;

import java.util.Set;

public interface StandingService extends IService<Standing, StandingRequest, StandingResponse> {
    Set<StandingResponse> getStandingsByTournament(Long id);
}
