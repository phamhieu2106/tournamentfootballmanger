package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TournamentRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.TournamentResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Standing;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.ImageRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.StandingRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TeamRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TournamentRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TournamentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class TournamentServiceImpl implements TournamentService {

    private static final String REDIS_KEY_VALUE = "tournament";
    private final TournamentRepository tournamentRepository;
    private final StandingRepository standingRepository;
    private final TeamRepository teamRepository;
    private final ModelMapper modelMapper;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @Autowired
    public TournamentServiceImpl(TournamentRepository tournamentRepository,
                                 StandingRepository standingRepository,
                                 TeamRepository teamRepository,
                                 ModelMapper modelMapper,
                                 ImageService imageService,
                                 ImageRepository imageRepository) {
        super();
        this.tournamentRepository = tournamentRepository;
        this.standingRepository = standingRepository;
        this.modelMapper = modelMapper;
        this.teamRepository = teamRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    @Override
    public List<TournamentResponse> getAll() {

        return tournamentRepository.findAll().stream().map(
                tournament -> modelMapper.map(tournament, TournamentResponse.class)
        ).toList();
    }

    @Override
    @Cacheable(value = REDIS_KEY_VALUE, key = "#id")
    public TournamentResponse getOne(Long id) {

        Tournament tournament = tournamentRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found tournament with id: " + id));

        return modelMapper.map(tournament, TournamentResponse.class);

    }

    @Override
    public Tournament add(TournamentRequest object) throws IOException {

        Image image = imageService.uploadImage(object.getImageFile());

        Tournament tournament = tournamentRepository.save(object.map(new Tournament()));

        tournament.setImage(image);

//        Handle create Standing
        long numberStanding = handleCreateStandings(object.getIdTeams(), tournament);

        System.out.println("Create " + numberStanding + " standing!");

        return tournament;
    }

    @Override
    public Tournament update(Long id, TournamentRequest object) throws IOException {

        Tournament tournament = tournamentRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found tournament with id: " + id));

        if ("default.jpg".equals(object.getImageFile().getOriginalFilename())) {

            List<Standing> standings = getAllStanding(tournament);
            //       Remove Standing
            handleRemoveStanding(standings);
            //        Save tournament
            Tournament newTournament = tournamentRepository.save(object.map(tournament));
//        Handle create Standing
            long numberStanding = handleCreateStandings(object.getIdTeams(), tournament);

            System.out.println("Update " + numberStanding + " standing!");

            return newTournament;
        } else {
            Optional<Image> optionalImage = imageRepository.findById(tournament.getImage().getId());

            Image image;
            if (optionalImage.isPresent()) {
                image = imageService.updateImage(optionalImage.get().getId(), object.getImageFile());
            } else {
                image = imageService.uploadImage(object.getImageFile());
            }

            List<Standing> standings = getAllStanding(tournament);
            //       Remove Standing
            handleRemoveStanding(standings);
            //        Save tournament
            Tournament newTournament = tournamentRepository.save(object.map(tournament));
            newTournament.setImage(image);
//        Handle create Standing
            long numberStanding = handleCreateStandings(object.getIdTeams(), tournament);

            System.out.println("Update " + numberStanding + " standing!");

            return newTournament;

        }


    }

    @Override
    public Tournament remove(Long id) {
        return null;
    }

    private List<Standing> getAllStanding(Tournament tournament) {
        return standingRepository.findAllByTournament(tournament);
    }

    private Team mapIdToTeam(Long id) {
        return teamRepository.findById(id).orElse(null);
    }

    private long handleCreateStandings(Set<Long> longSet, Tournament tournament) {
        List<Team> teamList = longSet.stream().map(
                this::mapIdToTeam
        ).toList();

        teamList.forEach(team -> handleSaveStanding(team, tournament));

        return teamList.size();
    }

    private void handleSaveStanding(Team team, Tournament tournament) {
        Standing standing = Standing.builder()
                .matchPlayed(0)
                .points(0)
                .team(team)
                .tournament(tournament)
                .build();
        standingRepository.save(standing);
    }

    private void handleRemoveStanding(List<Standing> standings) {
        standingRepository.deleteAll(standings);
    }
}
