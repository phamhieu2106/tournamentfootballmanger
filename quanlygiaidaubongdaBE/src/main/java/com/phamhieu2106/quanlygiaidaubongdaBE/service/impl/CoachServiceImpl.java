package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.CoachRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.CoachResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Coach;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.CoachRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.CoachService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CoachServiceImpl implements CoachService {
    private static final String REDIS_KEY_VALUE = "coach";
    private final CoachRepository coachRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CoachServiceImpl(CoachRepository coachRepository,
                            ModelMapper modelMapper) {
        super();
        this.coachRepository = coachRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CoachResponse> getAll() {
        List<Coach> coaches = this.coachRepository.findAll();
        if (coaches.isEmpty()) {
            return null;
        }

        return coaches.stream().map(
                player -> modelMapper.map(player, CoachResponse.class)
        ).toList();
    }

    @Override
    @Cacheable(value = REDIS_KEY_VALUE, key = "#id")
    public CoachResponse getOne(Long id) {
        Coach player = coachRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found coach with id: " + id));
        return modelMapper.map(player, CoachResponse.class);
    }

    @Override
    public Coach add(CoachRequest object) {
        Coach player = Coach.builder()
                .name(object.getName().trim())
                .dob(object.getDob())
                .sex(object.getSex())
                .national(National.builder().id(object.getIdNational()).build())
                .status(object.getStatus())
                .build();

        return coachRepository.save(player);
    }

    @Override
    public Coach update(Long id, CoachRequest object) throws IOException {
        coachRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Not found Coach with id: " + id));

        Coach newCoach = Coach.builder()
                .id(id)
                .name(object.getName().trim())
                .dob(object.getDob())
                .sex(object.getSex())
                .national(National.builder().id(object.getIdNational()).build())
                .status(object.getStatus())
                .build();

        return coachRepository.save(newCoach);
    }

    @Override
    public Coach remove(Long id) {
        Coach player = coachRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Not found Coach with id: " + id));
        player.setStatus(Status.RETIREMENT);

        return coachRepository.save(player);
    }
}
