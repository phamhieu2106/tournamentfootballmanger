package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TeamRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.TeamResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TeamRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TeamService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final ImageService imageService;
    private final ModelMapper modelMapper;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository,
                           ImageService imageService,
                           ModelMapper modelMapper) {
        super();
        this.teamRepository = teamRepository;
        this.imageService = imageService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TeamResponse> getAll() {
        List<Team> teams = teamRepository.findAll();
        if (teams.isEmpty()) {
            return null;
        }
        return teams.stream().map(item -> modelMapper.map(item, TeamResponse.class)).toList();
    }

    @Override
    public TeamResponse getOne(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found team with id: " + id));

        return modelMapper.map(team, TeamResponse.class);
    }

    @Override
    public Team add(TeamRequest object) {
        if (!validateRequest(object)) {
            return null;
        }

        Team team = new Team();

        return teamRepository.save(team);
    }

    @Override
    public Team update(Long id, TeamRequest object) {
        if (!validateRequest(object)) {
            return null;
        }

        Team team = new Team();

        return teamRepository.save(team);
    }

    @Override
    public Team remove(Long id) {
        return null;
    }

    private boolean validateRequest(TeamRequest object) {
        return true;
    }

}
