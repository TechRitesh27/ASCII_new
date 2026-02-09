package com.ascii.soy.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.FacultyEvaluationRequest;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
@Transactional
public class FacultyEvaluationService {

    private final FacultyEvaluationRepository evaluationRepo;
    private final UserRepository userRepo;
    private final NominationRepository nominationRepo;

    public FacultyEvaluationService(
            FacultyEvaluationRepository evaluationRepo,
            UserRepository userRepo,
            NominationRepository nominationRepo) {

        this.evaluationRepo = evaluationRepo;
        this.userRepo = userRepo;
        this.nominationRepo = nominationRepo;
    }

    /* ==========================================================
                        FACULTY EVALUATION
       ========================================================== */

    public FacultyEvaluation evaluate(
            String facultyCollegeId,
            Long nominationId,
            FacultyEvaluationRequest request) {

        User faculty = userRepo.findByCollegeId(facultyCollegeId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Faculty not found"));

        if (faculty.getRole() != Role.FACULTY) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Only faculty can evaluate");
        }

        Nomination nomination = nominationRepo.findById(nominationId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Nomination not found"));

        if (evaluationRepo.existsByFacultyAndNomination(faculty, nomination)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You have already evaluated this nomination");
        }

        int totalScore =
                request.getAcademicScore() +
                        request.getProjectScore() +
                        request.getActivityScore() +
                        request.getLeadershipScore() +
                        request.getDisciplineScore();

        FacultyEvaluation evaluation = new FacultyEvaluation();
        evaluation.setFaculty(faculty);
        evaluation.setNomination(nomination);
        evaluation.setAcademicScore(request.getAcademicScore());
        evaluation.setProjectScore(request.getProjectScore());
        evaluation.setActivityScore(request.getActivityScore());
        evaluation.setLeadershipScore(request.getLeadershipScore());
        evaluation.setDisciplineScore(request.getDisciplineScore());
        evaluation.setTotalScore(totalScore);

        evaluationRepo.save(evaluation);

        // Update nomination status & average
        updateNominationAfterEvaluation(nomination);

        return evaluation;
    }

    /* ==========================================================
                    UPDATE NOMINATION AFTER EVALUATION
       ========================================================== */

    private void updateNominationAfterEvaluation(Nomination nomination) {

        List<FacultyEvaluation> evaluations =
                evaluationRepo.findByNomination(nomination);

        double average = evaluations.stream()
                .mapToInt(FacultyEvaluation::getTotalScore)
                .average()
                .orElse(0.0);

        nomination.setAverageScore(average);
        nomination.setEvaluationCount(evaluations.size());

        // Change status from SUBMITTED → UNDER_REVIEW
        if (nomination.getStatus() == NominationStatus.SUBMITTED) {
            nomination.setStatus(NominationStatus.UNDER_REVIEW);
        }

        nominationRepo.save(nomination);
    }

    /* ==========================================================
                         FACULTY HISTORY
       ========================================================== */

    public List<FacultyEvaluation> getMyEvaluations(String facultyCollegeId) {

        User faculty = userRepo.findByCollegeId(facultyCollegeId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Faculty not found"));

        if (faculty.getRole() != Role.FACULTY) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only faculty can access this");
        }

        return evaluationRepo.findByFaculty(faculty);
    }
}
