package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.StandingRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.StandingResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Standing;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.StandingRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.StandingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class StandingServiceImpl implements StandingService {

    private static final String REDIS_KEY_VALUE = "standing";
    private final StandingRepository standingRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public StandingServiceImpl(StandingRepository standingRepository,
                               ModelMapper modelMapper) {
        super();
        this.standingRepository = standingRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<StandingResponse> getAll() {
        return standingRepository.findAll().stream().map(
                standing -> modelMapper.map(standing, StandingResponse.class)
        ).toList();
    }

    @Override
    @Cacheable(value = REDIS_KEY_VALUE, key = "#id")
    public StandingResponse getOne(Long id) {

        Standing Standing = standingRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found standing with id: " + id));

        return modelMapper.map(Standing, StandingResponse.class);
    }

    @Override
    public Standing add(StandingRequest object) throws IOException {
        return standingRepository.save(object.map(new Standing()));
    }

    @Override
    public Standing update(Long id, StandingRequest object) throws IOException {
        Standing standing = standingRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found standing with id: " + id));

        return standingRepository.save(object.map(standing));
    }

    @Override
    public Standing remove(Long id) {
        return null;
    }
}
