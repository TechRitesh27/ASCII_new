package com.ascii.soy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.entity.Nomination;
import com.ascii.soy.entity.StudentVote;
import com.ascii.soy.service.NominationService;
import com.ascii.soy.service.StudentVoteService;

@RestController
@RequestMapping("/api/votes")
public class StudentVoteController {

    private final StudentVoteService voteService;
    private final NominationService nominationService;

    public StudentVoteController(StudentVoteService voteService,
                                 NominationService nominationService) {
        this.voteService = voteService;
        this.nominationService = nominationService;
    }

    /**
     * 🔹 Load shortlisted nominations for student voting (Step 9)
     * ROLE_STUDENT only
     */
    @GetMapping("/candidates")
    public ResponseEntity<List<Nomination>> getVotingCandidates() {

        return ResponseEntity.ok(
                nominationService.getShortlistedNominations()
        );
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> voteStatus(Authentication authentication) {

        String studentCollegeId = authentication.getName();
        boolean voted = voteService.hasStudentVoted(studentCollegeId);

        return ResponseEntity.ok(voted);
    }


    /**
     * 🔹 Student casts a vote
     */
    @PostMapping("/{nominationId}")
    public ResponseEntity<StudentVote> vote(
            @PathVariable Long nominationId,
            Authentication authentication) {

        String studentCollegeId = authentication.getName();

        StudentVote vote =
                voteService.castVote(studentCollegeId, nominationId);

        return ResponseEntity.ok(vote);
    }
}
