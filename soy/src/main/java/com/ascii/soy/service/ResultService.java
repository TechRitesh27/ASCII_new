package com.ascii.soy.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.FinalResultResponse;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
@Transactional
public class ResultService {

    private final NominationRepository nominationRepository;

    public ResultService(NominationRepository nominationRepository) {
        this.nominationRepository = nominationRepository;
    }

    public FinalResultResponse getWinner() {

        List<Nomination> shortlisted =
                nominationRepository.findByStatus(NominationStatus.SHORTLISTED);

        if (shortlisted.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "No shortlisted candidates found");
        }

        // 🔹 Find maximum votes among shortlisted
        long maxVotes = shortlisted.stream()
                .mapToLong(n -> n.getVoteCount() == null ? 0 : n.getVoteCount())
                .max()
                .orElse(0);

        for (Nomination nomination : shortlisted) {

            double averageScore =
                    nomination.getAverageScore() == null
                            ? 0.0
                            : nomination.getAverageScore();

            long votes =
                    nomination.getVoteCount() == null
                            ? 0
                            : nomination.getVoteCount();

            // 🔹 Normalize faculty score to 100 scale
            double facultyNormalized = (averageScore / 90.0) * 100.0;

            // 🔹 Normalize vote score relative to top candidate
            double voteNormalized =
                    maxVotes == 0
                            ? 0.0
                            : ((double) votes / maxVotes) * 100.0;

            // 🔹 Final weighted score
            double finalScore =
                    (facultyNormalized * 0.8)
                            + (voteNormalized * 0.2);

            nomination.setFinalScore(finalScore);
        }

        nominationRepository.saveAll(shortlisted);

        // 🔹 Find winner
        Nomination winner = shortlisted.stream()
                .max(Comparator.comparingDouble(Nomination::getFinalScore))
                .orElseThrow();

        return new FinalResultResponse(
                winner.getStudent().getFullName(),
                winner.getStudent().getCollegeId(),
                winner.getAverageScore(),
                winner.getVoteCount() == null ? 0 : winner.getVoteCount(),
                winner.getFinalScore()
        );
    }
}
