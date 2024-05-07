package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.PlayerRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.PlayerResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Player;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Status;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.ImageRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.PlayerRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.PlayerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;
    private final ModelMapper modelMapper;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository,
                             ModelMapper modelMapper,
                             ImageService imageService,
                             ImageRepository imageRepository) {
        super();
        this.playerRepository = playerRepository;
        this.modelMapper = modelMapper;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    @Override
    public List<PlayerResponse> getAll() {
        List<Player> players = this.playerRepository.findAll();
        if (players.isEmpty()) {
            return null;
        }

        return players.stream().map(
                player -> modelMapper.map(player, PlayerResponse.class)
        ).toList();
    }

    @Override
    public PlayerResponse getOne(Long id) {
        Player player = playerRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Not found player with id: " + id));
        return modelMapper.map(player, PlayerResponse.class);
    }

    @Override
    public Player add(PlayerRequest object) throws IOException {

        Player player = object.mapObjectAddRequest(object);

        Image image = imageService.uploadImage(object.getImageFile());

        player.setImage(image);

        return playerRepository.save(player);
    }

    @Override
    public Player update(Long id, PlayerRequest object) throws IOException {
        Player player = playerRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Not found Player with id: " + id));

        if ("default.jpg".equals(object.getImageFile().getOriginalFilename())) {
            player = object.mapObjectUpdateRequest(id, object);

            return playerRepository.save(player);
        } else {
            Optional<Image> optionalImage = imageRepository.findById(player.getImage().getId());
            Image image;
            if (optionalImage.isPresent()) {
                image = imageService.updateImage(optionalImage.get().getId(), object.getImageFile());
            } else {
                image = imageService.uploadImage(object.getImageFile());
            }

            player = object.mapObjectUpdateRequest(id, object);
            player.setImage(image);

            return playerRepository.save(player);
        }
    }

    @Override
    public Player remove(Long id) {
        Player player = playerRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Not found Player with id: " + id));
        player.setStatus(Status.RETIREMENT);

        return playerRepository.save(player);
    }
    
}
