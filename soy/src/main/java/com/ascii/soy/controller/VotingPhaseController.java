package com.ascii.soy.controller;

import com.ascii.soy.entity.VotingPhase;
import com.ascii.soy.repository.VotingPhaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/voting")
public class VotingPhaseController {

    private final VotingPhaseRepository votingPhaseRepository;

    public VotingPhaseController(VotingPhaseRepository votingPhaseRepository) {
        this.votingPhaseRepository = votingPhaseRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> getVotingStatus() {

        VotingPhase phase = votingPhaseRepository.findById(1L)
                .orElse(null);

        if (phase == null) {
            return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(phase.isVotingOpen());
    }
}

