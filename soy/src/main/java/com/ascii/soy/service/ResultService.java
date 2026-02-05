package com.ascii.soy.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ascii.soy.dto.FinalResultResponse;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
public class ResultService {

    private final StudentVoteService voteService;
    private final NominationRepository nominationRepo;

    public ResultService(StudentVoteService voteService,
                         NominationRepository nominationRepo) {
        this.voteService = voteService;
        this.nominationRepo = nominationRepo;
    }

    public FinalResultResponse getWinner() {

        List<Nomination> shortlisted =
                nominationRepo.findByStatus(NominationStatus.SHORTLISTED);

        if (shortlisted.isEmpty()) {
            throw new RuntimeException("No shortlisted candidates found");
        }

        return shortlisted.stream()
                .map(nomination -> {

                    double facultyScore =
                            nomination.getAverageScore() != null
                                    ? nomination.getAverageScore()
                                    : 0.0;

                    double votingScore =
                            voteService.calculateVotingScore(nomination);

                    double finalScore = facultyScore + votingScore;

                    return new FinalResultResponse(
                            nomination.getStudent().getFullName(),
                            nomination.getStudent().getCollegeId(),
                            facultyScore,
                            votingScore,
                            finalScore
                    );
                })
                .max(Comparator.comparingDouble(
                        FinalResultResponse::getFinalScore))
                .orElseThrow(() ->
                        new RuntimeException("Unable to calculate result"));
    }
}
