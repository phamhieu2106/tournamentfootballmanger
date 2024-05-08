package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.StadiumRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.StadiumResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Stadium;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.StadiumRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.StadiumService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StadiumServiceImpl implements StadiumService {

    private final StadiumRepository stadiumRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StadiumServiceImpl(StadiumRepository stadiumRepository,
                              ModelMapper modelMapper) {
        super();
        this.stadiumRepository = stadiumRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<StadiumResponse> getAll() {
        List<Stadium> stadiums = stadiumRepository.findAll();
        if (stadiums.isEmpty()) {
            return null;
        }
        return stadiums.stream().map(item -> modelMapper.map(item, StadiumResponse.class)).toList();
    }

    @Override
    public StadiumResponse getOne(Long id) {
        Stadium stadium = stadiumRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found Stadium with id: " + id));

        return modelMapper.map(stadium, StadiumResponse.class);
    }

    @Override
    public Stadium add(StadiumRequest object) {
        Stadium stadium = Stadium.builder()
                .nameStadium(object.getNameStadium())
                .capacity(object.getCapacity())
                .location(object.getLocation())
                .team(Team.builder().id(object.getIdTeam()).build())
                .build();

        return stadiumRepository.save(stadium);
    }

    @Override
    public Stadium update(Long id, StadiumRequest object) {
        stadiumRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found Stadium with id: " + id));

        Stadium stadium = Stadium.builder()
                .id(id)
                .nameStadium(object.getNameStadium())
                .capacity(object.getCapacity())
                .location(object.getLocation())
                .team(Team.builder().id(object.getIdTeam()).build())
                .build();

        return stadiumRepository.save(stadium);
    }

    @Override
    public Stadium remove(Long id) {
        return null;
    }

}
