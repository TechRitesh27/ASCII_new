package com.ascii.soy.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
@Transactional
public class StudentVoteService {

    private final StudentVoteRepository voteRepository;
    private final UserRepository userRepository;
    private final NominationRepository nominationRepository;
    private final VotingPhaseRepository votingPhaseRepository;

    public StudentVoteService(
            StudentVoteRepository voteRepository,
            UserRepository userRepository,
            NominationRepository nominationRepository,
            VotingPhaseRepository votingPhaseRepository) {

        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.nominationRepository = nominationRepository;
        this.votingPhaseRepository = votingPhaseRepository;
    }

    /* ==========================================================
                      CHECK IF STUDENT VOTED
       ========================================================== */

    public boolean hasStudentVoted(String studentCollegeId) {

        User student = userRepository.findByCollegeId(studentCollegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));

        return voteRepository.existsByVoter(student);
    }

    /* ==========================================================
                          CAST VOTE
       ========================================================== */

    public StudentVote castVote(String studentCollegeId, Long nominationId) {


        VotingPhase phase = votingPhaseRepository.findById(1L)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Voting phase not initialized"
                ));

        if (!phase.isVotingOpen()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Voting is currently closed"
            );
        }

        // Fetch student
        User student = userRepository.findByCollegeId(studentCollegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Only students can vote");
        }

        // 2️⃣ One-vote rule
        if (voteRepository.existsByVoter(student)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "You have already voted");
        }

        // 3️⃣ Fetch nomination
        Nomination nomination = nominationRepository.findById(nominationId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Nomination not found"));

        // 4️⃣ Must be shortlisted
        if (nomination.getStatus() != NominationStatus.SHORTLISTED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Voting allowed only for shortlisted candidates"
            );
        }

        // 5️⃣ Prevent self-voting
        if (nomination.getStudent().getId().equals(student.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "You cannot vote for yourself"
            );
        }

        // 6️⃣ Save vote
        StudentVote vote = new StudentVote();
        vote.setVoter(student);
        vote.setNomination(nomination);

        voteRepository.save(vote);

        // 7️⃣ Update vote count inside Nomination
        int currentVotes = nomination.getVoteCount() == null ? 0 : nomination.getVoteCount();
        nomination.setVoteCount(currentVotes + 1);

        nominationRepository.save(nomination);

        return vote;
    }

    /* ==========================================================
                        CALCULATE VOTING SCORE
       ========================================================== */

    public int calculateVotingScore(Nomination nomination) {

        return (int) voteRepository.countByNomination(nomination);
    }

}
