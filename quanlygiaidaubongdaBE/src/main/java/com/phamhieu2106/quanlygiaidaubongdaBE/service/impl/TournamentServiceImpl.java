package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.TournamentRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.TournamentResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Standing;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Team;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Tournament;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.StandingRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TeamRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.TournamentRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.TournamentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final StandingRepository standingRepository;
    private final TeamRepository teamRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TournamentServiceImpl(TournamentRepository tournamentRepository,
                                 StandingRepository standingRepository,
                                 TeamRepository teamRepository,
                                 ModelMapper modelMapper) {
        super();
        this.tournamentRepository = tournamentRepository;
        this.standingRepository = standingRepository;
        this.modelMapper = modelMapper;
        this.teamRepository = teamRepository;
    }

    @Override
    public List<TournamentResponse> getAll() {

        return tournamentRepository.findAll().stream().map(
                tournament -> modelMapper.map(tournamentRepository.findAll(), TournamentResponse.class)
        ).toList();

    }

    @Override
    public TournamentResponse getOne(Long id) {

        Tournament tournament = tournamentRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found tournament with id: " + id));

        return modelMapper.map(tournament, TournamentResponse.class);

    }

    @Override
    public Tournament add(TournamentRequest object) throws IOException {

        Tournament tournament = tournamentRepository.save(object.map(new Tournament()));

//        Handle create Standing
        long numberStanding = handleCreateStandings(object.getIdTeams(), tournament);

        System.out.println("Created " + numberStanding + " standing!");

        return tournament;
    }

    @Override
    public Tournament update(Long id, TournamentRequest object) throws IOException {

        Tournament tournament = tournamentRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Not found tournament with id: " + id));

        return tournamentRepository.save(object.map(tournament));
    }

    @Override
    public Tournament remove(Long id) {
        return null;
    }

    private Team mapIdToTeam(Long id) {
        return teamRepository.findById(id).orElse(null);
    }

    private long handleCreateStandings(Set<Long> longSet, Tournament tournament) {
        List<Team> teamList = longSet.stream().map(
                this::mapIdToTeam
        ).toList();

        return teamList.stream().map(
                team -> handleSaveStanding(team, tournament)
        ).count();
    }

    private Standing handleSaveStanding(Team team, Tournament tournament) {
        Standing standing = Standing.builder()
                .matchPlayed(0)
                .points(0)
                .team(team)
                .tournament(tournament)
                .build();

        return standingRepository.save(standing);
    }

}
