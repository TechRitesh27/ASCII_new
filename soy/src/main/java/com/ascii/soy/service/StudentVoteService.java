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

    public StudentVoteService(
            StudentVoteRepository voteRepository,
            UserRepository userRepository,
            NominationRepository nominationRepository) {

        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.nominationRepository = nominationRepository;
    }

    public boolean hasStudentVoted(String studentCollegeId) {

        User student = userRepository.findByCollegeId(studentCollegeId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return voteRepository.existsByVoter(student);
    }


    /**
     * Student casts a vote (JWT-based identity)
     */
    public StudentVote castVote(String studentCollegeId, Long nominationId) {

        // 1️⃣ Fetch student
        User student = userRepository.findByCollegeId(studentCollegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));

        // 2️⃣ Role check
        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Only students can vote");
        }

        // 3️⃣ One-vote rule
        if (voteRepository.findByVoter(student).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "You have already voted");
        }

        // 4️⃣ Fetch nomination
        Nomination nomination = nominationRepository.findById(nominationId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Nomination not found"));

        // 5️⃣ Voting allowed only for SHORTLISTED nominations
        if (nomination.getStatus() != NominationStatus.SHORTLISTED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Voting is allowed only for shortlisted nominations"
            );
        }

        // 6️⃣ Save vote
        StudentVote vote = new StudentVote();
        vote.setVoter(student);
        vote.setNomination(nomination);

        return voteRepository.save(vote);
    }

    /**
     * Calculates voting score for a nomination
     * (1 vote = 1 point)
     */
    public int calculateVotingScore(Nomination nomination) {
        return (int) voteRepository.countByNomination(nomination);
    }
}
