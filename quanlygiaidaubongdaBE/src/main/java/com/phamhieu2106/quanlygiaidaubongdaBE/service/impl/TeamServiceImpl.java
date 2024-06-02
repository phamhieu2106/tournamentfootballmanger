package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TeamRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.TeamResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.ImageRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TeamRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TeamService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
public class TeamServiceImpl implements TeamService {

    private static final String REDIS_KEY_VALUE = "team";
    private final TeamRepository teamRepository;
    private final ImageService imageService;
    private final ModelMapper modelMapper;
    private final ImageRepository imageRepository;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository,
                           ImageService imageService,
                           ModelMapper modelMapper,
                           ImageRepository imageRepository) {
        super();
        this.teamRepository = teamRepository;
        this.imageService = imageService;
        this.modelMapper = modelMapper;
        this.imageRepository = imageRepository;
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
    @Cacheable(value = REDIS_KEY_VALUE, key = "#id")
    public TeamResponse getOne(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found team with id: " + id));

        return modelMapper.map(team, TeamResponse.class);
    }

    @Override
    public Team add(TeamRequest object) throws IOException {

        Image image = imageService.uploadImage(object.getImageFile());

        Team team = object.map(new Team());
        team.setImage(image);

        return teamRepository.save(team);
    }

    @Override
    public Team update(Long id, TeamRequest object) throws IOException {
        Optional<Team> optionalTeam = teamRepository.findById(id);

        if (optionalTeam.isPresent()) {
            if ("default.jpg".equals(object.getImageFile().getOriginalFilename())) {
                Team newTeam = object.map(optionalTeam.get());
                return teamRepository.save(newTeam);
            } else {
                Team team = optionalTeam.get();
                //            Image
                Optional<Image> optionalImage = imageRepository.findById(team.getImage().getId());
                Image image;
                if (optionalImage.isPresent()) {
                    image = imageService.updateImage(optionalImage.get().getId(), object.getImageFile());
                } else {
                    image = imageService.uploadImage(object.getImageFile());
                }
//            Nation
                Team newTeam = object.map(new Team());
                newTeam.setImage(image);
                return teamRepository.save(newTeam);
            }
        }
        throw new NotFoundException("Can't not update Team with id: " + id);
    }

    @Override
    public Team remove(Long id) {
        return null;
    }


}
